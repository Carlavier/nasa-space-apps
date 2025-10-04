import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Link } from "react-router-dom"
import {
    FileText,
    Home,
    Network,
    Search,
    ImageIcon,
    Upload,
    BookOpen,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"

const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Papers", href: "/papers", icon: BookOpen },
    { name: "Citation Graph", href: "/graph", icon: Network },
    { name: "Similar Papers", href: "/similar", icon: Search },
    { name: "Tables & Figures", href: "/tables-figures", icon: ImageIcon },
    { name: "Upload", href: "/upload", icon: Upload },
]

export function Sidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const location = useLocation()
    const pathname = location.pathname

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
    }

    return (
        <div className={`flex h-screen flex-col border-r border-border bg-gray-100 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="flex h-16 items-center justify-between border-b border-gray-300 px-3">
                <div className="flex items-center gap-2">
                    <FileText className="h-6 w-6 text-blue-600" />
                    {!isCollapsed && (
                        <span className="text-lg font-semibold text-gray-800">PaperRAG</span>
                    )}
                </div>
                <button
                    onClick={toggleSidebar}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
                    aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {isCollapsed ? (
                        <ChevronRight className="h-4 w-4 text-white"  color="white"/>
                    ) : (
                        <ChevronLeft className="h-4 w-4 bg-white" color="white"/>
                    )}
                </button>
            </div>

            <nav className="flex-1 space-y-1 p-3">
                {navigation.map((item) => {
                    const isActive =
                        pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

                    const linkClasses = `
            flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} rounded-lg px-3 py-2 text-sm font-medium transition-colors
            ${isActive
                            ? "bg-blue-100 text-blue-800"
                            : "text-gray-600 hover:bg-blue-50 hover:text-gray-900"}
          `

                    return (
                        <Link
                            key={item.name}
                            to={item.href}
                            className={linkClasses}
                            title={isCollapsed ? item.name : undefined}
                        >
                            <item.icon className="h-4 w-4" />
                            {!isCollapsed && item.name}
                        </Link>
                    )
                })}
            </nav>

            {!isCollapsed && (
                <div className="border-t border-gray-300 p-4">
                    <div className="rounded-lg bg-blue-100 p-3">
                        <p className="text-xs font-medium text-gray-600">Papers Indexed</p>
                        <p className="text-2xl font-bold text-gray-900">1,247</p>
                    </div>
                </div>
            )}
        </div>
    )
}
