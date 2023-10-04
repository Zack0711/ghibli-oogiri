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
}

export interface TextPayload extends ObjectBasicPayload {
  type: 'TEXT'
  content: string
  fontSize: number
}

export interface ImagePayload extends ObjectBasicPayload {
  type: 'IMAGE'
  imageName: string
}

export interface UpdatePayload {
  position?: Position
  content?: string
  backgroundColor?: string
  imageName?: string
}

export type SVGObjectPayload = ImagePayload | TextPayload