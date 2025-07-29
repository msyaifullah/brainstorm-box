import Keyboard from "@/components/Keyboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Keyboard Component Examples</h1>
          <p className="text-muted-foreground text-lg">
            Different ways to use the reusable Keyboard component
          </p>
        </div>

        {/* Example 1: Default Keyboard */}
        <Card>
          <CardHeader>
            <CardTitle>Default Keyboard</CardTitle>
            <CardDescription>
              Basic keyboard component with default styling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Keyboard />
          </CardContent>
        </Card>

        {/* Example 2: Glowing Keyboard */}
        <Card>
          <CardHeader>
            <CardTitle>Glowing Keyboard</CardTitle>
            <CardDescription>
              Keyboard with glowing keys demonstration - shows how to highlight specific keys
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Keyboard 
              glowingKeys={['h', 'e', 'l', 'l', 'o']} 
              containerClassName="scale-75"
            />
          </CardContent>
        </Card>

        {/* Example 3: Compact Keyboard */}
        <Card>
          <CardHeader>
            <CardTitle>Compact Keyboard</CardTitle>
            <CardDescription>
              Keyboard with custom container styling for smaller display
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="max-w-2xl mx-auto">
              <Keyboard containerClassName="scale-75" />
            </div>
          </CardContent>
        </Card>

        {/* Example 4: Keyboard in a Grid Layout */}
        <Card>
          <CardHeader>
            <CardTitle>Keyboard in Grid Layout</CardTitle>
            <CardDescription>
              Keyboard component used within a responsive grid
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Left Column</h3>
                <p className="text-sm text-muted-foreground">
                  This shows how the keyboard adapts to different container sizes.
                </p>
              </div>
              <div>
                <Keyboard className="h-[400px]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Example 5: Interactive Keyboard */}
        <Card>
          <CardHeader>
            <CardTitle>Interactive Keyboard</CardTitle>
            <CardDescription>
              Keyboard with interactive elements and custom styling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 mb-4">
              <Button variant="outline">Highlight Keys</Button>
              <Button variant="outline">Reset Keyboard</Button>
              <Button variant="outline">Toggle Glow</Button>
            </div>
            <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-4">
              <Keyboard containerClassName="opacity-90" />
            </div>
          </CardContent>
        </Card>

        {/* Example 6: Multiple Keyboards */}
        <Card>
          <CardHeader>
            <CardTitle>Multiple Keyboards</CardTitle>
            <CardDescription>
              Using multiple keyboard instances with different configurations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <h4 className="font-medium">Keyboard 1</h4>
                <Keyboard containerClassName="scale-90" />
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Keyboard 2</h4>
                <Keyboard containerClassName="scale-90" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Instructions */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use the Keyboard Component</CardTitle>
            <CardDescription>
              Code examples and usage instructions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Basic Usage:</h4>
              <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`import Keyboard from "@/components/Keyboard";

// Basic usage
<Keyboard />

// With custom styling
<Keyboard 
  className="h-[500px]" 
  containerClassName="mt-8" 
/>

// With glowing keys
<Keyboard 
  glowingKeys={['h', 'e', 'l', 'l', 'o']} 
  containerClassName="scale-75"
/>`}
              </pre>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Props:</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li><code>className</code> - Additional CSS classes for the keyboard container</li>
                <li><code>containerClassName</code> - Additional CSS classes for the outer wrapper</li>
                <li><code>glowingKeys</code> - Array of keys that should glow (e.g., [&apos;h&apos;, &apos;e&apos;, &apos;l&apos;, &apos;l&apos;, &apos;o&apos;])</li>
                <li><code>typingSequence</code> - Array of keys to animate typing</li>
                <li><code>typingSpeed</code> - Speed of typing animation in ms</li>
                <li><code>isTyping</code> - Whether to show typing animation</li>
                <li><code>onTypingComplete</code> - Callback when typing animation completes</li>
                <li><code>showMask</code> - Whether to show the radial gradient mask (default: true)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 