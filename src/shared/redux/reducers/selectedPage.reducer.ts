

import { DEFAULT_PAGE_NAME, Page, initialPage } from '../models/page.model';
import { CanvasActionTypes, EDIT_ELEMENT, SAVE_ELEMENTS, UPDATE_ELEMENT_NAME } from '../actions/element.actions';
import { PageActionTypes, SAVE_PAGE_THUMBNAIL, SELECT_PAGE_END, UPDATE_PAGE_NAME } from '../actions/page.actions';


interface State {
  page: Page | null;
  selectedElement: {
    editorAction: string;
    elementId?: string;
    editorParameters?: { [key: string]: number | string | boolean };
  } | null;
}

const initialState: State = {
  page: initialPage,
  selectedElement: null
};

const selectedPageReducer = (state = initialState, action: PageActionTypes | CanvasActionTypes): State => {

  switch (action.type) {
    case SELECT_PAGE_END:
      return {
        page: action.payload.nextPage || state.page,
        selectedElement: null
      };
    case UPDATE_PAGE_NAME:
      if (action.payload.pageId !== state.page?.id) {
        return state;
      }
      return state.page ? {
        ...state,
        page: {
          ...state.page,
          name: action.payload.newName || DEFAULT_PAGE_NAME
        }
      } : { ...state }
    case UPDATE_ELEMENT_NAME:
      return state.page ? {
        ...state,
        page: {
          ...state.page,
          elements: state.page.elements.map(element => {
            return element.code === action.payload.elementId ? {
              ...element,
              name: action.payload.newName
            } : element;
          })
        }
      } : { ...state }
    case EDIT_ELEMENT:

      return {
        ...state,
        selectedElement: {
          ...action.payload,
        }
      };
    case SAVE_ELEMENTS:
      return state.page ? {
        ...state,
        page: {
          ...state.page,
          elements: action.payload
        },
      } : { ...state }
    case SAVE_PAGE_THUMBNAIL:
      return state.page ? {
        ...state,
        page: {
          ...state.page,
          thumbnail: action.payload
        }
      } : { ...state }
    default:
      return state;
  }
};

export default selectedPageReducer;