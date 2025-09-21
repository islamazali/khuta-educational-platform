import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FellowshipNavigation from '../components/FellowshipNavigation';
import FellowshipPartContent from '../components/FellowshipPartContent';
import { FaShieldAlt } from 'react-icons/fa';
const FellowshipPage = () => {
  const [activePart, setActivePart] = useState(1);
  const handlePartChange = part => {
    setActivePart(part);
  };
  return <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Fellowship Logo with Hover Effect */}
        <motion.div className="flex justify-center mb-12" whileHover={{
        scale: 1.1,
        rotate: 3
      }} transition={{
        type: 'spring',
        stiffness: 300
      }}>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <FaShieldAlt className="text-blue-500 text-4xl" />
            <h1 className="text-4xl font-bold">
              زمالة المراجعين الداخليين
            </h1>
          </div>
        </motion.div>

        {/* Page Description */}
        <div className="text-center mb-12">
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            برنامج متكامل للتأهيل المهني في مجال 
            <span className="text-blue-400 mx-2">المراجعة الداخلية</span>
            يغطي جميع المستويات من المبتدئ إلى المتقدم
          </p>
        </div>

        {/* Navigation */}
        <FellowshipNavigation onPartChange={handlePartChange} />

        {/* Content */}
        <FellowshipPartContent part={activePart} />

        {/* Additional Information */}
        <div className="mt-16 bg-gray-800 p-8 rounded-lg">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400">
                Internal Audit → المراجعة الداخلية
              </h3>
              <p className="text-gray-300">
                عملية منهجية للتقييم المستقل والموضوعي داخل المؤسسة، تهدف إلى تحسين 
                العمليات وإدارة المخاطر والتحكم المؤسسي.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-green-400">
                Internal Auditor → المراجع الداخلي
              </h3>
              <p className="text-gray-300">
                متخصص مهني مسؤول عن تقييم وفحص العمليات الداخلية، وتقديم 
                توصيات لتحسين الكفاءة والفعالية التنظيمية.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default FellowshipPage;
export { FellowshipPage };