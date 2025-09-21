import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFolder, FaFile, FaFileWord, FaFilePdf, FaFileExcel, FaSearch, FaFilter, FaEye, FaDownload } from 'react-icons/fa';
const ProjectArchive = () => {
  const [courses, setCourses] = useState([{
    id: 1,
    title: 'تحليل البيانات المتقدم',
    files: [{
      id: 1,
      name: 'مقدمة في تحليل البيانات.pdf',
      type: 'pdf',
      size: '2.3 MB',
      views: 42,
      lastAccessed: '15 سبتمبر 2025'
    }, {
      id: 2,
      name: 'أساسيات Python.docx',
      type: 'docx',
      size: '1.7 MB',
      views: 28,
      lastAccessed: '10 سبتمبر 2025'
    }]
  }, {
    id: 2,
    title: 'الذكاء الاصطناعي للمبتدئين',
    files: [{
      id: 3,
      name: 'مقدمة في الذكاء الاصطناعي.pdf',
      type: 'pdf',
      size: '3.1 MB',
      views: 55,
      lastAccessed: '20 سبتمبر 2025'
    }, {
      id: 4,
      name: 'خوارزميات التعلم الآلي.xlsx',
      type: 'xlsx',
      size: '4.5 MB',
      views: 36,
      lastAccessed: '18 سبتمبر 2025'
    }]
  }]);
  const [filters, setFilters] = useState({
    course: '',
    fileType: '',
    searchTerm: ''
  });
  const getFileIcon = type => {
    switch (type) {
      case 'pdf':
        return FaFilePdf;
      case 'docx':
        return FaFileWord;
      case 'xlsx':
        return FaFileExcel;
      default:
        return FaFile;
    }
  };
  const filteredCourses = courses.filter(course => course.title.includes(filters.course) && course.files.some(file => (filters.fileType === '' || file.type === filters.fileType) && (filters.searchTerm === '' || file.name.includes(filters.searchTerm))));
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
          <h1 className="text-4xl font-bold mb-4">الأرشيف الذكي للمشروعات</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            تتبع وإدارة الملفات والدورات بذكاء
          </p>
        </motion.div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <FaSearch className="absolute top-4 right-3 text-gray-400" />
            <input type="text" placeholder="البحث بالدورة" value={filters.course} onChange={e => setFilters(prev => ({
            ...prev,
            course: e.target.value
          }))} className="w-full bg-gray-800 text-white p-3 rounded-lg pr-10" />
          </div>

          <div className="relative">
            <FaSearch className="absolute top-4 right-3 text-gray-400" />
            <input type="text" placeholder="البحث بالملف" value={filters.searchTerm} onChange={e => setFilters(prev => ({
            ...prev,
            searchTerm: e.target.value
          }))} className="w-full bg-gray-800 text-white p-3 rounded-lg pr-10" />
          </div>

          <div>
            <select value={filters.fileType} onChange={e => setFilters(prev => ({
            ...prev,
            fileType: e.target.value
          }))} className="w-full bg-gray-800 text-white p-3 rounded-lg">
              <option value="">كل أنواع الملفات</option>
              <option value="pdf">PDF</option>
              <option value="docx">Word</option>
              <option value="xlsx">Excel</option>
            </select>
          </div>
        </div>

        {/* Courses and Files */}
        {filteredCourses.map(course => <motion.div key={course.id} initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <FaFolder className="text-blue-500 text-2xl ml-4" />
              <h2 className="text-2xl font-bold">{course.title}</h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {course.files.map(file => {
            const FileIcon = getFileIcon(file.type);
            return <motion.div key={file.id} whileHover={{
              scale: 1.02
            }} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <FileIcon className={`
                          ${file.type === 'pdf' ? 'text-red-500' : file.type === 'docx' ? 'text-blue-500' : 'text-green-500'} text-2xl
                        `} />
                        <h3 className="font-bold">{file.name}</h3>
                      </div>
                      <span className="text-sm text-gray-400">{file.size}</span>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-400">
                        <FaEye />
                        <span>{file.views} مشاهدة</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-400">
                        <FaDownload />
                        <span>آخر وصول: {file.lastAccessed}</span>
                      </div>
                    </div>
                  </motion.div>;
          })}
            </div>
          </motion.div>)}

        {filteredCourses.length === 0 && <div className="text-center text-gray-400 py-12">
            لا توجد نتائج مطابقة للبحث
          </div>}
      </div>
    </div>;
};
export default ProjectArchive;
export { ProjectArchive };