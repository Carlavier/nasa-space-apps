import { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Target, ArrowLeft, Send, Play } from 'lucide-react';
import { articles } from '../constants';

const samplePaper = {
    id: '1',
    title: 'Quantum Propulsion Systems',
    author: 'Dr. Elena Vasquez',
    summary: 'Revolutionary approach to faster-than-light travel using quantum entanglement principles.',
    date: '2089.03.15',
    planetType: 'blue',
    snippet: 'Our research demonstrates that by manipulating quantum entangled particles across vast distances, we can create a propulsion field that appears to violate traditional speed limitations. The key breakthrough involves maintaining quantum coherence at macroscopic scales through advanced cryogenic shielding and electromagnetic field manipulation.',
    explanation: 'This experiment showcases a revolutionary quantum propulsion system that could fundamentally change space travel. By leveraging quantum entanglement - a phenomenon where particles remain connected regardless of distance - the researchers have created a propulsion mechanism that bypasses conventional thrust limitations. The video demonstration shows the quantum field generator maintaining stable entanglement at room temperature, a feat previously thought impossible.'
};

const pmcid = 'PMC4136787'; // Example PMCID for fetching paper data
const article = articles['PMC4136787']; // Example PMCID for fetching paper data

const relatedPapers = [
    {
        id: '1',
        title: 'Quantum Propulsion Systems',
        planetType: 'blue',
        summary: 'Revolutionary approach to faster-than-light travel using quantum entanglement principles.'
    },
    {
        id: '2',
        title: 'Exoplanet Atmospheric Analysis',
        planetType: 'orange',
        summary: 'Comprehensive study of potentially habitable worlds in the Kepler-442 system.'
    },
    {
        id: '3',
        title: 'Dark Matter Navigation',
        planetType: 'purple',
        summary: 'Utilizing dark matter currents for precision space navigation and energy harvesting.'
    }
];

const sampleQuestions = [
    'How does quantum entanglement work at this scale?',
    'What are the energy requirements?',
    'Could this be scaled for human travel?',
    'What are the main challenges?'
];

export default function Paper() {
    const [activeControls] = useState({
        power: true,
        navigation: true,
        radar: false
    });
    const [knobRotations, setKnobRotations] = useState({
        volume: 45,
        frequency: 120,
        power: 180
    });
    const [toggleStates, setToggleStates] = useState({
        comms: true,
        autopilot: false
    });
    const [chatMessages, setChatMessages] = useState([{
        type: 'assistant',
        text: `I'm your AI assistant. I can help explain the research on "${samplePaper.title}". Feel free to ask me anything!`
    }]);
    const [chatInput, setChatInput] = useState('');
    const [hoveredPlanet, setHoveredPlanet] = useState(null);

    const getPlanetColor = (type) => {
        const colors = {
            blue: 'from-blue-400 to-blue-600',
            orange: 'from-orange-400 to-orange-600',
            purple: 'from-purple-400 to-purple-600',
            teal: 'from-teal-400 to-teal-600'
        };
        return colors[type] || colors.blue;
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

    const handleSendMessage = () => {
        if (!chatInput.trim()) return;

        setChatMessages(prev => [...prev, { type: 'user', text: chatInput }]);

        setTimeout(() => {
            setChatMessages(prev => [...prev, {
                type: 'assistant',
                text: 'This is a simulated response. In a real implementation, this would connect to an AI model to provide detailed explanations about the research paper and experimental results.'
            }]);
        }, 1000);

        setChatInput('');
    };

    const handleSampleQuestionClick = (question) => {
        setChatInput(question);
    };

    return (
        <div className="w-full h-screen overflow-hidden flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Main Content Area */}
            <div className="flex-1 flex h-full">
                {/* Left Sidebar - Planets */}
                <div className="w-1/5 bg-slate-800/50 backdrop-blur-sm p-6 border-r border-slate-700/50 relative overflow-hidden">
                    {/* Circular arc path SVG */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" style={{ zIndex: 0 }}>
                        <circle
                            cx="60"
                            cy="300"
                            r="220"
                            stroke="rgba(100, 200, 255, 0.4)"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray="8,8"
                        />
                    </svg>

                    <button
                        className="flex items-center space-x-2 mb-6 text-slate-400 hover:text-cyan-400 transition-colors relative z-10"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-sm">Back to Command</span>
                    </button>

                    <div className="bg-slate-900/80 shadow-inner rounded-lg p-4 mb-6 border border-slate-700/30 relative z-10">
                        <h2 className="text-slate-400 uppercase tracking-wider text-sm font-semibold">
                            Planets from before
                        </h2>
                    </div>

                    {/* Planets positioned along circular arc */}
                    <div className="relative h-[calc(100vh-250px)] z-10">
                        {relatedPapers.map((paper, index) => {
                            // Calculate positions along the circle arc
                            const angle = 180 + (index * 40); // Start from left, spread 40 degrees apart
                            const radius = 220;
                            const centerX = 60;
                            const centerY = 300;
                            const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
                            const y = centerY + radius * Math.sin((angle * Math.PI) / 180);

                            return (
                                <div
                                    key={paper.id}
                                    className="absolute"
                                    style={{
                                        left: `${x - 32}px`,
                                        top: `${y - 32}px`
                                    }}
                                >
                                    <div
                                        className="relative w-16 h-16 cursor-pointer"
                                        onMouseEnter={() => setHoveredPlanet(paper.id)}
                                        onMouseLeave={() => setHoveredPlanet(null)}
                                    >
                                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getPlanetColor(paper.planetType)} shadow-lg ${samplePaper.id === paper.id ? 'ring-4 ring-cyan-400 ring-opacity-50' : 'hover:scale-110'} transition-all duration-300`}></div>
                                        <div className="absolute inset-0 rounded-full border-2 border-slate-500/30 animate-spin" style={{ animationDuration: '8s' }}></div>

                                        {/* Hover tooltip */}
                                        {hoveredPlanet === paper.id && (
                                            <div className="absolute left-20 top-0 w-48 bg-slate-900/95 border border-slate-700 rounded-lg p-3 shadow-xl z-50">
                                                <h4 className="text-slate-200 font-semibold text-xs mb-1">{paper.title}</h4>
                                                <p className="text-slate-400 text-xs">{paper.summary.slice(0, 80)}...</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Center Content Area */}
                <div className="w-3/5 p-8 flex flex-col overflow-y-auto">
                    <div className="mb-6">
                        <h1 className="text-slate-100 text-3xl font-bold mb-2">
                            {samplePaper.title}
                        </h1>
                        <p className="text-slate-400 text-sm">
                            By {samplePaper.author} • {samplePaper.date}
                        </p>
                    </div>

                    {/* Video/Experiment Section */}
                    <div className="mb-6">
                        <h2 className="text-slate-300 text-lg font-semibold mb-3 uppercase tracking-wide">
                            Experiment Video
                        </h2>
                        <div className="relative bg-slate-900/80 border border-slate-700/50 rounded-xl overflow-hidden shadow-inner aspect-video group">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-20 h-20 rounded-full bg-slate-700/50 border-2 border-slate-600 flex items-center justify-center mb-4 mx-auto group-hover:bg-cyan-500/20 group-hover:border-cyan-500 transition-all cursor-pointer">
                                        <Play className="w-10 h-10 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                                    </div>
                                    <p className="text-slate-400 text-sm">Experiment Demonstration</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Snippet from the paper */}
                    <div className="mb-6">
                        <h2 className="text-slate-300 text-lg font-semibold mb-3 uppercase tracking-wide">
                            Snippet from the paper
                        </h2>
                        <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-6 shadow-inner">
                            <p className="text-slate-300 leading-relaxed">
                                {samplePaper.snippet}
                            </p>
                        </div>
                    </div>

                    {/* LLM Explanation */}
                    <div className="mb-6">
                        <h2 className="text-slate-300 text-lg font-semibold mb-3 uppercase tracking-wide">
                            LLM explanation
                        </h2>
                        <div className="bg-gradient-to-br from-cyan-900/20 to-slate-900/80 border border-cyan-700/30 rounded-xl p-6 shadow-inner">
                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 animate-pulse"></div>
                                <p className="text-slate-300 leading-relaxed flex-1">
                                    {samplePaper.explanation}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Floating LLM Chat Bot */}
                <div className="w-1/5 bg-slate-800/50 backdrop-blur-sm border-l border-slate-700/50 flex flex-col">
                    <div className="p-6 border-b border-slate-700/50">
                        <h2 className="text-slate-300 font-semibold uppercase tracking-wide text-sm">
                            Floating LLM chat bot
                        </h2>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {chatMessages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-lg p-3 ${msg.type === 'user'
                                            ? 'bg-cyan-600/80 text-white'
                                            : 'bg-slate-700/80 text-slate-200'
                                        }`}
                                >
                                    <p className="text-sm leading-relaxed">{msg.text}</p>
                                </div>
                            </div>
                        ))}

                        {/* Sample Questions */}
                        {chatMessages.length <= 1 && (
                            <div className="space-y-2 mt-6">
                                <p className="text-slate-400 text-xs uppercase tracking-wide mb-3">
                                    Sample Questions:
                                </p>
                                {sampleQuestions.map((question, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSampleQuestionClick(question)}
                                        className="w-full text-left bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg p-2 text-slate-300 text-xs transition-colors"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-slate-700/50">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Ask a question..."
                                className="flex-1 bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 text-sm outline-none focus:border-cyan-500 transition-colors"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="w-10 h-10 rounded-lg bg-cyan-600 hover:bg-cyan-500 flex items-center justify-center transition-colors"
                            >
                                <Send className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Control Panel Footer */}
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
                                { key: 'comms', label: 'COM' },
                                { key: 'autopilot', label: 'AUTO' }
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
