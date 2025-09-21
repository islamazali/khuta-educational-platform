import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFile, FaFilePdf, FaFileWord, FaFileExcel, FaFilter, FaTimes } from 'react-icons/fa';

// Utility function to highlight matched text
const highlightText = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.split(regex).map((part, index) => part.toLowerCase() === query.toLowerCase() ? <mark key={index} className="bg-yellow-200 text-black">{part}</mark> : part);
};

// File type icon mapping
const FILE_ICONS = {
  'pdf': FaFilePdf,
  'docx': FaFileWord,
  'xlsx': FaFileExcel,
  'default': FaFile
};
const SmartSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [filters, setFilters] = useState({
    fileType: '',
    dateRange: '',
    tags: []
  });
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  // Dummy searchable content (would be replaced with actual backend search)
  const searchableContent = [{
    id: 1,
    title: 'تقرير تحليل البيانات الربع السنوي',
    type: 'pdf',
    date: '15 سبتمبر 2025',
    tags: ['تحليل', 'بيانات'],
    content: 'تقرير شامل يغطي تحليل البيانات للربع السنوي مع استراتيجيات مستقبلية'
  }, {
    id: 2,
    title: 'استراتيجية التسويق الرقمي',
    type: 'docx',
    date: '10 سبتمبر 2025',
    tags: ['تسويق', 'رقمي'],
    content: 'دراسة متكاملة للاستراتيجيات التسويقية في العصر الرقمي'
  }, {
    id: 3,
    title: 'تقرير مالي',
    type: 'xlsx',
    date: '5 سبتمبر 2025',
    tags: ['مالي', 'تقارير'],
    content: 'تحليل مفصل للبيانات المالية والتوقعات المستقبلية'
  }];

  // Smart search function
  const performSearch = () => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }
    const results = searchableContent.filter(item => {
      const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFileType = !filters.fileType || item.type === filters.fileType;
      const matchesDateRange = !filters.dateRange || item.date === filters.dateRange;
      const matchesTags = filters.tags.length === 0 || filters.tags.some(tag => item.tags.includes(tag));
      return matchesQuery && matchesFileType && matchesDateRange && matchesTags;
    });
    setSearchResults(results);
  };

  // Trigger search on query or filter changes
  useEffect(() => {
    performSearch();
  }, [searchQuery, filters]);

  // Advanced search toggle
  const toggleAdvancedSearch = () => {
    setIsAdvancedSearchOpen(!isAdvancedSearchOpen);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      fileType: '',
      dateRange: '',
      tags: []
    });
  };
  return <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center space-x-2 rtl:space-x-reverse mb-6">
        <FaSearch className="text-blue-500 text-xl" />
        <h3 className="text-2xl font-bold">البحث الذكي</h3>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <input ref={searchInputRef} type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="ابحث في الملفات والتقارير..." className="
            w-full 
            bg-gray-700 
            text-white 
            p-3 
            rounded-lg 
            pr-10
            focus:outline-none 
            focus:ring-2 
            focus:ring-blue-500
          " />
        {searchQuery && <button onClick={() => setSearchQuery('')} className="
              absolute 
              left-3 
              top-1/2 
              transform 
              -translate-y-1/2 
              text-gray-400 
              hover:text-white
            ">
            <FaTimes />
          </button>}
      </div>

      {/* Advanced Search Toggle */}
      <div className="flex justify-between items-center mb-4">
        <motion.button whileHover={{
        scale: 1.05
      }} onClick={toggleAdvancedSearch} className="
            flex 
            items-center 
            space-x-2 
            rtl:space-x-reverse
            text-blue-400 
            hover:text-blue-300
          ">
          <FaFilter />
          <span>بحث متقدم</span>
        </motion.button>

        {(filters.fileType || filters.dateRange || filters.tags.length > 0) && <motion.button whileHover={{
        scale: 1.05
      }} onClick={resetFilters} className="
              text-red-400 
              hover:text-red-300
            ">
            مسح الفلاتر
          </motion.button>}
      </div>

      {/* Advanced Search Filters */}
      {isAdvancedSearchOpen && <motion.div initial={{
      opacity: 0,
      height: 0
    }} animate={{
      opacity: 1,
      height: 'auto'
    }} className="bg-gray-700 p-4 rounded-lg mb-4 space-y-4">
          {/* File Type Filter */}
          <div>
            <label className="block mb-2 text-white">نوع الملف</label>
            <select value={filters.fileType} onChange={e => setFilters(prev => ({
          ...prev,
          fileType: e.target.value
        }))} className="w-full bg-gray-800 text-white p-2 rounded-lg">
              <option value="">كل أنواع الملفات</option>
              <option value="pdf">PDF</option>
              <option value="docx">Word</option>
              <option value="xlsx">Excel</option>
            </select>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block mb-2 text-white">التاريخ</label>
            <select value={filters.dateRange} onChange={e => setFilters(prev => ({
          ...prev,
          dateRange: e.target.value
        }))} className="w-full bg-gray-800 text-white p-2 rounded-lg">
              <option value="">كل التواريخ</option>
              <option value="15 سبتمبر 2025">15 سبتمبر 2025</option>
              <option value="10 سبتمبر 2025">10 سبتمبر 2025</option>
              <option value="5 سبتمبر 2025">5 سبتمبر 2025</option>
            </select>
          </div>

          {/* Tags Filter */}
          <div>
            <label className="block mb-2 text-white">العلامات</label>
            <div className="flex flex-wrap gap-2">
              {['تحليل', 'تسويق', 'مالي', 'بيانات', 'رقمي'].map(tag => <motion.button key={tag} whileHover={{
            scale: 1.1
          }} onClick={() => {
            setFilters(prev => ({
              ...prev,
              tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag]
            }));
          }} className={`
                    px-3 
                    py-1 
                    rounded-full 
                    text-sm 
                    ${filters.tags.includes(tag) ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'}
                  `}>
                  {tag}
                </motion.button>)}
            </div>
          </div>
        </motion.div>}

      {/* Search Results */}
      {searchResults.length > 0 ? <div className="space-y-4">
          {searchResults.map(result => {
        const FileIcon = FILE_ICONS[result.type] || FILE_ICONS.default;
        return <motion.div key={result.id} initial={{
          opacity: 0,
          y: -10
        }} animate={{
          opacity: 1,
          y: 0
        }} className="
                  bg-gray-700 
                  p-4 
                  rounded-lg 
                  flex 
                  items-center 
                  space-x-4 
                  rtl:space-x-reverse
                  hover:bg-gray-600
                  transition-colors
                ">
                <FileIcon className={`
                  text-3xl 
                  ${result.type === 'pdf' ? 'text-red-500' : result.type === 'docx' ? 'text-blue-500' : 'text-green-500'}
                `} />
                <div className="flex-grow">
                  <h4 className="font-bold text-white">
                    {highlightText(result.title, searchQuery)}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {highlightText(result.content.slice(0, 100) + '...', searchQuery)}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>{result.date}</span>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      {result.tags.map(tag => <span key={tag} className="
                            bg-gray-600 
                            text-gray-300 
                            px-2 
                            py-1 
                            rounded-full
                          ">
                          {tag}
                        </span>)}
                    </div>
                  </div>
                </div>
              </motion.div>;
      })}
        </div> : searchQuery ? <div className="text-center text-gray-400 py-4">
          لم يتم العثور على نتائج
        </div> : null}
    </div>;
};
export default SmartSearch;
export { SmartSearch };