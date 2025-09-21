import React from 'react';
import { motion } from 'framer-motion';
import StaggeredGradientText from '../components/ui/StaggeredGradientText';
import { FaCode, FaRocket, FaBrain, FaChartLine, FaLightbulb } from 'react-icons/fa';
const StaggeredTextShowcase = () => {
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
          <StaggeredGradientText size="4xl" variant="primary" className="mb-4">
            نصوص متدرجة متحركة بالكلمات
          </StaggeredGradientText>
          <p className="text-gray-600 max-w-2xl mx-auto">
            استكشف تأثير الرسوم المتحركة للنصوص مع تأخير بين الكلمات
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
            icon: FaCode
          }, {
            variant: 'success',
            text: 'الابتكار يقود التغيير',
            icon: FaRocket
          }, {
            variant: 'danger',
            text: 'التحديات تصنع الإنجازات',
            icon: FaBrain
          }].map((item, index) => <motion.div key={index} variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 text-center">
                <item.icon className="mx-auto text-4xl mb-4 text-gray-600" />
                <StaggeredGradientText variant={item.variant} size="xl" staggerDelay={0.1}>
                  {item.text}
                </StaggeredGradientText>
              </motion.div>)}
          </div>
        </motion.section>

        {/* أحجام النص */}
        <motion.section variants={containerVariants} initial="hidden" animate="visible" className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            أحجام النص المتدرج
          </h2>
          <div className="space-y-6">
            {[{
            size: 'xl',
            text: 'التعلم رحلة مستمرة'
          }, {
            size: '2xl',
            text: 'الإبداع مفتاح النجاح'
          }, {
            size: '3xl',
            text: 'المستقبل يبدأ اليوم'
          }].map((item, index) => <motion.div key={index} variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 text-center">
                <StaggeredGradientText size={item.size} variant="info" staggerDelay={0.15}>
                  {item.text}
                </StaggeredGradientText>
              </motion.div>)}
          </div>
        </motion.section>

        {/* نص متعدد اللغات */}
        <motion.section variants={containerVariants} initial="hidden" animate="visible">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">
            نصوص متعددة اللغات
          </h2>
          <div className="space-y-6">
            {[{
            text: 'Innovation Drives Progress',
            variant: 'primary',
            lang: 'إنجليزي'
          }, {
            text: 'التكنولوجيا تغير العالم',
            variant: 'success',
            lang: 'عربي'
          }].map((item, index) => <motion.div key={index} variants={itemVariants} className="bg-white rounded-xl shadow-md p-6 text-center">
                <p className="text-gray-600 mb-4">{item.lang}</p>
                <StaggeredGradientText variant={item.variant} size="2xl" staggerDelay={0.2}>
                  {item.text}
                </StaggeredGradientText>
              </motion.div>)}
          </div>
        </motion.section>
      </div>
    </motion.div>;
};
export default StaggeredTextShowcase;
export { StaggeredTextShowcase };