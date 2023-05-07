import { render, screen } from "@testing-library/react";
import Home from "@/pages/index";
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      asPath: "/",
      push: jest.fn(),
    };
  },
}));

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const heading = screen.getByText("ワードウルフ");

    expect(heading).toBeInTheDocument();
  });
});
