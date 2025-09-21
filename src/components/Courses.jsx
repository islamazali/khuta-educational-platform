import React from "react";
import CourseCard from "./CourseCard";
function Courses() {
  const courses = [{
    icon: "fas fa-search-dollar",
    title: "المراجعة الداخلية",
    description: "دورات متخصصة في المراجعة الداخلية بمستويات مختلفة (أساسي، متوسط، متقدم)",
    path: "/courses/internal-review"
  }, {
    icon: "fas fa-chart-line",
    title: "تحليل البيانات",
    description: "تطوير مهارات تحليل البيانات واتخاذ القرارات باستخدام أحدث الأدوات",
    path: "/courses/data-analysis"
  }, {
    icon: "fas fa-crown",
    title: "القيادة والإدارة",
    description: "دورات في القيادة الاستراتيجية وإدارة الفرق والمشاريع بكفاءة",
    path: "/courses/leadership"
  }, {
    icon: "fas fa-hashtag",
    title: "التسويق الرقمي",
    description: "إتقان استراتيجيات التسويق الرقمي وتحليل الحملات التسويقية",
    path: "/courses/digital-marketing"
  }, {
    icon: "fas fa-comments",
    title: "مهارات التواصل",
    description: "تطوير مهارات التواصل الفعال والعرض والتقديم والتفاوض",
    path: "/courses/communication-skills"
  }, {
    icon: "fas fa-robot",
    title: "أدوات الذكاء الاصطناعي",
    description: "استكشاف أحدث أدوات الذكاء الاصطناعي وتطبيقاتها في المجال المهني",
    path: "/courses/ai-tools"
  }];
  return <section className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            التخصصات التعليمية
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            اكتشف مجموعة متنوعة من التخصصات المصممة لتطوير مهاراتك المهنية
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => <CourseCard key={index} icon={course.icon} title={course.title} description={course.description} path={course.path} />)}
        </div>
      </div>
    </section>;
}
export default Courses;
export { Courses };