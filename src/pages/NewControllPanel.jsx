import { useState } from 'react';
import { Search, Power, Settings, Navigation, Radar, Shield, Zap, Battery, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Target } from 'lucide-react';

const samplePapers = [
  {
    id: '1',
    title: 'Quantum Propulsion Systems',
    author: 'Dr. Elena Vasquez',
    summary: 'Revolutionary approach to faster-than-light travel using quantum entanglement principles.',
    date: '2089.03.15',
    planetType: 'blue'
  },
  {
    id: '2',
    title: 'Exoplanet Atmospheric Analysis',
    author: 'Prof. Marcus Chen',
    summary: 'Comprehensive study of potentially habitable worlds in the Kepler-442 system.',
    date: '2089.03.12',
    planetType: 'orange'
  },
  {
    id: '3',
    title: 'Dark Matter Navigation',
    author: 'Dr. Sarah Kim',
    summary: 'Utilizing dark matter currents for precision space navigation and energy harvesting.',
    date: '2089.03.10',
    planetType: 'purple'
  },
  {
    id: '4',
    title: 'Biological Life Support',
    author: 'Dr. James Wright',
    summary: 'Self-sustaining ecosystems for long-duration deep space missions.',
    date: '2089.03.08',
    planetType: 'teal'
  }
];

const hintQueries = [
  'Life on Mars',
  'Black hole physics',
  'Exoplanet atmospheres',
  'Quantum mechanics',
  'Stellar formation',
  'Dark energy'
];

export default function NewControlPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeControls, setActiveControls] = useState({
    power: true,
    navigation: true,
    radar: false,
    shield: true,
    engine: false,
    battery: true
  });
  const [knobRotations, setKnobRotations] = useState({
    volume: 45,
    frequency: 120,
    power: 180
  });
  const [toggleStates, setToggleStates] = useState({
    comms: true,
    autopilot: false,
    shields: true
  });

  const toggleControl = (control) => {
    setActiveControls(prev => ({
      ...prev,
      [control]: !prev[control]
    }));
  };

  const toggleSwitch = (toggle) => {
    setToggleStates(prev => ({
      ...prev,
      [toggle]: !prev[toggle]
    }));
  };

  const rotateKnob = (knob) => {
    setKnobRotations(prev => ({
      ...prev,
      [knob]: (prev[knob] + 45) % 360
    }));
  };

  const handleHintClick = (hint) => {
    setSearchQuery(hint);
  };

  return (
    <div className="spaceship-bg w-full h-screen overflow-hidden flex flex-col">
      {/* Main Content Area */}
      <div className="flex-1 flex h-full">
        {/* Left Sidebar */}
        <div className="w-1/5 spaceship-panel p-6 noise-texture edge-highlight">
          <div className="spaceship-surface neumorphic-raised p-4 mb-6">
            <h2 className="spaceship-text-secondary uppercase tracking-wider text-sm font-semibold mb-4">
              Research Papers
            </h2>
          </div>
          
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-neumorphic">
            {samplePapers.map((paper) => (
              <div key={paper.id} className="mb-6">
                <div className="planet-container">
                  <div className={`planet-sphere planet-${paper.planetType}`}></div>
                  <div className="orbital-ring"></div>
                </div>
                <div className="planet-info">
                  <h3 className="spaceship-text-primary font-semibold mb-1 text-sm leading-tight">
                    {paper.title}
                  </h3>
                  <p className="spaceship-text-secondary text-xs leading-relaxed">
                    {paper.summary.slice(0, 60)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Command Area */}
        <div className="w-3/5 p-10 flex flex-col">
          <div className="text-center mb-12">
            <h1 className="spaceship-text-primary text-4xl font-bold tracking-wide">
              SPACESHIP INTERIOR
            </h1>
          </div>

          <div className="max-w-2xl mx-auto w-full">
            <div className="relative mb-8">
              <div className="spaceship-surface neumorphic-inset-lg p-5 flex items-center">
                <Search className="spaceship-text-secondary mr-4 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you want to find out about..."
                  className="flex-1 bg-transparent spaceship-text-primary placeholder-slate-500 outline-none search-input"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-12">
              {hintQueries.map((hint) => (
                <button
                  key={hint}
                  onClick={() => handleHintClick(hint)}
                  className="spaceship-surface neumorphic-raised hint-button px-5 py-3 spaceship-text-secondary hover:spaceship-accent transition-all duration-300"
                >
                  {hint}
                </button>
              ))}
            </div>

            <div className="spaceship-surface neumorphic-inset-lg p-6 min-h-[300px]">
              <div className="spaceship-text-secondary text-center py-20">
                {searchQuery ? (
                  <div>
                    <h3 className="spaceship-text-primary text-lg mb-4">
                      Searching for: "{searchQuery}"
                    </h3>
                    <p>Advanced quantum search algorithms processing...</p>
                  </div>
                ) : (
                  <div>
                    <h3 className="spaceship-text-primary text-lg mb-4">
                      Command Interface Ready
                    </h3>
                    <p>Enter a search query or select a research topic to begin exploration.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-1/5 spaceship-panel p-6 noise-texture edge-highlight">
          <div className="spaceship-surface neumorphic-raised p-4 mb-6">
            <h2 className="spaceship-text-secondary uppercase tracking-wider text-sm font-semibold mb-4">
              Recent Studies
            </h2>
          </div>
          
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-neumorphic">
            {samplePapers.slice().reverse().map((paper) => (
              <div key={`recent-${paper.id}`} className="mb-6">
                <div className="planet-container">
                  <div className={`planet-sphere planet-${paper.planetType}`}></div>
                  <div className="orbital-ring"></div>
                </div>
                <div className="planet-info">
                  <h3 className="spaceship-text-primary font-semibold mb-1 text-sm leading-tight">
                    {paper.title}
                  </h3>
                  <p className="spaceship-text-secondary text-xs leading-relaxed">
                    {paper.summary.slice(0, 60)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Control Panel Footer */}
      <div className="h-25 spaceship-panel border-t border-white border-opacity-5 px-8 py-4 noise-texture">
        <div className="console-grid">
          {/* Left Section - Status Screens */}
          <div className="flex space-x-3">
            <div className="status-screen">
              PWR<br />98%
            </div>
            <div className="status-screen">
              TEMP<br />23°C
            </div>
            <div className="status-screen">
              FUEL<br />847L
            </div>
            <div className="status-screen">
              ALT<br />15.2K
            </div>
          </div>

          <div className="console-divider"></div>

          {/* Center Section - Navigation Controls */}
          <div className="nav-controls">
            <button className="nav-center">
              <Target className="w-6 h-6" />
            </button>
            <button className="nav-direction nav-up">
              <ChevronUp className="w-4 h-4" />
            </button>
            <button className="nav-direction nav-down">
              <ChevronDown className="w-4 h-4" />
            </button>
            <button className="nav-direction nav-left">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="nav-direction nav-right">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="console-divider"></div>

          {/* Right Section - Knobs & Controls */}
          <div className="flex items-center justify-end space-x-6">
            {/* Rotary Knobs */}
            <div className="flex space-x-4">
              <div className="text-center">
                <button 
                  onClick={() => rotateKnob('volume')}
                  className="control-knob"
                >
                  <div 
                    className="knob-indicator"
                    style={{ transform: `translateX(-50%) rotate(${knobRotations.volume}deg)` }}
                  ></div>
                </button>
                <div className="spaceship-text-secondary text-xs mt-1">VOL</div>
              </div>
              <div className="text-center">
                <button 
                  onClick={() => rotateKnob('frequency')}
                  className="control-knob"
                >
                  <div 
                    className="knob-indicator"
                    style={{ transform: `translateX(-50%) rotate(${knobRotations.frequency}deg)` }}
                  ></div>
                </button>
                <div className="spaceship-text-secondary text-xs mt-1">FREQ</div>
              </div>
              <div className="text-center">
                <button 
                  onClick={() => rotateKnob('power')}
                  className="control-knob"
                >
                  <div 
                    className="knob-indicator"
                    style={{ transform: `translateX(-50%) rotate(${knobRotations.power}deg)` }}
                  ></div>
                </button>
                <div className="spaceship-text-secondary text-xs mt-1">PWR</div>
              </div>
            </div>

            {/* LED Indicators */}
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <div className={`led-indicator led-green ${activeControls.power ? 'active' : ''}`}></div>
                <span className="spaceship-text-secondary text-xs">SYS</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`led-indicator led-amber ${activeControls.navigation ? 'active' : ''}`}></div>
                <span className="spaceship-text-secondary text-xs">NAV</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`led-indicator led-red ${activeControls.radar ? 'active' : ''}`}></div>
                <span className="spaceship-text-secondary text-xs">ALR</span>
              </div>
            </div>

            {/* Toggle Switches */}
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => toggleSwitch('comms')}
                  className={`toggle-switch ${toggleStates.comms ? 'active' : ''}`}
                >
                  <div className="toggle-slider"></div>
                </button>
                <span className="spaceship-text-secondary text-xs">COM</span>
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => toggleSwitch('autopilot')}
                  className={`toggle-switch ${toggleStates.autopilot ? 'active' : ''}`}
                >
                  <div className="toggle-slider"></div>
                </button>
                <span className="spaceship-text-secondary text-xs">AUTO</span>
              </div>
            </div>

            {/* Console Buttons */}
            <div className="flex space-x-2">
              <button className="console-button">A</button>
              <button className="console-button">B</button>
              <button className="console-button">C</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}