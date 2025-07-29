# Enhanced Keyboard Component

A beautiful, interactive keyboard component with glowing keys and typing animations.

## Features

- **Glowing Keys**: Highlight individual keys or key combinations with a beautiful glow effect
- **Typing Animation**: Watch realistic typing animations with customizable speed and sequences
- **Interactive**: Fully responsive with hover effects and smooth transitions
- **Customizable**: Easy to configure with props for different use cases

## Props

```typescript
interface KeyboardProps {
  className?: string;                    // Additional CSS classes for the keyboard container
  containerClassName?: string;           // Additional CSS classes for the outer container
  glowingKeys?: string[];               // Array of keys that should glow
  typingSequence?: string[];            // Array of keys to animate typing
  typingSpeed?: number;                 // Speed of typing animation in ms (default: 200)
  isTyping?: boolean;                   // Whether to show typing animation
  onTypingComplete?: () => void;        // Callback when typing animation completes
}
```

## Usage Examples

### Single Key Glow
```tsx
<Keyboard glowingKeys={['a']} />
```

### Key Combination
```tsx
<Keyboard glowingKeys={['command', 'c']} />
```

### Typing Animation
```tsx
<Keyboard 
  typingSequence={['h', 'e', 'l', 'l', 'o']}
  isTyping={true}
  typingSpeed={200}
  onTypingComplete={() => console.log('Done!')}
/>
```

### Complex Example
```tsx
import { useState } from 'react';
import Keyboard from './components/Keyboard';

function App() {
  const [glowingKeys, setGlowingKeys] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingSequence, setTypingSequence] = useState<string[]>([]);

  const startTypingDemo = () => {
    setTypingSequence(['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']);
    setIsTyping(true);
  };

  const handleTypingComplete = () => {
    setIsTyping(false);
    setTypingSequence([]);
  };

  return (
    <div>
      <button onClick={startTypingDemo}>Start Typing Demo</button>
      <Keyboard
        glowingKeys={glowingKeys}
        typingSequence={typingSequence}
        isTyping={isTyping}
        typingSpeed={200}
        onTypingComplete={handleTypingComplete}
      />
    </div>
  );
}
```

## Key Mapping

The component supports various key names and automatically normalizes them:

- **Letters**: `'a'`, `'b'`, `'c'`, etc.
- **Numbers**: `'1'`, `'2'`, `'3'`, etc.
- **Special Keys**: `'space'`, `'enter'`, `'backspace'`, `'tab'`, `'esc'`
- **Modifier Keys**: `'control'`, `'alt'`, `'command'`, `'shift'`
- **Arrow Keys**: `'arrowup'`, `'arrowdown'`, `'arrowleft'`, `'arrowright'`

## Demo Pages

- `/` - Main page with auto-demo
- `/demo` - Interactive demo with controls
- `/examples` - Various usage examples

## Styling

The keyboard uses CSS animations for smooth transitions and glowing effects. The styling is contained in `src/app/keyboard.css` and includes:

- Glow animations with pulsing effects
- Typing animations with key press simulation
- Responsive design for different screen sizes
- Hover effects and smooth transitions

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- CSS animations and transforms
- ES6+ JavaScript features

## Development

To run the development server:

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` to see the keyboard in action!
