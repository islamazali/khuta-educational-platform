import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaBook, FaClipboardList, FaChartBar, FaCog } from 'react-icons/fa';
import UserManagement from '../../components/admin/UserManagement';
import CourseManagement from '../../components/admin/CourseManagement';
import ContentControl from '../../components/admin/ContentControl';
import RevisionTracking from '../../components/admin/RevisionTracking';
const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('users');
  const sections = [{
    id: 'users',
    title: 'إدارة المتدربين',
    icon: FaUsers,
    component: UserManagement
  }, {
    id: 'courses',
    title: 'إدارة الدورات',
    icon: FaBook,
    component: CourseManagement
  }, {
    id: 'content',
    title: 'التحكم بالمحتوى',
    icon: FaClipboardList,
    component: ContentControl
  }, {
    id: 'revisions',
    title: 'تتبع التعديلات',
    icon: FaChartBar,
    component: RevisionTracking
  }];
  const ActiveComponent = sections.find(s => s.id === activeSection)?.component || UserManagement;
  return <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Dashboard Header */}
        <motion.div initial={{
        opacity: 0,
        y: -50
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">لوحة التحكم الإدارية</h1>
          <p className="text-xl text-gray-300">
            منصة إدارة خطى التعليمية
          </p>
        </motion.div>

        {/* Admin Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 rounded-lg p-2 flex space-x-2 rtl:space-x-reverse">
            {sections.map(section => <motion.button key={section.id} whileHover={{
            scale: 1.05
          }} whileTap={{
            scale: 0.95
          }} onClick={() => setActiveSection(section.id)} className={`
                  flex items-center 
                  space-x-2 
                  rtl:space-x-reverse
                  px-4 
                  py-2 
                  rounded-md 
                  transition-colors 
                  duration-300
                  ${activeSection === section.id ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
                `}>
                <section.icon />
                <span>{section.title}</span>
              </motion.button>)}
          </div>
        </div>

        {/* Active Section Component */}
        <motion.div key={activeSection} initial={{
        opacity: 0,
        y: 50
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.3
      }}>
          <ActiveComponent />
        </motion.div>
      </div>
    </div>;
};
export default AdminDashboard;
export { AdminDashboard };