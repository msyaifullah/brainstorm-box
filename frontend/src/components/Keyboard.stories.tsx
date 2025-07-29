import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Keyboard from './Keyboard';

const meta: Meta<typeof Keyboard> = {
  title: 'Components/Keyboard',
  component: Keyboard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A virtual keyboard component with glowing keys and typing animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    glowingKeys: {
      control: { type: 'object' },
      description: 'Array of keys that should glow',
    },
    typingSequence: {
      control: { type: 'object' },
      description: 'Array of keys to animate typing',
    },
    typingSpeed: {
      control: { type: 'number', min: 50, max: 1000, step: 50 },
      description: 'Speed of typing animation in ms',
    },
    isTyping: {
      control: { type: 'boolean' },
      description: 'Whether to show typing animation',
    },
    showMask: {
      control: { type: 'boolean' },
      description: 'Whether to show the radial gradient mask',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    showMask: false,
    className: 'w-[600px] h-[400px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic keyboard component without any special effects.',
      },
    },
  },
};

export const SimpleTest: Story = {
  args: {
    showMask: false,
    className: 'w-[400px] h-[300px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Simple test version with minimal styling.',
      },
    },
  },
};

export const WithGlowingKeys: Story = {
  args: {
    showMask: false,
    className: 'w-[600px] h-[400px]',
    glowingKeys: ['command', 'c'],
  },
};

export const TypingAnimation: Story = {
  args: {
    showMask: false,
    className: 'w-[600px] h-[400px]',
    isTyping: true,
    typingSequence: ['h', 'e', 'l', 'l', 'o'],
    typingSpeed: 200,
  },
};

export const FunctionKeys: Story = {
  args: {
    showMask: false,
    className: 'w-[600px] h-[400px]',
    glowingKeys: ['F1', 'F2', 'F3'],
  },
};

export const ModifierKeys: Story = {
  args: {
    showMask: false,
    className: 'w-[600px] h-[400px]',
    glowingKeys: ['control', 'option', 'command', 'shift'],
  },
};

export const CustomSize: Story = {
  args: {
    showMask: false,
    className: 'w-[800px] h-[500px]',
    containerClassName: 'p-8',
  },
}; 