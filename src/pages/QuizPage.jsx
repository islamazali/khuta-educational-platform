import React, { useState } from 'react';
import QuizCard from '../components/QuizCard';
import { motion } from 'framer-motion';
import { FaBook, FaChartBar, FaTrophy } from 'react-icons/fa';
const quizData = [{
  question: 'ما هو الذكاء الاصطناعي؟',
  options: ['برنامج حاسوبي يحاكي الذكاء البشري', 'نوع من أنواع البرمجة', 'شبكة حاسوبية معقدة', 'جهاز إلكتروني متطور'],
  correctAnswer: 0,
  explanation: 'الذكاء الاصطناعي هو مجال في علوم الحاسب يهدف إلى إنشاء أنظمة ذكية قادرة على محاكاة السلوك البشري'
}, {
  question: 'ما هي أهم تطبيقات التعلم الآلي؟',
  options: ['التنبؤ بالطقس', 'التشخيص الطبي', 'التسوق الإلكتروني', 'جميع ما سبق'],
  correctAnswer: 3,
  explanation: 'التعلم الآلي له تطبيقات متعددة في مجالات مختلفة مثل الطب والتنبؤات والتسويق'
}, {
  question: 'كيف يعمل التعلم العميق؟',
  options: ['محاكاة الشبكات العصبية البشرية', 'استخدام خوارزميات بسيطة', 'تحليل البيانات اليدوي', 'معالجة البيانات بشكل عشوائي'],
  correctAnswer: 0,
  explanation: 'التعلم العميق يعتمد على محاكاة الشبكات العصبية البشرية لمعالجة البيانات وتعلم الأنماط'
}];
const QuizPage = () => {
  const [score, setScore] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState(new Array(quizData.length).fill(false));
  const handleQuizComplete = (index, isCorrect) => {
    const newCompletedQuizzes = [...completedQuizzes];
    newCompletedQuizzes[index] = true;
    setCompletedQuizzes(newCompletedQuizzes);
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
  };
  const progressPercentage = completedQuizzes.filter(Boolean).length / quizData.length * 100;
  return <div className="min-h-screen bg-gray-50 py-12 px-4">
      {/* الرأس */}
      <motion.div initial={{
      opacity: 0,
      y: -50
    }} animate={{
      opacity: 1,
      y: 0
    }} className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          اختبر معرفتك
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          سلسلة من الأسئلة لتقييم فهمك للمفاهيم الأساسية في التكنولوجيا والذكاء الاصطناعي
        </p>
      </motion.div>

      {/* لوحة المعلومات */}
      <motion.div initial={{
      opacity: 0,
      scale: 0.9
    }} animate={{
      opacity: 1,
      scale: 1
    }} className="max-w-4xl mx-auto mb-12 grid grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <FaBook className="mx-auto text-4xl text-blue-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-800">
            {quizData.length} أسئلة
          </h3>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <FaChartBar className="mx-auto text-4xl text-green-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-800">
            {progressPercentage.toFixed(0)}% إكمال
          </h3>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <FaTrophy className="mx-auto text-4xl text-yellow-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-800">
            {score} / {quizData.length} صحيحة
          </h3>
        </div>
      </motion.div>

      {/* قائمة الأسئلة */}
      <div className="max-w-4xl mx-auto space-y-8">
        {quizData.map((quiz, index) => <QuizCard key={index} {...quiz} onComplete={isCorrect => handleQuizComplete(index, isCorrect)} />)}
      </div>

      {/* زر النتيجة النهائية */}
      {completedQuizzes.every(Boolean) && <motion.div initial={{
      opacity: 0,
      y: 50
    }} animate={{
      opacity: 1,
      y: 0
    }} className="max-w-md mx-auto mt-12">
          <button className="
              w-full bg-blue-600 text-white 
              py-4 rounded-lg text-xl font-bold
              hover:bg-blue-700 transition-colors
            ">
            عرض النتيجة النهائية
          </button>
        </motion.div>}
    </div>;
};
export default QuizPage;
export { QuizPage };