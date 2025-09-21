import React from 'react';
import CourseVideoCard from '../components/CourseVideoCard';
const courseVideosData = [{
  title: 'مقدمة في الذكاء الاصطناعي',
  description: 'فيديو تعريفي عن أساسيات الذكاء الاصطناعي وتطبيقاته',
  videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  thumbnailUrl: 'https://via.placeholder.com/600x400?text=AI+Introduction',
  duration: '07:45'
}, {
  title: 'أساسيات التسويق الرقمي',
  description: 'دليل شامل للتسويق عبر وسائل التواصل الاجتماعي',
  videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  thumbnailUrl: 'https://via.placeholder.com/600x400?text=Digital+Marketing',
  duration: '09:30'
}, {
  title: 'تطوير مهارات البرمجة',
  description: 'مقدمة في لغة البرمجة Python للمبتدئين',
  videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
  thumbnailUrl: 'https://via.placeholder.com/600x400?text=Python+Programming',
  duration: '06:15'
}];
const CourseVideos = () => {
  return <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
        معاينات الدورات التدريبية
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courseVideosData.map((video, index) => <CourseVideoCard key={index} {...video} />)}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">
          شاهد المزيد من الفيديوهات التعريفية للدورات
        </p>
        <button className="
            bg-blue-600 text-white px-6 py-3 rounded-lg 
            hover:bg-blue-700 transition-colors
          ">
          استكشف الدورات
        </button>
      </div>
    </div>;
};
export default CourseVideos;
export { CourseVideos };