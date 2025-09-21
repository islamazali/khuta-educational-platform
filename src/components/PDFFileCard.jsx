import React, { useState } from 'react';
import { FaFilePdf, FaDownload, FaEye, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
const fileTypeIcons = {
  pdf: FaFilePdf,
  doc: FaFilePdf,
  // You can replace with specific icons
  docx: FaFilePdf,
  // You can replace with specific icons
  default: FaFilePdf
};
const PDFFileCard = ({
  fileName = 'مقدمة في الذكاء الاصطناعي.pdf',
  fileSize = '2.5 MB',
  uploadDate = '15 سبتمبر 2023',
  isProtected = false,
  fileUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  fileType = 'pdf'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Select the appropriate icon based on file type
  const FileIcon = fileTypeIcons[fileType] || fileTypeIcons.default;

  // Framer Motion animation variants
  const iconVariants = {
    initial: {
      rotate: 0,
      scale: 1,
      color: '#3B82F6' // Tailwind blue-500
    },
    hover: {
      rotate: [0, 15, -15, 0],
      scale: 1.1,
      color: '#2563EB',
      // Tailwind blue-600
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse'
      }
    }
  };
  const handlePreview = () => {
    // In a real app, this would open a PDF preview
    window.open(fileUrl, '_blank');
  };
  const handleDownload = () => {
    if (!isProtected) {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = fileName;
      link.click();
    } else {
      alert('هذا الملف محمي ولا يمكن تنزيله');
    }
  };
  return <div className={`
        relative w-full max-w-md mx-auto bg-white 
        rounded-xl shadow-lg overflow-hidden
        transition-all duration-300
        ${isHovered ? 'scale-105 shadow-2xl' : 'scale-100 shadow-md'}
        border border-gray-100
      `} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="flex items-center p-4 space-x-4 rtl:space-x-reverse">
        {/* أيقونة الملف المتحركة */}
        <motion.div variants={iconVariants} initial="initial" animate={isHovered ? "hover" : "initial"} className="relative">
          <FileIcon className={`
              w-12 h-12 
              ${isProtected ? 'text-red-500' : 'text-blue-500'}
            `} />
          
          {/* شارة الحماية */}
          {isProtected && <FaLock className="
                absolute -top-1 -right-1 
                text-white bg-red-500 
                rounded-full p-1 text-xs
              " />}
        </motion.div>

        {/* معلومات الملف */}
        <div className="flex-grow text-right">
          <h3 className={`
              text-lg font-bold 
              ${isProtected ? 'text-red-600' : 'text-gray-800'}
              truncate max-w-[200px]
            `}>
            {fileName}
          </h3>
          <div className="text-sm text-gray-500 space-y-1">
            <p>حجم الملف: {fileSize}</p>
            <p>تاريخ الرفع: {uploadDate}</p>
          </div>
        </div>

        {/* أزرار التفاعل */}
        <div className="flex flex-col space-y-2">
          <button onClick={handlePreview} className={`
              p-2 rounded-full 
              transition-all duration-300
              ${isHovered ? 'bg-blue-50 text-blue-600' : 'bg-transparent text-gray-500'}
              hover:bg-blue-100 hover:text-blue-700
            `} aria-label="معاينة الملف">
            <FaEye />
          </button>
          
          <button onClick={handleDownload} className={`
              p-2 rounded-full 
              transition-all duration-300
              ${isHovered ? 'bg-green-50 text-green-600' : 'bg-transparent text-gray-500'}
              hover:bg-green-100 hover:text-green-700
              ${isProtected ? 'cursor-not-allowed opacity-50' : ''}
            `} disabled={isProtected} aria-label="تنزيل الملف">
            <FaDownload />
          </button>
        </div>
      </div>

      {/* شريط التقدم للتنزيل (مثال) */}
      {isHovered && <div className="
            absolute bottom-0 left-0 right-0 
            h-1 bg-blue-200
          ">
          <motion.div initial={{
        width: 0
      }} animate={{
        width: '100%'
      }} transition={{
        duration: 2,
        ease: 'linear'
      }} className="h-full bg-blue-500" />
        </div>}
    </div>;
};
export default PDFFileCard;
export { PDFFileCard };