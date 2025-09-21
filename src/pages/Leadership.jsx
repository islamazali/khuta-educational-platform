import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { FeatureCard } from '../components/ui/Card';

// Leadership Skill Component
const LeadershipSkill = ({
  icon,
  title,
  description
}) => <div className="flex items-center space-x-4 rtl:space-x-reverse bg-background-light p-6 rounded-xl mb-4">
    <div className="text-4xl text-primary ml-4 rtl:ml-0 rtl:mr-4">{icon}</div>
    <div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>;
const Leadership = () => {
  // Leadership Skills Data
  const leadershipSkills = [{
    icon: "👥",
    title: "إدارة الفريق",
    description: "تعلم كيفية بناء وقيادة فرق عمل فعالة وملهمة",
    details: ["تحفيز وإلهام أعضاء الفريق", "تحديد الأدوار والمسؤوليات بوضوح", "بناء روح الفريق والتعاون"]
  }, {
    icon: "📋",
    title: "التخطيط الاستراتيجي",
    description: "امتلك مهارات التخطيط طويل المدى وتحديد الأهداف",
    details: ["وضع رؤية واضحة للمستقبل", "تحليل البيئة الداخلية والخارجية", "وضع خطط عملية قابلة للتنفيذ"]
  }, {
    icon: "🎯",
    title: "اتخاذ القرارات",
    description: "طور قدراتك في اتخاذ قرارات حاسمة وفعالة",
    details: ["تحليل المعلومات بموضوعية", "التعامل مع المواقف المعقدة", "اتخاذ قرارات سريعة ودقيقة"]
  }];

  // Leadership Images
  const leadershipImages = ["https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80", "https://images.unsplash.com/photo-1517245386807-bb43f5f29295?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80", "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80"];
  return <div className="space-y-16 bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background-light to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            برنامج تطوير <span className="text-primary">المهارات القيادية</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            برنامج متكامل لتنمية المهارات القيادية وبناء القدرات الإدارية للمهنيين الطموحين
          </p>
          <Button variant="primary" size="lg" to="/courses/leadership">
            سجل الآن
          </Button>
        </div>
      </section>

      {/* Leadership Skills Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Skills List */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-8">
              المهارات التي ستتطورها
            </h2>
            {leadershipSkills.map((skill, index) => <FeatureCard key={index} icon={skill.icon} title={skill.title} description={skill.description} />)}
          </div>

          {/* Images Showcase */}
          <div className="grid grid-cols-2 gap-6">
            {leadershipImages.map((image, index) => <div key={index} className="rounded-xl overflow-hidden group">
                <img src={image} alt={`Leadership Image ${index + 1}`} className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>)}
          </div>
        </div>
      </section>

      {/* Detailed Skills Breakdown */}
      <section className="bg-background-light py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              تفاصيل المهارات القيادية
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              استكشف بالتفصيل المهارات التي ستتعلمها في برنامجنا
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {leadershipSkills.map((skill, index) => <div key={index} className="bg-background p-6 rounded-xl">
                <div className="text-5xl text-primary mb-4">{skill.icon}</div>
                <h3 className="text-xl font-bold text-white mb-4">{skill.title}</h3>
                <ul className="space-y-2 text-gray-400">
                  {skill.details.map((detail, detailIndex) => <li key={detailIndex} className="flex items-center space-x-2 rtl:space-x-reverse">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{detail}</span>
                    </li>)}
                </ul>
              </div>)}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-background-light rounded-xl p-12 text-center">
          <blockquote className="text-xl text-white mb-6 max-w-2xl mx-auto italic">
            "غيّر برنامج القيادة في خطوات نظرتي للقيادة بشكل جذري، وساعدني على 
            تطوير مهاراتي بطريقة عملية وملموسة"
          </blockquote>
          <div className="flex justify-center items-center space-x-4 rtl:space-x-reverse">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="محمد الشهري" className="w-16 h-16 rounded-full" />
            <div>
              <h4 className="text-white font-bold">محمد الشهري</h4>
              <p className="text-gray-400">مدير تنفيذي</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            احترف فن القيادة
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            كن القائد الذي يصنع الفرق ويحدث التغيير
          </p>
          <Button variant="white" size="lg" to="/courses/leadership">
            ابدأ رحلتك القيادية
          </Button>
        </div>
      </section>
    </div>;
};
export default Leadership;
export { Leadership };