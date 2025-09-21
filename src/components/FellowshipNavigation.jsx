import React, { useState } from 'react';
import { motion } from 'framer-motion';
const FellowshipNavigation = ({
  onPartChange
}) => {
  const [activePart, setActivePart] = useState(1);
  const parts = [{
    number: 1,
    title: 'بارت 1'
  }, {
    number: 2,
    title: 'بارت 2'
  }, {
    number: 3,
    title: 'بارت 3'
  }];
  const handlePartClick = partNumber => {
    setActivePart(partNumber);
    onPartChange(partNumber);
  };
  return <div className="flex justify-center space-x-4 mb-8 rtl:space-x-reverse">
      {parts.map(part => <motion.button key={part.number} onClick={() => handlePartClick(part.number)} whileHover={{
      scale: 1.05
    }} whileTap={{
      scale: 0.95
    }} className={`
            px-6 py-3 
            rounded-lg 
            text-white 
            font-bold 
            transition-all 
            duration-300 
            ${activePart === part.number ? 'bg-blue-600 shadow-lg' : 'bg-gray-700 hover:bg-gray-600'}
          `}>
          {part.title}
        </motion.button>)}
    </div>;
};
export default FellowshipNavigation;
export { FellowshipNavigation };