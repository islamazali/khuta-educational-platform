const fs = require('fs').promises;
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

async function findJSFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => {
    const res = path.resolve(dir, entry.name);
    return entry.isDirectory() 
      ? findJSFiles(res) 
      : (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.jsx')) ? [res] : []);
  }));
  return files.reduce((a, b) => a.concat(b), []);
}

async function fixExports(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const ast = parser.parse(content, {
      sourceType: 'module',
      plugins: ['jsx']
    });

    let hasDefaultExport = false;
    let namedExports = [];
    let defaultExportName = null;

    traverse(ast, {
      ExportDefaultDeclaration(path) {
        hasDefaultExport = true;
        const declaration = path.node.declaration;
        if (t.isIdentifier(declaration)) {
          defaultExportName = declaration.name;
        } else if (t.isFunctionDeclaration(declaration) || t.isClassDeclaration(declaration)) {
          defaultExportName = declaration.id ? declaration.id.name : null;
        }
      },
      ExportNamedDeclaration(path) {
        const declaration = path.node.declaration;
        if (declaration) {
          if (t.isFunctionDeclaration(declaration) || t.isClassDeclaration(declaration)) {
            namedExports.push(declaration.id.name);
          } else if (t.isVariableDeclaration(declaration)) {
            declaration.declarations.forEach(declarator => {
              if (t.isIdentifier(declarator.id)) {
                namedExports.push(declarator.id.name);
              }
            });
          }
        }
        
        path.node.specifiers.forEach(specifier => {
          if (t.isExportSpecifier(specifier)) {
            namedExports.push(specifier.exported.name);
          }
        });
      }
    });

    // If no default export but we have a main function/class, make it default
    if (!hasDefaultExport && (defaultExportName || namedExports.length > 0)) {
      const mainExport = defaultExportName || namedExports[0];
      const exportNode = t.exportDefaultDeclaration(t.identifier(mainExport));
      ast.program.body.push(exportNode);
    }

    // Ensure named exports for key components
    if (defaultExportName && !namedExports.includes(defaultExportName)) {
      const namedExportNode = t.exportNamedDeclaration(
        null, 
        [t.exportSpecifier(t.identifier(defaultExportName), t.identifier(defaultExportName))]
      );
      ast.program.body.push(namedExportNode);
    }

    const output = generate(ast, {}, content);
    
    // Only write if content has changed
    if (output.code !== content) {
      await fs.writeFile(filePath, output.code);
      console.log(`Modified exports in: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

async function auditProjectExports(rootDir) {
  const files = await findJSFiles(rootDir);
  
  for (const file of files) {
    await fixExports(file);
  }
}

// Run the audit on the src directory
const srcDir = path.join(__dirname, '..', 'src');
auditProjectExports(srcDir)
  .then(() => console.log('Export audit completed successfully.'))
  .catch(error => console.error('Export audit failed:', error)); 