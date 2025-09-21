import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaGraduationCap, FaCertificate, FaTrophy, FaCloudUploadAlt, FaEdit, FaQrCode, FaShareAlt } from 'react-icons/fa';

// Storage Tracker Component
const StorageTracker = () => {
  const MAX_STORAGE = 5 * 1024; // 5 GB in MB
  const [usedStorage, setUsedStorage] = useState(1200); // Example: 1.2 GB used

  const storagePercentage = usedStorage / MAX_STORAGE * 100;
  return <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <FaCloudUploadAlt className="text-blue-500 text-2xl" />
          <h3 className="text-xl font-bold">مساحة التخزين</h3>
        </div>
        <span className="text-gray-400">
          {usedStorage} / {MAX_STORAGE} ميجابايت
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
        <motion.div initial={{
        width: 0
      }} animate={{
        width: `${storagePercentage}%`
      }} transition={{
        duration: 0.5
      }} className={`
            h-full 
            rounded-full 
            ${storagePercentage < 70 ? 'bg-green-500' : storagePercentage < 90 ? 'bg-yellow-500' : 'bg-red-500'}
          `} />
      </div>
      <p className="text-center text-sm text-gray-400">
        {storagePercentage < 70 ? 'مساحة التخزين متاحة' : storagePercentage < 90 ? 'مساحة التخزين تقترب من الحد الأقصى' : 'مساحة التخزين وشيكة الامتلاء'}
      </p>
    </div>;
};

// Digital Business Card Component
const DigitalBusinessCard = () => {
  return <div className="bg-gray-800 rounded-lg p-6 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center">
          <FaUser className="text-4xl text-white" />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-2">محمد أحمد الشهري</h2>
      <p className="text-gray-400 mb-4">محلل بيانات | مطور ذكاء اصطناعي</p>
      
      <div className="flex justify-center space-x-4 rtl:space-x-reverse mb-4">
        <motion.button whileHover={{
        scale: 1.1
      }} className="bg-blue-600 text-white p-2 rounded-full">
          <FaQrCode />
        </motion.button>
        <motion.button whileHover={{
        scale: 1.1
      }} className="bg-green-600 text-white p-2 rounded-full">
          <FaShareAlt />
        </motion.button>
      </div>
    </div>;
};

// Educational Progress Component
const EducationalProgress = () => {
  const [courses] = useState([{
    id: 1,
    title: 'تحليل البيانات المتقدم',
    progress: 75,
    certificate: false
  }, {
    id: 2,
    title: 'الذكاء الاصطناعي للمبتدئين',
    progress: 100,
    certificate: true
  }, {
    id: 3,
    title: 'مهارات التواصل المتقدمة',
    progress: 50,
    certificate: false
  }]);
  return <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center mb-6">
        <FaGraduationCap className="text-blue-500 text-2xl ml-4" />
        <h3 className="text-2xl font-bold">التقدم التعليمي</h3>
      </div>

      {courses.map(course => <div key={course.id} className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span>{course.title}</span>
            <span>{course.progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div initial={{
          width: 0
        }} animate={{
          width: `${course.progress}%`
        }} transition={{
          duration: 0.5
        }} className={`
                h-full 
                rounded-full 
                ${course.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}
              `} />
          </div>
          {course.certificate && <div className="flex items-center text-green-500 mt-2">
              <FaCertificate className="ml-2" />
              <span>تم الحصول على الشهادة</span>
            </div>}
        </div>)}
    </div>;
};

// Achievements Component
const Achievements = () => {
  const [achievements] = useState([{
    id: 1,
    title: 'أفضل مشروع تحليل بيانات',
    date: '15 سبتمبر 2025',
    icon: FaTrophy
  }, {
    id: 2,
    title: 'شهادة الذكاء الاصطناعي المتقدم',
    date: '10 سبتمبر 2025',
    icon: FaCertificate
  }]);
  return <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center mb-6">
        <FaTrophy className="text-yellow-500 text-2xl ml-4" />
        <h3 className="text-2xl font-bold">الإنجازات</h3>
      </div>

      {achievements.map(achievement => {
      const Icon = achievement.icon;
      return <motion.div key={achievement.id} whileHover={{
        scale: 1.02
      }} className="
              flex 
              items-center 
              bg-gray-700 
              p-4 
              rounded-lg 
              mb-4 
              hover:bg-gray-600 
              transition-colors
            ">
            <Icon className="text-2xl ml-4 text-yellow-500" />
            <div>
              <h4 className="font-bold">{achievement.title}</h4>
              <p className="text-sm text-gray-400">{achievement.date}</p>
            </div>
          </motion.div>;
    })}
    </div>;
};

// Interactive Resume Component
const InteractiveResume = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [resume, setResume] = useState({
    name: 'محمد أحمد الشهري',
    title: 'محلل بيانات | مطور ذكاء اصطناعي',
    summary: 'محترف في تحليل البيانات والذكاء الاصطناعي مع خبرة 3 سنوات في مجال التكنولوجيا.',
    skills: ['تحليل البيانات', 'Python', 'Machine Learning', 'Data Visualization'],
    experience: [{
      company: 'شركة التقنية المتقدمة',
      position: 'محلل بيانات أول',
      period: '2023 - 2025'
    }]
  });
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  return <div className="bg-gray-800 rounded-lg p-6 relative">
      <motion.button whileHover={{
      scale: 1.1
    }} onClick={handleEdit} className="
          absolute 
          top-4 
          left-4 
          rtl:left-auto 
          rtl:right-4 
          bg-blue-600 
          text-white 
          p-2 
          rounded-full
        ">
        <FaEdit />
      </motion.button>

      <div className="flex items-center mb-6">
        <FaUser className="text-blue-500 text-2xl ml-4" />
        <h3 className="text-2xl font-bold">السيرة الذاتية التفاعلية</h3>
      </div>

      {isEditing ? <div className="space-y-4">
          <input type="text" value={resume.name} onChange={e => setResume(prev => ({
        ...prev,
        name: e.target.value
      }))} className="w-full bg-gray-700 text-white p-3 rounded-lg" placeholder="الاسم" />
          <input type="text" value={resume.title} onChange={e => setResume(prev => ({
        ...prev,
        title: e.target.value
      }))} className="w-full bg-gray-700 text-white p-3 rounded-lg" placeholder="المسمى الوظيفي" />
          <textarea value={resume.summary} onChange={e => setResume(prev => ({
        ...prev,
        summary: e.target.value
      }))} className="w-full bg-gray-700 text-white p-3 rounded-lg" placeholder="ملخص مهني" rows="4" />
          <div>
            <h4 className="text-lg font-bold mb-2">المهارات</h4>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, index) => <span key={index} className="
                    bg-blue-500 
                    text-white 
                    px-3 
                    py-1 
                    rounded-full 
                    text-sm
                  ">
                  {skill}
                </span>)}
            </div>
          </div>
          <button onClick={handleEdit} className="
              w-full 
              bg-green-600 
              text-white 
              p-3 
              rounded-lg 
              hover:bg-green-700
            ">
            حفظ التعديلات
          </button>
        </div> : <div>
          <h2 className="text-2xl font-bold mb-2">{resume.name}</h2>
          <p className="text-gray-400 mb-4">{resume.title}</p>
          
          <div className="mb-4">
            <h4 className="font-bold mb-2">الملخص المهني</h4>
            <p className="text-gray-300">{resume.summary}</p>
          </div>

          <div className="mb-4">
            <h4 className="font-bold mb-2">المهارات</h4>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill, index) => <span key={index} className="
                    bg-blue-500 
                    text-white 
                    px-3 
                    py-1 
                    rounded-full 
                    text-sm
                  ">
                  {skill}
                </span>)}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-2">الخبرات المهنية</h4>
            {resume.experience.map((exp, index) => <div key={index} className="bg-gray-700 p-4 rounded-lg mb-2">
                <h5 className="font-bold">{exp.position}</h5>
                <p className="text-gray-400">{exp.company}</p>
                <p className="text-sm text-gray-500">{exp.period}</p>
              </div>)}
          </div>
        </div>}
    </div>;
};
const Profile = () => {
  return <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <motion.div initial={{
        opacity: 0,
        y: -50
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">الملف الشخصي</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            رحلتك التعليمية والمهنية في مكان واحد
          </p>
        </motion.div>

        {/* Profile Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <DigitalBusinessCard />
            <StorageTracker />
          </div>

          {/* Middle Column */}
          <div className="space-y-8">
            <EducationalProgress />
            <Achievements />
          </div>

          {/* Right Column */}
          <div>
            <InteractiveResume />
          </div>
        </div>
      </div>
    </div>;
};
export default Profile;
export { Profile };