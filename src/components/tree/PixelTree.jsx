import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const PixelTree = ({ entries = [] }) => {
  const [treeLoaded, setTreeLoaded] = useState(false)
  const [availableOrnaments, setAvailableOrnaments] = useState({
    joy: true,
    calm: true,
    melancholy: true,
    gratitude: true,
    anxiety: false,
    hope: false,
    wonder: false
  })
  
  // Check which ornament images are available
  useEffect(() => {
    const checkOrnamentAvailability = async () => {
      const ornamentTypes = [
        'joy-star.png',
        'calm-leaf.png',
        'melancholy-raindrop.png',
        'anxiety-mist.png',
        'hope-bubble.png',
        'wonder-sparkle.png',
        'gratitude-light.png'
      ]
      
      const results = {}
      
      for (const ornament of ornamentTypes) {
        const emotionKey = ornament.split('-')[0]
        try {
          const response = await fetch(`/assets/visuals/ornaments/${ornament}`)
          results[emotionKey] = response.ok
        } catch (error) {
          results[emotionKey] = false
        }
      }
      
      setAvailableOrnaments(results)
    }
    
    checkOrnamentAvailability()
  }, [])
  
  // Calculate positions for ornaments
  const getOrnamentPosition = (index, totalEntries) => {
    // Create a more natural distribution around the tree
    // This is a simple algorithm that can be refined later
    
    // Divide the tree into sections
    const section = Math.floor(index / 3) % 4 // 0: top, 1: right, 2: bottom, 3: left
    const offset = index % 3 // Variation within section
    
    // Base positions (center of the tree)
    const centerX = 200
    const centerY = 200
    
    // Calculate distance from center based on index
    // Earlier entries are closer to the trunk
    const baseDistance = 60 + (index * 5)
    const distance = Math.min(baseDistance, 160) // Cap the maximum distance
    
    // Calculate angle based on section and offset
    let angle
    switch (section) {
      case 0: // Top section
        angle = (Math.PI / 4) + (offset * Math.PI / 12)
        break
      case 1: // Right section
        angle = (Math.PI * 7 / 4) - (offset * Math.PI / 12)
        break
      case 2: // Bottom section
        angle = (Math.PI * 5 / 4) + (offset * Math.PI / 12)
        break
      case 3: // Left section
        angle = (Math.PI * 3 / 4) - (offset * Math.PI / 12)
        break
      default:
        angle = 0
    }
    
    // Add some randomness to make it look more natural
    angle += (Math.random() - 0.5) * (Math.PI / 8)
    
    // Calculate final position
    const x = centerX + Math.cos(angle) * distance
    const y = centerY + Math.sin(angle) * distance
    
    return { x, y }
  }
  
  return (
    <motion.div
      className="w-full flex justify-center my-8 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <div className="relative w-[400px] h-[500px]">
        {/* Base tree image */}
        <img 
          src="/assets/visuals/tree/base-tree.png" 
          alt="Emotion Tree"
          className="pixel-art absolute top-0 left-0 w-full h-full"
          onLoad={() => setTreeLoaded(true)}
          onError={(e) => {
            console.error("Tree image failed to load")
            console.log(e)
          }}
        />
        
        {/* Ornaments */}
        {treeLoaded && entries.map((entry, index) => {
          // Map emotion to ornament type
          const emotionMap = {
            joy: 'joy-star.png',
            calm: 'calm-leaf.png',
            melancholy: 'melancholy-raindrop.png',
            anxiety: 'anxiety-mist.png',
            hope: 'hope-bubble.png',
            wonder: 'wonder-sparkle.png',
            gratitude: 'gratitude-light.png'
          }
          
          // Check if we have this ornament available
          if (!availableOrnaments[entry.emotion]) {
            // Fall back to a default ornament if the specific one isn't available
            entry.emotion = 'calm' // Default fallback
          }
          
          const ornamentFile = emotionMap[entry.emotion]
          const { x, y } = getOrnamentPosition(index, entries.length)
          
          return (
            <motion.img
              key={entry.id || index}
              src={`/assets/visuals/ornaments/${ornamentFile}`}
              alt={`${entry.emotion} ornament`}
              className="pixel-art absolute w-[24px] h-[24px]"
              style={{ 
                left: `${x}px`, 
                top: `${y}px`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8,
                delay: 0.1 * (index % 5), // Stagger the animations
                type: "spring",
                stiffness: 100
              }}
            />
          )
        })}
      </div>
    </motion.div>
  )
}

export default PixelTree