# Me: Ambient Journal App Specification

## Vision
"Me" is a digital sanctuary where users document their daily emotional journey through short journal entries. The app responds with gentle poetic reflections and visualizes emotions as ornaments on a growing tree. At month's end, it weaves these moments into a cohesive poem that tells the story of the user's emotional landscape.

## Core Experience
- **Daily Ritual**: Users write brief journal entries about their feelings
- **Immediate Response**: The app analyzes tone and responds with a soothing poetic reflection
- **Visual Growth**: Each entry adds a decorative element to a tree, with the visual representing the emotion
- **Monthly Reflection**: At month's end, a comprehensive poem captures the emotional journey

## User Flow
1. **Journal Screen**: Users write their daily entry in a simple interface
2. **Reflection Screen**: The app displays the detected emotion with a character visualization and a poetic reflection
3. **Tree Screen**: The entry's emotion is visualized as an ornament placed on a tree in a winter scene

## Emotion Classification
The app recognizes a nuanced spectrum of emotions:
- **Joy**: Happiness, delight, contentment, satisfaction
- **Calm**: Peace, tranquility, serenity, relaxation
- **Melancholy**: Sadness, wistfulness, nostalgia, gentle sorrow
- **Anxiety**: Worry, nervousness, unease, tension
- **Hope**: Optimism, anticipation, expectation, looking forward
- **Wonder**: Awe, curiosity, fascination, amazement
- **Gratitude**: Thankfulness, appreciation, recognition
- **Anger**: Frustration, irritation, outrage, indignation
- **Queasy**: Discomfort, unease, nausea, unsettled feelings

## Visual Elements
Each emotion maps to specific visual elements:
- **Joy**: Bright stars or glowing lights
- **Calm**: Soft blue or green leaves
- **Melancholy**: Gentle rain drops or blue flowers
- **Anxiety**: Slightly trembling leaves or mist
- **Hope**: Rising bubbles or upward-facing flowers
- **Wonder**: Sparkles or small galaxies
- **Gratitude**: Golden ornaments or warm lights
- **Anger**: Red flashes or sharp elements
- **Queasy**: Wavy or unstable elements

## Technical Architecture

### Component Structure
1. **App Container**
   - Manages routing between screens
   - Provides JournalContext for data sharing

2. **JournalScreen**
   - Text input for daily entries
   - Submission handling

3. **ReflectionScreen**
   - Display for emotion character
   - Display for poetic reflection
   - Navigation to tree visualization

4. **TreeScreen**
   - Tree visualization with winter background
   - Ornament placement based on emotion
   - Animation for new ornaments

### Data Models

```typescript
interface JournalEntry {
  id: string;
  date: string;
  text: string;
  emotion: EmotionType;
  intensity: number;
  reflection: string;
  placed: boolean;
}

type EmotionType = 'joy' | 'calm' | 'melancholy' | 'anxiety' | 'hope' | 'wonder' | 'gratitude' | 'anger' | 'queasy';
```

### Data Management
- Local storage for persistence
- JournalContext for state management
- Emotion classification using keyword analysis

## Implementation Status

### Completed
- Basic app structure and routing
- Journal entry screen
- Emotion classification
- Reflection screen with character display
- Tree visualization with ornament placement
- Local storage integration

### To Do
- Improve tree transparency handling
- Enhance journal entry UI with diary visualization
- Implement monthly poem generation
- Add animations and transitions
- Integrate audio elements
- Optimize for different screen sizes

## Next Steps
1. Fix tree transparency issues
2. Enhance the journal entry screen with the diary visualization
3. Implement the monthly poem generation feature
4. Add subtle animations and sound effects
5. Test and refine the user experience