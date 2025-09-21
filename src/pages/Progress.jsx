import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Progress Card Component
const ProgressCard = ({
  title,
  description,
  progress,
  image,
  lastStudied
}) => {
  return <div className="bg-background-light rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 group">
      {/* Course Image */}
      <div className="relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
          {`${progress}%`}
        </div>
      </div>

      {/* Course Progress Details */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-400 line-clamp-2">{description}</p>

        {/* Progress Bar */}
        <div className="w-full bg-background rounded-full h-2.5 mb-4">
          <div className="bg-primary h-2.5 rounded-full" style={{
          width: `${progress}%`
        }}></div>
        </div>

        {/* Progress Meta */}
        <div className="flex justify-between items-center text-gray-500 text-sm">
          <span>آخر مرة تمت الدراسة: {lastStudied}</span>
          <Link to={`/courses/${title.toLowerCase().replace(/\s+/g, '-')}`} className="text-primary hover:underline">
            متابعة الدورة
          </Link>
        </div>
      </div>
    </div>;
};
const Progress = () => {
  // Dummy progress data
  const [courses] = useState([{
    id: 1,
    title: "التحليل الذكي للبيانات",
    description: "تعلم أساسيات تحليل البيانات باستخدام أحدث الأدوات والتقنيات",
    progress: 65,
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    lastStudied: "منذ 3 أيام"
  }, {
    id: 2,
    title: "مهارات التواصل المتقدمة",
    description: "طور مهاراتك في التواصل الفعال والتفاوض المحترف",
    progress: 45,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
    lastStudied: "منذ يوم"
  }, {
    id: 3,
    title: "الذكاء الاصطناعي للمبتدئين",
    description: "مقدمة شاملة في عالم الذكاء الاصطناعي وتطبيقاته",
    progress: 30,
    image: "https://images.unsplash.com/photo-1679412330254-90cb3bccb823?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    lastStudied: "منذ أسبوع"
  }]);

  // Storage Usage Calculation
  const storageUsed = 1.2; // GB
  const storageTotal = 5; // GB

  return <div className="space-y-16 bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background-light to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            تقدمك التعليمي
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            تابع رحلة تعلمك وتطورك المهني مع خطوات
          </p>
        </div>
      </section>

      {/* Storage Usage Section */}
      <section className="container mx-auto px-4">
        <div className="bg-background-light rounded-xl p-6 mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">مساحة التخزين</h2>
            <span className="text-primary">{`${storageUsed}GB / ${storageTotal}GB`}</span>
          </div>
          <div className="w-full bg-background rounded-full h-2.5">
            <div className="bg-primary h-2.5 rounded-full" style={{
            width: `${storageUsed / storageTotal * 100}%`
          }}></div>
          </div>
        </div>
      </section>

      {/* Courses Progress Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">
            دوراتك الجارية
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            استمر في التعلم والتطور
          </p>
        </div>

        {courses.length > 0 ? <div className="grid md:grid-cols-3 gap-8">
            {courses.map(course => <ProgressCard key={course.id} {...course} />)}
          </div> : <div className="text-center py-16">
            <p className="text-2xl text-gray-400">
              لم تبدأ أي دورات حتى الآن
            </p>
            <Link to="/courses" className="btn-primary inline-block mt-6 px-6 py-3 rounded-full">
              استكشف الدورات
            </Link>
          </div>}
      </section>

      {/* Certificates Section */}
      <section className="bg-background-light py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">
              شهاداتك
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              الشهادات التي حصلت عليها
            </p>
          </div>

          {/* Certificates Grid or Empty State */}
          <div className="text-center py-16">
            <p className="text-2xl text-gray-400 mb-6">
              لم تحصل على شهادات بعد
            </p>
            <p className="text-gray-500 mb-8">
              أكمل دوراتك للحصول على الشهادات
            </p>
            <Link to="/courses" className="btn-primary px-6 py-3 rounded-full">
              ابدأ التعلم
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            استمر في التعلم
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            كل يوم هو فرصة للتعلم والتطور
          </p>
          <Link to="/courses" className="btn-white px-8 py-3 text-lg rounded-full">
            اكتشف دورات جديدة
          </Link>
        </div>
      </section>
    </div>;
};
export default Progress;
export { Progress };