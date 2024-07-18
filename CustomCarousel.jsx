import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function CustomCarousel({ images, interval = 2000, textContent }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideInterval = useRef(null);
  const startX = useRef(0);
  const endX = useRef(0);
  const isDragging = useRef(false);

  // autoplay events
  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const startAutoPlay = () => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, interval);
  };

  const stopAutoPlay = () => clearInterval(slideInterval.current);

  // Touch Event Handlers
  const handleTouchStart = (e) => {
    stopAutoPlay();
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  };

  const handleTouchMove = (e) => {
    if (isDragging.current) endX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (isDragging.current) {
      if (startX.current - endX.current > 50) {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
      if (startX.current - endX.current < -50) {
        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
      startAutoPlay();
      isDragging.current = false;
    }
  };

  // Mouse Event Handlers
  const handleMouseDown = (e) => {
    stopAutoPlay();
    startX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseMove = (e) => {
    if (isDragging.current) endX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (isDragging.current) {
      if (startX.current - endX.current > 50) {
        setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      }
      if (startX.current - endX.current < -50) {
        setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      }
      startAutoPlay();
      isDragging.current = false;
    }
  };

  return (
    <div
      className='relative mx-auto h-full w-full select-none overflow-hidden rounded-lg bg-gradient-to-t from-[#004391] to-[#1C6BC7]'
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className='flex h-full w-full'>
        {images.map((image, i) => (
          <div
            className='relative h-full w-full shrink-0 basis-full transition-transform duration-500'
            key={i}
            style={{
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            <img
              src={image}
              alt={`slide-${i}`}
              className='absolute right-0 top-1/4 z-10 h-full w-1/2 object-contain'
              draggable={false}
            />
            <div className='z-50 flex h-full w-full flex-col items-start justify-center gap-3 p-12'>
              <span className='w-fit rounded-full bg-[#003E59] px-4 py-2 text-center text-sm text-white text-opacity-80 lg:text-base xl:text-lg'>
                {textContent.spanText}
              </span>
              <h1 className='z-50 max-w-[50%] font-sans text-3xl font-bold tracking-tight text-white xl:text-4xl xl:leading-tight 2xl:max-w-[60%] 2xl:text-5xl big2:max-w-[50%]'>
                {textContent.title}
              </h1>
              <p className='z-50 mb-3 max-w-[50%] font-sans text-sm text-white text-opacity-80 lg:text-base 2xl:text-lg'>
                {textContent.description}
              </p>

              {textContent.buttonText && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className='rounded-lg bg-gradient-to-b from-[#358FF8] to-[#0060D0] px-4 py-2 text-white 2xl:px-8 2xl:py-4'
                >
                  {textContent.buttonText}
                </motion.button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 transform cursor-pointer space-x-2'>
        {images.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full ${i === currentSlide ? 'bg-white' : 'bg-gray-500'}`}
            onClick={() => {
              setCurrentSlide(i);
              stopAutoPlay();
              startAutoPlay();
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default CustomCarousel;
