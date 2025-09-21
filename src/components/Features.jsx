// Import React and the FeatureCard component for rendering individual features
import React from "react";
import FeatureCard from "./FeatureCard";

// Features component that displays a list of platform features
function Features() {
  // Define an array of feature objects with icon, title, and description
  const features = [{
    icon: "fas fa-graduation-cap",
    title: "نظام إدارة التعلم (LMS)",
    description: "تتبع تقدم الطلاب، إدارة الدورات، نظام اختبارات تفاعلي، تقارير تفصيلية، ونظام نقاط وإنجازات"
  }, {
    icon: "fas fa-robot",
    title: "الذكاء الاصطناعي",
    description: "تحليل مهارات الطلاب، توصيات مخصصة، توقع الأداء، مساعد تعلم ذكي، وتحليلات تعليمية متقدمة"
  }, {
    icon: "fas fa-users",
    title: "إدارة المستخدمين",
    description: "طلاب، مدربين، مشرفين، مديرين مع نظام صلاحيات متدرج وملفات شخصية تفاعلية"
  }, {
    icon: "fas fa-chart-bar",
    title: "التقارير والتحليلات",
    description: "تقارير أداء فردية، تحليلات الدورات، إحصائيات عامة، وتصدير متعدد الصيغ (PDF, Excel, CSV)"
  }, {
    icon: "fas fa-mobile-alt",
    title: "تطبيق ويب تقدمي (PWA)",
    description: "تصميم متجاوب يعمل على جميع الأجهزة مع دعم كامل للغة العربية والاتجاه RTL"
  }, {
    icon: "fas fa-certificate",
    title: "شهادات معتمدة",
    description: "شهادات رقمية معتمدة عند إكمال الدورات بنجاح مع نظام تحقق متقدم"
  }];

  // Render the features section with a grid layout
  return <section className="py-20 bg-gradient-to-b from-transparent to-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 heading-arabic">الأنظمة الرئيسية</h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed arabic-spacing">منصة متكاملة تجمع بين أحدث التقنيات وأفضل الممارسات التعليمية</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />)}
        </div>
      </div>
    </section>;
}

// Export the Features component for use in other files
export default Features;
export { Features };