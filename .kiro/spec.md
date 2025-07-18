# Me: Ambient Journal App Specification

## Vision
"Me" is a digital sanctuary where users document their daily emotional journey through short journal entries. The app responds with gentle poetic reflections and visualizes emotions as ornaments on a growing tree. At month's end, it weaves these moments into a cohesive poem that tells the story of the user's emotional landscape.

## Core Experience
- **Daily Ritual**: Users write brief journal entries about their feelings
- **Immediate Response**: The app analyzes tone and responds with a soothing poetic reflection
- **Visual Growth**: Each entry adds a decorative element to a tree, with the visual representing the emotion
- **Monthly Reflection**: At month's end, a comprehensive poem captures the emotional journey

## User Stories

### 1. Daily Journaling
As a user, I want to:
- Write a short journal entry about my feelings
- Receive an immediate, comforting poetic response
- See my entry visually represented on a tree
- Review past entries and their associated emotions

### 2. Visual Calendar
As a user, I want to:
- See a tree that grows and changes with my entries
- Watch as different emotions manifest as unique decorative elements
- Experience subtle animations that bring the tree to life
- Feel a sense of progress and emotional documentation

### 3. Monthly Reflection
As a user, I want to:
- Receive a generated poem at month's end that captures my emotional journey
- Review the visual representation of my month's emotional landscape
- Save or share my monthly reflection if desired

### 4. Ambient Experience
As a user, I want to:
- Experience gentle animations that create a calming atmosphere
- Hear subtle ambient sounds that enhance the journaling experience
- Feel that the app is responding to and honoring my emotional state

## Technical Architecture

### Component Structure
1. **App Container**
   - Manages overall state and routing
   - Handles local storage persistence

2. **JournalInput**
   - Text input for daily entries
   - Submission handling
   - Animation transitions

3. **EmotionTree**
   - Canvas/SVG for tree visualization
   - Bauble placement logic
   - Animation of elements

4. **DailyReflection**
   - Display for the app's poetic response
   - Styling for different emotional tones

5. **MonthlyPoem**
   - End-of-month poem generation and display
   - Visual summary of the month

6. **AudioController**
   - Management of ambient sound loops
   - Sound triggers based on interactions

### Data Models

1. **JournalEntry**
   ```typescript
   interface JournalEntry {
     id: string;
     date: Date;
     text: string;
     emotion: EmotionType;
     reflection: string;
     visualElement: VisualElementType;
   }
   ```

2. **EmotionType**
   ```typescript
   type EmotionType = 'joy' | 'calm' | 'melancholy' | 'anxiety' | 'hope' | 'wonder' | 'gratitude';
   ```

3. **VisualElementType**
   ```typescript
   type VisualElementType = 'star' | 'bauble' | 'leaf' | 'flower' | 'light' | 'crystal';
   ```

4. **MonthlyReflection**
   ```typescript
   interface MonthlyReflection {
     month: number;
     year: number;
     poem: string;
     dominantEmotions: EmotionType[];
     entries: JournalEntry[];
   }
   ```

## Implementation Phases

### Phase 1: Core Functionality
- Set up React project with Tailwind CSS
- Implement journal entry component with local storage
- Create basic emotion classification logic
- Build simple tree visualization

### Phase 2: Visual and Poetic Elements
- Implement bauble rendering based on emotions
- Create poetic response generation
- Add basic animations for tree elements
- Implement monthly poem generation

### Phase 3: Ambient Experience
- Add subtle animations using Framer Motion
- Implement sound triggers and ambient audio
- Refine visual transitions and interactions
- Polish user experience and interface

### Phase 4: Refinement
- Optimize performance
- Add responsive design for different devices
- Implement optional features (sharing, themes)
- Final polish and bug fixes

## Technical Considerations

### Emotion Classification
- Use simple keyword/sentiment analysis for emotion detection
- Map emotions to visual elements and color schemes
- Consider tone and intensity for variation in responses

### Visual Rendering
- Use SVG or Canvas for tree visualization
- Position elements based on calendar day and emotion
- Implement subtle animations for floating/movement

### Data Persistence
- Store journal entries in localStorage
- Organize by month for easy retrieval and poem generation
- Consider optional export functionality

### Performance
- Optimize animations for smooth experience
- Lazy-load assets as needed
- Consider memory usage for long-term users

## Next Steps
1. Set up project structure and dependencies
2. Implement core components (JournalInput, EmotionTree)
3. Build basic emotion classification and storage
4. Create initial tree visualization