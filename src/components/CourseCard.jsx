import React, { useState } from 'react';
import { FaBookOpen, FaSave } from 'react-icons/fa';
const CourseCard = ({
  title = 'دورة تطوير المهارات الرقمية',
  description = 'تعلم المهارات الأساسية للتحول الرقمي في عالم سريع التغير',
  imageUrl = 'https://via.placeholder.com/300x200',
  duration = '4 أسابيع',
  level = 'مبتدئ'
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return <div className={`
        relative w-full max-w-sm mx-auto bg-white rounded-xl shadow-lg 
        transform transition-all duration-300 ease-in-out
        ${isHovered ? 'scale-105 shadow-2xl' : 'scale-100 shadow-md'}
        overflow-hidden border border-gray-100
      `} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* صورة الدورة */}
      <div className="relative h-48 w-full overflow-hidden">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110" />
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
          <span className="text-sm">{level} | {duration}</span>
        </div>
      </div>

      {/* محتوى الكرت */}
      <div className="p-4 text-right space-y-3">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>

        {/* أزرار التفاعل */}
        <div className="flex justify-between items-center mt-4 space-x-2 rtl:space-x-reverse">
          <button aria-label="تسجيل في الدورة" className="
              flex items-center justify-center w-full px-4 py-2 
              bg-blue-600 text-white rounded-lg 
              hover:bg-blue-700 transition-colors
              text-sm font-medium
            ">
            <FaBookOpen className="ml-2" />
            تسجيل
          </button>
          
          <button aria-label="حفظ الدورة" className="
              flex items-center justify-center w-full px-4 py-2 
              bg-green-500 text-white rounded-lg 
              hover:bg-green-600 transition-colors
              text-sm font-medium
            ">
            <FaSave className="ml-2" />
            حفظ
          </button>
        </div>
      </div>
    </div>;
};
export default CourseCard;
export { CourseCard };