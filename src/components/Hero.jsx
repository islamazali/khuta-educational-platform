import React from "react";
function Hero() {
  return <section id="home" className="min-h-screen pt-32 pb-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center space-y-8 arabic-spacing">
          <div className="inline-flex items-center space-x-2 bg-white/5 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-[#ff6b6b] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">
              منصة تعلم إلكترونية شاملة
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight heading-arabic">
            منصة التعلم الإلكترونية
            <br />
            <span className="text-gradient">الشاملة</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed arabic-spacing">
            نظام تعليمي متكامل متخصص في المراجعة الداخلية، تحليل البيانات،
            القيادة، التسويق الرقمي، مهارات التواصل، وأدوات الذكاء الاصطناعي مع
            دعم كامل للغة العربية
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/courses" className="btn-primary btn-arabic">
              <i className="fas fa-play icon-arabic"></i>
              ابدأ التعلم الآن
            </a>
            <a href="/about" className="btn-secondary btn-arabic">
              <i className="fas fa-info-circle icon-arabic"></i>
              تعرف على الأنظمة
            </a>
          </div>
        </div>
      </div>
    </section>;
}
export default Hero;
export { Hero };