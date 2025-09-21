import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaFileWord, FaFileExcel, FaFilePdf, FaFileUpload, FaSpinner, FaEye, FaShareAlt, FaDownload, FaMicrophone, FaCommentDots } from 'react-icons/fa';

// File Type Icons Mapping
const FILE_ICONS = {
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': FaFileWord,
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': FaFileExcel,
  'application/pdf': FaFilePdf
};
const FileManager = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [processingFiles, setProcessingFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const handleFileUpload = event => {
    const files = Array.from(event.target.files);
    const processedFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024).toFixed(2)} KB`,
      icon: FILE_ICONS[file.type] || FaFileUpload,
      status: 'processing',
      conversionOptions: {
        interactive: false,
        comments: false,
        voiceNote: null
      }
    }));
    setUploadedFiles(prev => [...prev, ...processedFiles]);

    // Simulate file processing
    processedFiles.forEach(file => {
      setTimeout(() => {
        setUploadedFiles(prev => prev.map(f => f.id === file.id ? {
          ...f,
          status: 'completed'
        } : f));
      }, 2000);
    });
  };
  const toggleInteractiveConversion = fileId => {
    setUploadedFiles(prev => prev.map(file => file.id === fileId ? {
      ...file,
      conversionOptions: {
        ...file.conversionOptions,
        interactive: !file.conversionOptions.interactive
      }
    } : file));
  };
  const toggleComments = fileId => {
    setUploadedFiles(prev => prev.map(file => file.id === fileId ? {
      ...file,
      conversionOptions: {
        ...file.conversionOptions,
        comments: !file.conversionOptions.comments
      }
    } : file));
  };
  const handleVoiceNote = fileId => {
    // Simulated voice note recording
    setIsRecording(true);
    setTimeout(() => {
      setUploadedFiles(prev => prev.map(file => file.id === fileId ? {
        ...file,
        conversionOptions: {
          ...file.conversionOptions,
          voiceNote: 'ملاحظة صوتية.mp3'
        }
      } : file));
      setIsRecording(false);
    }, 2000);
  };
  return <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <motion.div initial={{
        opacity: 0,
        y: -50
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">إدارة الملفات</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            رفع وتحويل وإدارة الملفات بذكاء
          </p>
        </motion.div>

        {/* File Upload Section */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} multiple accept=".docx,.xlsx,.pdf" className="hidden" />
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => fileInputRef.current.click()} className="
              w-full 
              flex 
              items-center 
              justify-center 
              space-x-2 
              rtl:space-x-reverse
              bg-blue-600 
              text-white 
              p-4 
              rounded-lg 
              hover:bg-blue-700
            ">
            <FaFileUpload />
            <span>رفع الملفات (Word, Excel, PDF)</span>
          </motion.button>
        </div>

        {/* Uploaded Files Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {uploadedFiles.map(file => {
          const FileIcon = file.icon;
          return <motion.div key={file.id} initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} className="bg-gray-800 rounded-lg p-6 relative">
                {/* File Processing Overlay */}
                {file.status === 'processing' && <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                    <FaSpinner className="animate-spin text-white text-3xl" />
                  </div>}

                {/* File Details */}
                <div className="flex items-center mb-4">
                  <FileIcon className="text-4xl text-blue-500 ml-4" />
                  <div>
                    <h3 className="text-lg font-bold">{file.name}</h3>
                    <p className="text-sm text-gray-400">{file.size}</p>
                  </div>
                </div>

                {/* Conversion Options */}
                <div className="space-y-2">
                  <motion.button whileHover={{
                scale: 1.05
              }} onClick={() => toggleInteractiveConversion(file.id)} className={`
                      w-full 
                      flex 
                      items-center 
                      justify-center 
                      space-x-2 
                      rtl:space-x-reverse
                      p-2 
                      rounded-lg 
                      transition-colors
                      ${file.conversionOptions.interactive ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}
                    `}>
                    <FaEye />
                    <span>نسخة تفاعلية</span>
                  </motion.button>

                  <motion.button whileHover={{
                scale: 1.05
              }} onClick={() => toggleComments(file.id)} className={`
                      w-full 
                      flex 
                      items-center 
                      justify-center 
                      space-x-2 
                      rtl:space-x-reverse
                      p-2 
                      rounded-lg 
                      transition-colors
                      ${file.conversionOptions.comments ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}
                    `}>
                    <FaCommentDots />
                    <span>إضافة تعليقات</span>
                  </motion.button>

                  <motion.button whileHover={{
                scale: 1.05
              }} onClick={() => handleVoiceNote(file.id)} disabled={isRecording} className={`
                      w-full 
                      flex 
                      items-center 
                      justify-center 
                      space-x-2 
                      rtl:space-x-reverse
                      p-2 
                      rounded-lg 
                      transition-colors
                      ${file.conversionOptions.voiceNote ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300'}
                      ${isRecording ? 'cursor-not-allowed opacity-50' : ''}
                    `}>
                    <FaMicrophone />
                    <span>
                      {isRecording ? 'جارٍ التسجيل...' : file.conversionOptions.voiceNote ? 'تم التسجيل' : 'تسجيل ملاحظة صوتية'}
                    </span>
                  </motion.button>

                  {/* Sharing Options */}
                  <div className="flex space-x-2 rtl:space-x-reverse mt-2">
                    <motion.button whileHover={{
                  scale: 1.05
                }} className="
                        flex-1 
                        bg-gray-700 
                        text-white 
                        p-2 
                        rounded-lg 
                        flex 
                        items-center 
                        justify-center 
                        space-x-2 
                        rtl:space-x-reverse
                      ">
                      <FaShareAlt />
                      <span>مشاركة</span>
                    </motion.button>

                    <motion.button whileHover={{
                  scale: 1.05
                }} className="
                        flex-1 
                        bg-gray-700 
                        text-white 
                        p-2 
                        rounded-lg 
                        flex 
                        items-center 
                        justify-center 
                        space-x-2 
                        rtl:space-x-reverse
                      ">
                      <FaDownload />
                      <span>تحميل</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>;
        })}
        </div>
      </div>
    </div>;
};
export default FileManager;
export { FileManager };