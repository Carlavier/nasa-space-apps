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
    const location = useLocation()
    const pathname = location.pathname

    return (
        <div className="flex h-screen w-64 flex-col border-r border-border bg-gray-100">
            <div className="flex h-16 items-center gap-2 border-b border-gray-300 px-6">
                <FileText className="h-6 w-6 text-blue-600" />
                <span className="text-lg font-semibold text-gray-800">PaperRAG</span>
            </div>

            <nav className="flex-1 space-y-1 p-4">
                {navigation.map((item) => {
                    const isActive =
                        pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

                    const linkClasses = `
            flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
            ${isActive
                            ? "bg-blue-100 text-blue-800"
                            : "text-gray-600 hover:bg-blue-50 hover:text-gray-900"}
          `

                    return (
                        <Link key={item.name} to={item.href} className={linkClasses}>
                            <item.icon className="h-4 w-4" />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            <div className="border-t border-gray-300 p-4">
                <div className="rounded-lg bg-blue-100 p-3">
                    <p className="text-xs font-medium text-gray-600">Papers Indexed</p>
                    <p className="text-2xl font-bold text-gray-900">1,247</p>
                </div>
            </div>
        </div>
    )
}
