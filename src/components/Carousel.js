import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Carousel = ({ 
  slides, 
  height = "500px",
  autoplaySpeed = 5000,
  showArrows = true,
  showDots = true,
  showCaption = true,
  pauseOnHover = true,
  captionPosition = "bottom" // bottom, center, overlay
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoplayTimerRef = useRef(null);
  const carouselRef = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      nextSlide();
    } else if (touchStart - touchEnd < -100) {
      // Swipe right
      prevSlide();
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [nextSlide, prevSlide]);

  // Setup autoplay
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = setInterval(() => {
        if (!isPaused) {
          nextSlide();
        }
      }, autoplaySpeed);
    };

    startAutoplay();

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isPaused, nextSlide, autoplaySpeed]);

  // Pause on hover if enabled
  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  };

  // Render the caption based on position
  const renderCaption = (slide) => {
    if (!showCaption) return null;
    
    let captionClasses = "";
    
    switch (captionPosition) {
      case "center":
        captionClasses = "absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black bg-opacity-40";
        break;
      case "overlay":
        captionClasses = "absolute inset-0 flex flex-col items-start justify-end p-6 bg-gradient-to-t from-black via-black/50 to-transparent";
        break;
      default: // bottom
        captionClasses = "absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white p-6";
    }
    
    return (
      <div className={captionClasses}>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-white mb-2">{slide.title}</h2>
        <p className="mt-2 text-sm md:text-base text-white/90 max-w-xl">{slide.description}</p>
        
        {slide.link && (
          <Link
            to={slide.link}
            className="mt-4 inline-flex items-center px-5 py-2 bg-royal-gold hover:bg-royal-gold-dark text-white rounded-md transition-colors"
          >
            {slide.linkText || "Learn More"}
          </Link>
        )}
      </div>
    );
  };

  // If no slides or empty array, return null
  if (!slides || slides.length === 0) {
    return null;
  }

  return (
    <div 
      ref={carouselRef}
      className="relative overflow-hidden rounded-lg shadow-lg"
      style={{ height }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/20 z-20">
        <div 
          className="h-full bg-royal-gold origin-left transition-all duration-300 ease-linear"
          style={{ 
            width: `${(currentSlide / (slides.length - 1)) * 100}%`,
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        ></div>
      </div>

      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          aria-hidden={index !== currentSlide}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img 
            src={slide.image} 
            alt={slide.title} 
            className="w-full h-full object-cover"
          />
          {renderCaption(slide)}
        </div>
      ))}

      {/* Navigation Arrows */}
      {showArrows && slides.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-royal-burgundy text-white p-3 rounded-full z-20 transition-colors focus:outline-none focus:ring-2 focus:ring-royal-gold"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <FaChevronLeft size={16} />
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-royal-burgundy text-white p-3 rounded-full z-20 transition-colors focus:outline-none focus:ring-2 focus:ring-royal-gold"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <FaChevronRight size={16} />
          </button>
        </>
      )}

      {/* Slide Indicators/Dots */}
      {showDots && slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full focus:outline-none transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-royal-gold w-8' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;