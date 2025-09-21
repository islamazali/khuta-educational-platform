import React from 'react';
import { Link } from 'react-router-dom';
const CourseCard = ({
  title,
  description,
  image,
  level,
  duration,
  price,
  buttonText = 'استكشف الدورة',
  buttonLink
}) => {
  // Generate slug from title for routing
  const courseSlug = title.toLowerCase().replace(/\s+/g, '-');
  return <div className="bg-background-light rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 group">
      {/* Course Image */}
      <div className="relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300" />
        {/* Level Badge */}
        {level && <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm">
            {level}
          </div>}
      </div>

      {/* Course Details */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-400 line-clamp-3">{description}</p>

        {/* Course Meta */}
        {(duration || price) && <div className="flex justify-between items-center text-gray-500 text-sm">
            {duration && <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>{duration}</span>
              </div>}
            {price && <span className="text-primary font-bold">{price}</span>}
          </div>}

        {/* Enroll/Action Button */}
        <Link to={buttonLink || `/courses/${courseSlug}`} className="btn-primary w-full text-center block mt-4 py-3 rounded-full">
          {buttonText}
        </Link>
      </div>
    </div>;
};

// Additional Card Variants
const StatCard = ({
  icon,
  title,
  value,
  description,
  className = ''
}) => {
  return <div className={`bg-background-light rounded-xl p-6 space-y-4 ${className}`}>
      <div className="text-5xl text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <div className="text-3xl font-bold text-primary mb-2">{value}</div>
      <p className="text-gray-400">{description}</p>
    </div>;
};
const FeatureCard = ({
  icon,
  title,
  description,
  className = ''
}) => {
  return <div className={`bg-background-light rounded-xl p-6 space-y-4 hover:scale-105 transition-transform duration-300 ${className}`}>
      <div className="text-5xl text-primary mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>;
};

// Export all card types
export { CourseCard, StatCard, FeatureCard };
export default CourseCard;