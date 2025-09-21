import React, { useState } from 'react';
import { FaBookOpen, FaClock, FaChalkboardTeacher, FaCertificate, FaTag } from 'react-icons/fa';
const FlipCourseCard = ({
  title = 'دورة تطوير المهارات الرقمية',
  description = 'تعلم المهارات الأساسية للتحول الرقمي في عالم سريع التغير',
  imageUrl = 'https://via.placeholder.com/300x200',
  duration = '4 أسابيع',
  level = 'مبتدئ',
  instructor = 'أ. محمد العلي',
  price = '499 ر.س',
  learningOutcomes = ['فهم أساسيات التحول الرقمي', 'تطوير مهارات التسويق الرقمي', 'إدارة المشاريع التقنية']
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return <div className="perspective-1000 w-full max-w-sm mx-auto" onMouseEnter={() => setIsFlipped(true)} onMouseLeave={() => setIsFlipped(false)}>
      <div className={`
          relative w-full h-[400px] transition-transform duration-700 transform-style-3d
          ${isFlipped ? 'rotate-y-180' : ''}
        `}>
        {/* الوجه الأمامي */}
        <div className={`
            absolute w-full h-full backface-hidden rounded-xl shadow-lg overflow-hidden
            ${isFlipped ? 'rotate-y-180 opacity-0' : 'rotate-y-0 opacity-100'}
            transition-all duration-700
          `}>
          <div className="relative h-2/3 w-full overflow-hidden">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
              <span className="text-sm">{level} | {duration}</span>
            </div>
          </div>

          <div className="p-4 text-right space-y-3">
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          </div>
        </div>

        {/* الوجه الخلفي */}
        <div className={`
            absolute w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 
            text-white p-6 backface-hidden rotate-y-180
            ${isFlipped ? 'rotate-y-0 opacity-100' : 'rotate-y-180 opacity-0'}
            transition-all duration-700 flex flex-col justify-between
          `}>
          <div>
            <h4 className="text-xl font-bold mb-4 text-center">تفاصيل الدورة</h4>
            
            <div className="space-y-3">
              <div className="flex items-center">
                <FaChalkboardTeacher className="ml-2 text-xl" />
                <span>{instructor}</span>
              </div>
              
              <div className="flex items-center">
                <FaClock className="ml-2 text-xl" />
                <span>{duration}</span>
              </div>
              
              <div className="flex items-center">
                <FaTag className="ml-2 text-xl" />
                <span>{price}</span>
              </div>
            </div>

            <div className="mt-4">
              <h5 className="font-semibold mb-2">نتائج التعلم:</h5>
              <ul className="list-disc list-inside text-sm space-y-1">
                {learningOutcomes.map((outcome, index) => <li key={index}>{outcome}</li>)}
              </ul>
            </div>
          </div>

          <div className="flex space-x-2 rtl:space-x-reverse mt-4">
            <button aria-label="تسجيل في الدورة" className="
                flex-1 flex items-center justify-center px-4 py-2 
                bg-white text-blue-600 rounded-lg 
                hover:bg-gray-100 transition-colors
                text-sm font-medium
              ">
              <FaBookOpen className="ml-2" />
              تسجيل
            </button>
            
            <button aria-label="شهادة الدورة" className="
                flex-1 flex items-center justify-center px-4 py-2 
                bg-green-500 text-white rounded-lg 
                hover:bg-green-600 transition-colors
                text-sm font-medium
              ">
              <FaCertificate className="ml-2" />
              الشهادة
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default FlipCourseCard;
export { FlipCourseCard };