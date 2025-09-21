import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf, FaVideo, FaPodcast, FaClipboardList } from 'react-icons/fa';
const FellowshipPartContent = ({
  part
}) => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Dummy data - replace with actual content
  const partContent = {
    1: {
      files: [{
        name: 'مقدمة المراجعة الداخلية.pdf',
        size: '2.3 MB'
      }, {
        name: 'أساسيات التدقيق.pdf',
        size: '3.1 MB'
      }],
      quizzes: [{
        id: 1,
        title: 'اختبار المفاهيم الأساسية',
        questions: [{
          text: 'ما هو الهدف الرئيسي للمراجعة الداخلية؟',
          options: ['تقييم المخاطر', 'التحقق من الامتثال', 'زيادة القيمة المؤسسية', 'إعداد التقارير المالية']
        }]
      }],
      videos: [{
        title: 'مقدمة في المراجعة الداخلية',
        duration: '45:23'
      }, {
        title: 'أساسيات التدقيق المالي',
        duration: '38:12'
      }],
      podcasts: [{
        title: 'حوار مع خبير مراجعة داخلية',
        duration: '1:12:45'
      }, {
        title: 'تحديات المراجعين الداخليين',
        duration: '56:30'
      }]
    },
    2: {
      files: [{
        name: 'تقنيات المراجعة المتقدمة.pdf',
        size: '4.5 MB'
      }, {
        name: 'إدارة المخاطر.pdf',
        size: '3.7 MB'
      }],
      quizzes: [{
        id: 2,
        title: 'اختبار تقنيات المراجعة',
        questions: [{
          text: 'ما هي أهم أدوات تقييم المخاطر؟',
          options: ['التحليل المالي', 'خرائط المخاطر', 'المقابلات الشخصية', 'جميع ما سبق']
        }]
      }],
      videos: [{
        title: 'تقنيات المراجعة المتقدمة',
        duration: '52:14'
      }, {
        title: 'إدارة المخاطر التنظيمية',
        duration: '41:56'
      }],
      podcasts: [{
        title: 'استراتيجيات المراجعة الحديثة',
        duration: '1:05:30'
      }, {
        title: 'التحديات المعاصرة للمراجعين',
        duration: '47:22'
      }]
    },
    3: {
      files: [{
        name: 'الممارسات العالمية.pdf',
        size: '5.2 MB'
      }, {
        name: 'معايير المراجعة الدولية.pdf',
        size: '4.8 MB'
      }],
      quizzes: [{
        id: 3,
        title: 'اختبار الممارسات العالمية',
        questions: [{
          text: 'ما هي أهم المعايير الدولية للمراجعة الداخلية؟',
          options: ['معايير IIA', 'معايير IFAC', 'معايير ISO', 'جميع ما سبق']
        }]
      }],
      videos: [{
        title: 'الممارسات العالمية في المراجعة',
        duration: '58:45'
      }, {
        title: 'معايير المراجعة الدولية',
        duration: '49:30'
      }],
      podcasts: [{
        title: 'مستقبل المراجعة الداخلية',
        duration: '1:20:15'
      }, {
        title: 'التحول الرقمي في التدقيق',
        duration: '53:40'
      }]
    }
  };
  const content = partContent[part];
  const renderFiles = () => <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-2xl font-bold mb-4 text-white">الملفات</h3>
      {content.files.map((file, index) => <motion.div key={index} whileHover={{
      scale: 1.02
    }} className="flex items-center justify-between bg-gray-700 p-3 rounded-md mb-2">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <FaFilePdf className="text-red-500" />
            <span className="text-white">{file.name}</span>
          </div>
          <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
            تحميل ({file.size})
          </a>
        </motion.div>)}
    </div>;
  const renderQuizzes = () => <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-2xl font-bold mb-4 text-white">بنك الأسئلة</h3>
      {content.quizzes.map(quiz => <div key={quiz.id} className="bg-gray-700 p-4 rounded-md mb-4">
          <div className="flex items-center mb-4">
            <FaClipboardList className="text-green-500 ml-2" />
            <h4 className="text-lg font-semibold text-white">{quiz.title}</h4>
          </div>
          {quiz.questions.map((question, qIndex) => <div key={qIndex} className="mb-4">
              <p className="text-white mb-2">{question.text}</p>
              <div className="space-y-2">
                {question.options.map((option, oIndex) => <motion.button key={oIndex} whileHover={{
            scale: 1.02
          }} className="
                      w-full 
                      text-right 
                      p-2 
                      rounded-md 
                      bg-gray-600 
                      text-white 
                      hover:bg-gray-500 
                      transition-colors
                    ">
                    {option}
                  </motion.button>)}
              </div>
            </div>)}
        </div>)}
    </div>;
  const renderVideos = () => <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-2xl font-bold mb-4 text-white">مقاطع الفيديو</h3>
      {content.videos.map((video, index) => <motion.div key={index} whileHover={{
      scale: 1.02
    }} className="flex items-center justify-between bg-gray-700 p-3 rounded-md mb-2">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <FaVideo className="text-red-500" />
            <span className="text-white">{video.title}</span>
          </div>
          <span className="text-gray-400">{video.duration}</span>
        </motion.div>)}
    </div>;
  const renderPodcasts = () => <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-2xl font-bold mb-4 text-white">البودكاست</h3>
      {content.podcasts.map((podcast, index) => <motion.div key={index} whileHover={{
      scale: 1.02
    }} className="flex items-center justify-between bg-gray-700 p-3 rounded-md mb-2">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <FaPodcast className="text-purple-500" />
            <span className="text-white">{podcast.title}</span>
          </div>
          <span className="text-gray-400">{podcast.duration}</span>
        </motion.div>)}
    </div>;
  return <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-6">
        {renderFiles()}
        {renderQuizzes()}
      </div>
      <div className="space-y-6">
        {renderVideos()}
        {renderPodcasts()}
      </div>
    </div>;
};
export default FellowshipPartContent;
export { FellowshipPartContent };