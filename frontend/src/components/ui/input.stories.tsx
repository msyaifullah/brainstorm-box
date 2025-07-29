import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Input } from './input';
import { Label } from './label';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    placeholder: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Enter your email" />
    </div>
  ),
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
};

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter email address...',
  },
};

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter number...',
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
  },
};

export const Tel: Story = {
  args: {
    type: 'tel',
    placeholder: 'Enter phone number...',
  },
};

export const Url: Story = {
  args: {
    type: 'url',
    placeholder: 'Enter URL...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Pre-filled value',
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    placeholder: 'Invalid input',
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="grid gap-4 w-full max-w-md">
      <div className="grid gap-1.5">
        <Label htmlFor="text">Text</Label>
        <Input id="text" placeholder="Text input" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="Email input" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="Password input" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="number">Number</Label>
        <Input id="number" type="number" placeholder="Number input" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="search">Search</Label>
        <Input id="search" type="search" placeholder="Search input" />
      </div>
    </div>
  ),
}; 