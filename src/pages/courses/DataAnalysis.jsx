import React from 'react';
import { motion } from 'framer-motion';
import FileTreeViewer from '../../components/FileTreeViewer';
import StorageTracker from '../../components/StorageTracker';
import RevisionTimeline from '../../components/RevisionTimeline';
import ZoomSessionButton from '../../components/ZoomSessionButton';
const DataAnalysisCourse = () => {
  const handleCreateCopy = () => {
    // Simulate creating a local copy in localStorage
    const courseData = {
      id: 'data-analysis',
      title: 'تحليل البيانات',
      description: 'دورة متكاملة في تحليل البيانات باستخدام أحدث التقنيات',
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('user_copy_data-analysis', JSON.stringify(courseData));

    // Show success message (you could use a toast library in a real app)
    alert('تم إنشاء نسختك الشخصية من الدورة بنجاح!');
  };
  return <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Course Header */}
        <motion.div initial={{
        opacity: 0,
        y: -50
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">دورة تحليل البيانات</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            دورة متكاملة لتعلم تحليل البيانات باستخدام أحدث التقنيات والأدوات
          </p>
        </motion.div>

        {/* Zoom Session and Copy Button */}
        <div className="flex justify-between items-center mb-8">
          <ZoomSessionButton />
          
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={handleCreateCopy} className="
              bg-blue-600 
              text-white 
              px-6 
              py-3 
              rounded-lg 
              hover:bg-blue-700 
              transition-colors
            ">
            احصل على نسختك الشخصية
          </motion.button>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* File Tree Viewer */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} className="md:col-span-2">
            <FileTreeViewer courseId="data-analysis" />
          </motion.div>

          {/* Sidebar with Storage and Revision Tracking */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} className="space-y-8">
            <StorageTracker />
            <RevisionTimeline />
          </motion.div>
        </div>

        {/* Course Description */}
        <motion.div initial={{
        opacity: 0,
        y: 50
      }} animate={{
        opacity: 1,
        y: 0
      }} className="mt-16 bg-gray-800 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">وصف الدورة</h2>
          <p className="text-gray-300 leading-relaxed">
            تهدف هذه الدورة إلى تقديم تدريب شامل في مجال تحليل البيانات، 
            حيث يتعلم المشاركون أحدث التقنيات والأدوات المستخدمة في تحليل 
            وتفسير البيانات باستخدام لغات البرمجة الحديثة مثل Python.
          </p>
        </motion.div>
      </div>
    </div>;
};
export default DataAnalysisCourse;
export { DataAnalysisCourse };