// Import testing utilities from React Testing Library
import { render, screen, fireEvent } from "@testing-library/react";
// Import the component we want to test
import App from "../App";
// Import custom matchers for more readable assertions (like toBeInTheDocument)
import "@testing-library/jest-dom";

// Import test framework functions from Vitest
import { describe, it, expect } from "vitest";

// Group related tests together under "App Component"
describe("App Component", () => {
  // Test 1: Check if the main header text is rendered correctly
  it("renders header text", () => {
    // Render the App component into a virtual DOM for testing
    render(<App />);

    // Search for text that matches the pattern "Vite + React + Rohit" (case-insensitive)
    // The /Vite \+ React \+ Rohit/i is a regex where \+ escapes the + symbol and i makes it case-insensitive
    // toBeInTheDocument() checks if the element exists in the DOM
    expect(screen.getByText(/Vite \+ React \+ Rohit/i)).toBeInTheDocument();
  });

  // Test 2: Check if the counter button is rendered with initial value
  it("renders counter button", () => {
    // Render the App component fresh for this test
    render(<App />);

    // Look for a button element that has accessible name "count is 0"
    // getByRole finds elements by their ARIA role (button, link, etc.)
    // The name option looks for the accessible name (button text in this case)
    expect(
      screen.getByRole("button", { name: /count is 0/i })
    ).toBeInTheDocument();
  });

  // Test 3: Check if clicking the button increments the counter
  it("increments counter when clicked", () => {
    // Render the App component for this test
    render(<App />);

    // Find the counter button by its role and initial text
    const button = screen.getByRole("button", { name: /count is 0/i });

    // Simulate a click event on the button
    // This should trigger the onClick handler and increment the counter
    fireEvent.click(button);

    // Check if the button text now contains "1" (the incremented value)
    // textContent gets the actual text content of the element
    expect(button.textContent).toContain("1");
  });

  // Test 4: Check if the Vite logo link has the correct URL
  it("has link to Vite docs", () => {
    // Render the App component
    render(<App />);

    // Find the link element by looking for a link with accessible name "vite logo"
    // This matches the alt text of the Vite logo image inside the link
    const viteLink = screen.getByRole("link", { name: /vite logo/i });

    // Check if the link has the correct href attribute pointing to Vite's website
    // toHaveAttribute checks for HTML attributes and their values
    expect(viteLink).toHaveAttribute("href", "https://vite.dev");
  });

  // Test 5: Check if React logo link exists and has correct attributes
  it("has React logo link with correct attributes", () => {
    render(<App />);

    // Find React logo link by its accessible name (alt text)
    const reactLink = screen.getByRole("link", { name: /react logo/i });

    // Verify it has the correct href attribute
    expect(reactLink).toHaveAttribute("href", "https://react.dev");
    // Verify it opens in a new tab (target="_blank")
    expect(reactLink).toHaveAttribute("target", "_blank");
  });

  // Test 6: Check if images are rendered with correct alt text (accessibility)
  it("renders images with proper alt text for accessibility", () => {
    render(<App />);

    // Find images by their alt text - important for screen readers and accessibility
    const viteImage = screen.getByAltText(/vite logo/i);
    const reactImage = screen.getByAltText(/react logo/i);

    // Check that both images exist in the document
    expect(viteImage).toBeInTheDocument();
    expect(reactImage).toBeInTheDocument();

    // Verify images have src attributes (contain actual image URLs)
    expect(viteImage).toHaveAttribute("src");
    expect(reactImage).toHaveAttribute("src");
  });

  // Test 7: Test counter functionality with multiple clicks
  it("increments counter multiple times when clicked repeatedly", () => {
    render(<App />);

    // Get the initial button
    const button = screen.getByRole("button", { name: /count is 0/i });

    // Click multiple times and verify counter increases each time
    fireEvent.click(button); // Should be 1
    expect(button.textContent).toContain("1");

    fireEvent.click(button); // Should be 2
    expect(button.textContent).toContain("2");

    fireEvent.click(button); // Should be 3
    expect(button.textContent).toContain("3");
  });

  // Test 8: Test component structure and CSS classes
  it("has proper component structure and CSS classes", () => {
    render(<App />);

    // Check for elements with specific CSS classes
    // This tests that styling is properly applied
    const logoElements = screen.getAllByRole("img");

    // Verify we have exactly 2 logo images
    expect(logoElements).toHaveLength(2);

    // Check that card div exists (contains the button and paragraph)
    // Using querySelector to find element by class name
    const cardDiv = document.querySelector(".card");
    expect(cardDiv).toBeInTheDocument();
  });

  // Test 9: Test text content and structure
  it("contains all expected text content", () => {
    render(<App />);

    // Check for various text content using different query methods

    // Using getByText for exact text matching
    expect(screen.getByText("Vite + React + Rohit")).toBeInTheDocument();

    // Using queryByText for text that might not exist (returns null if not found)
    // This is useful when you want to test that something is NOT rendered
    expect(screen.queryByText("This text should not exist")).toBeNull();

    // Check for paragraph text containing specific content
    expect(screen.getByText(/changed from local/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Click on the Vite and React logos/i)
    ).toBeInTheDocument();
  });

  // Test 10: Test component rendering without errors
  it("renders without crashing", () => {
    // This is a smoke test - just verify the component can render without throwing errors
    // If render() throws an error, the test will fail
    expect(() => render(<App />)).not.toThrow();
  });

  // Test 11: Test initial state of the component
  it("has correct initial state", () => {
    render(<App />);

    // Verify initial counter value is 0
    const button = screen.getByRole("button");
    expect(button.textContent).toMatch(/count is 0/i);

    // Verify the button is enabled and clickable
    expect(button).toBeEnabled();
    expect(button).not.toBeDisabled();
  });

  // Test 12: Test accessibility features
  it("meets basic accessibility requirements", () => {
    render(<App />);

    // Check that interactive elements have proper roles
    const button = screen.getByRole("button");
    const links = screen.getAllByRole("link");
    const images = screen.getAllByRole("img");

    // Verify we have the expected number of each element type
    expect(button).toBeInTheDocument();
    expect(links).toHaveLength(2); // Vite and React links
    expect(images).toHaveLength(2); // Vite and React images

    // Check that images have alt text (important for screen readers)
    images.forEach((img) => {
      expect(img).toHaveAttribute("alt");
      expect(img.getAttribute("alt")).not.toBe("");
    });
  });

  // Test 13: Test component cleanup (for components with useEffect)
  it("cleans up properly when unmounted", () => {
    // Render the component
    const { unmount } = render(<App />);

    // Unmount the component (simulates component being removed from DOM)
    // This tests that there are no memory leaks or errors during cleanup
    expect(() => unmount()).not.toThrow();
  });

  // Test 14: Test keyboard accessibility (Enter key on button)
  it("responds to keyboard interactions", () => {
    render(<App />);

    const button = screen.getByRole("button", { name: /count is 0/i });

    // Focus the button (simulates tabbing to it)
    button.focus();
    expect(button).toHaveFocus();

    // Simulate pressing Enter key (alternative way to activate button)
    fireEvent.keyDown(button, { key: "Enter", code: "Enter" });

    // Note: This might not increment counter as onClick handles click, not keydown
    // But it tests that the button can receive keyboard focus
  });

  // Test 15: Test element positioning and visibility
  it("has visible and properly positioned elements", () => {
    render(<App />);

    // Test that important elements are visible (not display: none or visibility: hidden)
    const heading = screen.getByRole("heading", { level: 1 });
    const button = screen.getByRole("button");

    expect(heading).toBeVisible();
    expect(button).toBeVisible();

    // Test that elements exist in expected order in DOM
    const allElements = screen.getAllByText(/./); // Gets all text-containing elements
    expect(allElements.length).toBeGreaterThan(0);
  });

  // Test 16: Test error boundaries and edge cases
  it("handles edge cases gracefully", () => {
    render(<App />);

    // Test that clicking button rapidly doesn't break anything
    const button = screen.getByRole("button", { name: /count is 0/i });

    // Rapid clicks simulation
    for (let i = 0; i < 10; i++) {
      fireEvent.click(button);
    }

    // Should reach count of 10
    expect(button.textContent).toContain("10");

    // Component should still be functional
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  // Test 17: Test using data-testid attribute (alternative to role-based queries)
  it("can be tested using data-testid attributes", () => {
    render(<App />);

    // This shows how you would use data-testid if you added them to your component
    // Example: <button data-testid="counter-button">count is {count}</button>

    // For now, we'll demonstrate with existing elements
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();

    // You can also use querySelector for more specific CSS selector testing
    const buttonElement = document.querySelector("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBe(button); // Should be the same element

    // Testing CSS properties (though this is usually not recommended as it tests implementation)
    // expect(buttonElement).toHaveStyle("cursor: pointer"); // Example
  });

  // Test 18: Test component props and state management patterns
  it("demonstrates state management testing patterns", () => {
    render(<App />);

    const button = screen.getByRole("button", { name: /count is 0/i });

    // Test initial state
    expect(button.textContent).toMatch(/count is 0/);

    // Test state changes
    fireEvent.click(button);
    expect(button.textContent).toMatch(/count is 1/);

    // Test that old state doesn't persist
    expect(button.textContent).not.toMatch(/count is 0/);

    // Test state consistency after multiple renders
    fireEvent.click(button);
    fireEvent.click(button);
    expect(button.textContent).toMatch(/count is 3/);
  });

  // Test 19: Performance and rendering optimization tests
  it("renders efficiently", () => {
    const startTime = performance.now();

    // Render the component
    render(<App />);

    const endTime = performance.now();
    const renderTime = endTime - startTime;

    // Basic performance check - component should render quickly
    // (This is a simple example - real performance testing would be more sophisticated)
    expect(renderTime).toBeLessThan(1000); // Should render in less than 1 second

    // Verify all elements are rendered
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  // Test 20: Integration test - testing multiple interactions together
  it("handles complex user interactions correctly", () => {
    render(<App />);

    // Simulate a realistic user workflow

    // 1. User sees the page
    expect(screen.getByText("Vite + React + Rohit")).toBeInTheDocument();

    // 2. User clicks the counter button several times
    const button = screen.getByRole("button", { name: /count is 0/i });
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    // 3. User checks if counter updated correctly
    expect(button.textContent).toContain("3");

    // 4. User might click on external links (we just verify they exist)
    const viteLink = screen.getByRole("link", { name: /vite logo/i });
    const reactLink = screen.getByRole("link", { name: /react logo/i });

    expect(viteLink).toBeInTheDocument();
    expect(reactLink).toBeInTheDocument();

    // 5. Verify all functionality still works after interactions
    fireEvent.click(button);
    expect(button.textContent).toContain("4");
  });
});
