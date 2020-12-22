import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import MasterMind from "./MasterMind";
import InputModal from "./InputModal";
import axios from "../../axios";
import fakePostRequestResponse from "../utils/__mocks__/fakePostRequestResponse.json";
import fakeGetRequestResponse from "../utils/__mocks__/fakeGetRequestResponse.json";

jest.mock("axios", () => {
  const mockAxios = jest.genMockFromModule("axios");
  mockAxios.create = jest.fn(() => mockAxios);

  return mockAxios;
});

test("SUBMIT button exists on modal that appears after game is over - 3 min later", async () => {
  const history = createMemoryHistory();
  const route = "/mastermind";
  history.push(route);

  jest.useFakeTimers();
  render(
    <Router history={history}>
      <MasterMind />
    </Router>
  );

  // 1. clicking start button
  const startButton = screen.getByText(/start/i);
  userEvent.click(startButton);

  // Fast-forward until all timers have been executed 180s i.e. 180.000ms
  act(() => {
    jest.advanceTimersByTime(180000);
  });

  await waitFor(() => {
    const submitButton = screen.getByText(/submit/i);
    expect(submitButton).toBeInTheDocument();
  });
});

describe("testing what happens when clicking SUBMIT button after game is over", () => {
  const resetScore = jest.fn();
  beforeEach(() => {
    render(<InputModal resetScore={resetScore} />);
  });

  test("user clicks SUBMIT button, sends its data correctly (post request) and receive its position (get request)", async () => {
    const submitButton = screen.getByText(/submit/i);
    const fakeUserData = {
      userName: "",
      score: undefined,
      date: new Date().toLocaleString(),
    };

    axios.post.mockImplementationOnce(() =>
      Promise.resolve({ data: fakePostRequestResponse })
    );

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: fakeGetRequestResponse })
    );

    userEvent.click(submitButton);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toBeCalledWith("/users.json", fakeUserData);

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(screen.getByText(/congratulations/i)).toBeInTheDocument();
      expect(screen.getByText(/18/i)).toBeInTheDocument();
    });
    expect(resetScore).toHaveBeenCalledTimes(1);
  });

  test("input field updates on change", () => {
    const nameInput = screen.getByPlaceholderText("Enter your name");

    fireEvent.change(nameInput, { target: { value: "test" } });

    expect(nameInput.value).toBe("test");
  });
});
