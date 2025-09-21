import React, { useState } from 'react';
import PDFFileCard from '../components/PDFFileCard';
import { FaSearch, FaFilter } from 'react-icons/fa';
const fileData = [{
  fileName: 'مقدمة في الذكاء الاصطناعي.pdf',
  fileSize: '2.5 MB',
  uploadDate: '15 سبتمبر 2023',
  isProtected: false,
  fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  fileType: 'pdf'
}, {
  fileName: 'استراتيجيات التسويق الرقمي.pdf',
  fileSize: '3.2 MB',
  uploadDate: '22 أغسطس 2023',
  isProtected: true,
  fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  fileType: 'pdf'
}, {
  fileName: 'دليل تطوير المهارات القيادية.pdf',
  fileSize: '1.8 MB',
  uploadDate: '5 يوليو 2023',
  isProtected: false,
  fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  fileType: 'pdf'
}];
const FileLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterProtected, setFilterProtected] = useState(false);

  // Filter files based on search and protection status
  const filteredFiles = fileData.filter(file => file.fileName.toLowerCase().includes(searchTerm.toLowerCase()) && (!filterProtected || file.isProtected));
  return <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
        مكتبة الملفات
      </h1>

      {/* شريط البحث والفلترة */}
      <div className="max-w-xl mx-auto mb-12 space-y-4">
        <div className="relative">
          <input type="text" placeholder="ابحث عن ملف..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="
              w-full px-4 py-3 pr-12 
              bg-white border border-gray-300 
              rounded-lg text-right
              focus:outline-none focus:ring-2 focus:ring-blue-500
            " />
          <FaSearch className="
              absolute left-4 top-1/2 transform -translate-y-1/2
              text-gray-400
            " />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 rtl:space-x-reverse">
            <input type="checkbox" checked={filterProtected} onChange={() => setFilterProtected(!filterProtected)} className="form-checkbox text-blue-600" />
            <span className="text-gray-700">
              عرض الملفات المحمية فقط
            </span>
          </label>

          <button className="
              flex items-center space-x-2 rtl:space-x-reverse
              bg-blue-50 text-blue-600 
              px-4 py-2 rounded-lg
              hover:bg-blue-100 transition-colors
            ">
            <FaFilter />
            <span>فلترة</span>
          </button>
        </div>
      </div>

      {/* قائمة الملفات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFiles.length > 0 ? filteredFiles.map((file, index) => <PDFFileCard key={index} {...file} />) : <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-xl">
              لم يتم العثور على ملفات
            </p>
          </div>}
      </div>

      {/* زر المزيد */}
      <div className="text-center mt-12">
        <button className="
            bg-blue-600 text-white 
            px-6 py-3 rounded-lg 
            hover:bg-blue-700 
            transition-colors
          ">
          تحميل المزيد من الملفات
        </button>
      </div>
    </div>;
};
export default FileLibrary;
export { FileLibrary };