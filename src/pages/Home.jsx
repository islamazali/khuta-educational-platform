import React from 'react';
import { motion } from 'framer-motion';
import CourseCard from '../components/CourseCard';
import InternalReviewButtons from '../components/InternalReviewButtons';
import { Link } from 'react-router-dom';
const courses = [{
  id: 'ai-tools',
  title: 'أدوات الذكاء الاصطناعي',
  description: 'تعلم أحدث أدوات الذكاء الاصطناعي',
  route: '/courses/ai-tools'
}, {
  id: 'digital-marketing',
  title: 'التسويق الرقمي',
  description: 'استراتيجيات التسويق في العصر الرقمي',
  route: '/courses/digital-marketing'
}, {
  id: 'leadership',
  title: 'مهارات القيادة',
  description: 'تطوير مهارات القيادة والإدارة',
  route: '/courses/leadership'
}, {
  id: 'communication-skills',
  title: 'مهارات التواصل',
  description: 'تحسين مهارات التواصل الفعال',
  route: '/courses/communication-skills'
}];
const Home = () => {
  return <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* المراجعة الداخلية */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6,
          type: 'spring',
          stiffness: 100
        }} className="bg-gray-800 p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-center">المراجعة الداخلية</h2>
            <InternalReviewButtons />
          </motion.div>

          {/* الدورات */}
          <motion.div initial={{
          opacity: 0,
          x: 50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6,
          type: 'spring',
          stiffness: 100
        }} className="bg-gray-800 p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-center">الدورات المتاحة</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {courses.map(course => <CourseCard key={course.id} title={course.title} description={course.description} route={<Link to={course.route} className="btn-primary">اذهب للدورة</Link>} />)}
            </div>
          </motion.div>
        </div>
      </div>
    </div>;
};
export default Home;
export { Home };