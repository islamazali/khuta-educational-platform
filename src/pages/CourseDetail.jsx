import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaClock, FaChalkboardTeacher, FaCertificate, FaDownload, FaVideo } from 'react-icons/fa';
import PulseButton from '../components/ui/PulseButton';

// Animation variants for staggered content
const containerVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};
const itemVariants = {
  hidden: {
    y: 50,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};
const CourseDetail = () => {
  // Course details
  const course = {
    title: 'دورة التسويق الرقمي المتكامل',
    instructor: 'أ. محمد العلي',
    duration: '8 أسابيع',
    level: 'متقدم',
    price: '1,299 ر.س',
    description: 'دورة شاملة تغطي استراتيجيات التسويق الرقمي الحديثة، من التخطيط إلى التنفيذ والتحليل.',
    learningOutcomes: ['إستراتيجيات التسويق عبر وسائل التواصل الاجتماعي', 'تحليل البيانات التسويقية باستخدام أدوات متقدمة', 'إدارة الحملات الإعلانية الفعالة', 'تطوير المحتوى التسويقي الجذاب'],
    curriculum: [{
      week: 'الأسبوع الأول',
      title: 'مقدمة في التسويق الرقمي',
      topics: ['أساسيات التسويق الرقمي', 'فهم السوق الرقمي']
    }, {
      week: 'الأسبوع الثاني',
      title: 'استراتيجيات وسائل التواصل الاجتماعي',
      topics: ['منصات التواصل الاجتماعي', 'إنشاء المحتوى الفعال']
    }, {
      week: 'الأسبوع الثالث',
      title: 'التحليل والأدوات',
      topics: ['تحليل البيانات', 'أدوات التسويق الرقمي']
    }],
    resources: [{
      icon: FaBook,
      title: 'كتب مرجعية',
      count: 5
    }, {
      icon: FaVideo,
      title: 'فيديوهات تعليمية',
      count: 25
    }, {
      icon: FaDownload,
      title: 'ملفات للتنزيل',
      count: 15
    }]
  };

  // Add state for registration loading
  const [isRegistering, setIsRegistering] = useState(false);

  // Registration handler
  const handleRegistration = () => {
    setIsRegistering(true);
    // Simulate registration process
    setTimeout(() => {
      setIsRegistering(false);
      // You could add additional logic here like showing a success message
      alert('تم التسجيل بنجاح!');
    }, 2000);
  };
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.5
  }} className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* عنوان الدورة */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center mb-12">
          <motion.h1 variants={itemVariants} className="text-4xl font-bold text-gray-800 mb-4">
            {course.title}
          </motion.h1>
          <motion.p variants={itemVariants} className="text-gray-600 max-w-2xl mx-auto">
            {course.description}
          </motion.p>
        </motion.div>

        {/* معلومات الدورة الأساسية */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid md:grid-cols-4 gap-6 mb-12">
          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 text-center">
            <FaChalkboardTeacher className="mx-auto text-4xl text-blue-500 mb-4" />
            <h3 className="font-bold text-gray-800">{course.instructor}</h3>
            <p className="text-gray-500">المدرب</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 text-center">
            <FaClock className="mx-auto text-4xl text-green-500 mb-4" />
            <h3 className="font-bold text-gray-800">{course.duration}</h3>
            <p className="text-gray-500">مدة الدورة</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 text-center">
            <FaCertificate className="mx-auto text-4xl text-yellow-500 mb-4" />
            <h3 className="font-bold text-gray-800">{course.level}</h3>
            <p className="text-gray-500">مستوى الدورة</p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 text-center">
            <FaBook className="mx-auto text-4xl text-purple-500 mb-4" />
            <h3 className="font-bold text-gray-800">{course.price}</h3>
            <p className="text-gray-500">السعر</p>
          </motion.div>
        </motion.div>

        {/* نتائج التعلم */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-12">
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-800 mb-6 text-center">
            ماذا ستتعلم في هذه الدورة
          </motion.h2>
          
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-4">
            {course.learningOutcomes.map((outcome, index) => <motion.div key={index} variants={itemVariants} className="bg-white rounded-lg p-4 shadow-md flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full ml-3"></span>
                <span className="text-gray-700">{outcome}</span>
              </motion.div>)}
          </motion.div>
        </motion.div>

        {/* المناهج الدراسية */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-12">
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-800 mb-6 text-center">
            محتوى الدورة
          </motion.h2>
          
          <motion.div variants={itemVariants} className="space-y-4">
            {course.curriculum.map((week, index) => <motion.div key={index} variants={itemVariants} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold text-blue-600 mb-3">
                  {week.week}
                </h3>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {week.title}
                </h4>
                <ul className="list-disc list-inside text-gray-600">
                  {week.topics.map((topic, topicIndex) => <li key={topicIndex}>{topic}</li>)}
                </ul>
              </motion.div>)}
          </motion.div>
        </motion.div>

        {/* الموارد */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mb-12">
          <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-800 mb-6 text-center">
            موارد الدورة
          </motion.h2>
          
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6">
            {course.resources.map((resource, index) => {
            const Icon = resource.icon;
            return <motion.div key={index} variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 text-center">
                  <Icon className="mx-auto text-4xl text-blue-500 mb-4" />
                  <h3 className="font-bold text-gray-800">{resource.count}</h3>
                  <p className="text-gray-500">{resource.title}</p>
                </motion.div>;
          })}
          </motion.div>
        </motion.div>

        {/* زر التسجيل */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center">
          <PulseButton variant="primary" size="lg" icon="signIn" loading={isRegistering} onClick={handleRegistration} className="mx-auto">
            سجل الآن
          </PulseButton>
        </motion.div>
      </div>
    </motion.div>;
};
export default CourseDetail;
export { CourseDetail };