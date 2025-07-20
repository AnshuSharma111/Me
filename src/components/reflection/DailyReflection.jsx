import { motion } from 'framer-motion'

const DailyReflection = ({ reflection, emotion = 'calm' }) => {
  // Map emotion to color class
  const emotionColorMap = {
    joy: 'text-emotion-joy',
    calm: 'text-emotion-calm',
    melancholy: 'text-emotion-melancholy',
    anxiety: 'text-emotion-anxiety',
    hope: 'text-emotion-hope',
    wonder: 'text-emotion-wonder',
    gratitude: 'text-emotion-gratitude'
  }
  
  const colorClass = emotionColorMap[emotion] || 'text-emotion-calm'
  
  // Placeholder reflection if none provided
  const defaultReflection = "The quiet steps you took today\necho in the chambers of tomorrow.\nEach breath, a gentle reminder\nof your presence in this moment."
  
  const reflectionText = reflection || defaultReflection
  
  return (
    <motion.div
      className="my-8 p-6 bg-bg-light bg-opacity-50 rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <h3 className="text-lg mb-4 text-text-secondary">Today's Reflection</h3>
      
      <div className={`italic ${colorClass} text-center px-4`}>
        {reflectionText.split('\n').map((line, i) => (
          <p key={i} className="my-2">{line}</p>
        ))}
      </div>
    </motion.div>
  )
}

export default DailyReflection