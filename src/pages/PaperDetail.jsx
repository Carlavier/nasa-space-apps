// PaperDetailView.jsx
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PaperDetailView({
    paper,
    papers,
    onBack,
    onPaperSelect,
    getPlanetColor,
    controlPanel: ControlPanel
}) {
    const [chatMessages, setChatMessages] = useState([{
        type: 'assistant',
        text: `I'm your AI assistant. I can help explain the research on "${paper?.title}". Feel free to ask me anything!`
    }]);
    const [chatInput, setChatInput] = useState('');
    const [hoveredPlanet, setHoveredPlanet] = useState(null);

    const sampleChatQuestions = [
        'How does quantum entanglement work at this scale?',
        'What are the energy requirements?',
        'Could this be scaled for human travel?',
        'What are the main challenges?'
    ];

    const handleSendMessage = () => {
        if (!chatInput.trim()) return;
        setChatMessages(prev => [...prev, { type: 'user', text: chatInput }]);
        setTimeout(() => {
            setChatMessages(prev => [...prev, {
                type: 'assistant',
                text: 'This is a simulated response. In production, this would connect to an AI model.'
            }]);
        }, 1000);
        setChatInput('');
    };

    return (
        <div className="w-full h-screen overflow-hidden flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="flex-1 flex h-full">
                {/* Left Sidebar - Planets */}
                <div className="w-1/5 bg-slate-800/50 backdrop-blur-sm p-6 border-r border-slate-700/50 relative overflow-hidden">
                    <button
                        onClick={onBack}
                        className="flex items-center space-x-2 mb-6 text-slate-400 hover:text-cyan-400 transition-colors relative z-10"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="text-sm">Back to Command</span>
                    </button>

                    <div className="relative h-[calc(100vh-250px)] z-10">
                        {papers.slice(0, 3).map((p, index) => {
                            const angle = (index * 60) - 30;
                            const radius = 200;
                            const centerX = 60;
                            const centerY = 50;
                            const x = centerX + radius * Math.cos((angle * Math.PI) / 180);
                            const y = centerY + radius * Math.sin((angle * Math.PI) / 180);

                            return (
                                <div
                                    key={p.id}
                                    className="absolute"
                                    style={{ left: `${x - 32}px`, top: `${y - 32}px` }}
                                >
                                    <div
                                        className="relative w-16 h-16 cursor-pointer"
                                        onClick={() => onPaperSelect(p)}
                                        onMouseEnter={() => setHoveredPlanet(p.id)}
                                        onMouseLeave={() => setHoveredPlanet(null)}
                                    >
                                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getPlanetColor(p.planetType)} shadow-lg ${paper?.id === p.id ? 'ring-4 ring-cyan-400 ring-opacity-50' : 'hover:scale-110'} transition-all duration-300`}></div>
                                        {hoveredPlanet === p.id && (
                                            <div className="absolute left-20 top-0 w-48 bg-slate-900/95 border border-slate-700 rounded-lg p-3 shadow-xl z-50">
                                                <h4 className="text-slate-200 font-semibold text-xs mb-1">{p.title}</h4>
                                                <p className="text-slate-400 text-xs">{p.summary.slice(0, 80)}...</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Center Content */}
                <div className="w-3/5 p-8 flex flex-col overflow-y-auto">
                    <h1 className="text-slate-100 text-3xl font-bold mb-2">{paper?.title}</h1>
                    <p className="text-slate-400 text-sm mb-6">By {paper?.author} • {paper?.date}</p>

                    <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-6 shadow-inner mb-6">
                        <p className="text-slate-300 leading-relaxed">{paper?.snippet}</p>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-900/20 to-slate-900/80 border border-cyan-700/30 rounded-xl p-6 shadow-inner">
                        <p className="text-slate-300 leading-relaxed">{paper?.explanation}</p>
                    </div>
                </div>

                {/* Right Sidebar - Chat */}
                <div className="w-1/5 bg-slate-800/50 backdrop-blur-sm border-l border-slate-700/50 flex flex-col">
                    <div className="p-6 border-b border-slate-700/50">
                        <h2 className="text-slate-300 font-semibold uppercase tracking-wide text-sm">
                            AI Assistant
                        </h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {chatMessages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-lg p-3 ${msg.type === 'user' ? 'bg-cyan-600/80 text-white' : 'bg-slate-700/80 text-slate-200'}`}>
                                    <p className="text-sm">{msg.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="p-4 border-t border-slate-700/50">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Ask a question..."
                                className="flex-1 bg-slate-900/80 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 text-sm outline-none"
                            />
                            <button
                                onClick={handleSendMessage}
                                className="w-10 h-10 rounded-lg bg-cyan-600 hover:bg-cyan-500 flex items-center justify-center transition-colors"
                            >
                                <ChevronRight className="w-4 h-4 text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {ControlPanel && <ControlPanel />}
        </div>
    );
}
