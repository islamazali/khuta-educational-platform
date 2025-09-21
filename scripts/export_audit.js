const fs = require('fs');
const path = require('path');

// Function to recursively find all .js and .jsx files
function findJSFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      results = results.concat(findJSFiles(filePath));
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      results.push(filePath);
    }
  });
  
  return results;
}

// Function to check and fix exports
function auditExports(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let newContent = content;

  // Check for named exports without default
  const namedExportMatch = content.match(/export\s+(function|const|let|var)\s+(\w+)/);
  const defaultExportMatch = content.match(/export\s+default\s+(function|const|let|var)\s+(\w+)/);

  if (namedExportMatch && !defaultExportMatch) {
    const exportName = namedExportMatch[2];
    newContent += `\n\nexport default ${exportName};`;
    modified = true;
  }

  // Check for default export without named export
  if (defaultExportMatch && !namedExportMatch) {
    const exportName = defaultExportMatch[2];
    newContent = newContent.replace(
      `export default ${exportName}`,
      `export default ${exportName};\nexport { ${exportName} };`
    );
    modified = true;
  }

  // Write back to file if modified
  if (modified) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Modified: ${filePath}`);
  }
}

// Main audit function
function performExportAudit(rootDir) {
  const jsFiles = findJSFiles(rootDir);
  
  jsFiles.forEach(auditExports);
}

// Run the audit on the src directory
performExportAudit(path.join(__dirname, '..', 'src'));

console.log('Export audit completed.'); 