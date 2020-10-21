import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import CloseIcon from '@material-ui/icons/Close'

import { IconFont } from '../icons'

import {
  loadImage,
} from '../../utils/image'

import './index.styl'

const WIDTH = 16
const HEIGHT = 9

const ImageImporter = ({onClose}) => {

  const inputElRef = useRef(null)
  const imageElRef = useRef(null)
  const cropperRef = useRef(null)

  const [imgObj, setImgObj] = useState(null)

  const handleImgSelect = async (e) => {
    const img = await loadImage(inputElRef.current.files[0])
    setImgObj(img)
  }

  const converImg = async (e) => {
    const img = imgObj ? cropperRef.current.getCroppedCanvas() : null
    onClose()
  }

  const setImgCropper = () => {
    if (cropperRef.current) {
      cropperRef.current.destroy()
      cropperRef.current = null
    }

    cropperRef.current = new Cropper(imageElRef.current, {
      aspectRatio: WIDTH / HEIGHT,
      viewMode: 1,
    })    
  }

  useEffect(() => {
    if(imgObj){
      setImgCropper()
    }
  },[imgObj])

  return (
    <div className="image-importer">
      <div className="image-importer__header">
        匯入圖片進行裁切
        <IconButton 
          className="image-importer__close-btn"
          onClick={() => onClose()}
        >
          <CloseIcon />
        </IconButton>
      </div>
      <div className="image-importer__preview">
        <img className="image-importer__input-img" ref={imageElRef} src={imgObj && imgObj.src} />
      </div>
      <div className="image-importer__tool">
        <label className="image-importer__select-wrap">
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            className="image-importer__select-input"
            ref={inputElRef}
            onChange={handleImgSelect}
          />
          <IconFont style="folder" /> 匯入
        </label>
        <Button onClick={converImg}>
          <IconFont style="crop" /> 裁切
        </Button>
      </div>
    </div>
  )
}

ImageImporter.propTypes = {}

export default ImageImporter