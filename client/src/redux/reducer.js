import * as actions from "./actionTypes";

export default function reducer(state = [], action) {
  switch (action.type) {
    case actions.INITIAL_STATE:
      return [...state, ...action.payload.data];
    case actions.FIRST_PAGE:
      return [
        ...state.slice(action.payload.currentPage, action.payload.rowsPerPage),
      ];
    // case actions.ON_Next:
    //   return [
    //     ...state,
    //     {
    //       data: action.payload.rowsCopy.slice(
    //         action.payload.currentPage,
    //         action.payload.rowsPerPage
    //       ),
    //     },
    //   ];
    // case actions.ON_PREV:
    //   return [
    //     ...state,
    //     {
    //       data: action.payload.rowsCopy.slice(
    //         action.payload.currentPage,
    //         action.payload.rowsPerPage
    //       ),
    //     },
    //   ];
    default:
      return state;
  }
}
