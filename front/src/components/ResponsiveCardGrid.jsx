import React from 'react';
import Image from 'next/image';

const ResponsiveCardGrid = ({ cards = [], className = "" }) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Mobile First: Single column on mobile, 2 cols on sm, 3 on lg */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {cards.map((card, index) => (
          <CardItem key={card.id || index} card={card} />
        ))}
      </div>
    </div>
  );
};

const CardItem = ({ card }) => {
  return (
    <div className="group relative">
      {/* Card Container - Responsive */}
      <div className="
        relative 
        w-full 
        aspect-[2/3] 
        bg-gradient-to-br from-yellow-400 to-yellow-600 
        rounded-xl 
        overflow-hidden 
        shadow-lg 
        hover:shadow-xl 
        transition-all 
        duration-300 
        hover:scale-105
      ">
        {/* Card Header */}
        <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 z-10">
          <div className="flex justify-between items-start text-white">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold truncate">
                {card.playerName || 'LUCIA'}
              </h3>
              <p className="text-xs sm:text-sm opacity-90 truncate">
                {card.position || 'CADETTE'}
              </p>
              <p className="text-xs opacity-75">
                Niveau {card.level || '9'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-bold">
                {card.rating || '99'}
              </div>
            </div>
          </div>
        </div>

        {/* Rarity Badge */}
        <div className="absolute top-3 right-3 z-20">
          <div className="flex items-center space-x-1 text-white text-xs">
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="hidden sm:inline font-medium">
              {card.rarity || 'Légendaire'}
            </span>
          </div>
        </div>

        {/* Player Image Area */}
        <div className="absolute bottom-0 left-0 right-0 h-3/5 bg-gradient-to-t from-black/20 to-transparent">
          {card.playerImage ? (
            <div className="relative w-full h-full">
              <Image
                src={card.playerImage}
                alt={card.playerName || 'Player'}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-white/10 backdrop-blur-sm">
              <div className="text-center text-white/60">
                <svg className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-xs">Photo à venir</p>
              </div>
            </div>
          )}
        </div>

        {/* Hover Overlay */}
        <div className="
          absolute inset-0 
          bg-black/20 
          opacity-0 
          group-hover:opacity-100 
          transition-opacity 
          duration-300 
          flex 
          items-center 
          justify-center
        ">
          <button className="
            bg-white 
            text-gray-900 
            px-4 py-2 
            rounded-lg 
            font-medium 
            text-sm 
            hover:bg-gray-100 
            transition-colors
          ">
            Voir détails
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveCardGrid;
