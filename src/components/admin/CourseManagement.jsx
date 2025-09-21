import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaLock, FaUnlock, FaCalendarAlt, FaFileUpload } from 'react-icons/fa';
const CourseManagement = () => {
  const [courses, setCourses] = useState([{
    id: 1,
    title: 'تحليل البيانات المتقدم',
    type: 'طويلة',
    startDate: '2025-10-01',
    endDate: '2026-02-28',
    status: 'مفتوحة',
    students: 45,
    files: 12
  }, {
    id: 2,
    title: 'مهارات التواصل',
    type: 'قصيرة',
    startDate: '2025-11-15',
    endDate: '2025-12-15',
    status: 'مغلقة',
    students: 30,
    files: 8
  }]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const handleAddCourse = () => {
    setCurrentCourse(null);
    setIsAddModalOpen(true);
  };
  const handleEditCourse = course => {
    setCurrentCourse(course);
    setIsAddModalOpen(true);
  };
  const handleDeleteCourse = courseId => {
    setCourses(courses.filter(course => course.id !== courseId));
  };
  const toggleCourseStatus = courseId => {
    setCourses(courses.map(course => course.id === courseId ? {
      ...course,
      status: course.status === 'مفتوحة' ? 'مغلقة' : 'مفتوحة'
    } : course));
  };
  const CourseModal = () => {
    const [formData, setFormData] = useState(currentCourse ? {
      ...currentCourse
    } : {
      title: '',
      type: 'قصيرة',
      startDate: '',
      endDate: '',
      files: []
    });
    const handleSubmit = e => {
      e.preventDefault();
      if (currentCourse) {
        // Edit existing course
        setCourses(courses.map(course => course.id === currentCourse.id ? {
          ...formData,
          id: currentCourse.id
        } : course));
      } else {
        // Add new course
        setCourses([...courses, {
          ...formData,
          id: courses.length + 1,
          status: 'مفتوحة',
          students: 0
        }]);
      }
      setIsAddModalOpen(false);
    };
    const handleFileUpload = e => {
      const files = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: `${(file.size / 1024).toFixed(2)} KB`
      }));
      setFormData(prev => ({
        ...prev,
        files
      }));
    };
    return <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-8 w-[500px]">
          <h2 className="text-2xl font-bold mb-6 text-white">
            {currentCourse ? 'تعديل الدورة' : 'إضافة دورة جديدة'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Course Type Selection */}
            <div className="flex justify-center space-x-4 rtl:space-x-reverse mb-4">
              <button type="button" onClick={() => setFormData(prev => ({
              ...prev,
              type: 'قصيرة'
            }))} className={`
                  flex items-center space-x-2 rtl:space-x-reverse
                  px-4 py-2 rounded-lg
                  ${formData.type === 'قصيرة' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}
                `}>
                <span>دورة قصيرة</span>
              </button>
              <button type="button" onClick={() => setFormData(prev => ({
              ...prev,
              type: 'طويلة'
            }))} className={`
                  flex items-center space-x-2 rtl:space-x-reverse
                  px-4 py-2 rounded-lg
                  ${formData.type === 'طويلة' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}
                `}>
                <span>دورة طويلة</span>
              </button>
            </div>

            {/* Course Title */}
            <input type="text" placeholder="اسم الدورة" value={formData.title} onChange={e => setFormData({
            ...formData,
            title: e.target.value
          })} className="w-full bg-gray-700 text-white p-3 rounded-lg" required />

            {/* Date Inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <FaCalendarAlt className="absolute top-4 right-3 text-gray-400" />
                <input type="date" placeholder="تاريخ البداية" value={formData.startDate} onChange={e => setFormData({
                ...formData,
                startDate: e.target.value
              })} className="w-full bg-gray-700 text-white p-3 rounded-lg pr-10" required />
              </div>
              <div className="relative">
                <FaCalendarAlt className="absolute top-4 right-3 text-gray-400" />
                <input type="date" placeholder="تاريخ النهاية" value={formData.endDate} onChange={e => setFormData({
                ...formData,
                endDate: e.target.value
              })} className="w-full bg-gray-700 text-white p-3 rounded-lg pr-10" required />
              </div>
            </div>

            {/* File Upload */}
            <div className="bg-gray-700 p-4 rounded-lg">
              <label className="flex items-center justify-center w-full">
                <input type="file" multiple onChange={handleFileUpload} className="hidden" />
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-white">
                  <FaFileUpload />
                  <span>
                    {formData.files && formData.files.length > 0 ? `تم رفع ${formData.files.length} ملف` : 'رفع الملفات'}
                  </span>
                </div>
              </label>

              {/* Uploaded Files List */}
              {formData.files && formData.files.length > 0 && <div className="mt-4 space-y-2">
                  {formData.files.map((file, index) => <div key={index} className="flex justify-between bg-gray-600 p-2 rounded">
                      <span className="text-white">{file.name}</span>
                      <span className="text-gray-400">{file.size}</span>
                    </div>)}
                </div>}
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4 rtl:space-x-reverse">
              <button type="submit" className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
                حفظ
              </button>
              <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-600">
                إلغاء
              </button>
            </div>
          </form>
        </div>
      </motion.div>;
  };
  return <div className="bg-gray-800 rounded-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">إدارة الدورات</h2>
        
        <motion.button whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} onClick={handleAddCourse} className="
            flex items-center 
            space-x-2 
            rtl:space-x-reverse
            bg-blue-600 
            text-white 
            px-4 
            py-2 
            rounded-lg 
            hover:bg-blue-700
          ">
          <FaPlus />
          <span>إضافة دورة</span>
        </motion.button>
      </div>

      {/* Courses Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-3 text-right">اسم الدورة</th>
              <th className="p-3 text-right">النوع</th>
              <th className="p-3 text-right">تاريخ البداية</th>
              <th className="p-3 text-right">تاريخ النهاية</th>
              <th className="p-3 text-right">الحالة</th>
              <th className="p-3 text-right">الطلاب</th>
              <th className="p-3 text-right">الملفات</th>
              <th className="p-3 text-right">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => <motion.tr key={course.id} initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                <td className="p-3 text-white">{course.title}</td>
                <td className="p-3">
                  <span className={`
                      px-2 
                      py-1 
                      rounded-full 
                      text-sm 
                      ${course.type === 'قصيرة' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}
                    `}>
                    {course.type}
                  </span>
                </td>
                <td className="p-3 text-gray-300">{course.startDate}</td>
                <td className="p-3 text-gray-300">{course.endDate}</td>
                <td className="p-3">
                  <span className={`
                      px-2 
                      py-1 
                      rounded-full 
                      text-sm 
                      ${course.status === 'مفتوحة' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
                    `}>
                    {course.status}
                  </span>
                </td>
                <td className="p-3 text-gray-300">{course.students}</td>
                <td className="p-3 text-gray-300">{course.files}</td>
                <td className="p-3">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <motion.button whileHover={{
                  scale: 1.1
                }} whileTap={{
                  scale: 0.9
                }} onClick={() => toggleCourseStatus(course.id)} className={course.status === 'مفتوحة' ? 'text-red-500 hover:text-red-600' : 'text-green-500 hover:text-green-600'}>
                      {course.status === 'مفتوحة' ? <FaLock /> : <FaUnlock />}
                    </motion.button>
                    <motion.button whileHover={{
                  scale: 1.1
                }} whileTap={{
                  scale: 0.9
                }} onClick={() => handleEditCourse(course)} className="text-yellow-500 hover:text-yellow-600">
                      <FaEdit />
                    </motion.button>
                    <motion.button whileHover={{
                  scale: 1.1
                }} whileTap={{
                  scale: 0.9
                }} onClick={() => handleDeleteCourse(course.id)} className="text-red-500 hover:text-red-600">
                      <FaTrash />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>)}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Course Modal */}
      {isAddModalOpen && <CourseModal />}
    </div>;
};
export default CourseManagement;
export { CourseManagement };