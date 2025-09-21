import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaChartLine, FaRobot, FaLightbulb, FaBook, FaChartPie, FaProjectDiagram, FaUserGraduate } from 'react-icons/fa';
const LearningAIDashboard = () => {
  const [learningProfile, setLearningProfile] = useState({
    name: 'محمد أحمد الشهري',
    learningStyle: 'تحليلي',
    aiRecommendations: [{
      id: 1,
      title: 'تعلم Python للذكاء الاصطناعي',
      progress: 65,
      type: 'دورة متقدمة',
      icon: FaRobot
    }, {
      id: 2,
      title: 'مهارات التواصل الذكي',
      progress: 40,
      type: 'دورة تفاعلية',
      icon: FaLightbulb
    }],
    learningMetrics: {
      completedCourses: 3,
      inProgressCourses: 2,
      totalLearningHours: 45,
      aiAssistanceUsed: 12
    },
    aiInsights: [{
      id: 1,
      title: 'نقاط القوة',
      insights: ['تحليل البيانات', 'التعلم السريع', 'حل المشكلات المعقدة'],
      icon: FaChartLine
    }, {
      id: 2,
      title: 'مجالات التحسين',
      insights: ['مهارات التواصل', 'إدارة المشاريع', 'التسويق الرقمي'],
      icon: FaProjectDiagram
    }]
  });
  const [aiRecommendation, setAiRecommendation] = useState(null);
  const generateAIRecommendation = () => {
    const recommendations = [{
      title: 'مسار التعلم المقترح',
      description: 'بناءً على تحليل مهاراتك، نقترح مسار تعلم متكامل في الذكاء الاصطناعي يركز على تحليل البيانات ومهارات البرمجة.',
      confidence: 85
    }, {
      title: 'فرص التطوير المهني',
      description: 'حددنا مجالات واعدة في التحول الرقمي والذكاء الاصطناعي تتناسب مع مهاراتك الحالية.',
      confidence: 75
    }];
    setAiRecommendation(recommendations[Math.floor(Math.random() * recommendations.length)]);
  };
  useEffect(() => {
    generateAIRecommendation();
  }, []);
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
          <h1 className="text-4xl font-bold mb-4">لوحة التعلم الذكية</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            مسارك التعليمي المخصص بدعم الذكاء الاصطناعي
          </p>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Learning Profile */}
          <div className="space-y-8">
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} animate={{
            opacity: 1,
            x: 0
          }} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-6">
                <FaUserGraduate className="text-blue-500 text-2xl ml-4" />
                <h3 className="text-2xl font-bold">الملف التعليمي</h3>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold">{learningProfile.name}</h4>
                <p className="text-gray-400">نمط التعلم: {learningProfile.learningStyle}</p>
              </div>
            </motion.div>

            {/* Learning Metrics */}
            <motion.div initial={{
            opacity: 0,
            x: -50
          }} animate={{
            opacity: 1,
            x: 0
          }} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-6">
                <FaChartPie className="text-green-500 text-2xl ml-4" />
                <h3 className="text-2xl font-bold">مؤشرات التعلم</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(learningProfile.learningMetrics).map(([key, value]) => <div key={key} className="
                      bg-gray-700 
                      p-4 
                      rounded-lg 
                      text-center
                    ">
                    <h4 className="text-xl font-bold text-blue-400">{value}</h4>
                    <p className="text-sm text-gray-400">
                      {{
                    completedCourses: 'دورات مكتملة',
                    inProgressCourses: 'دورات قيد التنفيذ',
                    totalLearningHours: 'ساعات التعلم',
                    aiAssistanceUsed: 'مرات المساعدة'
                  }[key]}
                    </p>
                  </div>)}
              </div>
            </motion.div>
          </div>

          {/* Middle Column: AI Recommendations */}
          <div className="space-y-8">
            <motion.div initial={{
            opacity: 0,
            y: 50
          }} animate={{
            opacity: 1,
            y: 0
          }} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-6">
                <FaBook className="text-purple-500 text-2xl ml-4" />
                <h3 className="text-2xl font-bold">توصيات التعلم</h3>
              </div>
              <div className="space-y-4">
                {learningProfile.learningRecommendations?.map(recommendation => <div key={recommendation.id} className="
                      bg-gray-700 
                      p-4 
                      rounded-lg 
                      flex 
                      items-center 
                      justify-between
                    ">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <recommendation.icon className="text-2xl text-blue-500" />
                      <div>
                        <h4 className="font-bold">{recommendation.title}</h4>
                        <p className="text-sm text-gray-400">{recommendation.type}</p>
                      </div>
                    </div>
                    <div className="w-16 h-2 bg-gray-600 rounded-full">
                      <div className="h-full bg-blue-500 rounded-full" style={{
                    width: `${recommendation.progress}%`
                  }} />
                    </div>
                  </div>)}
              </div>
            </motion.div>

            {/* AI Insights */}
            <motion.div initial={{
            opacity: 0,
            y: 50
          }} animate={{
            opacity: 1,
            y: 0
          }} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-6">
                <FaBrain className="text-red-500 text-2xl ml-4" />
                <h3 className="text-2xl font-bold">رؤى الذكاء الاصطناعي</h3>
              </div>
              {learningProfile.aiInsights.map(insight => <div key={insight.id} className="
                    bg-gray-700 
                    p-4 
                    rounded-lg 
                    mb-4
                  ">
                  <div className="flex items-center mb-2">
                    <insight.icon className="text-xl ml-4 text-blue-500" />
                    <h4 className="font-bold">{insight.title}</h4>
                  </div>
                  <ul className="list-disc list-inside text-gray-300">
                    {insight.insights.map((item, index) => <li key={index}>{item}</li>)}
                  </ul>
                </div>)}
            </motion.div>
          </div>

          {/* Right Column: AI Recommendations */}
          <div className="space-y-8">
            {aiRecommendation && <motion.div initial={{
            opacity: 0,
            x: 50
          }} animate={{
            opacity: 1,
            x: 0
          }} className="bg-gray-800 rounded-lg p-6">
                <div className="flex items-center mb-6">
                  <FaRobot className="text-green-500 text-2xl ml-4" />
                  <h3 className="text-2xl font-bold">توصية الذكاء الاصطناعي</h3>
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold mb-4">{aiRecommendation.title}</h4>
                  <p className="text-gray-300 mb-4">{aiRecommendation.description}</p>
                  <div className="flex items-center justify-center">
                    <span className="text-sm text-gray-400 ml-2">نسبة الثقة:</span>
                    <div className="
                        w-24 
                        h-2 
                        bg-gray-700 
                        rounded-full 
                        overflow-hidden
                      ">
                      <div className="h-full bg-green-500" style={{
                    width: `${aiRecommendation.confidence}%`
                  }} />
                    </div>
                    <span className="text-sm text-gray-400 mr-2">
                      {aiRecommendation.confidence}%
                    </span>
                  </div>
                </div>
              </motion.div>}
          </div>
        </div>
      </div>
    </div>;
};
export default LearningAIDashboard;
export { LearningAIDashboard };