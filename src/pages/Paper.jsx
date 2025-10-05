import { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Target, ArrowLeft, Send, Play } from 'lucide-react';
import { generateResponse } from '../services/ai/core';
import { articles } from '../constants';
import { useNavigate, useParams } from 'react-router';

const sampleQuestions = [
    'What is the main focus of this research?',
    'How does this research impact the field?',
    'What are the potential applications of this study?'
];

const planetTypes = [
    'blue', 'orange', 'purple', 'teal', 'red', 'green', 'yellow', 'pink', 'indigo', 'cyan',
    'lime', 'amber', 'violet', 'fuchsia', 'rose', 'emerald', 'sky', 'slate', 'stone', 'zinc',
    'neutral', 'gray', 'warmGray', 'trueGray', 'coolGray', 'deepPurple', 'lightBlue', 'deepOrange', 'lightGreen', 'brown',
    'gold', 'silver', 'bronze', 'magenta', 'turquoise', 'coral', 'peach', 'mint', 'lavender', 'apricot'
];

export default function Paper() {
    const { pcmid } = useParams();

    const article = articles[pcmid];
    const relatedPapers = article.ref_cited.map((id, index) => {
        const curArticles = articles[id];
        // Use a seeded color based on the paper id for consistent planetType
        function seededRandom(seed) {
            let x = Math.sin(seed) * 10000;
            return x - Math.floor(x);
        }
        const planetType = planetTypes[Math.floor(seededRandom(index) * planetTypes.length)];
        return {
            id: curArticles.pmcid,
            title: curArticles.title,
            planetType,
            summary: curArticles.abstract
        }
    });
    console.log(relatedPapers);

    const [articleSnippet, setArticleSnippet] = useState("Loading...");
    const [articleExplanation, setArticleExplanation] = useState("Loading...");

    useEffect(() => {
        async function loadArticle() {
            try {
                const snippet = await generateResponse("Provide a concise snippet from the paper.", pcmid, 'terminology');
                const explanation = await generateResponse("Explain the significance of this research in simple terms.", pcmid, 'terminology');
                setArticleSnippet(snippet.definition);
                setArticleExplanation(explanation.definition);
            } catch (error) {
                console.error("Error fetching article data:", error);
            }
        }

        loadArticle();
    }, []);

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
        text: `I'm your AI assistant. I can help explain the research on "${article.title}". Feel free to ask me anything!`
    }]);
    const [chatInput, setChatInput] = useState('');
    const [hoveredPlanet, setHoveredPlanet] = useState(null);

    const getPlanetColor = (type) => {
        const colors = {
            blue: "from-blue-400 via-blue-600 to-blue-900",
            orange: "from-orange-400 via-orange-600 to-orange-900",
            purple: "from-purple-400 via-purple-600 to-purple-900",
            teal: "from-teal-400 via-teal-600 to-teal-900",
            red: "from-red-400 via-red-600 to-red-900",
            green: "from-green-400 via-green-600 to-green-900",
            yellow: "from-yellow-300 via-yellow-500 to-yellow-700",
            pink: "from-pink-400 via-pink-600 to-pink-900",
            indigo: "from-indigo-400 via-indigo-600 to-indigo-900",
            cyan: "from-cyan-400 via-cyan-600 to-cyan-900",
            lime: "from-lime-400 via-lime-600 to-lime-900",
            amber: "from-amber-400 via-amber-600 to-amber-900",
            violet: "from-violet-400 via-violet-600 to-violet-900",
            fuchsia: "from-fuchsia-400 via-fuchsia-600 to-fuchsia-900",
            rose: "from-rose-400 via-rose-600 to-rose-900",
            emerald: "from-emerald-400 via-emerald-600 to-emerald-900",
            sky: "from-sky-400 via-sky-600 to-sky-900",
            slate: "from-slate-400 via-slate-600 to-slate-900",
            stone: "from-stone-400 via-stone-600 to-stone-900",
            zinc: "from-zinc-400 via-zinc-600 to-zinc-900",
            neutral: "from-neutral-400 via-neutral-600 to-neutral-900",
            gray: "from-gray-400 via-gray-600 to-gray-900",
            warmGray: "from-warmGray-400 via-warmGray-600 to-warmGray-900",
            trueGray: "from-trueGray-400 via-trueGray-600 to-trueGray-900",
            coolGray: "from-coolGray-400 via-coolGray-600 to-coolGray-900",
            deepPurple: "from-purple-500 via-purple-700 to-purple-900",
            lightBlue: "from-blue-300 via-blue-400 to-blue-600",
            deepOrange: "from-orange-500 via-orange-700 to-orange-900",
            lightGreen: "from-green-300 via-green-400 to-green-600",
            brown: "from-yellow-900 via-yellow-800 to-yellow-700",
            gold: "from-yellow-400 via-yellow-500 to-yellow-700",
            silver: "from-gray-300 via-gray-400 to-gray-500",
            bronze: "from-yellow-800 via-yellow-900 to-yellow-700",
            magenta: "from-pink-500 via-pink-700 to-pink-900",
            turquoise: "from-teal-300 via-teal-400 to-teal-600",
            coral: "from-orange-300 via-orange-400 to-orange-600",
            peach: "from-orange-200 via-orange-300 to-orange-400",
            mint: "from-green-200 via-green-300 to-green-400",
            lavender: "from-purple-200 via-purple-300 to-purple-400",
            apricot: "from-orange-200 via-orange-300 to-orange-400"
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

    useEffect(() => {
        const chatContainer = document.querySelector('.flex-1.overflow-y-auto');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [chatMessages]);

    const handleSendMessage = async () => {
        if (!chatInput.trim()) return;

        setChatMessages(prev => [...prev, { type: 'user', text: chatInput }]);
        setChatInput('');
        setChatMessages(prev => [...prev, {
            type: 'assistant',
            text: 'Thinking...'
        }]);

        const data = await generateResponse(chatInput, pcmid);

        setChatMessages(prev => {
            prev[prev.length - 1] = { type: 'assistant', text: data.answer };
            return [...prev];
        });
    };

    const handleSampleQuestionClick = (question) => {
        setChatInput(question);
    };

    const navigate = useNavigate();

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
                        className="flex items-center space-x-2 mb-2 text-slate-400 hover:text-cyan-400 transition-colors relative z-10"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-sm">Back to Command</span>
                    </button>

                    <div className="bg-slate-900/80 shadow-inner rounded-lg p-4 mb-2 border border-slate-700/30 relative z-10">
                        <h2 className="text-slate-400 uppercase tracking-wider text-sm font-semibold">
                            Related Planets
                        </h2>
                    </div>
                    {/* <div className="bg-slate-900/80 shadow-inner rounded-lg p-4 mb-2 border border-slate-700/30 relative z-10">
                        <div className="space-y-4 max-h-48vh overflow-y-auto custom-scrollbar">
                            {relatedPapers.map((paper) => (
                                <div
                                    key={paper.id}
                                    className="bg-slate-900/80 shadow-inner rounded-lg p-4 border border-slate-700/30"
                                >
                                    <h3 className="text-slate-200 font-semibold text-sm">{paper.title}</h3>
                                    <p className="text-slate-400 text-xs">{paper.summary.slice(0, 60)}...</p>
                                </div>
                            ))}
                        </div>
                    </div> */}

                    <div>
                        <div
                            className="relative h-[calc(100vh-300px)] z-10 w-[100%]"
                            style={{
                                display: 'flex',
                            }}
                        >
                            {/* Rotating container */}
                            <div
                                style={{
                                    width: "100%",
                                    animationDuration: '20s',
                                    animationTimingFunction: 'linear',
                                    animationIterationCount: 'infinite',
                                    transformOrigin: 'center center', // full circular rotation
                                    height: '0px', // no need to define area
                                }}
                            >
                                {relatedPapers.map((paper) => {
                                    return (
                                        <div
                                            className='w-[100%]'
                                            key={paper.id}
                                        >
                                            <div
                                                className="relative w-16 h-16 cursor-pointer mt-4 w-[100%]"
                                                onMouseEnter={() => setHoveredPlanet(paper.id)}
                                                onMouseLeave={() => setHoveredPlanet(null)}
                                            >
                                                <div
                                                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${getPlanetColor(
                                                        paper.planetType
                                                    )} shadow-lg ${article.id === paper.id
                                                        ? 'ring-4 ring-cyan-400 ring-opacity-50'
                                                        : 'hover:scale-110'
                                                        } transition-all duration-300`}
                                                ></div>

                                                {/* Tooltip */}
                                                {hoveredPlanet === paper.id && (
                                                    <div className="absolute left-20 top-0 w-[calc(100%-64px)] bg-slate-900/95 border border-slate-700 rounded-lg p-3 shadow-xl z-[9999]">
                                                        <h4 className="text-slate-200 font-semibold text-xs mb-1">
                                                            {paper.title}
                                                        </h4>
                                                        <p className="text-slate-400 text-xs font-light">
                                                            {paper.summary.slice(0, 80)}...
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center Content Area */}
                <div className="w-3/5 p-2 flex flex-col overflow-y-auto" >
                    <div className="mb-2">
                        <h1 className="text-slate-100 text-xl font-bold mb-2">
                            {article.title}
                        </h1>
                        <p className="text-slate-400 text-sm">
                            By {article.author} • {article.date}
                        </p>
                    </div>

                    {/* Video/Experiment Section */}
                    <div className="mb-2">
                        <h2 className="text-slate-300 text-lg font-semibold mb-1 uppercase tracking-wide">
                            Experiment Video
                        </h2>
                        <div className="w-[30rem] m-auto relative bg-slate-900/80 border border-slate-700/50 rounded-xl overflow-hidden shadow-inner aspect-video group">
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
                    <div className="mb-2">
                        <h2 className="text-slate-300 text-lg font-semibold mb-1 uppercase tracking-wide">
                            Snippet from the paper
                        </h2>
                        <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-2 shadow-inner">
                            <p className="text-slate-300 leading-relaxed text-left italic">
                                {`"${articleSnippet}"`}
                            </p>
                        </div>
                    </div>

                    {/* LLM Explanation */}
                    <div className="mb-2">
                        <h2 className="text-slate-300 text-lg font-semibold mb-1 uppercase tracking-wide">
                            Explanation
                        </h2>
                        <div className="bg-gradient-to-br from-cyan-900/20 to-slate-900/80 border border-cyan-700/30 rounded-xl p-2 shadow-inner">
                            <div className="flex items-start space-x-3">
                                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 animate-pulse"></div>
                                <p className="text-slate-300 leading-relaxed flex-1 text-left">
                                    {articleExplanation}
                                </p>
                            </div>
                        </div>
                    </div>
                    <a
                        href={article.pdf_download_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fixed top-24 left-3/4 -translate-x-1/2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full px-4 py-2 flex items-center space-x-2 shadow-lg border border-cyan-400/50 hover:scale-105 transform transition-all"
                        title="Download PDF"
                    >
                        <div style={{ color: "white" }}>
                            Download PDF
                        </div>
                    </a>
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
                                <p className="text-slate-400 text-xs uppercase tracking-wide mb-1">
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
                        fghjkjhgfghjk
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
