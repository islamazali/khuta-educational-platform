import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaFileUpload, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
const RevisionTimeline = () => {
  // Dummy revision data
  const [revisions, setRevisions] = useState([{
    id: 1,
    date: '15 سبتمبر 2025',
    time: '10:30 صباحًا',
    action: 'تحميل مشروع',
    status: 'نجاح',
    icon: FaFileUpload,
    color: 'text-green-500'
  }, {
    id: 2,
    date: '20 سبتمبر 2025',
    time: '2:45 مساءً',
    action: 'تعديل المشروع',
    status: 'قيد المراجعة',
    icon: FaEdit,
    color: 'text-yellow-500'
  }, {
    id: 3,
    date: '25 سبتمبر 2025',
    time: '11:15 صباحًا',
    action: 'مراجعة نهائية',
    status: 'مكتمل',
    icon: FaCheckCircle,
    color: 'text-blue-500'
  }, {
    id: 4,
    date: '30 سبتمبر 2025',
    time: '9:20 صباحًا',
    action: 'رفض التعديلات',
    status: 'فشل',
    icon: FaTimesCircle,
    color: 'text-red-500'
  }]);
  return <div className="bg-gray-800 rounded-lg p-6 text-white">
      <div className="flex items-center mb-6">
        <h3 className="text-2xl font-bold ml-4">سجل التعديلات</h3>
      </div>

      <div className="relative border-r-2 border-gray-700 pr-4">
        {revisions.map((revision, index) => <motion.div key={revision.id} initial={{
        opacity: 0,
        x: -50
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: index * 0.2,
        duration: 0.5,
        type: 'spring'
      }} className="mb-6 relative">
            {/* Timeline dot */}
            <div className={`
                absolute 
                -right-[27px] 
                top-2 
                w-4 
                h-4 
                rounded-full 
                ${revision.color}
                border-4 
                border-gray-800
              `} />

            {/* Revision details */}
            <div className="
                bg-gray-700 
                p-4 
                rounded-lg 
                shadow-lg 
                hover:bg-gray-600 
                transition-colors 
                duration-300
              ">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <revision.icon className={`${revision.color} text-xl`} />
                  <span className="font-bold">{revision.action}</span>
                </div>
                <span className="text-sm text-gray-400">{revision.time}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">{revision.date}</span>
                <span className={`
                    text-sm 
                    font-bold 
                    ${revision.status === 'نجاح' ? 'text-green-400' : revision.status === 'قيد المراجعة' ? 'text-yellow-400' : revision.status === 'مكتمل' ? 'text-blue-400' : 'text-red-400'}
                  `}>
                  {revision.status}
                </span>
              </div>
            </div>
          </motion.div>)}
      </div>
    </div>;
};
export default RevisionTimeline;
export { RevisionTimeline };