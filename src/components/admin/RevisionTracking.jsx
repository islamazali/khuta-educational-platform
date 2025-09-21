import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaFileUpload, FaCheckCircle, FaTimesCircle, FaFilter, FaSearch } from 'react-icons/fa';
const RevisionTracking = () => {
  const [revisions, setRevisions] = useState([{
    id: 1,
    course: 'تحليل البيانات',
    user: 'محمد الشهري',
    file: 'مقدمة في تحليل البيانات.pdf',
    action: 'تعديل',
    status: 'قيد المراجعة',
    date: '2025-09-15 10:30',
    version: 2
  }, {
    id: 2,
    course: 'الذكاء الاصطناعي',
    user: 'سارة العتيبي',
    file: 'خوارزميات التعلم الآلي.pptx',
    action: 'رفع',
    status: 'مكتمل',
    date: '2025-09-10 14:45',
    version: 1
  }, {
    id: 3,
    course: 'مهارات التواصل',
    user: 'أحمد القحطاني',
    file: 'تقنيات التواصل الفعال.docx',
    action: 'رفض',
    status: 'مرفوض',
    date: '2025-09-05 09:15',
    version: 3
  }]);
  const [filters, setFilters] = useState({
    course: '',
    user: '',
    status: ''
  });
  const filteredRevisions = revisions.filter(revision => (!filters.course || revision.course.includes(filters.course)) && (!filters.user || revision.user.includes(filters.user)) && (!filters.status || revision.status === filters.status));
  const getStatusColor = status => {
    switch (status) {
      case 'قيد المراجعة':
        return 'text-yellow-500 bg-yellow-500/20';
      case 'مكتمل':
        return 'text-green-500 bg-green-500/20';
      case 'مرفوض':
        return 'text-red-500 bg-red-500/20';
      default:
        return 'text-gray-500 bg-gray-500/20';
    }
  };
  const getActionIcon = action => {
    switch (action) {
      case 'تعديل':
        return FaEdit;
      case 'رفع':
        return FaFileUpload;
      case 'رفض':
        return FaTimesCircle;
      default:
        return FaCheckCircle;
    }
  };
  return <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">تتبع التعديلات</h2>
        
        <motion.button whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} className="
            flex 
            items-center 
            space-x-2 
            rtl:space-x-reverse
            bg-blue-600 
            text-white 
            px-4 
            py-2 
            rounded-lg 
            hover:bg-blue-700
          ">
          <FaFilter />
          <span>فلترة</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <FaSearch className="absolute top-4 right-3 text-gray-400" />
          <input type="text" placeholder="البحث بالدورة" value={filters.course} onChange={e => setFilters(prev => ({
          ...prev,
          course: e.target.value
        }))} className="w-full bg-gray-700 text-white p-3 rounded-lg pr-10" />
        </div>
        <div className="relative">
          <FaSearch className="absolute top-4 right-3 text-gray-400" />
          <input type="text" placeholder="البحث بالمستخدم" value={filters.user} onChange={e => setFilters(prev => ({
          ...prev,
          user: e.target.value
        }))} className="w-full bg-gray-700 text-white p-3 rounded-lg pr-10" />
        </div>
        <div>
          <select value={filters.status} onChange={e => setFilters(prev => ({
          ...prev,
          status: e.target.value
        }))} className="w-full bg-gray-700 text-white p-3 rounded-lg">
            <option value="">كل الحالات</option>
            <option value="قيد المراجعة">قيد المراجعة</option>
            <option value="مكتمل">مكتمل</option>
            <option value="مرفوض">مرفوض</option>
          </select>
        </div>
      </div>

      {/* Revisions Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-3 text-right">الدورة</th>
              <th className="p-3 text-right">المستخدم</th>
              <th className="p-3 text-right">الملف</th>
              <th className="p-3 text-right">الإجراء</th>
              <th className="p-3 text-right">الحالة</th>
              <th className="p-3 text-right">التاريخ</th>
              <th className="p-3 text-right">الإصدار</th>
            </tr>
          </thead>
          <tbody>
            {filteredRevisions.map(revision => {
            const ActionIcon = getActionIcon(revision.action);
            const statusColor = getStatusColor(revision.status);
            return <motion.tr key={revision.id} initial={{
              opacity: 0
            }} animate={{
              opacity: 1
            }} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                  <td className="p-3 text-white">{revision.course}</td>
                  <td className="p-3 text-gray-300">{revision.user}</td>
                  <td className="p-3 text-gray-300">{revision.file}</td>
                  <td className="p-3">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <ActionIcon className={`text-blue-500`} />
                      <span>{revision.action}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`
                        px-2 
                        py-1 
                        rounded-full 
                        text-sm 
                        ${statusColor}
                      `}>
                      {revision.status}
                    </span>
                  </td>
                  <td className="p-3 text-gray-300">{revision.date}</td>
                  <td className="p-3 text-gray-300">الإصدار {revision.version}</td>
                </motion.tr>;
          })}
          </tbody>
        </table>
      </div>
    </div>;
};
export default RevisionTracking;
export { RevisionTracking };