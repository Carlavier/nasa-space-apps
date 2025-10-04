export function SpaceshipWindow({ 
  title = "VIEWPORT-01", 
  children, 
  className = "", 
  minHeight = "400px",
  maxContentHeight = "380px" 
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Outer Frame */}
      <div className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl p-4 shadow-2xl">
        {/* Inner Frame with Neumorphism */}
        <div className="bg-slate-800 rounded-xl p-3 shadow-inner border border-slate-600/30">
          {/* Window Frame Details */}
          <div className="relative">
            {/* Corner Rivets */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-br from-slate-500 to-slate-700 rounded-full shadow-md"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-slate-500 to-slate-700 rounded-full shadow-md"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-br from-slate-500 to-slate-700 rounded-full shadow-md"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-br from-slate-500 to-slate-700 rounded-full shadow-md"></div>
            
            {/* Window Title */}
            <div className="text-center mb-3">
              <div className="inline-flex items-center space-x-2 bg-slate-700/50 rounded-lg px-3 py-1 border border-slate-600/30">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-500/50"></div>
                <span className="text-slate-300 text-xs font-mono tracking-wider">{title}</span>
              </div>
            </div>
            
            {/* Main Window Content */}
            <div className="bg-gradient-to-b from-slate-900/80 to-slate-800/80 rounded-lg p-3 border border-slate-600/20 shadow-inner backdrop-blur-sm relative overflow-hidden" style={{ minHeight }}>
              {/* Starry Background */}
              <div className="absolute inset-0 starry-background rounded-lg"></div>
              
              {/* Window Reflection Effect */}
              {/* <div className="absolute inset-3 rounded-lg bg-gradient-to-tr from-transparent via-slate-400/5 to-transparent pointer-events-none z-10"></div> */}
              
              {/* Space Nebula Effect */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 pointer-events-none z-5"></div>
              
              {/* Scrollable Content */}
              <div className="relative z-20 overflow-y-auto pr-2 custom-scrollbar" style={{ maxHeight: maxContentHeight }}>
                {children}
              </div>
            </div>
            
            {/* Window Status Bar */}
            <div className="mt-3 flex justify-between items-center text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"></div>
                <span className="text-slate-400 font-mono">ACTIVE</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                <div className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar and Starry Background Styles */}
      <style>
        {`
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(51, 65, 85, 0.3);
            border-radius: 2px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #06b6d4, #0891b2);
            border-radius: 2px;
            box-shadow: 0 0 6px rgba(6, 182, 212, 0.5);
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #0891b2, #0e7490);
          }
          
          .starry-background {
            background: 
              radial-gradient(2px 2px at 20px 30px, #fff, transparent),
              radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 90px 40px, #fff, transparent),
              radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
              radial-gradient(2px 2px at 160px 30px, #fff, transparent),
              radial-gradient(1px 1px at 200px 70px, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 230px 20px, #fff, transparent),
              radial-gradient(2px 2px at 270px 60px, rgba(255,255,255,0.7), transparent),
              radial-gradient(1px 1px at 300px 40px, #fff, transparent),
              radial-gradient(1px 1px at 50px 120px, rgba(255,255,255,0.6), transparent),
              radial-gradient(2px 2px at 100px 150px, #fff, transparent),
              radial-gradient(1px 1px at 150px 110px, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 180px 140px, #fff, transparent),
              radial-gradient(2px 2px at 220px 130px, rgba(255,255,255,0.7), transparent),
              radial-gradient(1px 1px at 260px 160px, #fff, transparent),
              radial-gradient(1px 1px at 290px 120px, rgba(255,255,255,0.6), transparent),
              radial-gradient(circle at 15% 25%, rgba(67, 56, 202, 0.1), transparent 25%),
              radial-gradient(circle at 75% 60%, rgba(139, 92, 246, 0.1), transparent 30%),
              radial-gradient(circle at 45% 80%, rgba(59, 130, 246, 0.1), transparent 20%),
              linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%);
            background-size: 350px 200px, 350px 200px, 350px 200px, 350px 200px, 350px 200px, 350px 200px, 350px 200px, 350px 200px, 350px 200px, 350px 200px, 350px 200px, 350px 200px, 350px 200px, 350px 200px, 350px 200px, 350px 200px, 100% 100%, 100% 100%, 100% 100%, 100% 100%;
            animation: twinkle 4s infinite alternate, driftStars 20s infinite linear;
          }
          
          @keyframes twinkle {
            0% { opacity: 0.7; }
            100% { opacity: 1; }
          }
          
          @keyframes driftStars {
            0% { background-position: 0px 0px, 10px 10px, 20px 20px, 30px 30px, 40px 40px, 50px 50px, 60px 60px, 70px 70px, 80px 80px, 90px 90px, 100px 100px, 110px 110px, 120px 120px, 130px 130px, 140px 140px, 150px 150px, 0% 0%, 0% 0%, 0% 0%, 0% 0%; }
            100% { background-position: 350px 200px, 360px 210px, 370px 220px, 380px 230px, 390px 240px, 400px 250px, 410px 260px, 420px 270px, 430px 280px, 440px 290px, 450px 300px, 460px 310px, 470px 320px, 480px 330px, 490px 340px, 500px 350px, 100% 100%, 100% 100%, 100% 100%, 100% 100%; }
          }
        `}
      </style>
    </div>
  );
}