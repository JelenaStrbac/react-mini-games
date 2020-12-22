import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import MasterMind from "./MasterMind";
import * as utils from "../utils/helperFunctions";

window.HTMLMediaElement.prototype.load = () => {
  /* do nothing */
};

test("user clicks START button and heart button -> heart shows on board cell no 1 and not on no 2", () => {
  const history = createMemoryHistory();
  const route = "/mastermind";
  history.push(route);
  render(
    <Router history={history}>
      <MasterMind />
    </Router>
  );

  // 1. clicking start button
  const startButton = screen.getByText(/start/i);
  userEvent.click(startButton);

  // 2. clicking heart only once
  const guessingMiniPanelCell = screen.getByTestId("g3");
  userEvent.click(guessingMiniPanelCell);

  const guessingPanelCellOne = screen.getByTestId("b0");
  const guessingPanelCellTwo = screen.getByTestId("b1");

  expect(guessingPanelCellOne.firstChild).toBeTruthy();
  expect(guessingPanelCellOne.firstElementChild.id).toBe("3");
  expect(guessingPanelCellTwo.firstChild).not.toBeTruthy();
});

describe("check mastermind game flow", () => {
  beforeEach(() => {
    const mock = jest.spyOn(utils, "getWinnigCombination"); // spy on fn
    mock.mockReturnValue([3, 1, 3, 0]); // mock the return value

    const history = createMemoryHistory();
    const route = "/mastermind";
    history.push(route);
    render(
      <Router history={history}>
        <MasterMind />
      </Router>
    );

    //* simulate what is USER doing *//
    // 1. clicking start button
    const startButton = screen.getByText(/start/i);
    userEvent.click(startButton);
  });

  test("user clicks heart button 4 times -> red/yellow/black signs show up on right board", async () => {
    // 2. clicking heart 4 times
    const guessingMiniPanelCell = screen.getByTestId("g3");
    userEvent.click(guessingMiniPanelCell);
    userEvent.click(guessingMiniPanelCell);
    userEvent.click(guessingMiniPanelCell);
    userEvent.click(guessingMiniPanelCell);

    await waitFor(() => {
      const resultingPanelCellOne = screen.getByTestId("r0");
      expect(resultingPanelCellOne).toHaveStyle(`background-color: red`);
    });

    const resultingPanelCellTwo = screen.getByTestId("r1");
    expect(resultingPanelCellTwo).toHaveStyle(`background-color: red`);

    const resultingPanelCellThree = screen.getByTestId("r2");
    expect(resultingPanelCellThree).toHaveStyle(
      `background-color: rgb(0, 0, 0)`
    );

    const resultingPanelCellFour = screen.getByTestId("r3");
    expect(resultingPanelCellFour).toHaveStyle(
      `background-color: rgb(0, 0, 0)`
    );
  });

  test("user guesses win combination -> clicking signs is not allowed and next button should appear; after clicking next button board is empty and score is persisted", async () => {
    // 2. clicking heart hearts-clubs-hearts-smile
    const guessingMiniPanelCellHeart = screen.getByTestId("g3");
    const guessingMiniPanelCellClub = screen.getByTestId("g1");
    const guessingMiniPanelCellSmile = screen.getByTestId("g0");

    userEvent.click(guessingMiniPanelCellHeart);
    userEvent.click(guessingMiniPanelCellClub);
    userEvent.click(guessingMiniPanelCellHeart);
    userEvent.click(guessingMiniPanelCellSmile);

    await waitFor(() => {
      expect(guessingMiniPanelCellHeart.parentElement).toHaveStyle(
        `cursor: not-allowed`
      );
    });

    const nextButton = screen.getByText(/next/i);
    expect(nextButton).toBeInTheDocument();

    const score = screen.getByText(/score:/i);
    expect(score.textContent).toBe("Score: 60");

    userEvent.click(nextButton);

    await waitFor(() => {
      const guessingPanelCellOne = screen.getByTestId("b0");
      expect(guessingPanelCellOne.children).toHaveLength(0);
    });

    expect(score.textContent).toBe("Score: 60");
  });
});

// screen.debug(null, 20000);
