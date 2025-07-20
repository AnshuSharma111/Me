import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useJournal } from '../context/JournalContext'

/**
 * JournalScreen Component
 * 
 * Provides an interface for users to write their daily journal entries.
 * Displays a pixel art diary that fills the screen with an invisible text input.
 */
const JournalScreen = () => {
  const [entry, setEntry] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()
  const { createEntry, hasTodayEntry, getTodayEntry } = useJournal()
  
  // Check if user already has an entry for today
  useEffect(() => {
    if (hasTodayEntry()) {
      const todayEntry = getTodayEntry()
      setEntry(todayEntry.text)
    }
  }, [hasTodayEntry, getTodayEntry])
  
  // Handle form submission
  const handleSubmit = (e) => {
    if (e) e.preventDefault()
    if (!entry.trim() || isSubmitting) return
    
    setIsSubmitting(true)
    
    // Create the journal entry
    const newEntry = createEntry(entry)
    
    if (newEntry) {
      // Navigate to reflection screen after a short delay
      setTimeout(() => {
        navigate('/reflection')
      }, 500)
    } else {
      setIsSubmitting(false)
    }
  }
  
  return (
    <motion.div 
      className="min-h-screen flex items-center justify-center bg-bg-dark overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Full-screen diary container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Diary background image - made larger to fill more of the screen */}
        <img 
          src="/assets/visuals/diary/diary.png" 
          alt="Journal diary" 
          className="w-auto h-[90vh] max-w-none pixel-art object-contain"
        />
        
        {/* Form overlay positioned to match the diary's open pages */}
        <div className="absolute inset-0 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="w-[40%] flex flex-col items-center">
            {/* Invisible textarea that allows typing directly "on" the diary */}
            <textarea
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              className="w-full h-[25vh] bg-transparent text-text-primary focus:outline-none resize-none"
              placeholder="How are you feeling today?"
              disabled={isSubmitting}
              autoFocus
              style={{
                // No visible background or border
                border: 'none',
                // Ensure text is visible against the diary background
                color: '#333',
              }}
            />
            
            {/* Reflect button - positioned at the bottom center of the diary */}
            <motion.button
              type="submit"
              className="mt-8 px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-300 disabled:opacity-50"
              disabled={!entry.trim() || isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? 'Processing...' : 'Reflect'}
            </motion.button>
          </form>
        </div>
      </div>
    </motion.div>
  )
}

export default JournalScreen
