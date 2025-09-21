import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaDownload, FaShareAlt, FaLock, FaUnlock, FaChartLine, FaChartBar, FaPieChart } from 'react-icons/fa';
const PremiumReports = () => {
  const [selectedClient, setSelectedClient] = useState(null);
  const [reports, setReports] = useState([{
    id: 1,
    client: 'شركة التقنية المتقدمة',
    logo: 'https://via.placeholder.com/150?text=Advanced+Tech',
    reports: [{
      id: 'report1',
      title: 'تقرير تحليل البيانات الربع السنوي',
      type: 'تحليلي',
      date: '15 سبتمبر 2025',
      icon: FaChartLine,
      isLocked: true
    }, {
      id: 'report2',
      title: 'مراجعة استراتيجية التسويق الرقمي',
      type: 'استراتيجي',
      date: '10 سبتمبر 2025',
      icon: FaChartBar,
      isLocked: false
    }]
  }, {
    id: 2,
    client: 'مؤسسة الابتكار',
    logo: 'https://via.placeholder.com/150?text=Innovation+Co',
    reports: [{
      id: 'report3',
      title: 'تقرير التحول الرقمي',
      type: 'تحولي',
      date: '5 سبتمبر 2025',
      icon: FaPieChart,
      isLocked: true
    }]
  }]);
  const toggleReportLock = (clientId, reportId) => {
    setReports(prev => prev.map(client => client.id === clientId ? {
      ...client,
      reports: client.reports.map(report => report.id === reportId ? {
        ...report,
        isLocked: !report.isLocked
      } : report)
    } : client));
  };
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
          <h1 className="text-4xl font-bold mb-4">التقارير المميزة</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            تقارير مخصصة ومصممة بهوية العميل
          </p>
        </motion.div>

        {/* Clients Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map(client => <motion.div key={client.id} whileHover={{
          scale: 1.05
        }} className="
                bg-gray-800 
                rounded-lg 
                p-6 
                text-center 
                hover:shadow-lg 
                transition-all 
                duration-300
              " onClick={() => setSelectedClient(client)}>
              {/* Client Logo */}
              <div className="flex justify-center mb-6">
                <img src={client.logo} alt={`شعار ${client.client}`} className="
                    w-32 
                    h-32 
                    object-contain 
                    rounded-full 
                    border-4 
                    border-blue-500
                  " />
              </div>

              {/* Client Name */}
              <h2 className="text-2xl font-bold mb-4">{client.client}</h2>

              {/* Reports Count */}
              <div className="
                bg-gray-700 
                rounded-lg 
                p-3 
                flex 
                justify-between 
                items-center
              ">
                <span>عدد التقارير</span>
                <span className="
                  bg-blue-600 
                  text-white 
                  rounded-full 
                  w-8 
                  h-8 
                  flex 
                  items-center 
                  justify-center
                ">
                  {client.reports.length}
                </span>
              </div>
            </motion.div>)}
        </div>

        {/* Selected Client Reports Modal */}
        {selectedClient && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} className="
              fixed 
              inset-0 
              bg-black 
              bg-opacity-50 
              z-50 
              flex 
              items-center 
              justify-center
            " onClick={() => setSelectedClient(null)}>
            <motion.div initial={{
          scale: 0.8
        }} animate={{
          scale: 1
        }} className="
                bg-gray-800 
                rounded-lg 
                p-8 
                w-[600px] 
                max-h-[80vh] 
                overflow-y-auto
              " onClick={e => e.stopPropagation()}>
              {/* Client Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <img src={selectedClient.logo} alt={`شعار ${selectedClient.client}`} className="w-16 h-16 rounded-full" />
                  <h2 className="text-2xl font-bold">{selectedClient.client}</h2>
                </div>
                <button onClick={() => setSelectedClient(null)} className="text-gray-400 hover:text-white">
                  ✕
                </button>
              </div>

              {/* Reports List */}
              <div className="space-y-4">
                {selectedClient.reports.map(report => {
              const ReportIcon = report.icon;
              return <motion.div key={report.id} whileHover={{
                scale: 1.02
              }} className="
                        bg-gray-700 
                        p-4 
                        rounded-lg 
                        flex 
                        items-center 
                        justify-between
                      ">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <ReportIcon className="text-2xl text-blue-500" />
                        <div>
                          <h3 className="font-bold">{report.title}</h3>
                          <p className="text-sm text-gray-400">
                            {report.type} | {report.date}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-2 rtl:space-x-reverse">
                        <motion.button whileHover={{
                    scale: 1.1
                  }} className={`
                            p-2 
                            rounded-full 
                            ${report.isLocked ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}
                          `} onClick={() => toggleReportLock(selectedClient.id, report.id)}>
                          {report.isLocked ? <FaLock /> : <FaUnlock />}
                        </motion.button>

                        <motion.button whileHover={{
                    scale: 1.1
                  }} className="
                            bg-blue-500 
                            text-white 
                            p-2 
                            rounded-full
                          " disabled={report.isLocked}>
                          <FaDownload />
                        </motion.button>

                        <motion.button whileHover={{
                    scale: 1.1
                  }} className="
                            bg-green-500 
                            text-white 
                            p-2 
                            rounded-full
                          " disabled={report.isLocked}>
                          <FaShareAlt />
                        </motion.button>
                      </div>
                    </motion.div>;
            })}
              </div>
            </motion.div>
          </motion.div>}
      </div>
    </div>;
};
export default PremiumReports;
export { PremiumReports };