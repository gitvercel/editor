import { EditingAttributesActionTypes } from '../actions/editingAttributes.actions';


interface State {
  positionX?: number;
  positionY?: number;
  fillColor: string;
  strokeWidth: number;
  strokeColor: string;
  opacity: number;
  dirty?: boolean;
}

const initialState: State = {
  fillColor: '#FFFFE0',
  strokeWidth: 2,
  strokeColor: '#FA8072',
  opacity: 1
};

const editingAttributesReducer = (state = initialState, action: EditingAttributesActionTypes): State => {
  switch (action.type) {
    case 'SET_FILL_COLOR':
      return {
        ...state,
        fillColor: action.payload
      };
    case 'SET_STROKE_COLOR':
      return {
        ...state,
        strokeColor: action.payload
      };
    case 'SET_STROKE_WIDTH':
      return {
        ...state,
        strokeWidth: action.payload
      };
    case 'SET_OPACITY':
      return {
        ...state,
        opacity: action.payload
      };
    case 'SET_POSITION':
      return {
        ...state,
        positionX: action.payload.x || state.positionX,
        positionY: action.payload.y || state.positionY,
        dirty: false
      };
    case 'SET_DIRTY':
      return {
        ...state,
        dirty: action.payload
      };
    default:
      return state;
  }
};

export default editingAttributesReducer;