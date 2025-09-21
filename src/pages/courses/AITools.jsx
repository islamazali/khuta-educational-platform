import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaShieldAlt, FaFileAlt, FaUpload, FaSpinner } from 'react-icons/fa';

// AI Tool Card Component
const AIToolCard = ({
  title,
  description,
  icon: Icon,
  color,
  onActivate
}) => {
  return <motion.div whileHover={{
    scale: 1.05
  }} className={`
        bg-gray-800 
        rounded-lg 
        p-6 
        shadow-lg 
        border-t-4 
        ${color}
        flex 
        flex-col 
        justify-between 
        h-full
      `}>
      <div>
        <div className="flex items-center mb-4 space-x-2 rtl:space-x-reverse">
          <Icon className={`text-3xl ${color.replace('border-t', 'text')}`} />
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-gray-300 mb-4">{description}</p>
      </div>
      
      <motion.button whileHover={{
      scale: 1.05
    }} whileTap={{
      scale: 0.95
    }} onClick={onActivate} className={`
          w-full 
          py-3 
          rounded-lg 
          text-white 
          font-bold 
          transition-colors 
          ${color.replace('border-t', 'bg')} 
          hover:opacity-90
        `}>
        تفعيل الأداة
      </motion.button>
    </motion.div>;
};

// AI Tool Modal Component
const AIToolModal = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  if (!isOpen) return null;
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <motion.div initial={{
      scale: 0.8
    }} animate={{
      scale: 1
    }} className="bg-gray-800 rounded-lg p-8 w-[600px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>;
};
const AIToolsDashboard = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const simulateProcessing = tool => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert(`تم معالجة الملف باستخدام أداة ${tool}`);
    }, 2000);
  };
  const handleFileUpload = e => {
    const file = e.target.files[0];
    setUploadedFile(file);
  };
  const aiTools = [{
    id: 'co-auditor',
    title: 'المراجع الآلي',
    description: 'أداة ذكية للمراجعة التلقائية للمستندات والتقارير',
    icon: FaRobot,
    color: 'border-t-blue-500',
    modalContent: <div>
          <div className="mb-6">
            <label className="
                flex 
                items-center 
                justify-center 
                w-full 
                p-6 
                border-2 
                border-dashed 
                border-gray-600 
                rounded-lg 
                cursor-pointer
                hover:border-blue-500
                transition-colors
              ">
              <input type="file" className="hidden" onChange={handleFileUpload} />
              {uploadedFile ? <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <FaFileAlt className="text-blue-500" />
                  <span className="text-white">{uploadedFile.name}</span>
                </div> : <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-400">
                  <FaUpload />
                  <span>رفع المستند للمراجعة</span>
                </div>}
            </label>
          </div>

          {isProcessing ? <div className="flex justify-center items-center space-x-2 rtl:space-x-reverse">
              <FaSpinner className="animate-spin text-blue-500" />
              <span className="text-white">جاري المراجعة...</span>
            </div> : <button disabled={!uploadedFile} onClick={() => simulateProcessing('المراجع الآلي')} className={`
                w-full 
                py-3 
                rounded-lg 
                text-white 
                font-bold 
                transition-colors 
                ${uploadedFile ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 cursor-not-allowed'}
              `}>
              بدء المراجعة
            </button>}
        </div>
  }, {
    id: 'risk-analyzer',
    title: 'محلل المخاطر',
    description: 'أداة ذكية لتقييم وتحليل المخاطر المحتملة',
    icon: FaShieldAlt,
    color: 'border-t-red-500',
    modalContent: <div>
          <div className="mb-6">
            <label className="
                flex 
                items-center 
                justify-center 
                w-full 
                p-6 
                border-2 
                border-dashed 
                border-gray-600 
                rounded-lg 
                cursor-pointer
                hover:border-red-500
                transition-colors
              ">
              <input type="file" className="hidden" onChange={handleFileUpload} />
              {uploadedFile ? <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <FaFileAlt className="text-red-500" />
                  <span className="text-white">{uploadedFile.name}</span>
                </div> : <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-400">
                  <FaUpload />
                  <span>رفع المستند لتحليل المخاطر</span>
                </div>}
            </label>
          </div>

          {isProcessing ? <div className="flex justify-center items-center space-x-2 rtl:space-x-reverse">
              <FaSpinner className="animate-spin text-red-500" />
              <span className="text-white">جاري التحليل...</span>
            </div> : <button disabled={!uploadedFile} onClick={() => simulateProcessing('محلل المخاطر')} className={`
                w-full 
                py-3 
                rounded-lg 
                text-white 
                font-bold 
                transition-colors 
                ${uploadedFile ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 cursor-not-allowed'}
              `}>
              بدء التحليل
            </button>}
        </div>
  }, {
    id: 'executive-summary',
    title: 'الملخص التنفيذي',
    description: 'أداة لإنشاء ملخصات تنفيذية سريعة وذكية',
    icon: FaFileAlt,
    color: 'border-t-green-500',
    modalContent: <div>
          <div className="mb-6">
            <label className="
                flex 
                items-center 
                justify-center 
                w-full 
                p-6 
                border-2 
                border-dashed 
                border-gray-600 
                rounded-lg 
                cursor-pointer
                hover:border-green-500
                transition-colors
              ">
              <input type="file" className="hidden" onChange={handleFileUpload} />
              {uploadedFile ? <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <FaFileAlt className="text-green-500" />
                  <span className="text-white">{uploadedFile.name}</span>
                </div> : <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-400">
                  <FaUpload />
                  <span>رفع المستند لإنشاء الملخص</span>
                </div>}
            </label>
          </div>

          {isProcessing ? <div className="flex justify-center items-center space-x-2 rtl:space-x-reverse">
              <FaSpinner className="animate-spin text-green-500" />
              <span className="text-white">جاري إنشاء الملخص...</span>
            </div> : <button disabled={!uploadedFile} onClick={() => simulateProcessing('الملخص التنفيذي')} className={`
                w-full 
                py-3 
                rounded-lg 
                text-white 
                font-bold 
                transition-colors 
                ${uploadedFile ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 cursor-not-allowed'}
              `}>
              إنشاء الملخص
            </button>}
        </div>
  }];
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
          <h1 className="text-4xl font-bold mb-4">أدوات الذكاء الاصطناعي</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            مجموعة من الأدوات الذكية لمساعدتك في المراجعة وتحليل المخاطر وإنشاء الملخصات
          </p>
        </motion.div>

        {/* AI Tools Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {aiTools.map(tool => <AIToolCard key={tool.id} {...tool} onActivate={() => setActiveModal(tool.id)} />)}
        </div>

        {/* AI Tool Modals */}
        {aiTools.map(tool => <AIToolModal key={tool.id} isOpen={activeModal === tool.id} onClose={() => {
        setActiveModal(null);
        setUploadedFile(null);
        setIsProcessing(false);
      }} title={tool.title}>
            {tool.modalContent}
          </AIToolModal>)}
      </div>
    </div>;
};
export default AIToolsDashboard;
export { AIToolsDashboard };