/**
* edit element action payloads
*/
export interface CircleActionPayload {
  editorAction: 'ADD_CIRCLE';
  editorParameters: { radius: number };
}
export interface SomeActionPayload {
  editorAction: 'ADD_SOME';
  editorParameters: { radius: number ,height:number};
}
export interface RectangleActionPayload {
  editorAction: 'ADD_RECTANGLE';
  editorParameters: { width: number, height: number };
}

export interface TextActionPayload {
  editorAction: 'ADD_TEXT';
  editorParameters: { text: string };
}

export interface ChangeColorActionPayload {
  editorAction: 'CHANGE_COLOR';
  elementId: string;
  editorParameters: { color: string };
}

export interface ChangeOpacityActionPayload {
  editorAction: 'CHANGE_OPACITY';
  elementId: string;
  editorParameters: { opacity: number };
}

export interface ToggleDrawActionPayload {
  editorAction: 'TOGGLE_DRAW';
  editorParameters: { isDrawingMode: boolean };
}

export interface ToggleSizeActionPayload {
  editorAction: 'TOGGLE_SIZE';
  editorParameters: { isSizeMode: boolean };
}

export interface DeleteElementActionPayload {
  editorAction: 'DELETE_ELEMENT';
}

export interface UndoActionPayload {
  editorAction: 'UNDO';
}

export interface ClearCanvasActionPayload {
  editorAction: 'CLEAR_CANVAS';
}

export type EditElementActionPayload = CircleActionPayload
  | RectangleActionPayload
  | TextActionPayload
  | ChangeColorActionPayload
  | ChangeOpacityActionPayload
  | ToggleDrawActionPayload
  | ToggleSizeActionPayload
  | DeleteElementActionPayload
  | UndoActionPayload
  | ClearCanvasActionPayload|SomeActionPayload