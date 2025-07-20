/**
 * Journal Service
 * 
 * Provides functions for managing journal entries in local storage.
 */

const STORAGE_KEY = 'meAppData';

/**
 * Initialize the data structure if it doesn't exist
 * @returns {Object} Empty data structure
 */
const initializeData = () => {
  const emptyData = {
    entries: {},
    monthlyReflections: {},
    preferences: {
      theme: 'default',
      soundEnabled: true,
      animationsEnabled: true
    }
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(emptyData));
  return emptyData;
};

/**
 * Get all data from local storage
 * @returns {Object} All app data
 */
const getAllData = () => {
  try {
    const dataStr = localStorage.getItem(STORAGE_KEY);
    if (!dataStr) {
      return initializeData();
    }
    return JSON.parse(dataStr);
  } catch (error) {
    console.error('Error reading from local storage:', error);
    return initializeData();
  }
};

/**
 * Save a journal entry
 * @param {Object} entry - The entry to save
 * @returns {boolean} Whether the operation was successful
 */
const saveEntry = (entry) => {
  try {
    const data = getAllData();
    data.entries[entry.id] = entry;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving entry:', error);
    return false;
  }
};

/**
 * Get an entry by ID
 * @param {string} id - The ID of the entry to get
 * @returns {Object|null} The entry or null if not found
 */
const getEntry = (id) => {
  const data = getAllData();
  return data.entries[id] || null;
};

/**
 * Get an entry for a specific date
 * @param {string} dateStr - The date string in YYYY-MM-DD format
 * @returns {Object|null} The entry or null if not found
 */
const getEntryByDate = (dateStr) => {
  const data = getAllData();
  return Object.values(data.entries).find(entry => 
    entry.date.startsWith(dateStr)
  ) || null;
};

/**
 * Get all entries for a specific month
 * @param {number} year - The year
 * @param {number} month - The month (1-12)
 * @returns {Array} Array of entries for the month
 */
const getEntriesForMonth = (year, month) => {
  const data = getAllData();
  const monthStr = month.toString().padStart(2, '0');
  const datePrefix = `${year}-${monthStr}`;
  
  return Object.values(data.entries)
    .filter(entry => entry.date.startsWith(datePrefix))
    .sort((a, b) => new Date(a.date) - new Date(b.date));
};

/**
 * Save a monthly reflection
 * @param {Object} reflection - The monthly reflection to save
 * @returns {boolean} Whether the operation was successful
 */
const saveMonthlyReflection = (reflection) => {
  try {
    const data = getAllData();
    const key = `${reflection.year}-${reflection.month.toString().padStart(2, '0')}`;
    data.monthlyReflections[key] = reflection;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving monthly reflection:', error);
    return false;
  }
};

/**
 * Get a monthly reflection
 * @param {number} year - The year
 * @param {number} month - The month (1-12)
 * @returns {Object|null} The monthly reflection or null if not found
 */
const getMonthlyReflection = (year, month) => {
  const data = getAllData();
  const key = `${year}-${month.toString().padStart(2, '0')}`;
  return data.monthlyReflections[key] || null;
};

/**
 * Update user preferences
 * @param {Object} preferences - The preferences to update
 * @returns {boolean} Whether the operation was successful
 */
const updatePreferences = (preferences) => {
  try {
    const data = getAllData();
    data.preferences = { ...data.preferences, ...preferences };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error updating preferences:', error);
    return false;
  }
};

/**
 * Get user preferences
 * @returns {Object} User preferences
 */
const getPreferences = () => {
  const data = getAllData();
  return data.preferences;
};

/**
 * Clear all data from local storage
 * @returns {boolean} Whether the operation was successful
 */
const clearAllData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    initializeData();
    return true;
  } catch (error) {
    console.error('Error clearing data:', error);
    return false;
  }
};

// Export the service functions
const JournalService = {
  saveEntry,
  getEntry,
  getEntryByDate,
  getEntriesForMonth,
  saveMonthlyReflection,
  getMonthlyReflection,
  updatePreferences,
  getPreferences,
  getAllData,
  clearAllData
};

export default JournalService;