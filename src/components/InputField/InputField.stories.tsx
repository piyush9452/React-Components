import React from 'react';
import InputField, { InputFieldProps } from './InputField';

export default {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

const Template = (args: InputFieldProps) => <InputField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Username',
  placeholder: 'Enter your username',
  helperText: 'Your username should be at least 4 characters',
  variant: 'outlined',
  size: 'md',
};

export const Error = Template.bind({});
Error.args = {
  label: 'Email',
  placeholder: 'Enter your email',
  errorMessage: 'Please enter a valid email address',
  invalid: true,
  variant: 'outlined',
  size: 'md',
  value: 'invalid-email',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled Input',
  placeholder: 'This input is disabled',
  disabled: true,
  variant: 'outlined',
  size: 'md',
};

export const WithPasswordToggle = Template.bind({});
WithPasswordToggle.args = {
  label: 'Password',
  placeholder: 'Enter your password',
  type: 'password',
  showPasswordToggle: true,
  variant: 'outlined',
  size: 'md',
};

export const WithClearButton = Template.bind({});
WithClearButton.args = {
  label: 'Search',
  placeholder: 'Search...',
  showClearButton: true,
  variant: 'filled',
  size: 'md',
  value: 'Search term',
};

export const FilledVariant = Template.bind({});
FilledVariant.args = {
  label: 'Filled Input',
  placeholder: 'This is a filled input',
  variant: 'filled',
  size: 'md',
};

export const GhostVariant = Template.bind({});
GhostVariant.args = {
  label: 'Ghost Input',
  placeholder: 'This is a ghost input',
  variant: 'ghost',
  size: 'md',
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  label: 'Small Input',
  placeholder: 'Small size input',
  variant: 'outlined',
  size: 'sm',
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  label: 'Large Input',
  placeholder: 'Large size input',
  variant: 'outlined',
  size: 'lg',
};