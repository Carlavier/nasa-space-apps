import { useEffect, useState } from 'react';
import { Search, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Target } from 'lucide-react';
import { similaritySearch } from '../services/ai/core';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { articles } from '../constants';
import { SpaceshipWindow } from '../components/SpaceshipWindow';
import { useAppContext } from '../context/useAppContext';
import { useNavigate } from 'react-router';
import PaperGraph3D from '../components/Graph';

const hintQueries = [
  'CRISPR gene editing',
  'Synthetic biology applications',
  'Human microbiome research',
  'Cancer immunotherapy',
  'Neural regeneration techniques',
  'Bioinformatics in disease prediction'
];

export default function SpaceshipInteriorNeumorphic() {
  const [searchQuery, setSearchQuery] = useState('');
  const { setCurrentArticleId } = useAppContext();

  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const handler = debounce((query) => {
      setDebouncedQuery(query);
    }, 500);

    handler(searchQuery);

    return () => {
      handler.cancel();
    };
  }, [searchQuery]);

  const { data: similarityResult, isLoading } = useQuery({
    queryKey: ['similaritySearch', debouncedQuery],
    queryFn: () => similaritySearch(debouncedQuery),
  });

  const [samplePapers, setSamplePapers] = useState([]);
  useEffect(() => {
    // setSamplePapers(similarityResult ?? []);
    setSamplePapers((similarityResult && similarityResult.length > 0 ? similarityResult : [])
      .map((paper) => paper[0])
      .map((paper) => {
        const pmcid = paper.metadata?.pmcid || '';
        const article = articles[pmcid];
        return {
          id: paper.id,
          ...Object(article)
        };
      }))
  }, [similarityResult, isLoading]);

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

  const getPlanetColor = (type) => {
    const colors = {
      blue: 'from-blue-400 to-blue-600',
      orange: 'from-orange-400 to-orange-600',
      purple: 'from-purple-400 to-purple-600',
      teal: 'from-teal-400 to-teal-600'
    };
    return colors[type] || colors.blue;
  };

  const navigate = useNavigate();

  function redirectToPaper(paperId) {
    navigate(`/papers/${paperId}`);
  }

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Main Content Area */}
      <div className="flex-1 flex min-h-0">
        {/* Left Sidebar */}
        <div className="w-2/7 bg-slate-800/50 backdrop-blur-sm p-2 border-r border-slate-700/50 overflow-y-auto">
          <SpaceshipWindow title="VIEWPORT-01" maxContentHeight="none" className="h-full">
            {samplePapers?.map((paper) => (
              <div key={paper.id} className="mb-6 cursor-pointer" onClick={() => redirectToPaper(paper.pmcid)}>
                <div className="relative w-16 h-16 mx-auto mb-3">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getPlanetColor(paper.planetType)} shadow-lg animate-pulse`}></div>
                  <div className="absolute inset-0 rounded-full border-2 border-slate-500/30 animate-spin" style={{ animationDuration: '8s' }}></div>
                </div>
                <div className="text-center">
                  <h3 className="text-slate-200 font-semibold mb-1 text-sm leading-tight">
                    {paper.title}
                  </h3>
                </div>
              </div>
            ))}
          </SpaceshipWindow>
        </div>

        {/* Center Command Area */}
        <div className="w-3/7 p-2 flex flex-col overflow-y-auto">
          <div className="text-center mb-12">
            <h1 className="text-slate-100 text-5xl font-bold tracking-wide drop-shadow-lg mb-4">
              Enjoy Space Biology
            </h1>
            <h2 className="text-slate-300 text-lg font-medium mb-3 tracking-wide">
              Orbital Echoes
            </h2>
            <p className="text-slate-400 text-base italic font-light tracking-wider">
              Read Less, Understand Right
            </p>
          </div>

          <div className="max-w-2xl mx-auto w-full">
            <div className="relative mb-8">
              <div className="bg-slate-900/80 shadow-inner rounded-xl p-5 flex items-center border border-slate-700/50">
                <Search className="text-slate-400 mr-4 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="What do you want to find out about..."
                  className="flex-1 bg-transparent text-slate-200 placeholder-slate-500 outline-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-12">
              {hintQueries.map((hint) => (
                <button
                  key={hint}
                  onClick={() => handleHintClick(hint)}
                  className="bg-slate-800/80 shadow-lg rounded-lg px-5 py-3 text-slate-300 hover:text-cyan-400 hover:shadow-cyan-500/50 transition-all duration-300 border border-slate-700/30 hover:border-cyan-500/50"
                >
                  {hint}
                </button>
              ))}
            </div>

            <div className="bg-slate-900/80 shadow-inner rounded-xl p-6 h-[150px] border border-slate-700/50">
              <div className="text-slate-400 text-center py-2">
                {isLoading ? (
                  <div>
                    <h3 className="text-slate-200 text-lg mb-2">
                      Searching for: "{searchQuery}"
                    </h3>
                    <p>Advanced quantum search algorithms processing...</p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-slate-200 text-lg mb-2">
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
        <div className="w-2/7 bg-slate-800/50 backdrop-blur-sm p-2 border-l border-slate-700/50 overflow-y-auto">
          <SpaceshipWindow title="VIEWPORT-02" className="mb-4 h-full" maxContentHeight="none">
            {samplePapers?.slice().reverse().map((paper) => (
              <div key={`recent-${paper.id}`} className="mb-6 cursor-pointer" onClick={() => redirectToPaper(paper.pmcid)}>
                <div className="relative w-16 h-16 mx-auto mb-3">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getPlanetColor(paper.planetType)} shadow-lg animate-pulse`}></div>
                  <div className="absolute inset-0 rounded-full border-2 border-slate-500/30 animate-spin" style={{ animationDuration: '8s' }}></div>
                </div>
                <div className="text-center">
                  <h3 className="text-slate-200 font-semibold mb-1 text-sm leading-tight">
                    {paper.title}
                  </h3>
                </div>
              </div>
            ))}
          </SpaceshipWindow>
        </div>
      </div>

      <div className="w-[100%] mx-auto mb-4">
        <PaperGraph3D articles={articles} onSelect={(article) => {
          navigate(`/papers/${article.pmcid}`);
          console.log(article.pmcid)
        }} />
      </div>

      {/* Enhanced Control Panel Footer */}
      <div className="h-32 bg-slate-800/70 backdrop-blur-sm border-t border-slate-700/50 px-8 py-4">
        <div className="grid grid-cols-[auto_1px_auto_1px_1fr] gap-6 h-full items-center">
          {/* Left Section - Status Screens */}
          <div className="flex space-x-3">
            {[
              { label: 'PWR', value: '98%' },
              { label: 'TEMP', value: '23°C' },
              { label: 'FUEL', value: '847L' },
              { label: 'ALT', value: '15.2K' }
            ].map((status, i) => (
              <div key={i} className="bg-slate-900/90 rounded px-3 py-2 min-w-[60px] text-center border border-emerald-500/30 shadow-inner">
                <div className="text-emerald-400 text-xs font-mono leading-tight">
                  {status.label}<br />{status.value}
                </div>
              </div>
            ))}
          </div>

          <div className="h-16 w-px bg-slate-600/50"></div>

          {/* Center Section - Navigation Controls */}
          <div className="relative w-32 h-32">
            <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors shadow-lg border-2 border-slate-600 flex items-center justify-center">
              <Target className="w-6 h-6 text-slate-300" />
            </button>
            <button className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 transition-colors shadow-md border border-slate-600 flex items-center justify-center">
              <ChevronUp className="w-4 h-4 text-slate-300" />
            </button>
            <button className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 transition-colors shadow-md border border-slate-600 flex items-center justify-center">
              <ChevronDown className="w-4 h-4 text-slate-300" />
            </button>
            <button className="absolute top-1/2 left-0 -translate-y-1/2 w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 transition-colors shadow-md border border-slate-600 flex items-center justify-center">
              <ChevronLeft className="w-4 h-4 text-slate-300" />
            </button>
            <button className="absolute top-1/2 right-0 -translate-y-1/2 w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 transition-colors shadow-md border border-slate-600 flex items-center justify-center">
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </button>
          </div>

          <div className="h-16 w-px bg-slate-600/50"></div>

          {/* Right Section - Knobs & Controls */}
          <div className="flex items-center justify-end space-x-6">
            {/* Rotary Knobs */}
            <div className="flex space-x-4">
              {[
                { key: 'volume', label: 'VOL' },
                { key: 'frequency', label: 'FREQ' },
                { key: 'power', label: 'PWR' }
              ].map((knob) => (
                <div key={knob.key} className="text-center">
                  <button
                    onClick={() => rotateKnob(knob.key)}
                    className="relative w-12 h-12 rounded-full bg-slate-700 shadow-inner border-2 border-slate-600 hover:border-slate-500 transition-colors"
                  >
                    <div
                      className="absolute top-1 left-1/2 w-1 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-500/50"
                      style={{
                        transformOrigin: 'bottom center',
                        transform: `translateX(-50%) rotate(${knobRotations[knob.key]}deg)`
                      }}
                    ></div>
                  </button>
                  <div className="text-slate-400 text-xs mt-1">{knob.label}</div>
                </div>
              ))}
            </div>

            {/* LED Indicators */}
            <div className="flex flex-col space-y-2">
              {[
                { key: 'power', label: 'SYS', color: 'bg-emerald-500' },
                { key: 'navigation', label: 'NAV', color: 'bg-amber-500' },
                { key: 'radar', label: 'ALR', color: 'bg-red-500' }
              ].map((led) => (
                <div key={led.key} className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${led.color} ${activeControls[led.key] ? 'shadow-lg animate-pulse' : 'opacity-30'}`}></div>
                  <span className="text-slate-400 text-xs">{led.label}</span>
                </div>
              ))}
            </div>

            {/* Toggle Switches */}
            <div className="flex flex-col space-y-3">
              {[
                // { key: 'comms', label: 'COM' },
                // { key: 'autopilot', label: 'AUTO' }
              ].map((toggle) => (
                <div key={toggle.key} className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleSwitch(toggle.key)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${toggleStates[toggle.key] ? 'bg-cyan-500' : 'bg-slate-600'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-md transition-transform ${toggleStates[toggle.key] ? 'translate-x-5' : 'translate-x-0.5'}`}></div>
                  </button>
                  <span className="text-slate-400 text-xs">{toggle.label}</span>
                </div>
              ))}
            </div>

            {/* Console Buttons */}
            <div className="flex space-x-2">
              {['A', 'B', 'C'].map((btn) => (
                <button key={btn} className="w-8 h-8 rounded bg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-300 text-sm font-bold transition-colors shadow-md">
                  {btn}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}