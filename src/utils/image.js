import {
  deltaE,
  rgb2lab,
  hex2rgb,
  colorsPalette,
} from './color'

import { genArray } from './tools'

export const readImage = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    resolve(e.target.result)
  }
  reader.readAsDataURL(file)
})

export const loadImage = file => new Promise(async (resolve, reject) => {
  const base64String = await readImage(file)
  const img = new Image()
  img.onload = () => resolve(img)
  img.src = base64String
})
