import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '@material-ui/core/Button'

import EditIcon from '@material-ui/icons/Edit'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import GetAppIcon from '@material-ui/icons/GetApp'
import CircularProgress from '@material-ui/core/CircularProgress'

import {
  creatSVGNode,
  getSVGBlob,
  getSVGUrl,
  blobToBase64,
  embedFont,
} from '../../utils/svg-handler'

import {
  readImage
} from '../../utils/image'

import './index.styl'

const FONT_DATA = {
  'font-jf-openhuninn': {
    name: 'font-jf-openhuninn',
    url: 'font/jf-openhuninn-11.woff',
  },
}

const Previewer = ({
  svgNode,
  imgUrl,
  svgProps,
  onClose,
  imgWidth,
  imgHeight,
  bannerHeight,
  scale,
  fontFamily,
}) => {

  const canvasRef = useRef(null)

  const [isConverting, setIsConverting] = useState(false)

  const convertImg = async () => {
    setIsConverting(true)

    const imgBlob = await fetch(imgUrl).then(rsp => rsp.blob())
    const base64 = await readImage(imgBlob)
    const font = fontFamily.file 
      ? await embedFont([FONT_DATA[fontFamily.file]])
      : []

    const svgEl = svgNode.cloneNode(true)
    const imgNode = svgEl.getElementById('svg-img')
    const defNode = svgEl.getElementById('svg-def')
    const svgns = 'http://www.w3.org/2000/svg'

    if (font.length > 0) {
      font.forEach( d => {
        const styleEl = document.createElement('style')
        styleEl.setAttribute('type', 'text/css')
        styleEl.innerHTML = d.fontStyle
        defNode.appendChild(styleEl)
      })
    }

    let canvasHeight = (svgProps.bottomBannerShow && svgProps.topBannerShow) 
     ? imgHeight + bannerHeight * 2 
     : (
        (svgProps.bottomBannerShow || svgProps.topBannerShow) 
        ? (imgHeight + bannerHeight) : imgHeight
      )

    imgNode.setAttribute('href', base64)

    const svgUrl = getSVGUrl(svgEl)
    const ctx = canvasRef.current.getContext('2d')
    const image = new Image()

    image.onload = () => {
      ctx.canvas.width = imgWidth
      ctx.canvas.height = canvasHeight

      ctx.drawImage(image, 0, 0,imgWidth, canvasHeight)
      setIsConverting(false)
    }

    image.src = svgUrl
  }

  const dowmloadImg = async (url, fileName, fileType) => {
    const event = new MouseEvent('click', {
      'view': window,
      'bubbles': true,
      'cancelable': true
    })
    const creatTime = new Date()
    const a = document.createElement('a')
    a.setAttribute('download', `${fileName}-${creatTime.getTime()}.${fileType}`)
    a.setAttribute('href', url)
    a.setAttribute('target', '_self')
    a.dispatchEvent(event)
  }

  const handleImgDownload = () => {
    canvasRef.current.toBlob( blob => {
      const url = URL.createObjectURL(blob);
      dowmloadImg(url, 'image', 'jpg');
    }, `image/jpg`, 1);    
  }

  const handleImgUpload = () => {
/*
  const canvas = document.querySelector('.check-section canvas');
  const imgURL = canvas.getAttribute('data-url');
  const base64String = await imgHandler.getBase64String(imgURL, width * settings.renderScale, height * settings.renderScale);

  const url = 'https://api.imgur.com/3/image'
  const headers = new Headers({
    'Authorization': `Client-ID 41e9570f0218f10`,
  })

  let formData = new FormData();

  formData.append('image', base64String.replace('data:image/png;base64,', ''));
  formData.append('title', `NiMaPaChi-rune-paper-${new Date().getTime()}`);  

  const requestOption = {
    headers: headers,
    body: formData,
    method: 'POST',
    mode: 'cors',
  }

  pageStartLoading('上傳圖片中 ...');

  try {
    const {
      data,
      status,
      success,
    } = await fetch(url, requestOption).then( rsp => rsp.json() );

    if(success){
      pageStopLoading();
      const {
        link,
      } = data;

      imgUrl = link;
      imgUrlElement.value = imgUrl;
      imgUrlCol.classList.remove('d-none');

    }else{
      showFetchError();
    }

  } catch(err) {
    showFetchError();
    console.log(err);
  }*/    
  }

  useEffect(() => {
    convertImg()
  }, [])

  return (
    <div 
      className={classNames('previewer', { 'previewer--converting': isConverting }) }
    >
      <div
        style={{
          transform: `scale(${scale}, ${scale})`
        }}
      >
        <canvas 
          ref={canvasRef} 
          width={imgWidth}
          height={(svgProps.bottomBannerShow && svgProps.topBannerShow) 
           ? imgHeight + bannerHeight * 2 
           : (
              (svgProps.bottomBannerShow || svgProps.topBannerShow) 
              ? (imgHeight + bannerHeight) : imgHeight
          )}
        />
      </div>
      <div className="previewer__actions">
        <div className="previewer__actions-wrap">
          <Button className="previewer__btn" onClick={onClose}>
            <div className="previewer__btn-wrap">
              <EditIcon/>
              繼續編輯
            </div>
          </Button>
          <Button className="previewer__btn" onClick={handleImgDownload}>
            <div className="previewer__btn-wrap">
              <GetAppIcon/>
              下載圖片
            </div>
          </Button>
          <Button className="previewer__btn" onClick={onClose}>
            <div className="previewer__btn-wrap">
              <CloudUploadIcon/>
              上傳imgur
            </div>
          </Button>
        </div>
      </div>
      {
        isConverting && <CircularProgress className="previewer__loader" />
      }
    </div>
  )
}

Previewer.propTypes = {}

export default Previewer