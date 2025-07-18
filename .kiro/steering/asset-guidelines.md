---
inclusion: fileMatch
fileMatchPattern: '**/assets/**/*.{js,jsx,ts,tsx}'
---

# Asset Management Guidelines

When working with pixel art and audio assets in the "Me" app, follow these guidelines to ensure optimal integration and performance.

## Asset Organization

Assets should be organized in the following structure:

```
/public/assets/
  /visuals/
    /tree/           # Base tree images for different states
    /ornaments/      # Emotion-based decorative elements
    /backgrounds/    # Ambient background elements
    /ui/             # UI elements and icons
  /audio/
    /ambient/        # Background ambient loops
    /interactions/   # Short sound effects for interactions
```

## Pixel Art Integration

When working with pixel art assets:

- Maintain the original pixel dimensions when rendering
- Use `image-rendering: pixelated` CSS property to preserve crisp edges
- Avoid resizing that would distort the pixel art aesthetic
- Use sprite sheets for related elements to reduce HTTP requests
- Consider canvas rendering for complex animations

```javascript
// Example of proper pixel art rendering
const PixelArtImage = ({ src, alt }) => (
  <img 
    src={src} 
    alt={alt}
    className="pixel-art" // Class with image-rendering: pixelated
    draggable="false"
  />
);
```

## Audio Implementation

When implementing audio features:

- Preload essential audio files to prevent playback delays
- Use Web Audio API or Tone.js for precise control
- Implement volume controls and mute options
- Ensure sounds are subtle and non-intrusive
- Layer ambient sounds for a richer atmosphere
- Trigger interaction sounds with appropriate delay

```javascript
// Example of audio implementation with Web Audio API
const playAmbientSound = (soundName, volume = 0.3) => {
  const audio = new Audio(`/public/assets/audio/ambient/${soundName}.mp3`);
  audio.loop = true;
  audio.volume = volume;
  audio.play();
  return audio; // Return for future control
};
```

## Performance Considerations

To maintain performance with assets:

- Optimize all images with tools like ImageOptim or TinyPNG
- Keep audio files compressed (OGG or MP3 with appropriate bitrate)
- Lazy load assets that aren't immediately needed
- Consider using sprite animation techniques for complex animations
- Implement proper asset caching strategies

## Accessibility

Ensure assets are accessible:

- All visual elements should have appropriate alt text
- Audio should never autoplay without user consent
- Provide visual alternatives to audio feedback
- Ensure sufficient contrast for UI elements
- Support reduced motion preferences

Remember that assets should enhance the gentle, reflective nature of the app without overwhelming the user or causing performance issues.