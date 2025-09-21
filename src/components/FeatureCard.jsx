import React from "react";
function FeatureCard({
  title,
  description,
  icon = "fas fa-star",
  color = "#ff6b6b",
  animation = false
}) {
  const colorClasses = {
    "#ff6b6b": "text-[#ff6b6b] bg-gradient-to-br from-[#ff6b6b]/20 to-[#ff6b6b]/10",
    "#ffd93d": "text-[#ffd93d] bg-gradient-to-br from-[#ffd93d]/20 to-[#ffd93d]/10",
    "#4ade80": "text-[#4ade80] bg-gradient-to-br from-[#4ade80]/20 to-[#4ade80]/10",
    "#3b82f6": "text-[#3b82f6] bg-gradient-to-br from-[#3b82f6]/20 to-[#3b82f6]/10"
  };
  const config = colorClasses[color] || colorClasses["#ff6b6b"];
  return <div className="feature-card card-arabic group hover-lift transition-all duration-300">
      <div className={`feature-icon ${config} ${animation ? "animate-pulse" : ""}`}>
        <i className={icon}></i>
      </div>

      <h3 className="text-2xl font-bold mb-4 heading-arabic">{title}</h3>
      <p className="text-zinc-400 arabic-spacing">{description}</p>

      <div className="mt-4 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button className="text-sm text-zinc-400 hover:text-white transition-colors">
          اكتشف المزيد
          <i className="fas fa-arrow-left icon-arabic mr-2"></i>
        </button>
      </div>
    </div>;
}
export default FeatureCard;
export { FeatureCard };