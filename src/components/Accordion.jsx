import React, { useState } from "react";
function AccordionItem({
  title,
  children,
  isOpen = false,
  onToggle = () => {},
  allowMultiple = false
}) {
  const handleToggle = () => {
    onToggle();
  };
  return <div className="accordion-item border-b border-white/10 last:border-b-0">
      <div className="accordion-header flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors" onClick={handleToggle} role="button" aria-expanded={isOpen}>
        <h3 className="accordion-title text-lg font-semibold">{title}</h3>
        <span className="accordion-icon transform transition-transform duration-300">
          {isOpen ? "−" : "+"}
        </span>
      </div>

      <div className={`accordion-content overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`} aria-hidden={!isOpen}>
        <div className="p-4 pt-2">{children}</div>
      </div>
    </div>;
}
function Accordion({
  children,
  allowMultiple = false,
  defaultOpenIndex = null,
  className = ""
}) {
  const [openItems, setOpenItems] = useState(() => {
    if (defaultOpenIndex !== null) {
      return allowMultiple ? [defaultOpenIndex] : defaultOpenIndex;
    }
    return allowMultiple ? [] : null;
  });
  const handleToggle = index => {
    if (allowMultiple) {
      setOpenItems(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
    } else {
      setOpenItems(prev => prev === index ? null : index);
    }
  };
  const isItemOpen = index => {
    if (allowMultiple) {
      return openItems.includes(index);
    }
    return openItems === index;
  };
  return <div className={`accordion ${className}`}>
      {React.Children.map(children, (child, index) => React.cloneElement(child, {
      isOpen: isItemOpen(index),
      onToggle: () => handleToggle(index),
      allowMultiple
    }))}
    </div>;
}
Accordion.Item = AccordionItem;
export default Accordion;
export { Accordion };