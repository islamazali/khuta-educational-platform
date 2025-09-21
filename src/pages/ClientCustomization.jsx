import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPalette, FaImage, FaFont, FaEye, FaMobile, FaDesktop, FaCheck, FaTimes } from 'react-icons/fa';
const ClientCustomization = () => {
  const [customizationState, setCustomizationState] = useState({
    companyName: 'خطى للتعليم',
    primaryColor: '#3B82F6',
    // Tailwind blue-500
    secondaryColor: '#10B981',
    // Tailwind green-500
    logo: null,
    fontFamily: 'Cairo',
    brandingMode: 'professional'
  });
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const colorOptions = [{
    name: 'أزرق',
    primary: '#3B82F6',
    secondary: '#10B981'
  }, {
    name: 'أخضر',
    primary: '#10B981',
    secondary: '#34D399'
  }, {
    name: 'برتقالي',
    primary: '#F97316',
    secondary: '#FBBF24'
  }, {
    name: 'أرجواني',
    primary: '#8B5CF6',
    secondary: '#EC4899'
  }];
  const fontOptions = ['Cairo', 'Tajawal', 'Almarai', 'Changa'];
  const handleColorChange = colorSet => {
    setCustomizationState(prev => ({
      ...prev,
      primaryColor: colorSet.primary,
      secondaryColor: colorSet.secondary
    }));
  };
  const handleLogoUpload = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomizationState(prev => ({
          ...prev,
          logo: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const PreviewComponent = () => {
    const {
      primaryColor,
      secondaryColor,
      companyName,
      logo,
      fontFamily
    } = customizationState;
    return <div className="
          w-full 
          h-full 
          p-6 
          rounded-lg 
          shadow-lg 
          transition-all 
          duration-300
        " style={{
      backgroundColor: primaryColor + '10',
      fontFamily: fontFamily
    }}>
        {/* Header */}
        <div className="
            flex 
            items-center 
            justify-between 
            mb-6 
            pb-4 
            border-b
          " style={{
        borderColor: primaryColor + '30'
      }}>
          {logo ? <img src={logo} alt="شعار الشركة" className="h-12 w-auto" /> : <h2 className="text-2xl font-bold" style={{
          color: primaryColor
        }}>
              {companyName}
            </h2>}
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button className="
                px-4 
                py-2 
                rounded-lg 
                text-white 
                transition-colors 
                duration-300
              " style={{
            backgroundColor: secondaryColor,
            ':hover': {
              backgroundColor: secondaryColor + 'CC'
            }
          }}>
              تسجيل الدخول
            </button>
          </div>
        </div>

        {/* Content Preview */}
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map(item => <div key={item} className="
                bg-white 
                rounded-lg 
                p-4 
                shadow-md 
                hover:shadow-lg 
                transition-shadow
              " style={{
          borderTop: `4px solid ${primaryColor}`
        }}>
              <h3 className="text-lg font-bold mb-2" style={{
            color: primaryColor
          }}>
                عنصر {item}
              </h3>
              <p className="text-gray-600">
                معاينة للمحتوى المخصص لعميل {companyName}
              </p>
            </div>)}
        </div>
      </div>;
  };
  return <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <motion.div initial={{
        opacity: 0,
        y: -50
      }} animate={{
        opacity: 1,
        y: 0
      }} className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">تخصيص المنصة</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            صمم منصتك التعليمية الخاصة بهوية فريدة
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Customization Options */}
          <div className="space-y-6">
            {/* Company Name */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <FaFont className="text-blue-500 ml-4" />
                <h3 className="text-xl font-bold">اسم الشركة</h3>
              </div>
              <input type="text" value={customizationState.companyName} onChange={e => setCustomizationState(prev => ({
              ...prev,
              companyName: e.target.value
            }))} className="
                  w-full 
                  bg-gray-700 
                  text-white 
                  p-3 
                  rounded-lg
                " placeholder="أدخل اسم الشركة" />
            </div>

            {/* Color Palette */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <FaPalette className="text-purple-500 ml-4" />
                <h3 className="text-xl font-bold">اللون الأساسي</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {colorOptions.map(color => <motion.button key={color.name} whileHover={{
                scale: 1.05
              }} onClick={() => handleColorChange(color)} className="
                      flex 
                      items-center 
                      space-x-2 
                      rtl:space-x-reverse
                      bg-gray-700 
                      p-3 
                      rounded-lg
                    ">
                    <div className="w-8 h-8 rounded-full" style={{
                  backgroundColor: color.primary,
                  border: customizationState.primaryColor === color.primary ? '3px solid white' : 'none'
                }} />
                    <span>{color.name}</span>
                  </motion.button>)}
              </div>
            </div>

            {/* Logo Upload */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <FaImage className="text-green-500 ml-4" />
                <h3 className="text-xl font-bold">الشعار</h3>
              </div>
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="
                  w-full 
                  bg-gray-700 
                  text-white 
                  p-3 
                  rounded-lg
                " />
              {customizationState.logo && <div className="mt-4 flex justify-center">
                  <img src={customizationState.logo} alt="الشعار المرفوع" className="max-h-32 rounded-lg" />
                </div>}
            </div>

            {/* Font Selection */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <FaFont className="text-red-500 ml-4" />
                <h3 className="text-xl font-bold">نوع الخط</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {fontOptions.map(font => <motion.button key={font} whileHover={{
                scale: 1.05
              }} onClick={() => setCustomizationState(prev => ({
                ...prev,
                fontFamily: font
              }))} className={`
                      p-3 
                      rounded-lg 
                      transition-colors
                      ${customizationState.fontFamily === font ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}
                    `} style={{
                fontFamily: font
              }}>
                    {font}
                  </motion.button>)}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="md:col-span-2 bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <FaEye className="text-blue-500 ml-4" />
                <h3 className="text-2xl font-bold">المعاينة</h3>
              </div>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <motion.button whileHover={{
                scale: 1.1
              }} onClick={() => setPreviewDevice('mobile')} className={`
                    p-2 
                    rounded-full 
                    ${previewDevice === 'mobile' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'}
                  `}>
                  <FaMobile />
                </motion.button>
                <motion.button whileHover={{
                scale: 1.1
              }} onClick={() => setPreviewDevice('desktop')} className={`
                    p-2 
                    rounded-full 
                    ${previewDevice === 'desktop' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'}
                  `}>
                  <FaDesktop />
                </motion.button>
              </div>
            </div>

            <div className={`
                w-full 
                ${previewDevice === 'mobile' ? 'max-w-xs mx-auto' : 'max-w-full'}
                h-[600px] 
                overflow-auto 
                rounded-lg 
                border 
                border-gray-700
              `}>
              <PreviewComponent />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 rtl:space-x-reverse mt-8">
          <motion.button whileHover={{
          scale: 1.05
        }} className="
              bg-green-600 
              text-white 
              px-6 
              py-3 
              rounded-lg 
              flex 
              items-center 
              space-x-2 
              rtl:space-x-reverse
            ">
            <FaCheck />
            <span>حفظ التخصيصات</span>
          </motion.button>
          <motion.button whileHover={{
          scale: 1.05
        }} className="
              bg-red-600 
              text-white 
              px-6 
              py-3 
              rounded-lg 
              flex 
              items-center 
              space-x-2 
              rtl:space-x-reverse
            ">
            <FaTimes />
            <span>إلغاء</span>
          </motion.button>
        </div>
      </div>
    </div>;
};
export default ClientCustomization;
export { ClientCustomization };