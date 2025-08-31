import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import InputField from './InputField';

describe('InputField', () => {
  test('renders correctly with label and placeholder', () => {
    render(
      <InputField 
        label="Username" 
        placeholder="Enter username" 
      />
    );
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
  });

  test('updates value when typing', () => {
    const handleChange = jest.fn();
    render(
      <InputField 
        label="Email" 
        onChange={handleChange} 
      />
    );
    
    const input = screen.getByLabelText(/email/i);
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    
    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('test@example.com');
  });

  test('shows error message when invalid', () => {
    render(
      <InputField 
        label="Password" 
        errorMessage="Password is required" 
        invalid={true} 
      />
    );
    
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('aria-invalid', 'true');
  });

  test('clear button clears input', () => {
    const handleChange = jest.fn();
    render(
      <InputField 
        label="Search" 
        value="search term" 
        onChange={handleChange} 
        showClearButton={true} 
      />
    );
    
    const clearButton = screen.getByLabelText(/clear input/i);
    fireEvent.click(clearButton);
    
    expect(handleChange).toHaveBeenCalled();
    // Check that the onChange was called with an empty value
    expect(handleChange.mock.calls[0][0].target.value).toBe('');
  });

  test('password toggle works', () => {
    render(
      <InputField 
        label="Password" 
        type="password" 
        showPasswordToggle={true} 
      />
    );
    
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'password');
    
    const toggleButton = screen.getByLabelText(/show password/i);
    fireEvent.click(toggleButton);
    
    expect(input).toHaveAttribute('type', 'text');
    
    // Toggle back to password
    const hideButton = screen.getByLabelText(/hide password/i);
    fireEvent.click(hideButton);
    
    expect(input).toHaveAttribute('type', 'password');
  });

  test('applies disabled state correctly', () => {
    render(
      <InputField 
        label="Disabled Field" 
        disabled={true} 
      />
    );
    
    const input = screen.getByLabelText(/disabled field/i);
    expect(input).toBeDisabled();
  });

  test('applies different size classes', () => {
    const { rerender } = render(
      <InputField 
        label="Small Input" 
        size="sm" 
      />
    );
    
    let input = screen.getByLabelText(/small input/i);
    expect(input.className).toContain('h-8');
    
    rerender(
      <InputField 
        label="Large Input" 
        size="lg" 
      />
    );
    
    input = screen.getByLabelText(/large input/i);
    expect(input.className).toContain('h-12');
  });
});