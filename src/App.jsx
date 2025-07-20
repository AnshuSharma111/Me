import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Screen components
import JournalScreen from './screens/JournalScreen'
import ReflectionScreen from './screens/ReflectionScreen'
import TreeScreen from './screens/TreeScreen'

// Context for sharing data between screens
import { JournalProvider } from './context/JournalContext'

/**
 * App Component
 * 
 * Main application component that sets up routing and context providers.
 */
function App() {
  return (
    <JournalProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<JournalScreen />} />
            <Route path="/reflection" element={<ReflectionScreen />} />
            <Route path="/tree" element={<TreeScreen />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </JournalProvider>
  )
}

export default App