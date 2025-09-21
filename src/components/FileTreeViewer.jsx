import React, { useState } from 'react';
import { FaFolder, FaFolderOpen, FaFile, FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Utility function to get file icon based on extension
const getFileIcon = fileName => {
  const ext = fileName.split('.').pop().toLowerCase();
  switch (ext) {
    case 'pdf':
      return FaFilePdf;
    case 'docx':
    case 'doc':
      return FaFileWord;
    case 'xlsx':
    case 'xls':
      return FaFileExcel;
    case 'pptx':
    case 'ppt':
      return FaFilePowerpoint;
    default:
      return FaFile;
  }
};
const FileTreeNode = ({
  node,
  level = 0
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const Icon = hasChildren ? isExpanded ? FaFolderOpen : FaFolder : getFileIcon(node.name);
  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else {
      // Handle file click (preview, download, etc.)
      console.log('File clicked:', node.name);
    }
  };
  return <motion.div initial={{
    opacity: 0,
    x: -20
  }} animate={{
    opacity: 1,
    x: 0
  }} transition={{
    delay: level * 0.1
  }}>
      <div className={`
          flex items-center 
          p-2 
          cursor-pointer 
          hover:bg-gray-700 
          rounded 
          transition-colors 
          duration-200
          ${hasChildren ? 'font-bold' : ''}
        `} style={{
      paddingLeft: `${level * 20}px`
    }} onClick={handleClick}>
        <Icon className="mr-2 text-blue-400" />
        <span>{node.name}</span>
      </div>

      {hasChildren && isExpanded && <div>
          {node.children.map((childNode, index) => <FileTreeNode key={index} node={childNode} level={level + 1} />)}
        </div>}
    </motion.div>;
};
const FileTreeViewer = ({
  courseId
}) => {
  // Dummy data - replace with actual course file structure
  const coursesFileTree = {
    'data-analysis': {
      name: 'تحليل البيانات',
      children: [{
        name: 'المقدمة',
        children: [{
          name: 'مقدمة في تحليل البيانات.pdf'
        }, {
          name: 'أساسيات الإحصاء.docx'
        }]
      }, {
        name: 'الدروس العملية',
        children: [{
          name: 'تحليل البيانات باستخدام Python.pdf'
        }, {
          name: 'مشروع تحليل بيانات.xlsx'
        }]
      }, {
        name: 'الموارد الإضافية',
        children: [{
          name: 'مراجع وكتب.pdf'
        }, {
          name: 'روابط مفيدة.docx'
        }]
      }]
    },
    'ai-tools': {
      name: 'أدوات الذكاء الاصطناعي',
      children: [{
        name: 'المقدمة',
        children: [{
          name: 'مقدمة في الذكاء الاصطناعي.pdf'
        }, {
          name: 'تاريخ الذكاء الاصطناعي.pptx'
        }]
      }, {
        name: 'التطبيقات',
        children: [{
          name: 'أدوات التعلم الآلي.pdf'
        }, {
          name: 'مشروع تطبيقي.docx'
        }]
      }]
    }
  };
  const courseTree = coursesFileTree[courseId] || {
    name: 'دورة غير موجودة',
    children: []
  };
  return <div className="bg-gray-800 rounded-lg p-4 text-white">
      <h3 className="text-2xl font-bold mb-4 text-center">
        شجرة الملفات - {courseTree.name}
      </h3>
      <div className="border-r-2 border-gray-700">
        <FileTreeNode node={courseTree} />
      </div>
    </div>;
};
export default FileTreeViewer;
export { FileTreeViewer };