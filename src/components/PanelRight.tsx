import { EditElementActionPayload } from '../shared/redux/models/editElement.interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { FormEvent, useState } from 'react';
import styles from '../styles/editor.module.scss';
import { editElement } from '../shared/redux/actions/element.actions';
import { setAttributesDirty, setFillColor, setOpacity, setPosition, setStrokeColor } from '../shared/redux/actions/editingAttributes.actions';
import { RootState } from '../shared/redux/store';
import {fabric} from 'fabric';

enum EditorMode {
  EDIT = 'edit',
  DRAW = 'draw',
  SIZE = 'size'
}

export default function PanelRight() {

  const dispatch = useDispatch();
  const [ mode, setMode ] = useState(EditorMode.EDIT);
  const { positionX, positionY, fillColor, strokeColor, opacity } = useSelector((state: RootState) => state.editingAttributes);
  const [valueX, setValueX] = useState('');
  const [valueY, setValueY] = useState('');


  const handleElementsEdit = (payload: EditElementActionPayload) => {
    dispatch(editElement(payload));
  }

  const handleFillColorChange = (newFillColor: string) => {
    dispatch(setFillColor(newFillColor));
  }

  const handleStrokeColorChange = (newStrokeColor: string) => {
    dispatch(setStrokeColor(newStrokeColor));
  }

  const handleOpacityChange = (newOpacity: number) => {
    dispatch(setOpacity(newOpacity));
  }

  const handleValueXChange = (e:FormEvent<HTMLInputElement>) => {
    setValueX((e.target as HTMLInputElement).value);
  }

  const handleValueYChange = (e:FormEvent<HTMLInputElement>) => {
    setValueY((e.target as HTMLInputElement).value);
  }

  const handlePositionChange = (newPositionX?: number, newPositionY?: number) => {
    dispatch(setPosition(newPositionX, newPositionY));
    dispatch(setAttributesDirty(true));
    setValueX('');
    setValueY('');
  }


  const onAddCircle = () => {
    handleElementsEdit({
      editorAction: 'ADD_CIRCLE',
      editorParameters: { radius: 20 }
    })
  }
  const onAddSomething = () => {
    handleElementsEdit({
      editorAction: 'ADD_SOME',
      editorParameters: { radius: 20,height:50 }
    })
  }
  const onAddRectangle = () => {
    handleElementsEdit({
      editorAction: 'ADD_RECTANGLE',
      editorParameters: { width: 20, height: 20 }
    })
  }
  const addText = () => {
    handleElementsEdit({
      editorAction: 'ADD_TEXT',
      editorParameters: { text: "inset text" }
    })
  }
  const toggleDraw = () => {
    if(mode === EditorMode.DRAW){
      setMode(EditorMode.EDIT);
    } else{
      setMode(EditorMode.DRAW);
    }
    
    handleElementsEdit({
      editorAction: 'TOGGLE_DRAW',
      editorParameters: {isDrawingMode: mode === EditorMode.DRAW}
    })
  }

  const toggleSize = () => {
    if(mode === EditorMode.SIZE){
      setMode(EditorMode.EDIT);
    } else{
      setMode(EditorMode.SIZE);
    }

    handleElementsEdit({
      editorAction: 'TOGGLE_SIZE',
      editorParameters: {isSizeMode: mode === EditorMode.SIZE}
    })
  }

  const deletElement = () => {
    handleElementsEdit({
      editorAction: 'DELETE_ELEMENT'
    })
  }

  const clear = () => {
    handleElementsEdit({
      editorAction: 'CLEAR_CANVAS',
    })
  }

  return (
    <section className={styles.panelRight}>
      
      <div className={styles.panelHead}>
      </div>
      <canvas id="canvas" width="300" height="300"></canvas>
      <div className={styles.panelBody}>
          <div className={styles.panelBodyInput}>
            <div className={styles.panelBodyInputTitle}>
              Fill Color
            </div>
            <div className={styles.panelBodyInputContent}>
              <input type="color" value={fillColor} onChange={
                (e) => handleFillColorChange(e.target.value)
              }></input>
            </div>
          </div>
          <div className={styles.panelBodyInput}>
            <div className={styles.panelBodyInputTitle}>
              Stroke Color
            </div>
            <div className={styles.panelBodyInputContent}>
              <input type="color" value={strokeColor} onChange={
                (e) => handleStrokeColorChange(e.target.value)
              }></input>
            </div>
          </div>
          <div className={styles.panelBodyInputFlexColumn}>
            <div className={styles.panelBodyInputTitle}>
              Position
            </div>
            <div className={styles.panelBodyInputFormGroupRow}>
              <div className={styles.panelBodyInputTitle}>
                X
              </div>
              <div className={styles.panelBodyInputContent}>
                <input type="number" onBlur={
                  (e) => handlePositionChange(+e.target.value, undefined )}
                  placeholder={positionX ? positionX.toString() : ''}
                  onChange={handleValueXChange}
                  value = {valueX}
                ></input>
              </div>
              <div className="spacer"></div>
              <div className={styles.panelBodyInputTitle}>
                Y
              </div>
              <div className={styles.panelBodyInputContent}>
                <input type="number" onBlur={
                  (e) => handlePositionChange( undefined , +e.target.value)}
                  placeholder={positionY ? positionY.toString() : ''}
                  onChange={handleValueYChange}
                  value = {valueY}
                ></input>
              </div>
            </div>

          </div>
          <div className={styles.panelBodyInputFlexColumn}>
            <div className={styles.panelBodyInputTitle}>
              Opacity
            </div>
            <div className={styles.panelBodyInputContent}>
              <input type="number" min="0" max="1" step="0.1" value={opacity} onChange={
                (e) => handleOpacityChange(parseFloat(e.target.value))
              }></input>
              <input type="range" min="0" max="1" step="0.1" value={opacity} onChange={
                (e) => handleOpacityChange(parseFloat(e.target.value))
              }></input>
            </div>
          </div>
          <button onClick={onAddCircle}>Add circle</button>

          <button onClick={onAddRectangle}>
            Add Rectangle
          </button>
          <button onClick={onAddSomething}>
            Add Image
          </button>
          <button onClick={addText}>
            Add Text
          </button>
          <button onClick={toggleDraw}>
            Brush Tool
          </button>
          <button onClick={toggleSize}>
            Change Brush Size
          </button>
          <button onClick={deletElement}>
            Delete Element(s)
          </button>
          <button onClick={clear}>
            Clear Canvas
          </button>
      </div>
    </section>
  )
}
