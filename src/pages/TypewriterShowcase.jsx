import React from 'react';
import { motion } from 'framer-motion';
import ArabicTypewriter from '../components/ui/ArabicTypewriter';
import { FaCode, FaRocket, FaBrain, FaChartLine, FaLightbulb } from 'react-icons/fa';
const TypewriterShowcase = () => {
  // Container animation
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

  // Individual item animation
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
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.5
  }} className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <ArabicTypewriter text="مؤثر الكتابة التدريجي" size="4xl" variant="primary" />
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            استكشف تأثير الكتابة التدريجية للنصوص العربية
          </p>
        </div>

        {/* أنواع التدرج */}
        <motion.section variants={containerVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            مجموعات الألوان
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[{
            variant: 'primary',
            text: 'مستقبل التكنولوجيا الرقمية',
            icon: FaCode,
            speed: 70
          }, {
            variant: 'success',
            text: 'الابتكار يقود التغيير',
            icon: FaRocket,
            speed: 50
          }, {
            variant: 'danger',
            text: 'التحديات تصنع الإنجازات',
            icon: FaBrain,
            speed: 90
          }].map((item, index) => <motion.div key={index} variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 text-center">
                <item.icon className="mx-auto text-4xl mb-4 text-gray-600" />
                <ArabicTypewriter text={item.text} variant={item.variant} size="xl" speed={item.speed} delay={index * 0.5} />
              </motion.div>)}
          </div>
        </motion.section>

        {/* أحجام النص */}
        <motion.section variants={containerVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            أحجام النص المتحرك
          </h2>
          <div className="space-y-6">
            {[{
            size: 'xl',
            text: 'التعلم رحلة مستمرة',
            variant: 'info'
          }, {
            size: '2xl',
            text: 'الإبداع مفتاح النجاح',
            variant: 'warning'
          }, {
            size: '3xl',
            text: 'المستقبل يبدأ اليوم',
            variant: 'success'
          }].map((item, index) => <motion.div key={index} variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 text-center">
                <ArabicTypewriter text={item.text} size={item.size} variant={item.variant} speed={60} delay={index * 0.5} />
              </motion.div>)}
          </div>
        </motion.section>

        {/* نص متعدد اللغات */}
        <motion.section variants={containerVariants} initial="hidden" animate="visible">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            نصوص متعددة
          </h2>
          <div className="space-y-6">
            {[{
            text: 'التكنولوجيا تغير العالم',
            variant: 'primary',
            description: 'نص عربي'
          }, {
            text: 'Innovation Transforms Everything',
            variant: 'success',
            description: 'نص إنجليزي'
          }].map((item, index) => <motion.div key={index} variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 text-center">
                <p className="text-gray-600 mb-4">{item.description}</p>
                <ArabicTypewriter text={item.text} variant={item.variant} size="2xl" speed={80} delay={index * 0.5} />
              </motion.div>)}
          </div>
        </motion.section>
      </div>
    </motion.div>;
};
export default TypewriterShowcase;
export { TypewriterShowcase };