import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaVideo, 
  FaFileUpload, 
  FaDesktop, 
  FaComments, 
  FaUserShield,
  FaLock,
  FaUnlock,
  FaEye,
  FaEdit,
  FaTrash
} from 'react-icons/fa';

// Team Members Component
const TeamMembers = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'محمد الشهري',
      role: 'مدير المشروع',
      status: 'متصل',
      permissions: ['كامل']
    },
    {
      id: 2,
      name: 'سارة العتيبي',
      role: 'محلل بيانات',
      status: 'غير متصل',
      permissions: ['قراءة', 'تعديل']
    },
    {
      id: 3,
      name: 'أحمد القحطاني',
      role: 'مطور',
      status: 'مشغول',
      permissions: ['قراءة']
    }
  ]);

  const [selectedMember, setSelectedMember] = useState(null);

  const toggleMemberPermissions = (memberId) => {
    setMembers(prev => 
      prev.map(member => 
        member.id === memberId 
          ? { 
              ...member, 
              permissions: member.permissions.includes('كامل')
                ? ['قراءة', 'تعديل']
                : ['كامل']
            } 
          : member
      )
    );
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <FaUsers className="text-blue-500 text-2xl" />
          <h3 className="text-2xl font-bold">أعضاء الفريق</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="
            bg-blue-600 
            text-white 
            px-4 
            py-2 
            rounded-lg 
            flex 
            items-center 
            space-x-2 
            rtl:space-x-reverse
          "
        >
          <FaUserShield />
          <span>إضافة عضو</span>
        </motion.button>
      </div>

      <div className="space-y-4">
        {members.map((member) => (
          <motion.div
            key={member.id}
            whileHover={{ scale: 1.02 }}
            className="
              bg-gray-700 
              p-4 
              rounded-lg 
              flex 
              items-center 
              justify-between
            "
          >
            <div>
              <h4 className="font-bold">{member.name}</h4>
              <p className="text-sm text-gray-400">{member.role}</p>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span 
                className={`
                  px-2 
                  py-1 
                  rounded-full 
                  text-xs 
                  ${member.status === 'متصل' 
                    ? 'bg-green-500/20 text-green-400' 
                    : member.status === 'مشغول'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'}
                `}
              >
                {member.status}
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                onClick={() => toggleMemberPermissions(member.id)}
                className={`
                  p-2 
                  rounded-full 
                  ${member.permissions.includes('كامل')
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 text-white'}
                `}
              >
                {member.permissions.includes('كامل') 
                  ? <FaUnlock /> 
                  : <FaLock />}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Digital Meeting Room Component
const DigitalMeetingRoom = () => {
  const [files, setFiles] = useState([]);
  const [screenSharing, setScreenSharing] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files).map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)} KB`
    }));
    setFiles(prev => [...prev, ...uploadedFiles]);
  };

  const addComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: 'المستخدم الحالي',
      text: newComment,
      timestamp: new Date().toLocaleTimeString('ar-SA')
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <FaVideo className="text-blue-500 text-2xl" />
          <h3 className="text-2xl font-bold">غرفة الاجتماعات الرقمية</h3>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => setScreenSharing(!screenSharing)}
          className={`
            flex 
            items-center 
            space-x-2 
            rtl:space-x-reverse
            px-4 
            py-2 
            rounded-lg 
            ${screenSharing 
              ? 'bg-red-600 text-white' 
              : 'bg-blue-600 text-white'}
          `}
        >
          <FaDesktop />
          <span>
            {screenSharing ? 'إيقاف مشاركة الشاشة' : 'مشاركة الشاشة'}
          </span>
        </motion.button>
      </div>

      {/* File Upload Section */}
      <div className="mb-6">
        <input
          type="file"
          multiple
          onChange={handleFileUpload}
          className="hidden"
          id="meeting-file-upload"
        />
        <label 
          htmlFor="meeting-file-upload"
          className="
            w-full 
            flex 
            items-center 
            justify-center 
            space-x-2 
            rtl:space-x-reverse
            bg-gray-700 
            text-white 
            p-4 
            rounded-lg 
            cursor-pointer 
            hover:bg-gray-600
          "
        >
          <FaFileUpload />
          <span>رفع الملفات</span>
        </label>

        {/* Uploaded Files List */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file) => (
              <div 
                key={file.id} 
                className="
                  flex 
                  items-center 
                  justify-between 
                  bg-gray-700 
                  p-2 
                  rounded
                "
              >
                <span>{file.name}</span>
                <span className="text-sm text-gray-400">{file.size}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comments Section */}
      <div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
          <FaComments className="text-blue-500" />
          <h4 className="font-bold">التعليقات</h4>
        </div>

        {/* Comments List */}
        <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
          {comments.map((comment) => (
            <div 
              key={comment.id} 
              className="bg-gray-700 p-2 rounded"
            >
              <div className="flex justify-between">
                <span className="font-bold">{comment.author}</span>
                <span className="text-sm text-gray-400">{comment.timestamp}</span>
              </div>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>

        {/* Add Comment */}
        <div className="flex space-x-2 rtl:space-x-reverse">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="أضف تعليقًا..."
            className="
              flex-grow 
              bg-gray-700 
              text-white 
              p-2 
              rounded-lg
            "
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={addComment}
            className="
              bg-blue-600 
              text-white 
              p-2 
              rounded-lg
            "
          >
            إرسال
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// Audit Trail Component
const AuditTrail = () => {
  const [auditLogs, setAuditLogs] = useState([
    {
      id: 1,
      user: 'محمد الشهري',
      action: 'تعديل',
      file: 'تقرير تحليل البيانات.pdf',
      timestamp: '15 سبتمبر 2025 10:30',
      details: 'تحديث الفصل الثالث'
    },
    {
      id: 2,
      user: 'سارة العتيبي',
      action: 'رفع',
      file: 'عرض تقديمي.pptx',
      timestamp: '10 سبتمبر 2025 14:45',
      details: 'إضافة شرائح جديدة'
    }
  ]);

  const [filters, setFilters] = useState({
    user: '',
    action: ''
  });

  const filteredLogs = auditLogs.filter(log => 
    (!filters.user || log.user.includes(filters.user)) &&
    (!filters.action || log.action === filters.action)
  );

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <FaEye className="text-blue-500 text-2xl" />
          <h3 className="text-2xl font-bold">سجل المراجعة</h3>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <select
            value={filters.action}
            onChange={(e) => setFilters(prev => ({ ...prev, action: e.target.value }))}
            className="bg-gray-700 text-white p-2 rounded-lg"
          >
            <option value="">كل الإجراءات</option>
            <option value="تعديل">تعديل</option>
            <option value="رفع">رفع</option>
            <option value="حذف">حذف</option>
          </select>
          <input
            type="text"
            placeholder="البحث بالمستخدم"
            value={filters.user}
            onChange={(e) => setFilters(prev => ({ ...prev, user: e.target.value }))}
            className="bg-gray-700 text-white p-2 rounded-lg"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-3 text-right">المستخدم</th>
              <th className="p-3 text-right">الإجراء</th>
              <th className="p-3 text-right">الملف</th>
              <th className="p-3 text-right">التاريخ</th>
              <th className="p-3 text-right">التفاصيل</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <motion.tr
                key={log.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="border-b border-gray-700 hover:bg-gray-700"
              >
                <td className="p-3">{log.user}</td>
                <td className="p-3">
                  <span 
                    className={`
                      px-2 
                      py-1 
                      rounded-full 
                      text-sm 
                      ${log.action === 'تعديل' 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : log.action === 'رفع'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'}
                    `}
                  >
                    {log.action}
                  </span>
                </td>
                <td className="p-3">{log.file}</td>
                <td className="p-3">{log.timestamp}</td>
                <td className="p-3">{log.details}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Report Evaluation Component
const ReportEvaluation = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      title: 'تقرير تحليل البيانات الربع السنوي',
      author: 'محمد الشهري',
      date: '15 سبتمبر 2025',
      evaluations: [
        {
          id: 1,
          reviewer: 'سارة العتيبي',
          rating: 4,
          comment: 'تقرير شامل ومفصل. يحتاج إلى بعض التحسينات في التحليل المستقبلي.'
        }
      ]
    },
    {
      id: 2,
      title: 'مراجعة استراتيجية التسويق الرقمي',
      author: 'أحمد القحطاني',
      date: '10 سبتمبر 2025',
      evaluations: []
    }
  ]);

  const [selectedReport, setSelectedReport] = useState(null);
  const [newEvaluation, setNewEvaluation] = useState({
    rating: 3,
    comment: ''
  });

  const addEvaluation = () => {
    if (!selectedReport || !newEvaluation.comment.trim()) return;

    const evaluation = {
      id: Date.now(),
      reviewer: 'المستخدم الحالي',
      rating: newEvaluation.rating,
      comment: newEvaluation.comment
    };

    setReports(prev => 
      prev.map(report => 
        report.id === selectedReport.id 
          ? { 
              ...report, 
              evaluations: [...report.evaluations, evaluation] 
            } 
          : report
      )
    );

    setNewEvaluation({ rating: 3, comment: '' });
    setSelectedReport(null);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <FaEdit className="text-blue-500 text-2xl" />
          <h3 className="text-2xl font-bold">تقييم التقارير</h3>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Reports List */}
        <div className="space-y-4">
          {reports.map((report) => (
            <motion.div
              key={report.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedReport(report)}
              className={`
                bg-gray-700 
                p-4 
                rounded-lg 
                cursor-pointer 
                ${selectedReport?.id === report.id 
                  ? 'border-2 border-blue-500' 
                  : 'hover:bg-gray-600'}
              `}
            >
              <h4 className="font-bold">{report.title}</h4>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{report.author}</span>
                <span>{report.date}</span>
              </div>
              <div className="mt-2">
                <span className="text-sm">
                  التقييمات: {report.evaluations.length}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Evaluation Form */}
        <div>
          {selectedReport ? (
            <div className="space-y-4">
              <h4 className="text-xl font-bold mb-4">{selectedReport.title}</h4>

              {/* Existing Evaluations */}
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {selectedReport.evaluations.map((eval) => (
                  <div 
                    key={eval.id} 
                    className="bg-gray-700 p-4 rounded-lg"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold">{eval.reviewer}</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`
                              text-xl 
                              ${i < eval.rating 
                                ? 'text-yellow-500' 
                                : 'text-gray-400'}
                            `}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p>{eval.comment}</p>
                  </div>
                ))}
              </div>

              {/* New Evaluation Form */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-2">التقييم</label>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setNewEvaluation(prev => ({ ...prev, rating: i + 1 }))}
                        className="text-3xl"
                      >
                        <span 
                          className={`
                            ${i < newEvaluation.rating 
                              ? 'text-yellow-500' 
                              : 'text-gray-400'}
                          `}
                        >
                          ★
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={newEvaluation.comment}
                  onChange={(e) => setNewEvaluation(prev => ({ ...prev, comment: e.target.value }))}
                  placeholder="أضف تعليقك هنا..."
                  className="
                    w-full 
                    bg-gray-700 
                    text-white 
                    p-3 
                    rounded-lg 
                    h-32
                  "
                />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={addEvaluation}
                  disabled={!newEvaluation.comment.trim()}
                  className={`
                    w-full 
                    bg-blue-600 
                    text-white 
                    p-3 
                    rounded-lg 
                    ${newEvaluation.comment.trim()
                      ? 'hover:bg-blue-700'
                      : 'opacity-50 cursor-not-allowed'}
                  `}
                >
                  إرسال التقييم
                </motion.button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-400">
              اختر تقريرًا للتقييم
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TeamCollaboration = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">التعاون الجماعي</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            مساحة عمل متكاملة للتعاون والتواصل
          </p>
        </motion.div>

        {/* Collaboration Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <TeamMembers />
            <DigitalMeetingRoom />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <ReportEvaluation />
            <AuditTrail />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCollaboration; 