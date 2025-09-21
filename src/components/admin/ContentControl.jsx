import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCopy, FaExchangeAlt, FaTrash, FaFolder, FaFile } from 'react-icons/fa';
const ContentControl = () => {
  const [courses, setCourses] = useState([{
    id: 1,
    name: 'تحليل البيانات',
    files: [{
      id: 1,
      name: 'مقدمة في تحليل البيانات.pdf',
      size: '2.3 MB'
    }, {
      id: 2,
      name: 'أساسيات Python.docx',
      size: '1.7 MB'
    }]
  }, {
    id: 2,
    name: 'الذكاء الاصطناعي',
    files: [{
      id: 3,
      name: 'مقدمة في الذكاء الاصطناعي.pdf',
      size: '3.1 MB'
    }, {
      id: 4,
      name: 'خوارزميات التعلم الآلي.pptx',
      size: '4.5 MB'
    }]
  }]);
  const [users, setUsers] = useState([{
    id: 1,
    name: 'محمد الشهري'
  }, {
    id: 2,
    name: 'سارة العتيبي'
  }]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const handleFileSelect = file => {
    setSelectedFiles(prev => prev.includes(file) ? prev.filter(f => f.id !== file.id) : [...prev, file]);
  };
  const handleCopyFiles = () => {
    if (selectedCourse && selectedUser && selectedFiles.length > 0) {
      // Simulate file copy between courses or users
      console.log('Copying files:', selectedFiles);
      alert(`تم نسخ ${selectedFiles.length} ملف إلى المستخدم ${selectedUser.name}`);
      setSelectedFiles([]);
    }
  };
  const handleMoveFiles = () => {
    if (selectedCourse && selectedUser && selectedFiles.length > 0) {
      // Simulate file move between courses or users
      console.log('Moving files:', selectedFiles);
      alert(`تم نقل ${selectedFiles.length} ملف إلى المستخدم ${selectedUser.name}`);

      // Remove files from source
      setCourses(prev => prev.map(course => ({
        ...course,
        files: course.files.filter(file => !selectedFiles.some(f => f.id === file.id))
      })));
      setSelectedFiles([]);
    }
  };
  return <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">التحكم بالمحتوى</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Courses Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">الدورات</h3>
          <div className="space-y-2">
            {courses.map(course => <motion.button key={course.id} whileHover={{
            scale: 1.02
          }} onClick={() => setSelectedCourse(course)} className={`
                  w-full 
                  flex 
                  items-center 
                  space-x-2 
                  rtl:space-x-reverse
                  p-3 
                  rounded-lg 
                  transition-colors 
                  ${selectedCourse?.id === course.id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
                `}>
                <FaFolder />
                <span>{course.name}</span>
              </motion.button>)}
          </div>
        </div>

        {/* Files Section */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-white">الملفات</h3>
          {selectedCourse && <div className="space-y-2">
              {selectedCourse.files.map(file => <motion.div key={file.id} whileHover={{
            scale: 1.02
          }} className={`
                    flex 
                    items-center 
                    justify-between 
                    p-3 
                    rounded-lg 
                    transition-colors 
                    cursor-pointer
                    ${selectedFiles.some(f => f.id === file.id) ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
                  `} onClick={() => handleFileSelect(file)}>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <FaFile />
                    <span>{file.name}</span>
                  </div>
                  <span className="text-sm">{file.size}</span>
                </motion.div>)}
            </div>}
        </div>
      </div>

      {/* Users Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 text-white">المستخدمون</h3>
        <div className="flex space-x-4 rtl:space-x-reverse">
          {users.map(user => <motion.button key={user.id} whileHover={{
          scale: 1.05
        }} onClick={() => setSelectedUser(user)} className={`
                flex 
                items-center 
                space-x-2 
                rtl:space-x-reverse
                p-3 
                rounded-lg 
                transition-colors 
                ${selectedUser?.id === user.id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
              `}>
              <span>{user.name}</span>
            </motion.button>)}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex space-x-4 rtl:space-x-reverse">
        <motion.button whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} onClick={handleCopyFiles} disabled={!selectedCourse || !selectedUser || selectedFiles.length === 0} className={`
            flex 
            items-center 
            space-x-2 
            rtl:space-x-reverse
            p-3 
            rounded-lg 
            transition-colors 
            ${selectedCourse && selectedUser && selectedFiles.length > 0 ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
          `}>
          <FaCopy />
          <span>نسخ الملفات</span>
        </motion.button>

        <motion.button whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} onClick={handleMoveFiles} disabled={!selectedCourse || !selectedUser || selectedFiles.length === 0} className={`
            flex 
            items-center 
            space-x-2 
            rtl:space-x-reverse
            p-3 
            rounded-lg 
            transition-colors 
            ${selectedCourse && selectedUser && selectedFiles.length > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-700 text-gray-400 cursor-not-allowed'}
          `}>
          <FaExchangeAlt />
          <span>نقل الملفات</span>
        </motion.button>
      </div>
    </div>;
};
export default ContentControl;
export { ContentControl };