import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Paper from './pages/Paper';
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GraphTest } from './pages/GraphTest';

function App() {
  return (
    <div className='p-0 m-0 w-screen h-screen'>
        <QueryClientProvider client={new QueryClient()}>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="papers" element={<Paper />} />
            <Route path="graph" element={<GraphTest />} />
            {/* Add more routes here as needed */}
          </Route>
        </Routes>
      </Router>
        </QueryClientProvider>
    </div>
  )
}

export default App
