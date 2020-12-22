import {
  chunk,
  pushElementsFromBeginingToRight,
  compareArrays,
  checkIfCombinationIsMatching,
  groupBy,
  getPositionOfUsers,
} from "./helperFunctions";

test("chunk fn splits code on small arrays of four elements", () => {
  const arrToChunk = [
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    1,
    1,
    3,
    3,
    1,
    4,
    4,
    0,
    1,
    5,
    0,
    2,
    5,
    1,
    2,
    0,
  ];

  const resultOfCallingFn = chunk(arrToChunk, 4);
  const resultThatIExpect = [
    [0, 0, 1, 1],
    [1, 1, 2, 2],
    [1, 1, 3, 3],
    [1, 4, 4, 0],
    [1, 5, 0, 2],
    [5, 1, 2, 0],
  ];

  expect(resultOfCallingFn).toEqual(resultThatIExpect);
});

test("pushElementsFromBeginingToRight adds element after the last element that exists", () => {
  const guessingCombination = [
    0,
    0,
    1,
    1,
    0,
    2,
    2,
    2,
    2,
    2,
    1,
    3,
    4,
    1,
    1,
    4,
    0,
    2,
    3,
    5,
    null,
    null,
    null,
    null,
  ];

  const resultOfCallingFn = pushElementsFromBeginingToRight(
    guessingCombination,
    4
  );
  const resultThatIExpect = [
    0,
    0,
    1,
    1,
    0,
    2,
    2,
    2,
    2,
    2,
    1,
    3,
    4,
    1,
    1,
    4,
    0,
    2,
    3,
    5,
    4,
    null,
    null,
    null,
  ];

  expect(resultOfCallingFn).toEqual(resultThatIExpect);
});

describe("compare winning and guessing combination fns work as expected", () => {
  test("compareArrays fn for only one row gives array with resulting colors [red, yellow, black, black]", () => {
    const arr1 = [0, 2, 5, 0];
    const arr2 = [0, 0, 1, 1];

    const resultOfCallingFn = compareArrays(arr1, arr2);
    const resultThatIExpect = ["red", "yellow", "black", "black"];

    expect(resultOfCallingFn).toHaveLength(4);
    expect(resultOfCallingFn).toEqual(resultThatIExpect);
  });

  test("checkIfCombinationIsMatching fn receives chunked array with guesses and winning array (length four) and gives array with matching colors", () => {
    const array = [
      [0, 0, 1, 1],
      [1, 1, 2, 2],
      [1, 1, 3, 3],
      [1, 4, 4, 0],
      [1, 5, 0, 2],
      [5, 1, 2, 0],
    ];
    const winning = [5, 1, 2, 0];

    const resultOfCallingFn = checkIfCombinationIsMatching(array, winning);
    const resultThatIExpect = [
      "yellow",
      "yellow",
      "black",
      "black",
      "red",
      "red",
      "black",
      "black",
      "red",
      "black",
      "black",
      "black",
      "red",
      "yellow",
      "black",
      "black",
      "yellow",
      "yellow",
      "yellow",
      "yellow",
      "red",
      "red",
      "red",
      "red",
    ];

    expect(resultOfCallingFn).toEqual(resultThatIExpect);
  });
});

describe("grouping fns -> gives position of users", () => {
  test("groupBy fn groups array of objects per score they achieved", () => {
    const objectArray = [
      {
        date: "23/11/2020, 16:21:03",
        score: 90,
        timeInMs: 1606144863244,
        id: "MMpgQupkYay_qFEXLRO",
        userName: "Jelena ",
      },
      {
        date: "23/11/2020, 16:38:57",
        score: 90,
        timeInMs: 1606145937352,
        id: "MMpkWRKGvWi2LtT5vOp",
        userName: "Zoran",
      },
      {
        date: "23/11/2020, 16:34:19",
        score: 30,
        timeInMs: 1606145659080,
        id: "MMpjSe3d_Ur9qXPw_B2",
        userName: "Filip",
      },
    ];

    const resultOfCallingFn = groupBy(objectArray, "score");
    const resultThatIExpect = {
      90: [
        {
          date: "23/11/2020, 16:21:03",
          score: 90,
          timeInMs: 1606144863244,
          id: "MMpgQupkYay_qFEXLRO",
          userName: "Jelena ",
        },
        {
          date: "23/11/2020, 16:38:57",
          score: 90,
          timeInMs: 1606145937352,
          id: "MMpkWRKGvWi2LtT5vOp",
          userName: "Zoran",
        },
      ],
      30: [
        {
          date: "23/11/2020, 16:34:19",
          score: 30,
          timeInMs: 1606145659080,
          id: "MMpjSe3d_Ur9qXPw_B2",
          userName: "Filip",
        },
      ],
    };

    expect(resultOfCallingFn).toEqual(resultThatIExpect);
  });

  test("getPositionOfUsers fn -> all users are sorted per score they achieved and property `position` is added for each user", () => {
    const userListFetchedButNotSorted = {
      MMpgQupkYay_qFEXLRO: {
        date: "23/11/2020, 16:21:03",
        score: 90,
        timeInMs: 1606144863244,
        userName: "Jelena ",
      },
      MMpjSe3d_Ur9qXPw_B2: {
        date: "23/11/2020, 16:34:19",
        score: 30,
        timeInMs: 1606145659080,
        userName: "Filip",
      },
      MMpkWRKGvWi2LtT5vOp: {
        date: "23/11/2020, 16:38:57",
        score: 90,
        timeInMs: 1606145937352,
        userName: "Zoran",
      },
    };

    const resultOfCallingFn = getPositionOfUsers(userListFetchedButNotSorted);
    const resultThatIExpect = [
      {
        date: "23/11/2020, 16:21:03",
        score: 90,
        timeInMs: 1606144863244,
        id: "MMpgQupkYay_qFEXLRO",
        position: 1,
        userName: "Jelena ",
      },
      {
        date: "23/11/2020, 16:38:57",
        score: 90,
        timeInMs: 1606145937352,
        id: "MMpkWRKGvWi2LtT5vOp",
        position: 1,
        userName: "Zoran",
      },
      {
        date: "23/11/2020, 16:34:19",
        score: 30,
        timeInMs: 1606145659080,
        id: "MMpjSe3d_Ur9qXPw_B2",
        position: 2,
        userName: "Filip",
      },
    ];

    expect(resultOfCallingFn).toEqual(resultThatIExpect);
  });
});
