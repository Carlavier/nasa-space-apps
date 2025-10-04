import { Search, Star, Clock, FileText } from "lucide-react"
import { useState } from "react"

export default function Dashboard() {
  const stats = [
    { label: "Total Papers", value: "1,247", change: "+12%", icon: FileText },
    { label: "New This Week", value: "34", change: "+8%", icon: FileText },
    { label: "Citations", value: "18,212", change: "+3%", icon: FileText },
    { label: "Authors", value: "942", change: "+5%", icon: FileText },
  ]

  const recentPapers = [
    {
      id: 1,
      title: "Understanding Neural Attention",
      authors: "Jane Doe, John Smith",
      year: 2023,
      abstract: "This paper explores attention mechanisms in transformers...",
      status: "Published",
      citations: 1289,
    },
    {
      id: 2,
      title: "Graph Neural Networks in Practice",
      authors: "Emily Zhang",
      year: 2022,
      abstract: "A comprehensive study on the applications of GNNs...",
      status: "Draft",
      citations: 754,
    },
  ]

  return (
    <div className="flex h-screen">
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-6xl mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-500">
              AI-powered scientific paper analysis and exploration
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search papers, authors, topics..."
              className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white flex justify-between items-center"
              >
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-blue-600">{stat.change} from last week</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            ))}
          </div>

          {/* Recent Papers */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Papers
                </h2>
                <p className="text-sm text-gray-500">
                  Recently added to your collection
                </p>
              </div>
              <a
                href="#"
                className="text-sm border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-100"
              >
                View All
              </a>
            </div>

            <div className="space-y-4">
              {recentPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">{paper.title}</h3>
                    <span className="text-xs px-2 py-1 rounded bg-gray-200 text-gray-700">
                      {paper.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-1">
                    {paper.authors} • {paper.year}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                    {paper.abstract}
                  </p>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" /> {paper.citations.toLocaleString()} citations
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Added 2 days ago
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
