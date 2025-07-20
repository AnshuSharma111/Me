import { v4 as uuidv4 } from 'uuid';
import { generateReflection } from './emotionClassifier';

/**
 * Sample Data Generator
 * 
 * Generates sample journal entries for testing the app.
 */

// Sample journal texts for different emotions
const sampleTexts = {
  joy: [
    "Today was absolutely wonderful! I feel so happy and energized.",
    "I had such a great day today, everything just went right.",
    "Feeling really good about life right now, so many positive things happening!"
  ],
  calm: [
    "I feel very peaceful today. Everything seems balanced and quiet.",
    "Today brought a sense of tranquility that I haven't felt in a while.",
    "I'm feeling centered and relaxed after taking time for myself."
  ],
  melancholy: [
    "Feeling a bit down today, not sure why. Just a general sense of sadness.",
    "I miss how things used to be. Nostalgia has been hitting me hard lately.",
    "Today was a bit blue. I felt a gentle sadness throughout the day."
  ],
  anxiety: [
    "I'm feeling really nervous about the upcoming presentation. Can't stop worrying.",
    "My thoughts are racing today, it's hard to focus on anything.",
    "Feeling on edge and can't seem to calm down. Everything feels overwhelming."
  ],
  hope: [
    "Despite the challenges, I'm feeling optimistic about what's coming next.",
    "I have a good feeling about the future. Things are looking up.",
    "Today I felt a renewed sense of possibility. Tomorrow might be better."
  ],
  wonder: [
    "I'm amazed by how beautiful the world can be sometimes. Just in awe today.",
    "Found myself lost in curiosity about so many things today.",
    "Today filled me with a sense of wonder about life and all its mysteries."
  ],
  gratitude: [
    "I'm so thankful for the people in my life. Feeling blessed today.",
    "Grateful for the small moments of joy I experienced today.",
    "Today I appreciated all the little things that often go unnoticed."
  ]
};

/**
 * Generate sample journal entries for testing
 * @param {number} count - Number of entries to generate
 * @returns {Array} Array of sample journal entries
 */
const generateSampleEntries = (count = 5) => {
  // Use a wider range of emotions for samples
  const emotions = ['joy', 'calm', 'melancholy', 'anxiety', 'hope', 'wonder', 'gratitude'];
  const entries = [];
  
  for (let i = 0; i < count; i++) {
    // Select a random emotion
    const emotion = emotions[Math.floor(Math.random() * emotions.length)];
    
    // Create a date for the entry (going back in time)
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Select a random text for the emotion
    const texts = sampleTexts[emotion] || [`Sample ${emotion} entry`];
    const text = texts[Math.floor(Math.random() * texts.length)];
    
    // Generate a random intensity
    const intensity = Math.random() * 0.5 + 0.5;
    
    // Generate a reflection based on the emotion
    const reflection = generateReflection(emotion, intensity);
    
    // Create the entry
    entries.push({
      id: uuidv4(),
      date: date.toISOString().split('T')[0] + 'T12:00:00Z',
      text,
      emotion,
      intensity,
      reflection,
      placed: Math.random() > 0.5 // Some entries are already placed, some are not
    });
  }
  
  return entries;
};

export { generateSampleEntries };