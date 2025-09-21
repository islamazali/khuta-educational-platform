import React from 'react';
import { motion } from 'framer-motion';
import GradientText from '../components/ui/GradientText';
import { FaCode, FaRocket, FaBrain, FaChartLine, FaLightbulb } from 'react-icons/fa';
const GradientTextShowcase = () => {
  // Staggered container animation
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
          <GradientText size="4xl" variant="primary" className="block mb-4">
            نصوص متدرجة متحركة
          </GradientText>
          <p className="text-gray-600 max-w-2xl mx-auto">
            استكشف تأثيرات النص المتدرج مع الرسوم المتحركة الديناميكية
          </p>
        </div>

        {/* أنواع التدرج */}
        <motion.section variants={containerVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            مجموعات الألوان
          </h2>
          <div className="grid md:grid-cols-5 gap-6">
            {[{
            variant: 'primary',
            text: 'أساسي',
            icon: FaCode
          }, {
            variant: 'success',
            text: 'نجاح',
            icon: FaRocket
          }, {
            variant: 'danger',
            text: 'خطأ',
            icon: FaBrain
          }, {
            variant: 'info',
            text: 'معلومات',
            icon: FaChartLine
          }, {
            variant: 'warning',
            text: 'تحذير',
            icon: FaLightbulb
          }].map((item, index) => <motion.div key={index} variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 text-center">
                <item.icon className="mx-auto text-4xl mb-4 text-gray-600" />
                <GradientText variant={item.variant} size="xl" delay={index * 0.2}>
                  {item.text}
                </GradientText>
              </motion.div>)}
          </div>
        </motion.section>

        {/* أحجام النص */}
        <motion.section variants={containerVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            أحجام النص
          </h2>
          <div className="grid md:grid-cols-6 gap-4">
            {['xs', 'sm', 'base', 'lg', 'xl', '2xl'].map((size, index) => <motion.div key={size} variants={itemVariants} className="bg-white rounded-xl shadow-md p-4 text-center">
                <GradientText size={size} variant="info" delay={index * 0.2}>
                  {size}
                </GradientText>
              </motion.div>)}
          </div>
        </motion.section>

        {/* نص متدرج متعدد الأسطر */}
        <motion.section variants={containerVariants} initial="hidden" animate="visible">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            نص متعدد الأسطر
          </h2>
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <GradientText variant="primary" size="2xl" staggerChildren>
              مستقبل التكنولوجيا
            </GradientText>
            <p className="text-gray-600 mt-4">
              نص توضيحي يظهر كيفية عمل النص المتدرج مع الرسوم المتحركة
            </p>
          </div>
        </motion.section>
      </div>
    </motion.div>;
};
export default GradientTextShowcase;
export { GradientTextShowcase };