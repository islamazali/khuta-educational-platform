import React, { useEffect, useState } from 'react';

// Preload images to improve initial load time
export const preloadImages = imageUrls => {
  imageUrls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

// Lazy load images with placeholder support
export const LazyImage = ({
  src,
  placeholder,
  alt,
  className = '',
  threshold = 0.5
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '');
  const [imageRef, setImageRef] = useState(null);
  useEffect(() => {
    let observer;
    let didCancel = false;
    if (imageRef && imageSrc !== src) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!didCancel && entry.isIntersecting && entry.intersectionRatio >= threshold) {
            setImageSrc(src);
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold
      });
      observer.observe(imageRef);
    }
    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageSrc, imageRef, threshold]);
  return <img ref={setImageRef} src={imageSrc} alt={alt} className={`
        transition-opacity 
        duration-500 
        ${imageSrc === placeholder ? 'opacity-50 blur-sm' : 'opacity-100'}
        ${className}
      `} />;
};

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    loadTime: null,
    timeToInteractive: null
  });
  useEffect(() => {
    if ('performance' in window) {
      const loadTime = performance.now();
      const handleLoad = () => {
        const timeToInteractive = performance.now() - loadTime;
        setPerformanceMetrics({
          loadTime: Math.round(loadTime),
          timeToInteractive: Math.round(timeToInteractive)
        });
      };
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);
  return performanceMetrics;
};

// Code splitting and lazy loading for components
export const PerformanceOptimizer = ({
  children
}) => {
  const performanceMetrics = usePerformanceMonitor();

  // Preload critical assets on initial render
  useEffect(() => {
    // Preload images used across the application
    preloadImages(['/logo.png', '/hero-background.jpg', '/default-avatar.png']);
  }, []);
  return <div>
      {performanceMetrics.timeToInteractive && <div className="
            fixed 
            bottom-4 
            left-4 
            bg-blue-600 
            text-white 
            p-2 
            rounded-lg 
            text-sm 
            z-50
          ">
          التحميل: {performanceMetrics.timeToInteractive} مللي ثانية
        </div>}
      {children}
    </div>;
};
export default PerformanceOptimizer;