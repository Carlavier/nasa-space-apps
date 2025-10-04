import { useState } from "react"

const papers = [
    {
        id: 1,
        title: "Exoplanet Atmospheres",
        summary: "Analysis of atmospheric composition in distant exoplanets using spectroscopy",
    },
    {
        id: 2,
        title: "Dark Matter Distribution",
        summary: "Mapping dark matter halos in galaxy clusters through gravitational lensing",
    },
    {
        id: 3,
        title: "Stellar Evolution Models",
        summary: "Updated models for massive star evolution and supernova predictions",
    },
    {
        id: 4,
        title: "Martian Geology",
        summary: "Recent findings on subsurface water ice deposits in the northern hemisphere",
    },
    {
        id: 5,
        title: "Quantum Entanglement",
        summary: "Applications of quantum entanglement in long-distance space communication",
    },
    {
        id: 6,
        title: "Cosmic Microwave Background",
        summary: "New measurements of CMB anisotropies and implications for early universe",
    },
]

const hints = ["Life on Mars", "Black holes", "Habitable zones", "Dark energy"]

export default function SpaceshipInterior() {
    const [searchQuery, setSearchQuery] = useState("")

    const handleHintClick = (hint) => {
        setSearchQuery(`I want to find out about ${hint}`)
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold">Spaceship Research Database</h1>
                    <p className="text-gray-600">Explore the cosmos through scientific research</p>
                </header>

                {/* Layout */}
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Sidebar */}
                    <aside className="lg:w-1/4 space-y-2">
                        <h2 className="font-semibold text-sm text-gray-500">Recent Papers</h2>
                        {papers.slice(0, 3).map((paper) => (
                            <div key={paper.id} className="p-3 bg-white border rounded shadow-sm">
                                <h3 className="text-sm font-medium">{paper.title}</h3>
                                <p className="text-xs text-gray-500">{paper.summary}</p>
                            </div>
                        ))}
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 space-y-6">
                        {/* Search */}
                        <div>
                            <label htmlFor="search" className="block text-sm font-medium mb-2">
                                What do you want to find?
                            </label>
                            <input
                                id="search"
                                type="text"
                                placeholder="Type your research query..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                            />

                            <div className="flex flex-wrap gap-2 mt-3">
                                {hints.map((hint) => (
                                    <button
                                        key={hint}
                                        onClick={() => handleHintClick(hint)}
                                        className="text-sm px-3 py-1 border rounded bg-gray-100 hover:bg-blue-100"
                                    >
                                        {hint}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Papers List */}
                        <section>
                            <h3 className="text-lg font-semibold mb-4">Research Papers</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                {papers.map((paper) => (
                                    <div key={paper.id} className="p-4 bg-white border rounded shadow-sm">
                                        <h4 className="font-medium mb-1">{paper.title}</h4>
                                        <p className="text-sm text-gray-600">{paper.summary}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </main>

                    {/* Right Sidebar */}
                    <aside className="lg:w-1/4 space-y-2">
                        <h2 className="font-semibold text-sm text-gray-500">Trending Topics</h2>
                        {papers.slice(3, 6).map((paper) => (
                            <div key={paper.id} className="p-3 bg-white border rounded shadow-sm">
                                <h3 className="text-sm font-medium">{paper.title}</h3>
                                <p className="text-xs text-gray-500">{paper.summary}</p>
                            </div>
                        ))}
                    </aside>
                </div>
            </div>
        </div>
    )
}
