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
  backgroundColor?: string
  imageName?: string
  height?: number
  width?: number
}

export type SVGObjectPayload = ImagePayload | TextPayload
