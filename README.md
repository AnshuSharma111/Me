# Me: Ambient Journal App

A therapeutic app that allows users to document their emotional journey through daily journal entries. The app analyzes the tone of each entry, responds with a soothing poetic reflection, and visualizes emotions on a growing tree.

## Features

- **Daily Journaling**: Write short entries about your feelings
- **Emotional Analysis**: Receive insights about your emotional state
- **Poetic Reflections**: Get gentle, thoughtful responses to your entries
- **Visual Calendar**: Watch your emotional journey grow as a beautiful tree
- **Monthly Poems**: Receive a compiled reflection of your month's journey

## Tech Stack

- React (JSX)
- Tailwind CSS
- Framer Motion for animations
- Local storage for data persistence

## Project Structure

```
/src
  /assets        - Images, icons, and other static assets
  /components    - React components
  /context       - React context providers
  /hooks         - Custom React hooks
  /screens       - Main application screens
  /services      - Data services and API interactions
  /utils         - Utility functions
```

## Screens

1. **Journal Screen**: Users write their daily entry
2. **Reflection Screen**: Displays emotion character and poetic reflection
3. **Tree Screen**: Visualizes entries as ornaments on a tree

## Emotion Classification

The app recognizes a nuanced spectrum of emotions:
- Joy, Calm, Melancholy, Anxiety, Hope, Wonder, Gratitude, Anger, Queasy

Each emotion is visualized differently on the tree and receives unique poetic reflections.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

## Development Roadmap

- [x] Basic app structure and routing
- [x] Journal entry screen
- [x] Emotion classification
- [x] Reflection screen with character display
- [x] Tree visualization with ornament placement
- [x] Local storage integration
- [ ] Improve tree transparency handling
- [ ] Enhance journal entry UI with diary visualization
- [ ] Implement monthly poem generation
- [ ] Add animations and transitions
- [ ] Integrate audio elements
- [ ] Optimize for different screen sizes

## Contributing

This project is a personal emotional journey tool. Contributions focused on enhancing the gentle, reflective nature of the app are welcome.