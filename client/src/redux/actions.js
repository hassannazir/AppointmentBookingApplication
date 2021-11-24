import * as actions from "./actionTypes";

export const onNextClick = (currentPage, rowsPerPage, rowsCopy) => {
  return {
    type: actions.ON_Next,
    payload: {
      currentPage,
      rowsPerPage,
      rowsCopy,
    },
  };
};

export const onPrevClick = (currentPage, rowsPerPage, rowsCopy) => {
  return {
    type: actions.ON_PREV,
    payload: {
      currentPage,
      rowsPerPage,
      rowsCopy,
    },
  };
};

export const firstPage = (currentPage, rowsPerPage) => {
  return {
    type: actions.FIRST_PAGE,
    payload: {
      currentPage,
      rowsPerPage,
    },
  };
};

export const initialState = (data) => {
  return {
    type: actions.INITIAL_STATE,
    payload: {
      data,
    },
  };
};
