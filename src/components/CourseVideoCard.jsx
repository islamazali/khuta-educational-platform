import React, { useState, useRef } from 'react';
import { FaPlay, FaPause, FaExpand, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
const CourseVideoCard = ({
  title = 'مقدمة في الذكاء الاصطناعي',
  description = 'فيديو تعريفي عن أساسيات الذكاء الاصطناعي',
  videoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4',
  thumbnailUrl = 'https://via.placeholder.com/600x400?text=Course+Video+Preview',
  duration = '05:30'
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };
  const handleFullScreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      } else if (videoRef.current.mozRequestFullScreen) {
        // Firefox
        videoRef.current.mozRequestFullScreen();
      } else if (videoRef.current.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        videoRef.current.webkitRequestFullscreen();
      } else if (videoRef.current.msRequestFullscreen) {
        // IE/Edge
        videoRef.current.msRequestFullscreen();
      }
    }
  };
  return <div className="relative w-full max-w-xl mx-auto group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* حاوية الفيديو */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
        {/* صورة مصغرة */}
        <img src={thumbnailUrl} alt={title} className={`
            absolute inset-0 w-full h-full object-cover 
            transition-opacity duration-300
            ${isPlaying ? 'opacity-0' : 'opacity-100'}
          `} />

        {/* الفيديو */}
        <video ref={videoRef} src={videoUrl} className={`
            absolute inset-0 w-full h-full object-cover
            transition-opacity duration-300
            ${isPlaying ? 'opacity-100' : 'opacity-0'}
          `} onClick={togglePlay} />

        {/* زر التشغيل المتحرك */}
        <div className={`
            absolute inset-0 flex items-center justify-center 
            transition-all duration-300 ease-in-out
            ${isPlaying ? 'opacity-0' : 'opacity-100'}
            ${isHovered ? 'bg-black/30' : 'bg-transparent'}
          `}>
          <button onClick={togglePlay} className={`
              text-white bg-blue-600 rounded-full p-4 
              transform transition-all duration-300
              hover:scale-110 hover:bg-blue-500
              animate-pulse
              ${isHovered ? 'scale-110' : 'scale-100'}
            `} aria-label="تشغيل الفيديو">
            <FaPlay className="w-8 h-8" />
          </button>
        </div>

        {/* شريط التحكم */}
        {isPlaying && <div className="
            absolute bottom-0 left-0 right-0 
            bg-black/50 text-white 
            flex items-center justify-between 
            p-2 space-x-2 rtl:space-x-reverse
          ">
            <span className="text-sm">{duration}</span>
            
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <button onClick={handleFullScreen} className="hover:bg-white/20 rounded-full p-1" aria-label="تكبير الشاشة">
                <FaExpand />
              </button>
              
              <button onClick={toggleMute} className="hover:bg-white/20 rounded-full p-1" aria-label={isMuted ? "إلغاء كتم الصوت" : "كتم الصوت"}>
                {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
            </div>
          </div>}
      </div>

      {/* معلومات الفيديو */}
      <div className="mt-4 text-right">
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>
    </div>;
};
export default CourseVideoCard;
export { CourseVideoCard };