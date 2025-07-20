import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useJournal } from '../context/JournalContext'
import { getOrnamentImage } from '../utils/emotionClassifier'

/**
 * Fixed positions for ornaments (31 positions for a month)
 * Each position represents a day of the month and maps to a location on the tree
 */
const ORNAMENT_POSITIONS = [
  { x: 200, y: 80 },  // 1
  { x: 150, y: 100 }, // 2
  { x: 250, y: 100 }, // 3
  { x: 120, y: 130 }, // 4
  { x: 180, y: 130 }, // 5
  { x: 220, y: 130 }, // 6
  { x: 280, y: 130 }, // 7
  { x: 100, y: 160 }, // 8
  { x: 140, y: 160 }, // 9
  { x: 180, y: 160 }, // 10
  { x: 220, y: 160 }, // 11
  { x: 260, y: 160 }, // 12
  { x: 300, y: 160 }, // 13
  { x: 90, y: 200 },  // 14
  { x: 130, y: 200 }, // 15
  { x: 170, y: 200 }, // 16
  { x: 210, y: 200 }, // 17
  { x: 250, y: 200 }, // 18
  { x: 290, y: 200 }, // 19
  { x: 330, y: 200 }, // 20
  { x: 80, y: 240 },  // 21
  { x: 120, y: 240 }, // 22
  { x: 160, y: 240 }, // 23
  { x: 200, y: 240 }, // 24
  { x: 240, y: 240 }, // 25
  { x: 280, y: 240 }, // 26
  { x: 320, y: 240 }, // 27
  { x: 110, y: 280 }, // 28
  { x: 170, y: 280 }, // 29
  { x: 230, y: 280 }, // 30
  { x: 290, y: 280 }, // 31
]

/**
 * TreeScreen Component
 * 
 * Displays the tree visualization with ornaments representing journal entries.
 * Handles the animation of placing new ornaments on the tree.
 * 
 * Note: Currently the tree image has transparency issues. A white background tree
 * image would work better with the current implementation.
 */
const TreeScreen = () => {
  const navigate = useNavigate()
  const { currentEntry, entries, markEntryPlaced, getCurrentMonthEntries } = useJournal()
  const [showAnimation, setShowAnimation] = useState(false)
  const [placedPosition, setPlacedPosition] = useState(null)
  const [monthEntries, setMonthEntries] = useState([])
  
  // Get current month entries and sort by date
  useEffect(() => {
    const currentMonthEntries = getCurrentMonthEntries()
    setMonthEntries(currentMonthEntries.sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    ))
  }, [getCurrentMonthEntries, entries])
  
  // If we have a current entry, show the placement animation
  useEffect(() => {
    if (currentEntry && !currentEntry.placed) {
      // Find the next available position based on the day of the month
      const day = new Date(currentEntry.date).getDate() - 1
      const position = ORNAMENT_POSITIONS[day] || ORNAMENT_POSITIONS[0]
      
      setPlacedPosition(position)
      setShowAnimation(true)
      
      // Mark the entry as placed after animation completes
      const timer = setTimeout(() => {
        markEntryPlaced(currentEntry.id)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [currentEntry, markEntryPlaced])
  
  // Navigate back to the journal screen
  const handleDone = () => {
    navigate('/')
  }
  
  return (
    <div 
      className="h-screen w-full overflow-hidden"
      style={{
        backgroundImage: `url('/assets/visuals/backgrounds/winter-background.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="h-full w-full flex flex-col items-center justify-center">
        {/* Tree container */}
        <div className="relative" style={{ width: '400px', height: '500px' }}>
          {/* Tree image - Note: For a white background tree, we use mix-blend-mode */}
          <img
            src="/assets/visuals/tree/base-tree.png"
            alt="Emotion Tree"
            className="absolute"
            style={{ 
              left: '50%', 
              top: '50%',
              transform: 'translate(-50%, -50%)',
              height: '100%',
              imageRendering: 'pixelated',
              mixBlendMode: 'multiply' // This helps with white backgrounds
            }}
          />
          
          {/* Already placed ornaments */}
          {monthEntries.map((entry, index) => {
            if (!entry.placed || entry.id === currentEntry?.id) return null
            
            const day = new Date(entry.date).getDate() - 1
            const position = ORNAMENT_POSITIONS[day] || ORNAMENT_POSITIONS[0]
            const ornamentFile = getOrnamentImage(entry.emotion)
            
            return (
              <img
                key={entry.id}
                src={`/assets/visuals/ornaments/${ornamentFile}`}
                alt={`${entry.emotion} ornament`}
                className="absolute"
                style={{ 
                  left: `${position.x}px`, 
                  top: `${position.y}px`,
                  width: '24px',
                  height: '24px',
                  transform: 'translate(-50%, -50%)',
                  imageRendering: 'pixelated'
                }}
              />
            )
          })}
          
          {/* Current ornament being placed with animation */}
          {showAnimation && currentEntry && placedPosition && (
            <motion.img
              src={`/assets/visuals/ornaments/${getOrnamentImage(currentEntry.emotion)}`}
              alt={`${currentEntry.emotion} ornament`}
              style={{ 
                position: 'absolute',
                left: `${placedPosition.x}px`, 
                top: `${placedPosition.y}px`,
                width: '24px',
                height: '24px',
                transform: 'translate(-50%, -50%)',
                imageRendering: 'pixelated'
              }}
              initial={{ opacity: 0, scale: 0, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 1.5,
                type: "spring",
                stiffness: 50
              }}
            />
          )}
        </div>
        
        {/* Done button */}
        <button
          onClick={handleDone}
          className="mt-8 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-300"
        >
          Done
        </button>
      </div>
    </div>
  )
}

export default TreeScreen