import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const InternalReviewButtons = () => {
  const navigate = useNavigate();
  const reviewLevels = [{
    level: 1,
    title: 'المراجعة الداخلية – المستوى 1',
    route: '/courses/internal-review-basic',
    color: 'bg-green-500 hover:bg-green-600'
  }, {
    level: 2,
    title: 'المراجعة الداخلية – المستوى 2',
    route: '/courses/internal-review-intermediate',
    color: 'bg-blue-500 hover:bg-blue-600'
  }, {
    level: 3,
    title: 'المراجعة الداخلية – المستوى 3',
    route: '/courses/internal-review-advanced',
    color: 'bg-purple-500 hover:bg-purple-600'
  }];
  return <div className="space-y-4 w-full">
      {reviewLevels.map((review, index) => <motion.button key={review.level} initial={{
      opacity: 0,
      x: -50
    }} animate={{
      opacity: 1,
      x: 0
    }} transition={{
      delay: index * 0.2,
      duration: 0.5,
      type: 'spring',
      stiffness: 100
    }} onClick={() => navigate(review.route)} className={`
            w-full 
            py-4 
            rounded-lg 
            text-white 
            font-bold 
            text-lg 
            shadow-lg 
            transition-all 
            duration-300 
            ease-in-out 
            focus:outline-none 
            focus:ring-2 
            focus:ring-opacity-50 
            ${review.color}
          `}>
          {review.title}
        </motion.button>)}
    </div>;
};
export default InternalReviewButtons;
export { InternalReviewButtons };