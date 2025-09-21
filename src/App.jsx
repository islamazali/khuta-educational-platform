import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// الصفحات
import Home from "./pages/Home";
import About from "./pages/About";
import Fellowship from "./pages/Fellowship";
import Progress from "./pages/Progress";

// صفحات الدورات
import DataAnalysis from "./pages/courses/DataAnalysis";
import AITools from "./pages/courses/AITools";
import Leadership from "./pages/courses/Leadership";
import CommunicationSkills from "./pages/courses/CommunicationSkills";
import DigitalMarketing from "./pages/courses/DigitalMarketing";

// لوحة التحكم
import AdminCourses from "./pages/admin/AdminCourses";

// Placeholder للصفحات قيد التطوير
const PlaceholderPage = ({
  title
}) => <div className="min-h-screen pt-32 pb-20">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      <p className="text-zinc-400 text-lg">هذه الصفحة قيد التطوير. سيتم إضافة المحتوى الكامل قريباً.</p>
      <a href="/" className="btn-primary mt-6 inline-block">العودة للرئيسية</a>
    </div>
  </div>;
const NotFound = () => <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-zinc-400 mb-8">الصفحة غير موجودة</p>
      <a href="/" className="btn-primary">العودة للرئيسية</a>
    </div>
  </div>;
export default function App() {
  return <Router>
      <div className="bg-[#0f0f0f] text-white min-h-screen">
        <Header />
        <main className="main-content" style={{
        paddingTop: "80px"
      }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/fellowship" element={<Fellowship />} />

            {/* الدورات */}
            <Route path="/courses/data-analysis" element={<DataAnalysis />} />
            <Route path="/courses/internal-review-basic" element={<PlaceholderPage title="المراجعة الأساسية" />} />
            <Route path="/courses/internal-review-intermediate" element={<PlaceholderPage title="المراجعة المتوسطة" />} />
            <Route path="/courses/internal-review-advanced" element={<PlaceholderPage title="المراجعة المتقدمة" />} />
            <Route path="/courses/ai-tools" element={<AITools />} />
            <Route path="/courses/leadership" element={<Leadership />} />
            <Route path="/courses/communication-skills" element={<CommunicationSkills />} />
            <Route path="/courses/digital-marketing" element={<DigitalMarketing />} />

            {/* لوحة التحكم */}
            <Route path="/admin" element={<PlaceholderPage title="لوحة تحكم المسؤول" />} />
            <Route path="/admin/courses" element={<AdminCourses />} />

            {/* لوحة المستخدم */}
            <Route path="/dashboard/progress" element={<Progress />} />

            {/* إعادة توجيه لأي رابط خاطئ */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>;
}
export { App };