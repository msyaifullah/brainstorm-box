"use client";

import { useState } from "react";
import Keyboard from "../../components/Keyboard";

export default function DemoPage() {
  const [isTyping, setIsTyping] = useState(false);
  const [typingSequence, setTypingSequence] = useState<string[]>([]);
  const [glowingKeys, setGlowingKeys] = useState<string[]>([]);
  const [showMask, setShowMask] = useState(true);

  // Demo functions
  const startTypingDemo = () => {
    const sequence = ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"];
    setTypingSequence(sequence);
    setIsTyping(true);
  };

  const startShortcutDemo = () => {
    // Copy shortcut - uses right command with left-side letter
    setGlowingKeys(["command", "c"]);
    setTimeout(() => {
      // Paste shortcut - uses right command with left-side letter
      setGlowingKeys(["command", "v"]);
    }, 1000);
    setTimeout(() => {
      setGlowingKeys([]);
    }, 2000);
  };

  const startSingleKeyDemo = () => {
    setGlowingKeys(["b"]);
    setTimeout(() => {
      setGlowingKeys([]);
    }, 1000);
  };

  const startCombinationDemo = () => {
    // Ctrl+Alt+Z - uses left modifiers with left-side letter
    setGlowingKeys(["control", "option", "z"]);
    setTimeout(() => {
      setGlowingKeys([]);
    }, 2000);
  };

  const handleTypingComplete = () => {
    setIsTyping(false);
    setTypingSequence([]);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Keyboard Demo</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Controls</h2>

            <div className="space-y-4">
              <button
                onClick={startTypingDemo}
                disabled={isTyping}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
              >
                {isTyping ? "Typing..." : "Start Typing Demo (hello world)"}
              </button>

              <button
                onClick={startShortcutDemo}
                className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
              >
                Copy/Paste Shortcut Demo
              </button>

              <button
                onClick={startSingleKeyDemo}
                className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors"
              >
                Single Key Demo (B key)
              </button>

              <button
                onClick={startCombinationDemo}
                className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                Key Combination Demo (Ctrl+Option+Z)
              </button>

              <button
                onClick={() => {
                  // Show how modifier keys are chosen based on letter position
                  setGlowingKeys(["command", "q"]); // Uses right command (left-side letter)
                  setTimeout(() => {
                    setGlowingKeys(["command", "p"]); // Uses left command (right-side letter)
                  }, 1000);
                  setTimeout(() => {
                    setGlowingKeys([]);
                  }, 2000);
                }}
                className="w-full bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg transition-colors"
              >
                Smart Modifier Demo (Cmd+Q vs Cmd+P)
              </button>

              <button
                onClick={() => setShowMask(!showMask)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors"
              >
                {showMask ? "Hide" : "Show"} Radial Mask
              </button>
            </div>

            <div className="mt-8 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Current State</h3>
              <div className="text-sm space-y-1">
                <p>Glowing Keys: {glowingKeys.length > 0 ? glowingKeys.join(", ") : "None"}</p>
                <p>Typing: {isTyping ? "Yes" : "No"}</p>
                <p>Sequence: {typingSequence.join("")}</p>
                <p>Show Mask: {showMask ? "Yes" : "No"}</p>
              </div>
            </div>

            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Available Keys</h3>
              <div className="text-sm space-y-1">
                <p><strong>Letters:</strong> a-z</p>
                <p><strong>Numbers:</strong> 0-9</p>
                <p><strong>Modifiers:</strong> control, option, command (with -left/-right)</p>
                <p><strong>Special:</strong> space, esc, F1-F12</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Usage Examples</h2>

            <div className="space-y-4 text-sm">
              <div className="p-4 bg-gray-800 rounded-lg">
                <h4 className="font-semibold mb-2">Single Key Glow</h4>
                <code className="text-green-400">{`<Keyboard glowingKeys={['a']} />`}</code>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg">
                <h4 className="font-semibold mb-2">Smart Key Combination</h4>
                <code className="text-green-400">
                  {`<Keyboard glowingKeys={['command', 'c']} />
// Automatically uses right command for left-side letters
// and left command for right-side letters`}
                </code>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg">
                <h4 className="font-semibold mb-2">Typing Animation</h4>
                <code className="text-green-400">
                  {`<Keyboard 
  typingSequence={['h', 'e', 'l', 'l', 'o']}
  isTyping={true}
  typingSpeed={200}
  onTypingComplete={() => console.log('Done!')}
/>`}
                </code>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg">
                <h4 className="font-semibold mb-2">Mask Control</h4>
                <code className="text-green-400">
                  {`<Keyboard showMask={false} />
// Shows full keyboard without radial gradient mask`}
                </code>
              </div>

              <div className="p-4 bg-gray-800 rounded-lg">
                <h4 className="font-semibold mb-2">All Props</h4>
                <code className="text-green-400">
                  {`interface KeyboardProps {
  className?: string;
  containerClassName?: string;
  glowingKeys?: string[]; // Array of keys that should glow
  typingSequence?: string[]; // Array of keys to animate typing
  typingSpeed?: number; // Speed of typing animation in ms
  isTyping?: boolean; // Whether to show typing animation
  onTypingComplete?: () => void; // Callback when typing animation completes
  showMask?: boolean; // Whether to show the radial gradient mask
}`}
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <Keyboard
          glowingKeys={glowingKeys}
          typingSequence={typingSequence}
          isTyping={isTyping}
          typingSpeed={200}
          onTypingComplete={handleTypingComplete}
          showMask={showMask}
        />
      </div>
    </div>
  );
}
