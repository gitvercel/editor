
import {fabric} from 'fabric';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFabricJSEditor, FabricJSEditor, FabricJSCanvas } from '../shared/custom-fabricjs-react-lib';
import { loadCanvasElements, toPageElementList } from '../shared/util/library.adaptor';
import styles from '../styles//editor.module.scss';
import { RootState } from '../shared/redux/store';
import { setPosition } from '../shared/redux/actions/editingAttributes.actions';
import { selectPageEnd } from '../shared/redux/actions/page.actions';
import { saveElements } from '../shared/redux/actions/element.actions';


export default function EditorArea() {

  const dispatch = useDispatch();
  const history: fabric.Object[] = [];
  const [size,setSize]=useState({height:500,width:500})
  const { editor, onReady } = useFabricJSEditor();
  const { nextPageId, pages, isPageLoading} = useSelector((state: RootState) => state.page);
  const selectedPage = useSelector((state: RootState) => state.selectedPage.page);
  const selectedElement = useSelector((state: RootState) => state.selectedPage.selectedElement);
  const { positionX, positionY, fillColor, strokeColor, strokeWidth, opacity, dirty } = useSelector((state: RootState) => state.editingAttributes);

  useEffect(() => {
    if (editor?.canvas) {
      editor.canvas.setHeight(500);
      editor.canvas.setWidth(600);
      editor.canvas.renderAll();

      const selectedPositionHandler = (event: fabric.IEvent) => {
        if(event.selected && event.selected?.length >= 1){
          const selectedElement = event.selected[0];
          selectedElement.set({objectCaching: false})
       dispatch(setPosition(selectedElement.left, selectedElement.top));
        }else{
          dispatch(setPosition(undefined, undefined));
        }
      }
      const disselectHandler = () => {
        if(positionX || positionY){
        dispatch(setPosition(undefined, undefined));
        }
      };
      editor.canvas.off('selection:created', );
      editor.canvas.on('selection:created', selectedPositionHandler);
      editor.canvas.off('selection:updated', );
      editor.canvas.on('selection:updated', selectedPositionHandler);
      editor.canvas.off('selection:cleared', )
      editor.canvas.on('selection:cleared', disselectHandler);
    }
  }, [editor?.canvas]);

  useEffect(() => {
    if (editor?.canvas._activeObject) {
      const activeObjectPositionHandler = (e: fabric.IEvent) => {
        if(e.pointer){
          dispatch(setPosition(+e.pointer.x.toFixed(0), +e.pointer.y.toFixed(0)));
        }
      }
      editor.canvas._activeObject.on('moving', activeObjectPositionHandler);
      editor.canvas.off('mouseup', );
    }
  }, [editor?.canvas._activeObject]);

  useEffect(() => {
      // TODO: add handleThumbnailSave() when there's sufficient storage;
      handleElementsSave();
  }, [editor?.canvas._objects.length, selectedElement]);

  useEffect(() => {
    editor && (editor.canvas._objects.length = 0);
    editor?.canvas && loadCanvasElements(editor.canvas, selectedPage?.elements);
    editor?.canvas.renderAll();
  }, [selectedPage?.id]);

  useEffect(() => {
    if(nextPageId){
      const nextPage = pages.find((page: { id: any; }) => page.id === nextPageId)
      const currentPage = selectedPage ? selectedPage : null;
      nextPage && dispatch(selectPageEnd(currentPage, nextPage));
    }
  }, [isPageLoading]);

  useEffect(() => {
    if (editor?.canvas && dirty) {
      const activeObject = editor.canvas.getActiveObject();
      if(!activeObject){return;}
      activeObject.set({ left: positionX || activeObject.left, top: positionY || activeObject.top });
      activeObject.setCoords(); 
      editor.canvas.renderAll();
    }
  }, [positionX, positionY]);

  useEffect(() => {
    editor && (editor.canvas.freeDrawingBrush.color = fillColor);
    editor && editor.setFillColor(fillColor);
  }, [fillColor]);

  useEffect(() => {
    editor && editor.setStrokeColor(strokeColor);
  }, [strokeColor]);

  useEffect(() => {
    editor && (editor.canvas.freeDrawingBrush.width = strokeWidth);
  }, [strokeWidth]);

  useEffect(() => {
    editor && editor.setOpacity(opacity);
  }, [opacity]);


  // editing actions offered by fabricjs
  const addCircle = (editor?: FabricJSEditor) => {
    debugger
    editor && editor.addCircle();
  };
  const addRectangle = (editor?: FabricJSEditor) => {
    editor && editor.addRectangle();
  };
  const addEllipse = (editor?: FabricJSEditor) => {
    editor && editor.addSome();
  };
  const addText = (editor?: FabricJSEditor) => {
    editor && editor.addText("inset text");
  };
  const toggleDraw = (editor?: FabricJSEditor) => {
    editor && (editor.canvas.isDrawingMode = !editor.canvas.isDrawingMode);
  };
  const toggleSize = () => {
    if (!editor || !fabric) {
      return;
    }
    editor.canvas.freeDrawingBrush.width === 12
      ? (editor.canvas.freeDrawingBrush.width = 5)
      : (editor.canvas.freeDrawingBrush.width = 12);
  };
  const deletElement = (editor?: FabricJSEditor) => {
    const activeObject = editor?.canvas.getActiveObject();
    activeObject && editor?.canvas.remove(activeObject);
  };
  const clear = (editor?: FabricJSEditor) => {
    if (!editor || !editor.canvas) {
      return;
    }
    editor.canvas._objects.splice(0, editor.canvas._objects.length);
    history.splice(0, history.length);
    editor.canvas.renderAll();
  };

  const handleElementsSave = () => {
    if (editor?.canvas?._objects) {
      dispatch(saveElements(toPageElementList(editor.canvas._objects, selectedPage?.elements)));
    }
  };
  useEffect(() => {
    if (selectedElement?.editorAction) {
      debugger
      switch (selectedElement.editorAction) {
        case 'ADD_SOME':
          editor?.addSome();
        case 'ADD_CIRCLE':
          addCircle(editor);
          break;
        case 'ADD_RECTANGLE':
          addRectangle(editor);
          break;
        case 'ADD_TEXT':
          addText(editor);
          break;
        case 'TOGGLE_DRAW':
          toggleDraw(editor);
          break;
        case 'TOGGLE_SIZE':
          toggleSize();
          break;
        case 'DELETE_ELEMENT':
          deletElement(editor);
          break;
        case 'CLEAR_CANVAS':
          clear(editor);
          break;
        default:
          break;
      }
    }
  }, [selectedElement]);
  const changeSize=()=>{
    editor?.canvas.setHeight(100);
    editor?.canvas.setWidth(100);
  }

  return (
    <section className={styles.center}>
      <div className={styles.panelBody}>
        <button onClick={changeSize}>change size</button>
        <div  className={styles.editingArea}>
            <FabricJSCanvas  width={size.width}height={size.height}  className="sample-canvas" onReady={onReady} />
        </div>
      </div>
    </section>
  )
}
