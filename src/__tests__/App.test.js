import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';


//Testing if App test renders without crashing
describe('App component', () => {
  test('renders without crashing', () => {
    render(<App />);
  });

//Testing if dummy test runs
  test('dummy test that always passes', () => {
    expect(1 + 1).toBe(2);
  });
});