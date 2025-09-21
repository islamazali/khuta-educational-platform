import React from 'react';
import FlipCourseCard from '../components/FlipCourseCard';
const coursesData = [{
  title: 'دورة التسويق الرقمي المتقدم',
  description: 'استراتيجيات التسويق الرقمي الحديثة والفعالة',
  imageUrl: 'https://via.placeholder.com/300x200?text=Digital+Marketing',
  duration: '6 أسابيع',
  level: 'متقدم',
  instructor: 'أ. سارة محمد',
  price: '799 ر.س',
  learningOutcomes: ['إستراتيجيات التسويق عبر وسائل التواصل الاجتماعي', 'تحليل البيانات التسويقية', 'إدارة الحملات الإعلانية']
}, {
  title: 'دورة تطوير تطبيقات الويب',
  description: 'تعلم تطوير تطبيقات الويب باستخدام أحدث التقنيات',
  imageUrl: 'https://via.placeholder.com/300x200?text=Web+Development',
  duration: '8 أسابيع',
  level: 'متوسط',
  instructor: 'أ. أحمد علي',
  price: '1,199 ر.س',
  learningOutcomes: ['تطوير واجهات الويب باستخدام React', 'إنشاء APIs باستخدام Node.js', 'تطبيق أفضل ممارسات الأمن']
}, {
  title: 'دورة الذكاء الاصطناعي الأساسية',
  description: 'مقدمة شاملة في عالم الذكاء الاصطناعي',
  imageUrl: 'https://via.placeholder.com/300x200?text=AI+Basics',
  duration: '4 أسابيع',
  level: 'مبتدئ',
  instructor: 'د. ليلى إبراهيم',
  price: '599 ر.س',
  learningOutcomes: ['فهم أساسيات الذكاء الاصطناعي', 'التعرف على خوارزميات التعلم الآلي', 'تطبيقات الذكاء الاصطناعي العملية']
}];
const Courses = () => {
  return <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        الدورات المتاحة
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coursesData.map((course, index) => <FlipCourseCard key={index} {...course} />)}
      </div>
    </div>;
};
export default Courses;
export { Courses };