export const SET_FILL_COLOR = 'SET_FILL_COLOR';
export const SET_STROKE_COLOR = 'SET_STROKE_COLOR';
export const SET_STROKE_WIDTH = 'SET_STROKE_WIDTH';
export const SET_OPACITY = 'SET_OPACITY';
export const SET_POSITION = 'SET_POSITION';
export const SET_DIRTY = 'SET_DIRTY';

interface SetFillColorAction {
  type: typeof SET_FILL_COLOR;
  payload: string;
}

interface SetStrokeColorAction {
  type: typeof SET_STROKE_COLOR;
  payload: string;
}

interface SetStrokeWidthAction {
  type: typeof SET_STROKE_WIDTH;
  payload: number;
}

interface SetOpacityAction {
  type: typeof SET_OPACITY;
  payload: number;
}

interface SetPositionAction {
  type: typeof SET_POSITION;
  payload: { x: number | undefined, y: number | undefined };
}

interface SetDirtyAction {
  type: typeof SET_DIRTY;
  payload: boolean;
}

export const setFillColor = (color: string): SetFillColorAction => ({
  type: SET_FILL_COLOR,
  payload: color
});

export const setStrokeColor = (color: string): SetStrokeColorAction => ({
  type: SET_STROKE_COLOR,
  payload: color
});

export const setStrokeWidth = (width: number): SetStrokeWidthAction => ({
  type: SET_STROKE_WIDTH,
  payload: width
});

export const setOpacity = (opacity: number): SetOpacityAction => ({
  type: SET_OPACITY,
  payload: opacity
});

export const setPosition = (x: number | undefined, y: number | undefined): SetPositionAction => ({
  type: SET_POSITION,
  payload: { x, y }
});

export const setAttributesDirty = (dirty: boolean): SetDirtyAction => ({
  type: SET_DIRTY,
  payload: dirty
});


export type EditingAttributesActionTypes = SetFillColorAction
  | SetStrokeColorAction
  | SetStrokeWidthAction
  | SetOpacityAction
  | SetPositionAction
  | SetDirtyAction;