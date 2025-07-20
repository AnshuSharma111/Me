import { useState } from 'react'
import { motion } from 'framer-motion'

const JournalInput = ({ onSubmit }) => {
  const [entry, setEntry] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (entry.trim()) {
      onSubmit(entry)
      setEntry('')
    }
  }
  
  return (
    <motion.div 
      className="bg-bg-light p-6 rounded-lg shadow-lg"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h2 className="text-xl mb-4 text-text-primary">How are you feeling today?</h2>
      
      <form onSubmit={handleSubmit}>
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          className="w-full p-4 rounded-md bg-bg-dark bg-opacity-50 text-text-primary border border-opacity-20 border-text-secondary focus:outline-none focus:ring-1 focus:ring-emotion-calm resize-none transition-all duration-300"
          placeholder="Write a short journal entry about your feelings today..."
          rows={5}
        />
        
        <div className="mt-4 flex justify-end">
          <button 
            type="submit"
            className="px-6 py-2 bg-emotion-hope bg-opacity-80 text-bg-dark rounded-md hover:bg-opacity-100 transition-all duration-300"
            disabled={!entry.trim()}
          >
            Reflect
          </button>
        </div>
      </form>
    </motion.div>
  )
}

export default JournalInput