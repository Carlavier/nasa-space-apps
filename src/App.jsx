import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Paper from './pages/Paper';
import './App.css'

function App() {
  return (
    <div className='p-0 m-0 w-screen h-screen'>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="papers" element={<Paper />} />
            {/* Add more routes here as needed */}
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
