import { CREATE_PAGE, DELETE_PAGE, PageActionTypes, SELECT_PAGE_END, SELECT_PAGE_START, UPDATE_PAGE_NAME } from '../actions/page.actions';
import { Page, initialPage } from '../models/page.model';

interface State {
  pages: Page[];
  isPageLoading: boolean;
  nextPageId?: string;
}

const initialState: State = {
  pages: [initialPage],
  isPageLoading: false
};

const pageReducer = (state = initialState, action: PageActionTypes): State => {
  switch (action.type) {
    case CREATE_PAGE:
      return {
        pages: [...state.pages, action.payload],
        isPageLoading: false
      };
    case SELECT_PAGE_START:
      return {
        ...state,
        isPageLoading: true,
        nextPageId: action.payload.pageId
      };
    case SELECT_PAGE_END:
      const newPages = state.pages.map(page => (
        (page.id === action.payload.currentPage?.id) ? action.payload.currentPage : page
      ))
      return {
        pages: [...newPages],
        isPageLoading: false,
        nextPageId: undefined
      };
    case UPDATE_PAGE_NAME:
      const updatedPageId = state.pages.findIndex(page => page.id === action.payload.pageId);
      return {
        pages: [
          ...state.pages.slice(0, updatedPageId),
          {
            ...state.pages[updatedPageId],
            name: action.payload.newName
          },
          ...state.pages.slice(updatedPageId + 1)
        ],
        isPageLoading: false
      };
    case DELETE_PAGE:
      const remainingPageId = state.pages.findIndex(page => page.id === action.payload.id);
      return {
        pages: [...state.pages.splice(remainingPageId, 1)],
        isPageLoading: false
      };
    default:
      return state;
  }
};

export default pageReducer;