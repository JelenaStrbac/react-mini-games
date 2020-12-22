import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Navbar from "./Navbar";
import axios from "../../axios";
import fakeGetRequestResponse from "../utils/__mocks__/fakeGetRequestResponse.json";

jest.mock("axios", () => {
  const mockAxios = jest.genMockFromModule("axios");
  mockAxios.create = jest.fn(() => mockAxios);

  return mockAxios;
});

describe("testing what happens when user clicks Navbar buttons => RULES and SCOREBOARD", () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  test("user clicks RULES, modal with rules show correctly", async () => {
    const rulesButton = screen.getByText(/rules/i);
    userEvent.click(rulesButton);

    expect(screen.getByText(/Dobrodosli u Mastermind/i)).toBeInTheDocument();
  });
  test("user clicks SCOREBOARD, modal with scorelist show correctly", async () => {
    const scoreBoardButton = screen.getByText(/scoreboard/i);

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: fakeGetRequestResponse })
    );

    userEvent.click(scoreBoardButton);

    await waitFor(() => {
      const firstPlace = screen.getByText(/winner/i);
      expect(firstPlace).toBeInTheDocument();
    });

    const body = screen.getByTestId("tbody");
    expect(body.childElementCount).toBe(71);
  });
});
