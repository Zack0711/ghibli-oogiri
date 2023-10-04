export interface Position {
  x: number
  y: number
}

export interface TextPayload {
  position: Position
  content: string
}

export interface TextUpdatePayload {
  position?: Position
  content?: string
}