import React from "react";
function StatCard({
  value,
  label,
  icon = null,
  color = "#ff6b6b",
  prefix = "",
  suffix = "",
  description = ""
}) {
  const colorClasses = {
    "#ff6b6b": "text-[#ff6b6b]",
    "#ffd93d": "text-[#ffd93d]",
    "#4ade80": "text-[#4ade80]",
    "#3b82f6": "text-[#3b82f6]",
    "#8b5cf6": "text-[#8b5cf6]"
  };
  const textColor = colorClasses[color] || "text-[#ff6b6b]";
  return <div className="stat-item bg-zinc-900/50 rounded-2xl p-6 border border-white/5 text-center hover-lift transition-all duration-300">
      {icon && <div className="w-16 h-16 bg-gradient-to-br from-white/5 to-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
          <i className={`${icon} ${textColor} text-2xl`}></i>
        </div>}

      <div className={`text-4xl font-bold mb-2 ${textColor}`}>
        {prefix}
        {value}
        {suffix}
      </div>

      <div className="text-zinc-400 font-semibold mb-2">{label}</div>

      {description && <p className="text-zinc-500 text-sm">{description}</p>}
    </div>;
}
export default StatCard;
export { StatCard };