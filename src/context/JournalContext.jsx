import { createContext, useState, useContext, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { detectEmotion, generateReflection } from '../utils/emotionClassifier'
import { formatDateYMD } from '../utils/dateUtils'
import JournalService from '../services/journalService'
import { generateSampleEntries } from '../utils/sampleData'

/**
 * Journal Context
 * 
 * Provides state management and data operations for journal entries.
 * Handles loading, creating, and updating entries.
 */
const JournalContext = createContext()

/**
 * Custom hook to use the journal context
 */
export const useJournal = () => useContext(JournalContext)

/**
 * JournalProvider Component
 * 
 * Provides journal data and operations to the app.
 */
export const JournalProvider = ({ children }) => {
  const [entries, setEntries] = useState([])
  const [currentEntry, setCurrentEntry] = useState(null)
  const [loading, setLoading] = useState(true)
  
  // Load entries from local storage on mount
  useEffect(() => {
    const loadEntries = () => {
      try {
        const data = JournalService.getAllData()
        let allEntries = Object.values(data.entries)
        
        // If no entries exist, generate some sample data for testing
        if (allEntries.length === 0) {
          allEntries = generateSampleEntries(7)
          // Save sample entries to local storage
          allEntries.forEach(entry => JournalService.saveEntry(entry))
        }
        
        setEntries(allEntries)
        setLoading(false)
      } catch (error) {
        console.error('Error loading journal entries:', error)
        setLoading(false)
      }
    }
    
    loadEntries()
  }, [])
  
  /**
   * Create a new journal entry
   * @param {string} text - The text content of the entry
   * @returns {Object|null} The created entry or null if an error occurred
   */
  const createEntry = (text) => {
    try {
      // Analyze the text for emotion
      const emotionAnalysis = detectEmotion(text)
      const { primary: emotion, intensity } = emotionAnalysis
      
      // Generate a poetic reflection
      const reflection = generateReflection(emotion, intensity)
      
      // Create the entry object
      const now = new Date()
      const entry = {
        id: uuidv4(),
        date: formatDateYMD(now) + 'T' + now.toTimeString().split(' ')[0],
        text,
        emotion,
        intensity,
        reflection,
        placed: false // Whether the ornament has been placed on the tree
      }
      
      // Save to local storage
      JournalService.saveEntry(entry)
      
      // Update state
      setEntries(prev => [...prev, entry])
      setCurrentEntry(entry)
      
      return entry
    } catch (error) {
      console.error('Error creating journal entry:', error)
      return null
    }
  }
  
  /**
   * Mark an entry as placed on the tree
   * @param {string} entryId - The ID of the entry to mark as placed
   * @returns {boolean} Whether the operation was successful
   */
  const markEntryPlaced = (entryId) => {
    try {
      // Find the entry
      const entry = entries.find(e => e.id === entryId)
      if (!entry) return false
      
      // Update the entry
      const updatedEntry = { ...entry, placed: true }
      
      // Save to local storage
      JournalService.saveEntry(updatedEntry)
      
      // Update state
      setEntries(prev => prev.map(e => e.id === entryId ? updatedEntry : e))
      if (currentEntry?.id === entryId) {
        setCurrentEntry(updatedEntry)
      }
      
      return true
    } catch (error) {
      console.error('Error marking entry as placed:', error)
      return false
    }
  }
  
  /**
   * Get entries for the current month
   * @returns {Array} Array of entries for the current month
   */
  const getCurrentMonthEntries = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1
    
    return entries.filter(entry => {
      const entryDate = new Date(entry.date)
      return entryDate.getFullYear() === year && entryDate.getMonth() + 1 === month
    })
  }
  
  /**
   * Check if an entry exists for today
   * @returns {boolean} Whether an entry exists for today
   */
  const hasTodayEntry = () => {
    const today = formatDateYMD()
    return entries.some(entry => entry.date.startsWith(today))
  }
  
  /**
   * Get today's entry if it exists
   * @returns {Object|null} Today's entry or null if it doesn't exist
   */
  const getTodayEntry = () => {
    const today = formatDateYMD()
    return entries.find(entry => entry.date.startsWith(today))
  }
  
  // Context value
  const contextValue = {
    entries,
    currentEntry,
    setCurrentEntry,
    loading,
    createEntry,
    markEntryPlaced,
    getCurrentMonthEntries,
    hasTodayEntry,
    getTodayEntry
  }
  
  return (
    <JournalContext.Provider value={contextValue}>
      {children}
    </JournalContext.Provider>
  )
}

export default JournalContext