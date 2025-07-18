---
inclusion: fileMatch
fileMatchPattern: '**/data/**/*.{js,jsx,ts,tsx}'
---

# Data Management Guidelines

When implementing data storage and management for the "Me" app, follow these guidelines to ensure reliable, efficient handling of user journal entries and reflections.

## Local Storage Structure

Organize local storage data with these key structures:

```javascript
// Main data structure
const meAppData = {
  // User journal entries indexed by date
  entries: {
    "2025-07-18": {
      id: "entry-2025-07-18",
      date: "2025-07-18T15:30:00Z",
      text: "Today I felt a sense of calm after my morning walk...",
      emotion: "calm",
      intensity: 0.7,
      reflection: "The quiet steps you took today...",
      visualElement: "leaf"
    },
    // Additional entries...
  },
  
  // Monthly reflections
  monthlyReflections: {
    "2025-07": {
      month: 7,
      year: 2025,
      poem: "July brought gentle rains and quiet mornings...",
      dominantEmotions: ["calm", "hope", "joy"],
      entryIds: ["entry-2025-07-01", "entry-2025-07-02", /* ... */]
    },
    // Additional monthly reflections...
  },
  
  // User preferences
  preferences: {
    theme: "default",
    soundEnabled: true,
    animationsEnabled: true,
    // Additional preferences...
  }
}
```

## Data Operations

Implement these core data operations:

1. **Save Entry**: Store new journal entries with proper validation
2. **Retrieve Entries**: Get entries by date range or emotion
3. **Generate Monthly Reflection**: Create monthly poem from entries
4. **Update Preferences**: Modify user settings

## Implementation Approach

When working with local storage:

- Use a wrapper service to abstract storage operations
- Implement error handling for storage limits
- Add data versioning for future app updates
- Consider data export/backup functionality

```javascript
// Example data service implementation
const JournalDataService = {
  // Save a journal entry
  saveEntry(entry) {
    try {
      const data = this.getAllData();
      data.entries[entry.date] = entry;
      localStorage.setItem('meAppData', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving entry:', error);
      return false;
    }
  },
  
  // Get all entries for a specific month
  getEntriesForMonth(year, month) {
    const data = this.getAllData();
    const monthStr = month.toString().padStart(2, '0');
    const datePrefix = `${year}-${monthStr}`;
    
    return Object.values(data.entries)
      .filter(entry => entry.date.startsWith(datePrefix))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  },
  
  // Get all data
  getAllData() {
    const dataStr = localStorage.getItem('meAppData');
    if (!dataStr) {
      return this.initializeData();
    }
    return JSON.parse(dataStr);
  },
  
  // Initialize empty data structure
  initializeData() {
    const emptyData = {
      entries: {},
      monthlyReflections: {},
      preferences: {
        theme: 'default',
        soundEnabled: true,
        animationsEnabled: true
      }
    };
    localStorage.setItem('meAppData', JSON.stringify(emptyData));
    return emptyData;
  }
};
```

## Data Privacy and Security

Consider these privacy aspects:

- All data remains client-side only
- No tracking or analytics
- Clear data deletion options for users
- Transparent data handling

## Performance Considerations

To maintain performance with local storage:

- Avoid excessive read/write operations
- Batch updates when possible
- Consider using IndexedDB for larger datasets
- Implement proper error handling for storage limits

Remember that data management should be reliable but unobtrusive, supporting the reflective experience without technical friction.