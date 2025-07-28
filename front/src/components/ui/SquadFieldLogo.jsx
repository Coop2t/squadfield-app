export default function SquadFieldLogo({ className = "w-32 h-32", showText = true }) {
  return (
    <div className={`relative ${className} mx-auto`}>
      {/* Logo Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Background Circle with Golden Border */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-900 via-gray-800 to-black border-4 border-secondary-500"></div>
        
        {/* Golden Arc Top */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3/4 h-3/4">
          <div className="w-full h-1/2 border-t-8 border-l-8 border-r-8 border-secondary-500 rounded-t-full"></div>
        </div>
        
        {/* Golden Arc Bottom */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-3/4">
          <div className="w-full h-1/2 border-b-8 border-l-8 border-r-8 border-secondary-500 rounded-b-full"></div>
        </div>
        
        {/* Central Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          {/* Three Player Silhouettes */}
          <div className="flex items-end justify-center space-x-1 mb-2">
            {/* Left Player */}
            <div className="w-6 h-8 bg-white rounded-t-full relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full"></div>
              <div className="absolute bottom-0 left-0 right-0 h-5 bg-white rounded-sm"></div>
            </div>
            
            {/* Center Player (Taller) */}
            <div className="w-8 h-10 bg-white rounded-t-full relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full"></div>
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-white rounded-sm"></div>
              {/* Arms crossed */}
              <div className="absolute top-4 left-0 right-0 h-1 bg-white transform rotate-12"></div>
              <div className="absolute top-4 left-0 right-0 h-1 bg-white transform -rotate-12"></div>
            </div>
            
            {/* Right Player */}
            <div className="w-6 h-8 bg-white rounded-t-full relative">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rounded-full"></div>
              <div className="absolute bottom-0 left-0 right-0 h-5 bg-white rounded-sm"></div>
            </div>
          </div>
          
          {/* Cyber Elements */}
          <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-accent-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-1 bg-accent-500 rounded-full animate-pulse delay-100"></div>
              <div className="w-1 h-1 bg-accent-500 rounded-full animate-pulse delay-200"></div>
            </div>
            <div className="mt-1 w-8 h-0.5 bg-gradient-to-r from-transparent via-accent-500 to-transparent"></div>
          </div>
        </div>
      </div>
      
      {/* Text Logo */}
      {showText && (
        <div className="mt-4 text-center">
          <h1 className="font-display text-2xl font-black tracking-tight">
            <span className="gradient-text">SQUAD</span>
            <span className="gradient-text-gold">FIELD</span>
          </h1>
          {/* Nouvelle tagline */}
          <p className="mt-3 text-lg font-semibold text-gray-300 tracking-wide">
            <span className="gradient-text">Ta carte.</span>{' '}
            <span className="gradient-text-gold">Ton style.</span>{' '}
            <span className="gradient-text">Ton niveau.</span>
          </p>
        </div>
      )}
    </div>
  );
}
