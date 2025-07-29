import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Label } from './label';
import { Input } from './input';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Enter your email" />
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="required">Required Field *</Label>
      <Input id="required" placeholder="This field is required" />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="description">Password</Label>
      <Input type="password" id="description" placeholder="Enter your password" />
      <p className="text-sm text-muted-foreground">Must be at least 8 characters long</p>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="disabled" className="opacity-50">Disabled Field</Label>
      <Input id="disabled" disabled placeholder="This field is disabled" />
    </div>
  ),
};

export const MultipleLabels: Story = {
  render: () => (
    <div className="grid gap-4 w-full max-w-md">
      <div className="grid gap-1.5">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="Enter your full name" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="username">Username</Label>
        <Input id="username" placeholder="Choose a username" />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="bio">Bio</Label>
        <Input id="bio" placeholder="Tell us about yourself" />
      </div>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="with-icon" className="flex items-center gap-2">
        📧 Email Address
      </Label>
      <Input type="email" id="with-icon" placeholder="Enter your email" />
    </div>
  ),
}; 