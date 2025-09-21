import React from 'react';
import { Link } from 'react-router-dom';
import { FeatureCard } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
const About = () => {
  return <div className="space-y-16 bg-background min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-background-light to-background py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              عن منصة <span className="text-primary">خطى</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              خطى هي منصة تعليمية متكاملة تهدف إلى تمكين المتعلمين من تطوير مهاراتهم 
              وتحقيق أهدافهم المهنية من خلال محتوى تعليمي عالي الجودة ومصمم بعناية.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Button variant="primary" size="lg" to="/courses">
                استكشف دوراتنا
              </Button>
              <Button variant="secondary" size="lg" to="/contact">
                تواصل معنا
              </Button>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-2 bg-primary opacity-50 rounded-xl blur-xl"></div>
              <img src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="منصة خطى للتعلم" className="relative z-10 rounded-xl shadow-lg object-cover w-full max-w-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Mission */}
          <FeatureCard icon="🎯" title="مهمتنا" description="نسعى لتقديم تجربة تعليمية فريدة تمكن المتعلمين من اكتساب المهارات 
            العملية والنظرية بطريقة سلسة وممتعة. نؤمن بأن التعلم المستمر هو 
            مفتاح النجاح في عالم سريع التغير." />

          {/* Vision */}
          <FeatureCard icon="👁️" title="رؤيتنا" description="أن نكون المنصة التعليمية الرائدة في الشرق الأوسط، نلهم ونمكن 
            الأفراد من تحقيق إمكاناتهم الكاملة من خلال التعليم عالي الجودة 
            والمرن الذي يناسب احتياجات كل متعلم." />
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-background-light py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">قيمنا الأساسية</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              نؤمن بمجموعة من القيم التي توجه كل ما نقوم به
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[{
            icon: "🌱",
            title: "التطوير المستمر",
            description: "نؤمن بأهمية التعلم المستمر وتحسين الذات"
          }, {
            icon: "🤝",
            title: "الشمولية",
            description: "نسعى لجعل التعليم متاحًا للجميع بغض النظر عن الخلفية"
          }, {
            icon: "💡",
            title: "الابتكار",
            description: "نبتكر دائمًا طرقًا جديدة لتقديم المحتوى التعليمي"
          }].map((value, index) => <FeatureCard key={index} icon={value.icon} title={value.title} description={value.description} />)}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">فريقنا</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            مجموعة من الخبراء المتخصصين في مجال التعليم والتطوير المهني
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          {[{
          name: "د. محمد الشهري",
          role: "المؤسس والرئيس التنفيذي",
          image: "https://randomuser.me/api/portraits/men/32.jpg"
        }, {
          name: "أ. سارة العتيبي",
          role: "مديرة المحتوى التعليمي",
          image: "https://randomuser.me/api/portraits/women/44.jpg"
        }, {
          name: "م. أحمد القحطاني",
          role: "مدير التطوير التقني",
          image: "https://randomuser.me/api/portraits/men/75.jpg"
        }, {
          name: "أ. لمياء الدوسري",
          role: "مديرة التدريب والتطوير",
          image: "https://randomuser.me/api/portraits/women/65.jpg"
        }].map((member, index) => <div key={index} className="bg-background-light rounded-xl p-6 text-center hover:scale-105 transition-transform">
              <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </div>)}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            انضم إلى رحلة التعلم
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            كل رحلة تبدأ بخطوة. لنبدأ رحلتك نحو النجاح معًا.
          </p>
          <Button variant="white" size="lg" to="/signup">
            سجل الآن
          </Button>
        </div>
      </section>
    </div>;
};
export default About;
export { About };