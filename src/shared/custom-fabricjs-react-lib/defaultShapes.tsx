export const STROKE = '#FA8072'
export const FILL = '#FFFFE0'
export const OPACITY = 1

export const CIRCLE = {
  radius: 20,
  left: 100,
  top: 100,
  fill: FILL,
  stroke: STROKE
}
export const ELLIPSE = {
  angle: 50,
  left: 100,
  top: 100,
  width:50,
  fill: FILL,
  stroke: STROKE
}

export const RECTANGLE = {
  left: 100,
  top: 100,
  fill: FILL,
  stroke: STROKE,
  width: 100,
  height: 40,
  angle: 0
}

export const LINE = {
  points: [50, 100, 200, 200],
  options: {
    left: 170,
    top: 150,
    stroke: STROKE
  }
}

export const TEXT = {
  type: 'text',
  left: 100,
  top: 100,
  fontSize: 16,
  width:210,
  fontFamily: 'Arial',
  fill: STROKE
}
