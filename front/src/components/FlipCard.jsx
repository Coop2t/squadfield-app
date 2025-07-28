import React, { useState } from 'react';
import Image from 'next/image';

const FlipCard = ({ 
  frontImage, 
  backImage = '/assets/backgrounds/verso-card.png',
  cardName,
  className = "",
  autoFlip = false,
  flipDelay = 3000
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  React.useEffect(() => {
    if (autoFlip) {
      const interval = setInterval(() => {
        setIsFlipped(prev => !prev);
      }, flipDelay);
      return () => clearInterval(interval);
    }
  }, [autoFlip, flipDelay]);

  const handleFlip = () => {
    if (!autoFlip) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <div className={`flip-card-container ${className}`}>
      {/* Card wrapper with 3D perspective */}
      <div 
        className={`flip-card ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
        onMouseEnter={() => !autoFlip && setIsFlipped(true)}
        onMouseLeave={() => !autoFlip && setIsFlipped(false)}
      >
        {/* Front face (recto) */}
        <div className="flip-card-front">
          <div className="card-content">
            <Image
              src={frontImage}
              alt={`${cardName} - Recto`}
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority
            />
            {/* Subtle overlay for better hover effect */}
            <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 rounded-xl" />
            
            {/* Hover indicator */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Back face (verso) */}
        <div className="flip-card-back">
          <div className="card-content">
            <Image
              src={backImage}
              alt={`${cardName} - Verso`}
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            
            {/* Logo overlay on verso */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4">
                <Image
                  src="/assets/logos/logo-squadfield.png"
                  alt="SquadField Logo"
                  width={60}
                  height={60}
                  className="opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card styles */}
      <style jsx>{`
        .flip-card-container {
          perspective: 1000px;
          cursor: pointer;
        }

        .flip-card {
          position: relative;
          width: 100%;
          height: 100%;
          aspect-ratio: 2/3;
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .flip-card.flipped {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 0.75rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }

        .flip-card:hover .flip-card-front,
        .flip-card:hover .flip-card-back {
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .card-content {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 0.75rem;
          overflow: hidden;
        }

        .flip-card-container:hover .flip-card {
          transform: scale(1.02) rotateY(${isFlipped ? '180deg' : '0deg'});
        }

        /* Animation effects */
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .flip-card-front::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
          border-radius: 0.75rem;
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default FlipCard;
