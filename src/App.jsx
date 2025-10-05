import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Paper from './pages/Paper';

function App() {
    return (
        <div className='p-0 m-0 w-screen h-screen'>
            <QueryClientProvider client={new QueryClient()}>
                <Router>
                    <Routes>
                        <Route path="/" element={<MainLayout />}>
                            <Route index element={<Home />} />
                            <Route path="papers/:pcmid" element={<Paper />} />
                            {/* Add more routes here as needed */}
                        </Route>
                    </Routes>
                </Router>
            </QueryClientProvider>
        </div>
    )
}

export default App
