export type ObjectType = 'TEXT' | 'IMAGE'

export interface Position {
  x: number
  y: number
}

export interface ObjectBasicPayload {
  type: ObjectType
  moveable: boolean
  position: Position
  backgroundColor: string
  rotate: number
}

export interface TextPayload extends ObjectBasicPayload {
  type: 'TEXT'
  content: string
  fontSize: number
  fontColor: string
  textAnchor: string
}

export interface ImagePayload extends ObjectBasicPayload {
  type: 'IMAGE'
  imageName: string
  height: number
  width: number
}

export interface UpdatePayload {
  position?: Position
  content?: string
  fontColor?: string
  textAnchor?: string
  backgroundColor?: string
  imageName?: string
  height?: number
  width?: number
}

export type SVGObjectPayload = ImagePayload | TextPayload
