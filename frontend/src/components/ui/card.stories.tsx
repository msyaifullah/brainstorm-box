import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from './card';
import { Button } from './button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here. This is the main content area of the card.</p>
      </CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card with Action</CardTitle>
        <CardDescription>This card has an action button in the header</CardDescription>
        <CardAction>
          <Button size="sm" variant="outline">Action</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>This card demonstrates the CardAction component in the header.</p>
      </CardContent>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent>
        <p>This card only has content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
};

export const HeaderOnly: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Header Only Card</CardTitle>
        <CardDescription>This card only has a header section.</CardDescription>
      </CardHeader>
    </Card>
  ),
};

export const FooterOnly: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent>
        <p>Content with footer only.</p>
      </CardContent>
      <CardFooter>
        <Button>Primary Action</Button>
        <Button variant="outline">Secondary Action</Button>
      </CardFooter>
    </Card>
  ),
};

export const ComplexLayout: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Complex Card Layout</CardTitle>
        <CardDescription>A more complex card with multiple elements</CardDescription>
        <CardAction>
          <Button size="sm" variant="ghost">⋮</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>This card demonstrates a more complex layout with:</p>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Header with title and description</li>
            <li>Action button in the header</li>
            <li>Rich content area</li>
            <li>Footer with multiple actions</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  ),
}; 