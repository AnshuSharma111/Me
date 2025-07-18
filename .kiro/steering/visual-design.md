---
inclusion: fileMatch
fileMatchPattern: '**/components/**/*.{js,jsx,ts,tsx}'
---

# Visual Design Guidelines

When implementing visual components for the "Me" app, follow these design principles to maintain a cohesive, calming experience.

## Tree Visualization

The central tree visualization should:

- Grow organically as entries are added
- Have a natural, slightly asymmetrical form
- Use pixel art styling that feels warm and handcrafted
- Include subtle ambient animations (gentle swaying, floating particles)
- Adapt visually to represent the passage of time (seasonal changes)

## Color Palette

Use this soft, muted color palette across the application:

- **Background**: Soft dark blues (#1a2028, #2a3040)
- **Text**: Warm whites and creams (#f0f0e8, #e8e4d8)
- **Accents**: Gentle pastels for emotions
  - Joy: Soft yellow (#f2d478)
  - Calm: Muted teal (#7fb9b9)
  - Melancholy: Dusty blue (#8e9eb3)
  - Anxiety: Muted lavender (#b893c0)
  - Hope: Pale green (#a8c896)
  - Wonder: Soft purple (#b8a0cc)
  - Gratitude: Warm amber (#d9a679)

## Animation Guidelines

All animations should:

- Use gentle easing functions (easeInOut)
- Have longer durations (300-800ms) for a dreamy quality
- Never feel rushed or jarring
- Be subtle enough not to distract from content
- Consider reduced motion preferences

```javascript
// Example animation with Framer Motion
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ 
    duration: 0.7,
    ease: "easeInOut"
  }}
>
  {/* Component content */}
</motion.div>
```

## Typography

Text elements should:

- Use readable, warm fonts (system fonts or imports like 'Atkinson Hyperlegible')
- Have generous line height (1.5-1.8) for readability
- Use font sizes that scale well across devices
- Maintain sufficient contrast with backgrounds

## Component Styling

When styling components:

- Use Tailwind utility classes as primary styling method
- Group related utilities with @apply for reusable patterns
- Maintain consistent spacing and padding
- Use rounded corners (rounded-md or rounded-lg) for a soft feel
- Apply subtle shadows for depth

## Responsive Design

Components should:

- Adapt gracefully to different screen sizes
- Maintain the same calm aesthetic across devices
- Prioritize the journal entry experience on mobile
- Consider touch interactions for tree elements

Remember that every visual element should contribute to the feeling of a digital sanctuary where users feel safe to express their emotions.