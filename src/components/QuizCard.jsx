import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaQuestionCircle } from 'react-icons/fa';
const QuizCard = ({
  question = 'ما هو الذكاء الاصطناعي؟',
  options = ['برنامج حاسوبي يحاكي الذكاء البشري', 'نوع من أنواع البرمجة', 'شبكة حاسوبية معقدة', 'جهاز إلكتروني متطور'],
  correctAnswer = 0,
  explanation = 'الذكاء الاصطناعي هو مجال في علوم الحاسب يهدف إلى إنشاء أنظمة ذكية قادرة على محاكاة السلوك البشري'
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isHovered, setIsHovered] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleOptionSelect = index => {
    if (!isSubmitted) {
      setSelectedOption(index);
    }
  };
  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  // Determine the status of each option
  const getOptionStatus = index => {
    if (!isSubmitted) return null;
    if (index === correctAnswer) return 'correct';
    if (index === selectedOption) return 'incorrect';
    return 'default';
  };

  // Color and icon mapping for different statuses
  const statusStyles = {
    default: {
      bg: 'bg-gray-100',
      text: 'text-gray-700',
      icon: null,
      iconColor: 'text-gray-400'
    },
    hover: {
      bg: 'bg-blue-50',
      text: 'text-blue-700',
      icon: FaQuestionCircle,
      iconColor: 'text-blue-400'
    },
    correct: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: FaCheckCircle,
      iconColor: 'text-green-500'
    },
    incorrect: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      icon: FaTimesCircle,
      iconColor: 'text-red-500'
    }
  };
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} className="
        bg-white rounded-xl shadow-lg 
        p-6 space-y-4 max-w-md mx-auto
        border border-gray-100
      ">
      {/* السؤال */}
      <div className="text-right">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          {question}
        </h3>
      </div>

      {/* الخيارات */}
      <div className="space-y-3">
        {options.map((option, index) => {
        const status = isHovered === index ? 'hover' : getOptionStatus(index) || 'default';
        const {
          bg,
          text,
          icon: StatusIcon,
          iconColor
        } = statusStyles[status];
        return <motion.div key={index} whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} onClick={() => handleOptionSelect(index)} onMouseEnter={() => setIsHovered(index)} onMouseLeave={() => setIsHovered(null)} className={`
                cursor-pointer rounded-lg p-3 
                flex items-center space-x-3 rtl:space-x-reverse
                transition-all duration-300
                ${bg} ${text}
                ${selectedOption === index && !isSubmitted ? 'ring-2 ring-blue-500' : ''}
              `}>
              {/* الأيقونة */}
              {StatusIcon && <StatusIcon className={`w-6 h-6 ${iconColor}`} />}
              
              {/* نص الخيار */}
              <span className="flex-grow text-right">
                {option}
              </span>
            </motion.div>;
      })}
      </div>

      {/* زر التأكيد */}
      <div className="mt-4">
        <button onClick={handleSubmit} disabled={selectedOption === null} className={`
            w-full py-3 rounded-lg text-white font-bold
            transition-all duration-300
            ${selectedOption !== null ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}
          `}>
          تأكيد الإجابة
        </button>
      </div>

      {/* شرح الإجابة */}
      {isSubmitted && <motion.div initial={{
      opacity: 0,
      height: 0
    }} animate={{
      opacity: 1,
      height: 'auto'
    }} transition={{
      duration: 0.5
    }} className="
            bg-gray-50 rounded-lg p-4 
            text-right mt-4
          ">
          <h4 className="font-bold text-gray-800 mb-2">
            التفسير:
          </h4>
          <p className="text-gray-600">
            {explanation}
          </p>
        </motion.div>}
    </motion.div>;
};
export default QuizCard;
export { QuizCard };