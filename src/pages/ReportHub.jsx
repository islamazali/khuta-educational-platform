import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaCommentDots, FaUser, FaClock, FaEye, FaPlus } from 'react-icons/fa';
const ReportHub = () => {
  const [reports, setReports] = useState([{
    id: 1,
    title: 'تقرير تحليل البيانات الربع السنوي',
    author: 'محمد الشهري',
    date: '15 سبتمبر 2025',
    views: 42,
    comments: [{
      id: 1,
      author: 'سارة العتيبي',
      text: 'تقرير شامل ومفصل. أقترح إضافة المزيد من التحليلات المستقبلية.',
      date: '16 سبتمبر 2025'
    }],
    content: 'محتوى التقرير التفصيلي...'
  }, {
    id: 2,
    title: 'مراجعة استراتيجية التسويق الرقمي',
    author: 'أحمد القحطاني',
    date: '10 سبتمبر 2025',
    views: 28,
    comments: [],
    content: 'محتوى التقرير التفصيلي...'
  }]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [newComment, setNewComment] = useState('');
  const handleReportSelect = report => {
    setSelectedReport(report);
  };
  const addComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      id: Date.now(),
      author: 'المستخدم الحالي',
      text: newComment,
      date: new Date().toLocaleDateString('ar-SA')
    };
    setReports(prev => prev.map(report => report.id === selectedReport.id ? {
      ...report,
      comments: [...report.comments, comment],
      views: report.views + 1
    } : report));
    setNewComment('');
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
          <h1 className="text-4xl font-bold mb-4">مركز التقارير</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            استعراض وتحليل وتعليق على التقارير بشكل تفاعلي
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Reports List */}
          <div className="md:col-span-1 space-y-4">
            {reports.map(report => <motion.div key={report.id} whileHover={{
            scale: 1.02
          }} onClick={() => handleReportSelect(report)} className={`
                  bg-gray-800 
                  rounded-lg 
                  p-4 
                  cursor-pointer 
                  transition-colors
                  ${selectedReport?.id === report.id ? 'border-2 border-blue-500' : 'hover:bg-gray-700'}
                `}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <FaFileAlt className="text-blue-500" />
                    <h3 className="font-bold">{report.title}</h3>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-400">
                    <FaEye />
                    <span>{report.views}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <FaUser className="text-gray-400" />
                    <span>{report.author}</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <FaClock className="text-gray-400" />
                    <span>{report.date}</span>
                  </div>
                </div>
              </motion.div>)}

            {/* Add New Report Button */}
            <motion.button whileHover={{
            scale: 1.05
          }} className="
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
              <FaPlus />
              <span>إنشاء تقرير جديد</span>
            </motion.button>
          </div>

          {/* Report Details and Comments */}
          <div className="md:col-span-2 bg-gray-800 rounded-lg p-6">
            {selectedReport ? <>
                {/* Report Header */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">{selectedReport.title}</h2>
                  <div className="flex items-center space-x-4 rtl:space-x-reverse text-gray-400">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <FaUser />
                      <span>{selectedReport.author}</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <FaClock />
                      <span>{selectedReport.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <FaEye />
                      <span>{selectedReport.views} مشاهدة</span>
                    </div>
                  </div>
                </div>

                {/* Report Content */}
                <div className="bg-gray-700 p-4 rounded-lg mb-6">
                  <p className="text-gray-300">{selectedReport.content}</p>
                </div>

                {/* Comments Section */}
                <div>
                  <h3 className="text-xl font-bold mb-4 flex items-center space-x-2 rtl:space-x-reverse">
                    <FaCommentDots className="text-blue-500" />
                    <span>التعليقات ({selectedReport.comments.length})</span>
                  </h3>

                  {/* Comments List */}
                  <div className="space-y-4 mb-6">
                    {selectedReport.comments.map(comment => <motion.div key={comment.id} initial={{
                  opacity: 0
                }} animate={{
                  opacity: 1
                }} className="bg-gray-700 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <FaUser className="text-blue-500" />
                            <span className="font-bold">{comment.author}</span>
                          </div>
                          <span className="text-sm text-gray-400">{comment.date}</span>
                        </div>
                        <p className="text-gray-300">{comment.text}</p>
                      </motion.div>)}
                  </div>

                  {/* Add Comment */}
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <textarea value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="أضف تعليقك هنا..." className="
                        flex-grow 
                        bg-gray-700 
                        text-white 
                        p-3 
                        rounded-lg 
                        border-2 
                        border-transparent 
                        focus:border-blue-500
                        transition-colors
                      " rows="3" />
                    <motion.button whileHover={{
                  scale: 1.05
                }} onClick={addComment} disabled={!newComment.trim()} className={`
                        bg-blue-600 
                        text-white 
                        p-3 
                        rounded-lg 
                        flex 
                        items-center 
                        justify-center
                        ${newComment.trim() ? 'hover:bg-blue-700' : 'opacity-50 cursor-not-allowed'}
                      `}>
                      <FaPlus />
                    </motion.button>
                  </div>
                </div>
              </> : <div className="flex items-center justify-center h-full text-gray-400">
                اختر تقريرًا للعرض
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
export default ReportHub;
export { ReportHub };