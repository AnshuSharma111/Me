import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import JournalService from '../services/journalService';
import { detectEmotion, generateReflection, mapEmotionToVisual } from '../utils/emotionClassifier';
import { formatDateYMD } from '../utils/dateUtils';
import { generateSampleEntries } from '../utils/sampleData';

// Custom hook for managing journal entries
const useJournal = () => {
  const [entries, setEntries] = useState([]);
  const [todayEntry, setTodayEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Load entries on mount
  useEffect(() => {
    const loadEntries = () => {
      try {
        const data = JournalService.getAllData();
        let allEntries = Object.values(data.entries);
        
        // If no entries exist, generate some sample data for testing
        if (allEntries.length === 0) {
          allEntries = generateSampleEntries(7);
          // Save sample entries to local storage
          allEntries.forEach(entry => JournalService.saveEntry(entry));
        }
        
        setEntries(allEntries);
        
        // Check for today's entry
        const today = formatDateYMD();
        const todaysEntry = allEntries.find(entry => entry.date.startsWith(today));
        setTodayEntry(todaysEntry || null);
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading journal entries:', error);
        setLoading(false);
      }
    };
    
    loadEntries();
  }, []);
  
  // Add a new journal entry
  const addEntry = (text) => {
    try {
      // Analyze the text for emotion
      const emotionAnalysis = detectEmotion(text);
      const { primary: emotion, intensity } = emotionAnalysis;
      
      // Generate a poetic reflection
      const reflection = generateReflection(emotion, intensity);
      
      // Map emotion to visual element
      const visualElement = mapEmotionToVisual(emotion, intensity);
      
      // Create the entry object
      const now = new Date();
      const entry = {
        id: uuidv4(),
        date: formatDateYMD(now) + 'T' + now.toTimeString().split(' ')[0],
        text,
        emotion,
        intensity,
        reflection,
        visualElement: visualElement.type
      };
      
      // Save to local storage
      JournalService.saveEntry(entry);
      
      // Update state
      setEntries(prev => [...prev, entry]);
      setTodayEntry(entry);
      
      return entry;
    } catch (error) {
      console.error('Error adding journal entry:', error);
      return null;
    }
  };
  
  // Get entries for a specific month
  const getEntriesForMonth = (year, month) => {
    return JournalService.getEntriesForMonth(year, month);
  };
  
  // Get entry by date
  const getEntryByDate = (dateStr) => {
    return JournalService.getEntryByDate(dateStr);
  };
  
  return {
    entries,
    todayEntry,
    loading,
    addEntry,
    getEntriesForMonth,
    getEntryByDate
  };
};

export default useJournal;