import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/sidebar'

export function MainLayout() {
    return (
        <div className="flex h-screen w-full">
            <Sidebar />
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    )
}

export default MainLayout
