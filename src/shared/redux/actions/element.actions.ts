
import { EditElementActionPayload } from '../models/editElement.interfaces';
import { FabricJSEditorHook } from '../../custom-fabricjs-react-lib/editor';
import { PageElement } from '../models/page.model';

// ActionTypes for canvas actions
export const SAVE_ELEMENTS = 'SAVE_ELEMENTS';
export const INIT_EDITOR = 'INIT_EDITOR';
export const UPDATE_ELEMENT_NAME = 'UPDATE_ELEMENT_NAME';
export const EDIT_ELEMENT = 'EDIT_ELEMENT';
export const EDIT_ELEMENT_FINISH = 'EDIT_ELEMENT_FINISH';

// Action creators
interface initEditorAction {
  type: typeof INIT_EDITOR,
  payload: FabricJSEditorHook
}
interface saveElementsAction {
  type: typeof SAVE_ELEMENTS,
  payload: PageElement[],
}

interface updateElementNameAction {
  type: typeof UPDATE_ELEMENT_NAME,
  payload: { elementId: string, newName: string },
}

interface editElementAction {
  type: typeof EDIT_ELEMENT,
  payload: EditElementActionPayload
}

export const initEditor = (editorHook: FabricJSEditorHook): initEditorAction => {
  return {
    type: INIT_EDITOR,
    payload: editorHook
  }
}

export const saveElements = (elements: PageElement[]): saveElementsAction => {
  return {
    type: SAVE_ELEMENTS,
    payload: elements,
  }
}

export const updateElementName = (elementId: string, newName: string): updateElementNameAction => {
  return {
    type: UPDATE_ELEMENT_NAME,
    payload: { elementId, newName },
  }
}

export const editElement = (editorAction: EditElementActionPayload): editElementAction => {
  return {
    type: EDIT_ELEMENT,
    payload: editorAction
  }
}

export type CanvasActionTypes = initEditorAction
  | saveElementsAction
  | updateElementNameAction
  | editElementAction