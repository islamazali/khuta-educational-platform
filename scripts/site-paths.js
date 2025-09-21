(function (global) {
  const courseMap = {
    "audit-basic": "internal-review-basic.html",
    "audit-intermediate": "internal-review-intermediate.html",
    "audit-advanced": "internal-review-advanced.html",
    "data-analysis": "data-analysis.html",
    "project-management": "project-management.html",
    "digital-marketing": "digital-marketing.html",
    leadership: "leadership.html",
    "communication-skills": "communication-skills.html",
    finance: "financial-management.html",
  };

  function courseFile(courseId) {
    if (!courseId || typeof courseId !== "string") return "dashboard.html";
    return courseMap[courseId.toLowerCase()] || "dashboard.html";
  }

  function courseHref(courseId) {
    const file = courseFile(courseId);
    return file ? "/pages/" + file : "/pages/dashboard.html";
  }

  function pageHref(filename) {
    if (!filename) return "/pages/index.html";
    const cleanPath = filename.replace(/^\/+/, "").trim();
    return cleanPath ? "/pages/" + cleanPath : "/pages/index.html";
  }

  Object.defineProperty(global, "SitePaths", {
    value: Object.freeze({
      courseFile,
      courseHref,
      pageHref,
    }),
    enumerable: true,
    configurable: false,
  });
})(window);
