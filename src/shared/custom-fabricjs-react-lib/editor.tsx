import { fabric } from 'fabric'
import { CIRCLE, RECTANGLE, LINE, TEXT, FILL, STROKE, OPACITY } from './defaultShapes'
import { useEffect, useState } from 'react'

export interface FabricJSEditor {
  canvas: fabric.Canvas
  addCircle: () => void
  addRectangle: () => void
  addLine: () => void
  addText: (text: string) => void
  updateText: (text: string) => void
  deleteAll: () => void
  deleteSelected: () => void
  fillColor: string
  strokeColor: string,
  addSome:()=>void,
  opacity: number,
  setFillColor: (color: string) => void
  setStrokeColor: (color: string) => void
  setOpacity: (opacity: number) => void
  zoomIn: () => void
  zoomOut: () => void
}

/**
 * Creates editor
 */
const buildEditor = (
  canvas: fabric.Canvas,
  fillColor: string,
  strokeColor: string,
  opacity: number,
  _setFillColor: (color: string) => void,
  _setStrokeColor: (color: string) => void,
  _setOpacity: (opacity: number) => void,
  scaleStep: number
): FabricJSEditor => {
  return {
    canvas,
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE,
        fill: fillColor,
        stroke: strokeColor,
        opacity: opacity
      })
      canvas.add(object)
    },
    addSome:()=>{
      var image=document.createElement("img")
      image.src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/OrangeBloss_wb.jpg/220px-OrangeBloss_wb.jpg"
      const object = new fabric.Image(image,{height:500,width:500})
      canvas.add(object)
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE,
        fill: fillColor,
        stroke: strokeColor,
        opacity: opacity
      })
      canvas.add(object)
    },
    addLine: () => {
      const object = new fabric.Line(LINE.points, {
        ...LINE.options,
        stroke: strokeColor,
      })
      canvas.add(object)
    },
    addText: (text: string) => {
      // use stroke in text fill, fill default is most of the time transparent
      const object = new fabric.Textbox(text, { ...TEXT, fill: strokeColor,opacity: opacity })
      object.set({ text: text })
      canvas.add(object)
    },
    updateText: (text: string) => {
      const objects: any[] = canvas.getActiveObjects()
      if (objects.length && objects[0].type === TEXT.type) {
        const textObject: fabric.Textbox = objects[0]
        textObject.set({ text })
        canvas.renderAll()
      }
    },
    deleteAll: () => {
      canvas.getObjects().forEach((object) => canvas.remove(object))
      canvas.discardActiveObject()
      canvas.renderAll()
    },
    deleteSelected: () => {
      canvas.getActiveObjects().forEach((object) => canvas.remove(object))
      canvas.discardActiveObject()
      canvas.renderAll()
    },
    fillColor,
    strokeColor,
    opacity,
    setFillColor: (fill: string) => {
      _setFillColor(fill)
      canvas.getActiveObjects().forEach((object) => object.set({ fill }))
      canvas.renderAll()
    },
    setStrokeColor: (stroke: string) => {
      _setStrokeColor(stroke)
      canvas.getActiveObjects().forEach((object) => {
        if (object.type === TEXT.type) {
          // use stroke in text fill
          object.set({ fill: stroke })
          return
        }
        object.set({ stroke })
      })
      canvas.renderAll()
    },
    setOpacity: (opacity: number) => {
      _setOpacity(opacity)
      canvas.getActiveObjects().forEach((object) => object.set({ opacity }))
      canvas.renderAll()
    },
    zoomIn: () => {
      const zoom = canvas.getZoom()
      canvas.setZoom(zoom / scaleStep)
    },
    zoomOut: () => {
      const zoom = canvas.getZoom()
      canvas.setZoom(zoom * scaleStep)
    }
  }
}

interface FabricJSEditorState {
  editor?: FabricJSEditor
}

interface FabricJSEditorHook extends FabricJSEditorState {
  selectedObjects?: fabric.Object[]
  onReady: (canvas: fabric.Canvas) => void
}

interface FabricJSEditorHookProps {
  defaultFillColor?: string
  defaultStrokeColor?: string
  defaultOpacity?: number
  scaleStep?: number
}

const useFabricJSEditor = (
  props: FabricJSEditorHookProps = {}
): FabricJSEditorHook => {
  const scaleStep = props.scaleStep || 0.5
  const { defaultFillColor, defaultStrokeColor, defaultOpacity } = props
  const [canvas, setCanvas] = useState<null | fabric.Canvas>(null)
  const [fillColor, setFillColor] = useState<string>(defaultFillColor || FILL)
  const [strokeColor, setStrokeColor] = useState<string>(
    defaultStrokeColor || STROKE
  )
  const [opacity, setOpacity] = useState<number>(
    defaultOpacity || OPACITY
  )
  const [selectedObjects, setSelectedObject] = useState<fabric.Object[]>([])
  useEffect(() => {
    const bindEvents = (canvas: fabric.Canvas) => {
      canvas.on('selection:cleared', () => {
        setSelectedObject([])
      })
      canvas.on('selection:created', (e: any) => {
        setSelectedObject(e.selected)
      })
      canvas.on('selection:updated', (e: any) => {
        setSelectedObject(e.selected)
      })
    }
    if (canvas) {
      bindEvents(canvas)
    }
  }, [canvas])

  return {
    selectedObjects,
    onReady: (canvasReady: fabric.Canvas): void => {
      console.log('Fabric canvas ready')
      setCanvas(canvasReady)
    },
    editor: canvas
      ? buildEditor(
          canvas,
          fillColor,
          strokeColor,
          opacity,
          setFillColor,
          setStrokeColor,
          setOpacity,
          scaleStep
        )
      : undefined
  }
}

export { buildEditor, useFabricJSEditor }
export type { FabricJSEditorHook }
