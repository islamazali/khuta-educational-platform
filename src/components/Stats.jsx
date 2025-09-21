import React from "react";
import StatCard from "./StatCard";
function Stats() {
  const stats = [{
    value: "1,250+",
    label: "طالب مسجل",
    color: "#ff6b6b"
  }, {
    value: "89+",
    label: "دورة تدريبية",
    color: "#ffd93d"
  }, {
    value: "95%",
    label: "معدل الرضا",
    color: "#4ade80"
  }, {
    value: "456+",
    label: "شهادة مُمنحة",
    color: "#60a5fa"
  }, {
    value: "24/7",
    label: "دعم فني",
    color: "#c084fc"
  }, {
    value: "98%",
    label: "معدل الإكمال",
    color: "#f97316"
  }];
  return <section className="py-20 bg-gradient-to-r from-zinc-900/50 to-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            إحصائيات المنصة
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            أرقام تعكس جودة
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => <StatCard key={index} value={stat.value} label={stat.label} color={stat.color} />)}
        </div>
      </div>
    </section>;
}
export default Stats;
export { Stats };