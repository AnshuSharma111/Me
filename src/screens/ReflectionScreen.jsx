import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useJournal } from '../context/JournalContext'
import { getCharacterImage } from '../utils/emotionClassifier'

/**
 * ReflectionScreen Component
 * 
 * Displays the emotion character and poetic reflection based on the journal entry.
 * Provides navigation to the tree visualization.
 */
const ReflectionScreen = () => {
  const navigate = useNavigate()
  const { currentEntry, setCurrentEntry, getTodayEntry } = useJournal()
  const [characterLoaded, setCharacterLoaded] = useState(false)
  const [characterImage, setCharacterImage] = useState('')
  
  // If no current entry, try to get today's entry or redirect to journal
  useEffect(() => {
    if (!currentEntry) {
      const todayEntry = getTodayEntry()
      if (todayEntry) {
        setCurrentEntry(todayEntry)
      } else {
        navigate('/')
      }
    } else {
      // Set the character image based on emotion
      setCharacterImage(getCharacterImage(currentEntry.emotion))
    }
  }, [currentEntry, getTodayEntry, setCurrentEntry, navigate])
  
  // Check if character image exists
  useEffect(() => {
    if (characterImage) {
      const img = new Image()
      img.onload = () => setCharacterLoaded(true)
      img.onerror = () => setCharacterLoaded(false)
      img.src = `/assets/visuals/characters/${characterImage}`
    }
  }, [characterImage])
  
  // Navigate to the tree screen
  const handlePlaceOrnament = () => {
    navigate('/tree')
  }
  
  // Map emotion to a more human-readable form
  const getEmotionDisplay = (emotion) => {
    const emotionMap = {
      joy: 'joyful',
      calm: 'calm',
      melancholy: 'melancholy',
      anxiety: 'anxious',
      hope: 'hopeful',
      wonder: 'full of wonder',
      gratitude: 'grateful',
      anger: 'angry',
      queasy: 'queasy'
    }
    
    return emotionMap[emotion] || emotion
  }
  
  // Loading state
  if (!currentEntry) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-bg-dark">
        <p className="text-text-primary">Loading...</p>
      </div>
    )
  }
  
  return (
    <motion.div 
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-bg-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mood Section */}
          <motion.div 
            className="bg-bg-light rounded-lg shadow-lg p-6"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl text-text-primary mb-4 text-center">Today's Mood</h2>
            
            <div className="flex flex-col items-center">
              {characterLoaded ? (
                // If character image is available, use it
                <img 
                  src={`/assets/visuals/characters/${characterImage}`}
                  alt={`${getEmotionDisplay(currentEntry.emotion)} character`}
                  className="pixel-art w-48 h-48 object-contain mb-4"
                />
              ) : (
                // Fallback if character image is not available
                <div className="w-48 h-48 bg-bg-dark rounded-full mb-4 flex items-center justify-center">
                  <p className="text-text-primary">Character Image</p>
                </div>
              )}
              
              <p className="text-text-primary text-center text-lg">
                Today I was <span className={`text-emotion-${currentEntry.emotion}`}>
                  {getEmotionDisplay(currentEntry.emotion)}
                </span>
              </p>
            </div>
          </motion.div>
          
          {/* Poem Section */}
          <motion.div 
            className="bg-bg-light rounded-lg shadow-lg p-6"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl text-text-primary mb-4 text-center">Reflection</h2>
            
            <div className="bg-bg-dark bg-opacity-30 p-4 rounded-md min-h-[200px] flex items-center justify-center">
              <div className="text-center italic text-emotion-calm">
                {currentEntry.reflection.split('\n').map((line, i) => (
                  <p key={i} className="my-2">{line}</p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={handlePlaceOrnament}
            className="px-8 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-300"
          >
            Place on Tree
          </button>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ReflectionScreen