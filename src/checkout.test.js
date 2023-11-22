import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Checkout, { pricingRules } from './Checkout'; // Import the component to be tested

describe('Checkout component', () => {
  afterEach(() => {
    jest.useRealTimers(); // Reset Jest's fake timers to avoid timer-related leaks
    jest.clearAllTimers(); // Clear any pending timers
  });

  it('scans items and updates the scanned items list', () => {
    // scans items and updates the scanned items list
    render(<Checkout />); // renders the checkout component

    const scanButtonA = screen.getByText('Scan Item A'); // find the button that has the text 'Scan Item A'
    fireEvent.click(scanButtonA); // use the fireEvent method to mimic the pressing of the button
    expect(screen.getByText('A: 1')).toBeInTheDocument();

    const scanButtonB = screen.getByText('Scan Item B'); // find the button that has the text 'Scan Item B'
    fireEvent.click(scanButtonB); // use the fireEvent method to mimic the pressing of the button
    expect(screen.getByText('B: 1')).toBeInTheDocument();

    const scanButtonC = screen.getByText('Scan Item C'); // find the button that has the text 'Scan Item C'
    fireEvent.click(scanButtonC); // use the fireEvent method to mimic the pressing of the button
    expect(screen.getByText('C: 1')).toBeInTheDocument();

    const scanButtonD = screen.getByText('Scan Item D'); // find the button that has the text 'Scan Item B'
    fireEvent.click(scanButtonD); // use the fireEvent method to mimic the pressing of the button
    expect(screen.getByText('D: 1')).toBeInTheDocument();
  });

  it('clears scanned items when the "Clear Items" button is clicked', () => {
    render(<Checkout />); // renders the checkout component

    const scanButtonA = screen.getByText('Scan Item A');
    fireEvent.click(scanButtonA);

    // making sure that the value of A is null / 0 when pressing the clear items button
    const clearButtonA = screen.getByText('Clear Items');
    fireEvent.click(clearButtonA);
    expect(screen.queryByText('A: 1')).toBeNull();
  });

  it('calculates the correct total price for scanned items', () => {
    render(<Checkout />);

    const scanButtonA = screen.getByText('Scan Item A');
    const scanButtonB = screen.getByText('Scan Item B');
    fireEvent.click(scanButtonA);
    fireEvent.click(scanButtonB);

    // Total price calculation based on pricingRules
    const totalPrice =
      pricingRules['A']['unit_price'] + pricingRules['B']['unit_price']; // this calculates the total price by adding the unit prices of items A and B together.
    expect(screen.getByText(totalPrice.toString())).toBeInTheDocument(); // Verifies that the total price actually exists in the document
  });
});
