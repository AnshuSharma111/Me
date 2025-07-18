---
inclusion: fileMatch
fileMatchPattern: '**/emotion*.{js,jsx,ts,tsx}'
---

# Emotion Classification Guidelines

When implementing emotion classification for journal entries, follow these principles:

## Emotion Spectrum

Rather than binary positive/negative classification, recognize the nuanced spectrum of emotions:

- **Joy**: Happiness, delight, contentment, satisfaction
- **Calm**: Peace, tranquility, serenity, relaxation
- **Melancholy**: Sadness, wistfulness, nostalgia, gentle sorrow
- **Anxiety**: Worry, nervousness, unease, tension
- **Hope**: Optimism, anticipation, expectation, looking forward
- **Wonder**: Awe, curiosity, fascination, amazement
- **Gratitude**: Thankfulness, appreciation, recognition

## Classification Approach

- Use a combination of keyword analysis and sentiment patterns
- Consider intensity and context, not just presence of emotion words
- Allow for mixed emotions in a single entry
- Default to the dominant emotion but recognize complexity

## Visual Mapping

Each emotion should map to visual elements on the tree:

- **Joy**: Bright stars or glowing lights
- **Calm**: Soft blue or green leaves
- **Melancholy**: Gentle rain drops or blue flowers
- **Anxiety**: Slightly trembling leaves or mist
- **Hope**: Rising bubbles or upward-facing flowers
- **Wonder**: Sparkles or small galaxies
- **Gratitude**: Golden ornaments or warm lights

## Code Implementation

```javascript
// Example approach for emotion detection
const detectEmotion = (text) => {
  // Normalize text
  const normalizedText = text.toLowerCase();
  
  // Check for emotion indicators with weighted scoring
  const scores = {
    joy: 0,
    calm: 0,
    melancholy: 0,
    anxiety: 0,
    hope: 0,
    wonder: 0,
    gratitude: 0
  };
  
  // Perform analysis and update scores
  // ...
  
  // Return dominant emotion and intensity
  const dominantEmotion = Object.entries(scores)
    .sort((a, b) => b[1] - a[1])[0][0];
  
  return {
    primary: dominantEmotion,
    intensity: scores[dominantEmotion] / 10, // 0-1 scale
    mixed: detectMixedEmotions(scores)
  };
};
```

Remember that emotion classification should feel supportive and validating, never judgmental or reductive of the user's experience.