import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../pages/Home'; // Adjust this import path as needed

describe('Home component', () => {
  test('renders without crashing', () => {
    render(
      <Router>
        <Home />
      </Router>
    );
    // If the render doesn't throw an error, the test will pass
  });
});