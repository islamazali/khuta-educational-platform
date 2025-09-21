import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PulseButton from '../components/ui/PulseButton';
const ButtonShowcase = () => {
  // States for simulating loading
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulated action handlers
  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 2000);
  };
  const handlePurchase = () => {
    setIsPurchasing(true);
    setTimeout(() => setIsPurchasing(false), 2000);
  };
  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => setIsProcessing(false), 2000);
  };
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 0.5
  }} className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
          معرض أزرار النبض التفاعلية
        </h1>

        {/* قسم الألوان */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            مجموعات الألوان
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <PulseButton variant="primary">الأساسي</PulseButton>
            <PulseButton variant="success">النجاح</PulseButton>
            <PulseButton variant="danger">الخطأ</PulseButton>
            <PulseButton variant="secondary">الثانوي</PulseButton>
          </div>
        </section>

        {/* قسم الأحجام */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            الأحجام المختلفة
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <PulseButton size="sm">صغير</PulseButton>
            <PulseButton size="md">متوسط</PulseButton>
            <PulseButton size="lg">كبير</PulseButton>
          </div>
        </section>

        {/* قسم الأزرار التفاعلية */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            الأزرار التفاعلية
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <PulseButton icon="download" loading={isDownloading} onClick={handleDownload} variant="success">
              تحميل الملف
            </PulseButton>

            <PulseButton icon="cart" loading={isPurchasing} onClick={handlePurchase} variant="primary">
              شراء الآن
            </PulseButton>

            <PulseButton icon="spinner" loading={isProcessing} onClick={handleProcess} variant="secondary">
              معالجة البيانات
            </PulseButton>
          </div>
        </section>

        {/* قسم الحالات الخاصة */}
        <section>
          <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
            حالات خاصة
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <PulseButton disabled>
              معطل
            </PulseButton>

            <PulseButton variant="danger" icon="check">
              مكتمل
            </PulseButton>
          </div>
        </section>
      </div>
    </motion.div>;
};
export default ButtonShowcase;
export { ButtonShowcase };