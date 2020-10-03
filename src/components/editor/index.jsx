import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import LaunchIcon from '@material-ui/icons/Launch'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import Modal from '@material-ui/core/Modal'

import './index.styl'

import Selector from '../selector'
import IconLabel from '../icon-label'
import Previewer from '../previewer'
import Gallery from '../gallery'

import Text from './text'
import TextEditor from './text-editor'
import Banner from './banner'
import BannerEditor from './banner-editor'

import {
  creatSVGNode,
  getSVGBlob,
  getSVGUrl,
  blobToBase64,
} from '../../utils/svg-handler'

import {
  readImage,
} from '../../utils/image'

const FACTOR = 0.5
const IMG_WIDTH = 1920 * FACTOR
const IMG_HEIGHT = 1038 * FACTOR
const BANNER_HEIGHT = (IMG_WIDTH - IMG_HEIGHT) / 2

const DEFAULT_TEXT_PROPS = {
  x: IMG_WIDTH / 2,
  y: IMG_HEIGHT / 2,
  color: '#000',
  background: 'transparent',
  text: '',
  rotate: 0,
  size: 18,
  strokeWidth: 0,
  stroke: '#fff',
  textAnchor: 'start',
  bBox: {
    x:0, 
    y:0, 
    width:0, 
    height:0,
  },
}

const DEFAULT_BANNER_PROPS = {
  x: 0,
  y: 0,
  rx: 0,
  ry: 0,
  color: '#fff',
  background: '#000',
  size: 40,
  textAnchor: 'start',
  text: '',
  bBox: {
    x:0, 
    y:0, 
    width:0, 
    height:0,
  },
  imgWidth: IMG_WIDTH,
  bannerHeight: BANNER_HEIGHT,
}

const LAYOUT_OPTIONS = [
  { label: '版型-1', key: 'mode-1', val: 1, icon: 'layout-1' },
  { label: '版型-2', key: 'mode-2', val: 2, icon: 'layout-2' },
  { label: '版型-3', key: 'mode-3', val: 3, icon: 'layout-3' },
  { label: '版型-4', key: 'mode-4', val: 4, icon: 'layout-4' },
]

const DEFAULT_SVG_PROPS = {
  viewHeight: IMG_HEIGHT,
  imgTransY: 0,
  topBannerShow: false,
  bottomBannerShow: false,
  bottomBannerTransY: 0,  
}

const SCALE = {
  'xs': 0.5,
  'sm': 1,
  'md': 1.5,
  'lg': 1.5,
  'xl': 2,
}

const DEFAULT_FONT = `"Noto Sans", Roboto, Helvetica, Arial, sans-serif`
const FONT_OPTIONS = [
  { value: DEFAULT_FONT, file: null, label: '系統字體'}, 
  { value: `genYoGothicTW-m`, file: 'genYoGothicTW-m', label: '原樣黑體'},
  { value: `genYoGothicTW-b`, file: 'genYoGothicTW-b', label: '原樣黑體-粗'},
  { value: `font-jf-openhuninn`, file:'font-jf-openhuninn', label: '粉圓體'},
  { value: `font-soukou-mincho`, file:'font-soukou-mincho', label: '裝甲明朝'},
]

const BASE_URL = `http://www.ghibli.jp/gallery/`

const useStyles = makeStyles({
  btn: {
    color: 'white',
  },
  select: {
    color: 'white',
  },
  menuItem: {
    color: 'white',    
  }
})

const Editor = props => {
  const classes = useStyles()
  const isClient = typeof window === 'object'

  const svgRef = useRef(null)
  const svgImgRef = useRef(null)
  const scaleRef = useRef(1)

  const [imgUrl, setImgUrl] = useState('')
  const [previousTextProps, setPreviousTextProps] = useState({})

  const [pos, setPos] = useState({x: 0, y: 0, dx:0, dy: 0})
  const [isMouseDown, setIsMouseDown] = useState(false)

  const [textList, setTextList] = useState([])
  const [selectedText, setSelectedText] = useState(-1)
  const [selectedBanner, setSelectedBanner] = useState(null)

  const [topBannerProps, setTopBannerProps] = useState({...DEFAULT_BANNER_PROPS})
  const [bottomBannerProps, setBottomBannerProps] = useState({...DEFAULT_BANNER_PROPS})

  const [layout, setLayout] = useState(LAYOUT_OPTIONS[0])
  const [svgProps, setSvgProps] = useState({...DEFAULT_SVG_PROPS})

  const [scale, setScale] = useState(1)
  const [fontFamily, setFontFamily] = useState(FONT_OPTIONS[0])

  const [previewerModalOpen, setPreviewerModalOpen] = useState(false)
  const [galleryModalOpen, setGalleryModalOpen] = useState(true)

  const textPropsChange = (key, value) => {
    if (selectedText >= 0) setSelectedTextPros({[key]: value})    
  }

  const bannerPropsChange = (key, value) => {
    if (selectedBanner){
      if (selectedBanner === 'top') {
        setTopBannerProps({
          ...topBannerProps,
          [key]: value
        })
      } else {
        setBottomBannerProps({
          ...bottomBannerProps,
          [key]: value
        })        
      }
    }
  }

  const setRelativePosition = (clientX, clientY, isInitial = false) => {
    const {
      top, 
      left, 
      bottom, 
      right,
      x,
      y,
    } = svgImgRef.current.getBoundingClientRect()

    const inActiveRange = (clientX >= left && clientX <= right) && (clientY >= top && clientY <= bottom)

    if (inActiveRange) {
      const dx = isInitial ? 0 : clientX - x - pos.x
      const dy = isInitial ? 0 : clientY - y - pos.y

      const newPos = {
        x: clientX - x,
        y: clientY - y,
        dx,
        dy,
      }

      if (selectedText >= 0) moveText(dx, dy)
      setPos(newPos)
    }
  }

  const handleMouseTouchMove = (e) => {
    const {
      clientX,
      clientY
    } = ( e.clientX ? e : e.touches[0] )

    if (isMouseDown) {
      setRelativePosition(clientX, clientY)
    }
  }

  const handleMouseTouchDown = (x, y) => {
    setIsMouseDown(true)
    setRelativePosition(x, y, true)
  }

  const handleMouseTouchUp = () => {
    setIsMouseDown(false)
  }

  const handleTextSelect = (index, textEl) => {
    setSelectedText(index)
    unselectBanner()
  }

  const handleBannerSelect = pos => {
    setSelectedBanner(pos)
    unselectText()
  }

  const unselectText = () => {
    if (selectedText > -1) {
      const {
        color,
        background,
        size,
      } = textList[selectedText]

      setPreviousTextProps({ color, background, size })      
    }
    setSelectedText(-1)
  }

  const unselectBanner = () => {
    setSelectedBanner(null)
  }

  const setSelectedTextPros = (pros) => {
    const newList = [...textList]
    newList[selectedText] = {
      ...newList[selectedText],
      ...pros,
    }
    setTextList(newList)
  }

  const moveText = (dx, dy) => {
    setSelectedTextPros({
      x: textList[selectedText].x + dx,
      y: textList[selectedText].y + dy,
    })
  }

  const addText = () => {
    const newList = [...textList]
    newList.push({
      ...DEFAULT_TEXT_PROPS,
      ...previousTextProps,
      text: '',
      x: IMG_WIDTH * scale / 2,
      y: IMG_HEIGHT * scale / 2,
    })

    setTextList(newList)
    setSelectedText(newList.length - 1)
  }

  const deleteText = () => {
    if (selectedText >= 0) {
      let newList = [...textList]
      newList.splice(selectedText, 1)
      setTextList(newList)
      setSelectedText(-1)      
    }
  }

  const handleLayoutChange = item => {
    const newSvgProps = { ...DEFAULT_SVG_PROPS }
    switch(item.val) {
      case 2:
        newSvgProps.viewHeight = IMG_HEIGHT + BANNER_HEIGHT
        newSvgProps.imgTransY = BANNER_HEIGHT
        newSvgProps.topBannerShow = true
        break
      case 3:
        newSvgProps.viewHeight = IMG_HEIGHT + BANNER_HEIGHT
        newSvgProps.bottomBannerShow = true
        newSvgProps.bottomBannerTransY = IMG_HEIGHT
        break
      case 4:
        newSvgProps.viewHeight = IMG_HEIGHT + BANNER_HEIGHT*2
        newSvgProps.imgTransY = BANNER_HEIGHT
        newSvgProps.topBannerShow = true
        newSvgProps.bottomBannerShow = true
        newSvgProps.bottomBannerTransY = IMG_HEIGHT + BANNER_HEIGHT
        break
    }
    setLayout(item)
    setSvgProps(newSvgProps)
  }

  const selectImage = img => {
    setImgUrl(`${img}.jpg`)
    setGalleryModalOpen(false)
  }

  useEffect(() => {
    const newList = [...textList]
    newList.forEach(d => {
      const rx = d.x / (IMG_WIDTH * scaleRef.current)
      const ry = d.y / (IMG_HEIGHT * scaleRef.current)
      d.x = rx * IMG_WIDTH * scale
      d.y = ry * IMG_HEIGHT * scale
    })

    setTextList(newList)
    scaleRef.current = scale
  }, [scale])

  useEffect(() => {
    if (!isClient) return false
    const handleResize = () => {
      const width = isClient ? window.innerWidth : undefined
      const newScale = width / IMG_WIDTH
      setScale(newScale <= 1 ? newScale : 1)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div 
      className="editor"
      onTouchMove={handleMouseTouchMove}
      onMouseMove={handleMouseTouchMove}
      onClick={() => {
        unselectText()
        unselectBanner()
      }}
    >
      <div 
        className="editor__wrap"
        className={classNames(
          'editor__wrap',
          {
            'editor__wrap--text-edit-mode': selectedText > -1,
            'editor__wrap--banner-edit-mode': selectedBanner,
          }
        )}
      >
        <div className="editor__svg-wrap">
          <svg
            viewBox={`0 0 ${IMG_WIDTH * scale} ${svgProps.viewHeight * scale}`}
            width={`${IMG_WIDTH * scale}px`}
            height={`${svgProps.viewHeight * scale }px`}
            ref={svgRef}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs id="svg-def" />
            {
              svgProps.topBannerShow && (
                <Banner
                  {...topBannerProps}
                  pos="top"
                  scale={scale}
                  selectHandler={handleBannerSelect}
                  isSelected={selectedBanner === "top"}
                  fontFamily={fontFamily.value}
                  handleBBoxChange={bBox => bannerPropsChange('bBox', bBox) }
                />
              )
            }
            <g
              onTouchStart={ e => handleMouseTouchDown(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchEnd={handleMouseTouchUp}
              onMouseDown={e => handleMouseTouchDown(e.clientX, e.clientY)}
              onMouseUp={handleMouseTouchUp}
              transform={`translate(0 ${svgProps.imgTransY * scale})`}
              ref={svgImgRef}
            >
              <g
                transform={`scale(${scale} ${scale})`}
              >
                {
                  imgUrl && (
                    <image 
                      id="svg-img"
                      href={`${BASE_URL}${imgUrl}`}
                      width={IMG_WIDTH}
                      height={IMG_HEIGHT}
                    />
                  )
                }
              </g>
              {
                textList.map( (d, i) => <Text 
                  {...d} 
                  key={i}
                  index={i}
                  isSelected={i === selectedText}
                  selectHandler={handleTextSelect}
                  textPropsChange={textPropsChange}
                  handleBBoxChange={bBox => textPropsChange('bBox', bBox) }
                  scale={scale}
                  fontFamily={fontFamily.value}
                />)
              }
            </g>
            {
              svgProps.bottomBannerShow && (
                <Banner
                  {...bottomBannerProps}
                  pos="bottom"
                  y={svgProps.bottomBannerTransY*scale}
                  scale={scale}
                  selectHandler={handleBannerSelect}
                  isSelected={selectedBanner === "bottom"}
                  fontFamily={fontFamily.value}
                  handleBBoxChange={bBox => bannerPropsChange('bBox', bBox) }
                />
              )
            }
          </svg>
        </div>
        {
          selectedText > -1 && (
            <TextEditor
              textProps={textList[selectedText]}
              textPropsChange={textPropsChange}
              deleteText={deleteText}
              unselectText={unselectText}
            />
          )
        }
        {
          selectedBanner && (
            <BannerEditor
              bannerProps={ selectedBanner === 'top' ? topBannerProps : bottomBannerProps}
              bannerPropsChange={bannerPropsChange}
              unselectBanner={unselectBanner}
            />
          )
        }
        <div 
          className="editor__actions"
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div className="editor__row">
            <Button 
              onClick={() => setGalleryModalOpen(true)}
              classes={{
                root: classes.btn
              }}
            >
              <PhotoLibraryIcon />
            </Button>            
            <Selector 
              className="painter__mirror-selector"
              options={LAYOUT_OPTIONS}
              onChange={handleLayoutChange}
              selectedLabel={(<IconLabel icon={layout.icon}/>)}
              itemRender={ item => (<IconLabel icon={item.icon} label={item.label} />) }
              classes={{
                btn: classes.btn
              }}
            />
            <Button 
              onClick={addText}
              classes={{
                root: classes.btn
              }}
            >
              <TextFieldsIcon />
            </Button>
            字型:  
            <Select
              labelId="family-select"
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              classes={{
                root: classes.select
              }}
            >
              {
                FONT_OPTIONS.map(font => (
                  <MenuItem 
                    key={font.label} 
                    value={font}
                  >
                    <span style={{fontFamily: font.value}}>
                    {font.label}
                    </span>
                  </MenuItem>
                ))
              }
            </Select>
            <Button 
              onClick={() => setPreviewerModalOpen(true)}
              classes={{
                root: classes.btn
              }}
            >
              <LaunchIcon/>
            </Button>
            <Modal
              open={previewerModalOpen}
              onClose={() => setPreviewerModalOpen(false)}
            >
              <>
                <Previewer
                  svgNode={svgRef.current}
                  imgUrl={imgUrl}
                  fontFamily={fontFamily}
                  svgProps={svgProps}
                  onClose={() => setPreviewerModalOpen(false)}
                  imgWidth={IMG_WIDTH}
                  imgHeight={IMG_HEIGHT}
                  bannerHeight={BANNER_HEIGHT}
                  scale={scale}
                />
              </>
            </Modal>
          </div>
        </div>
      </div>
      <Modal
        open={galleryModalOpen}
        onClose={() => setGalleryModalOpen(false)}
        keepMounted={true}
      >
        <>
          <Gallery
            selectImage={selectImage}
            tabIndex={-1}
          />
        </>
      </Modal>
    </div>
  )
}

Editor.propTypes = {}

export default Editor