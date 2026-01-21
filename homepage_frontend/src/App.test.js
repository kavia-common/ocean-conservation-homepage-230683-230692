import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders mission headline, a news item, and Donate Now button", () => {
  render(<App />);

  // Mission headline
  expect(
    screen.getByRole("heading", { name: /protecting life below water/i })
  ).toBeInTheDocument();

  // A news item title from seed data
  expect(screen.getByText(/community-led reef restoration/i)).toBeInTheDocument();

  // Donate button (Hero CTA)
  expect(screen.getAllByRole("button", { name: /donate now/i })[0]).toBeInTheDocument();
});
