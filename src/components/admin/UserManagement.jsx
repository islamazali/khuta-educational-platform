import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaFilter, FaUserTie, FaUsers } from 'react-icons/fa';
const UserManagement = () => {
  const [users, setUsers] = useState([{
    id: 1,
    name: 'محمد الشهري',
    email: 'mohammed@example.com',
    phone: '+966501234567',
    type: 'فرد',
    courses: 3,
    lastActive: '2025-09-15'
  }, {
    id: 2,
    name: 'شركة تك سولوشنز',
    email: 'info@techsolutions.sa',
    phone: '+966112345678',
    type: 'شركة',
    courses: 5,
    lastActive: '2025-09-10'
  }]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState('فرد');
  const handleAddUser = () => {
    setCurrentUser(null);
    setIsAddModalOpen(true);
  };
  const handleEditUser = user => {
    setCurrentUser(user);
    setUserType(user.type);
    setIsAddModalOpen(true);
  };
  const handleDeleteUser = userId => {
    setUsers(users.filter(user => user.id !== userId));
  };
  const UserModal = () => {
    const [formData, setFormData] = useState(currentUser ? {
      ...currentUser
    } : {
      name: '',
      email: '',
      phone: '',
      type: userType
    });
    const handleSubmit = e => {
      e.preventDefault();
      if (currentUser) {
        // Edit existing user
        setUsers(users.map(user => user.id === currentUser.id ? {
          ...formData,
          id: currentUser.id
        } : user));
      } else {
        // Add new user
        setUsers([...users, {
          ...formData,
          id: users.length + 1,
          courses: 0
        }]);
      }
      setIsAddModalOpen(false);
    };
    return <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-8 w-96">
          <h2 className="text-2xl font-bold mb-6 text-white">
            {currentUser ? 'تعديل المستخدم' : 'إضافة مستخدم جديد'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Type Selection */}
            <div className="flex justify-center space-x-4 rtl:space-x-reverse mb-4">
              <button type="button" onClick={() => setUserType('فرد')} className={`
                  flex items-center space-x-2 rtl:space-x-reverse
                  px-4 py-2 rounded-lg
                  ${userType === 'فرد' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}
                `}>
                <FaUsers />
                <span>فرد</span>
              </button>
              <button type="button" onClick={() => setUserType('شركة')} className={`
                  flex items-center space-x-2 rtl:space-x-reverse
                  px-4 py-2 rounded-lg
                  ${userType === 'شركة' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}
                `}>
                <FaUserTie />
                <span>شركة</span>
              </button>
            </div>

            {/* Name Input */}
            <input type="text" placeholder="الاسم" value={formData.name} onChange={e => setFormData({
            ...formData,
            name: e.target.value
          })} className="w-full bg-gray-700 text-white p-3 rounded-lg" required />

            {/* Email Input */}
            <input type="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={e => setFormData({
            ...formData,
            email: e.target.value
          })} className="w-full bg-gray-700 text-white p-3 rounded-lg" required />

            {/* Phone Input */}
            <input type="tel" placeholder="رقم الهاتف" value={formData.phone} onChange={e => setFormData({
            ...formData,
            phone: e.target.value
          })} className="w-full bg-gray-700 text-white p-3 rounded-lg" required />

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
        <h2 className="text-2xl font-bold text-white">إدارة المستخدمين</h2>
        
        <div className="flex space-x-2 rtl:space-x-reverse">
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={handleAddUser} className="
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
            <span>إضافة مستخدم</span>
          </motion.button>
          
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} className="
              bg-gray-700 
              text-white 
              px-4 
              py-2 
              rounded-lg 
              hover:bg-gray-600
            ">
            <FaFilter />
          </motion.button>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="p-3 text-right">الاسم</th>
              <th className="p-3 text-right">البريد الإلكتروني</th>
              <th className="p-3 text-right">رقم الهاتف</th>
              <th className="p-3 text-right">النوع</th>
              <th className="p-3 text-right">الدورات</th>
              <th className="p-3 text-right">آخر نشاط</th>
              <th className="p-3 text-right">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => <motion.tr key={user.id} initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                <td className="p-3 text-white">{user.name}</td>
                <td className="p-3 text-gray-300">{user.email}</td>
                <td className="p-3 text-gray-300">{user.phone}</td>
                <td className="p-3">
                  <span className={`
                      px-2 
                      py-1 
                      rounded-full 
                      text-sm 
                      ${user.type === 'فرد' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}
                    `}>
                    {user.type}
                  </span>
                </td>
                <td className="p-3 text-gray-300">{user.courses}</td>
                <td className="p-3 text-gray-300">{user.lastActive}</td>
                <td className="p-3">
                  <div className="flex space-x-2 rtl:space-x-reverse">
                    <motion.button whileHover={{
                  scale: 1.1
                }} whileTap={{
                  scale: 0.9
                }} onClick={() => handleEditUser(user)} className="text-yellow-500 hover:text-yellow-600">
                      <FaEdit />
                    </motion.button>
                    <motion.button whileHover={{
                  scale: 1.1
                }} whileTap={{
                  scale: 0.9
                }} onClick={() => handleDeleteUser(user.id)} className="text-red-500 hover:text-red-600">
                      <FaTrash />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>)}
          </tbody>
        </table>
      </div>

      {/* Add/Edit User Modal */}
      {isAddModalOpen && <UserModal />}
    </div>;
};
export default UserManagement;
export { UserManagement };