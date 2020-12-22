import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import { checkWinner } from "./Game.js";
import Game from "../containers/Game";

describe("check winner function works as expected", () => {
  test("X wins in combination 2-4-6", () => {
    const gameBoard = ["x", "o", "x", "o", "x", "o", "x", "", ""];

    const result = checkWinner(gameBoard);
    const resultingObj = { winner: "x", combination: [2, 4, 6] };

    expect(result).toEqual(resultingObj);
  });
});

describe("check clicking on game board", () => {
  test("X and Y user playes one after other and on right cell on board", () => {
    const history = createMemoryHistory();
    const route = "/tic-tac-toe";
    history.push(route);
    render(
      <Router history={history}>
        <Game />
      </Router>
    );

    const boardCell = screen.getAllByTestId("4")[0];
    userEvent.click(boardCell);
    expect(boardCell.textContent).toBe("x");

    const boardCellTwo = screen.getAllByTestId("5")[0];
    userEvent.click(boardCellTwo);
    expect(boardCellTwo.textContent).toBe("o");
  });
});
