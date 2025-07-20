/**
 * Date Utility Functions
 * 
 * A collection of helper functions for date formatting and manipulation.
 */

/**
 * Format a date as YYYY-MM-DD
 * @param {Date} date - The date to format (defaults to current date)
 * @returns {string} Formatted date string
 */
const formatDateYMD = (date = new Date()) => {
  return date.toISOString().split('T')[0];
};

/**
 * Format a date in a friendly format (e.g., "July 18, 2025")
 * @param {Date} date - The date to format (defaults to current date)
 * @returns {string} Formatted date string
 */
const formatDateFriendly = (date = new Date()) => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Get the current month name
 * @returns {string} Current month name
 */
const getCurrentMonthName = () => {
  return new Date().toLocaleDateString('en-US', { month: 'long' });
};

/**
 * Get the current year
 * @returns {number} Current year
 */
const getCurrentYear = () => {
  return new Date().getFullYear();
};

/**
 * Get the current month (0-11)
 * @returns {number} Current month index
 */
const getCurrentMonth = () => {
  return new Date().getMonth();
};

/**
 * Get the number of days in a month
 * @param {number} year - The year
 * @param {number} month - The month (0-11)
 * @returns {number} Number of days in the month
 */
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Check if a date is today
 * @param {string} dateStr - Date string in YYYY-MM-DD format
 * @returns {boolean} Whether the date is today
 */
const isToday = (dateStr) => {
  const today = formatDateYMD();
  return dateStr === today;
};

/**
 * Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
 * @param {number} year - The year
 * @param {number} month - The month (0-11)
 * @returns {number} Day of week for the first day of the month
 */
const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay();
};

/**
 * Generate an array of dates for a calendar month
 * @param {number} year - The year
 * @param {number} month - The month (0-11)
 * @returns {Array} Array of date strings (or null for empty slots)
 */
const getCalendarDates = (year, month) => {
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  const calendarDates = [];
  
  // Add empty slots for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDates.push(null);
  }
  
  // Add the days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    calendarDates.push(formatDateYMD(date));
  }
  
  return calendarDates;
};

/**
 * Get the start and end dates of a month
 * @param {number} year - The year
 * @param {number} month - The month (0-11)
 * @returns {Object} Object with start and end date strings
 */
const getMonthDateRange = (year, month) => {
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  
  return {
    start: formatDateYMD(startDate),
    end: formatDateYMD(endDate)
  };
};

export {
  formatDateYMD,
  formatDateFriendly,
  getCurrentMonthName,
  getCurrentYear,
  getCurrentMonth,
  getDaysInMonth,
  isToday,
  getFirstDayOfMonth,
  getCalendarDates,
  getMonthDateRange
};