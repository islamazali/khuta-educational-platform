import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHdd } from 'react-icons/fa';
const StorageTracker = () => {
  const [storageUsed, setStorageUsed] = useState(0);
  const MAX_STORAGE = 5 * 1024; // 5 GB in MB

  useEffect(() => {
    // Simulate storage calculation from localStorage
    const calculateStorageUsage = () => {
      let totalSize = 0;

      // Iterate through localStorage and calculate size
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        // Estimate size (1 character ≈ 2 bytes)
        totalSize += value ? value.length * 2 : 0;
      }

      // Convert to MB and round
      const sizeInMB = Math.round(totalSize / (1024 * 1024));
      setStorageUsed(sizeInMB);
    };
    calculateStorageUsage();
  }, []);

  // Calculate percentage and color
  const storagePercentage = Math.min(storageUsed / MAX_STORAGE * 100, 100);
  const progressColor = storagePercentage < 70 ? 'bg-green-500' : storagePercentage < 90 ? 'bg-yellow-500' : 'bg-red-500';
  return <div className="bg-gray-800 rounded-lg p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <FaHdd className="text-blue-400 text-2xl" />
          <h3 className="text-xl font-bold">مساحة التخزين الشخصية</h3>
        </div>
        <span className="text-gray-400">
          {storageUsed} / {MAX_STORAGE} ميجابايت
        </span>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-4 mb-2">
        <motion.div initial={{
        width: 0
      }} animate={{
        width: `${storagePercentage}%`
      }} transition={{
        duration: 0.5,
        type: 'spring'
      }} className={`
            h-full 
            rounded-full 
            ${progressColor}
            transition-all 
            duration-300
          `} />
      </div>

      <div className="flex justify-between text-sm text-gray-400">
        <span>0 MB</span>
        <span>{MAX_STORAGE} MB</span>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm">
          {storagePercentage < 70 ? 'مساحة التخزين متاحة' : storagePercentage < 90 ? 'مساحة التخزين تقترب من الحد الأقصى' : 'مساحة التخزين وشيكة الامتلاء'}
        </p>
      </div>
    </div>;
};
export default StorageTracker;
export { StorageTracker };