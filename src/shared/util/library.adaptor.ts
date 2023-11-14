import { PageElement } from '../redux/models/page.model';
import { fabric } from 'fabric';

/**
 *  Adaptor functions for fabricjs and custom-fabricjs-react-lib
 */

const availableTypes = ['rect', 'circle', 'triangle', 'path', 'text'];
/**
 * @description render a fabricjs object by its type with object options
 */
export function renderCanvasObjectByType(object: fabric.IObjectOptions) {
  switch (object.type) {
    case 'rect':
      return new fabric.Rect(object);
    case 'circle':
      return new fabric.Circle(object);
    case 'triangle':
      return new fabric.Triangle(object);
    case 'path':
      const pathObject = object as fabric.Path;
      return new fabric.Path(pathObject.path, pathObject);
    case 'text':
      const textObject = object as fabric.Text;
      return new fabric.Text(textObject.text || ' ', textObject);
    case 'triangle':
      return new fabric.Triangle(object);
    default:
      return new fabric.Object(object);
  }
}
/**
 * @description transform a list of fabricjs objects to a list of page elements
 */
export function toPageElementList(objects: fabric.Object[], oldPageElementList?: PageElement[]) {
  const pageElementList = [] as PageElement[];
  objects.forEach((element, idx) => {
    const defaultName = 'element-' + idx;
    const name = (oldPageElementList && oldPageElementList[idx]) ? oldPageElementList[idx].name : defaultName;
    try {
      pageElementList.push({
        code: idx + '',
        name: name,
        data: JSON.parse(JSON.stringify(element))
      })
    } catch (e) {
      console.error('[element transform error]:', e);
    }
  });
  return pageElementList;
}

/**
 * @description load a list of page elements to a fabricjs canvas
 */
export function loadCanvasElements(canvas: fabric.Canvas, pageElementList?: PageElement[]) {
  canvas?.clear();
  const canvasObjectList = [] as fabric.Object[];

  pageElementList && pageElementList.forEach(element => {

    if (element?.data?.type) {
      if (availableTypes.indexOf(element.data.type) == -1) {
        console.warn(`[page element loading error]: type ${element.data.type} not found`);
        return;
      }
      const fabricElement = element.data;
      try {
        canvasObjectList.push(renderCanvasObjectByType(fabricElement));
      } catch (e) {
        console.error('[page element loading error]:', e);
      }
    }
  }
  );
  canvas.add(...canvasObjectList);
}