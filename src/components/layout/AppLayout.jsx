import { motion } from 'framer-motion'

const AppLayout = ({ children }) => {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-bg-dark to-bg-light p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary text-center">Me</h1>
      </header>
      
      <main className="max-w-4xl mx-auto">
        {children}
      </main>
      
      <footer className="mt-12 text-center text-text-secondary text-sm opacity-70">
        <p>A gentle space for your thoughts</p>
      </footer>
    </motion.div>
  )
}

export default AppLayout