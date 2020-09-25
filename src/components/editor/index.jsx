import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '@material-ui/core/Button'
import TextFieldsIcon from '@material-ui/icons/TextFields'

import useScreen from '../../hooks/use-screen'

import './index.styl'

import Selector from '../selector'
import IconLabel from '../icon-label'

import Text from './text'
import TextEditor from './text-editor'

const DEFAULT_TEXT_PROPS = {
  x: 256,
  y: 138,
  color: '#000',
  background: 'transparent',
  text: '',
  rotate: 0,
  size: 12,
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
  color: '#fff',
  background: '#000',
  size: 24,
  textAnchor: 'start',
  bBox: {
    x:0, 
    y:0, 
    width:0, 
    height:0,
  },
}

const LAYOUT_OPTIONS = [
  { label: 'mode-1', key: 'mode-1', val: 1, icon: 'mirror-no' },
  { label: 'mode-2', key: 'mode-2', val: 2, icon: 'mirror-horizontal' },
  { label: 'mode-3', key: 'mode-3', val: 3, icon: 'mirror-vertical' },
  { label: 'mode-4', key: 'mode-4', val: 4, icon: 'mirror-vertical' },
]

const DEFAULT_SVG_PROPS = {
  viewHeight: 276,
  imgTransY: 0,
  topBannerShow: false,
  bottomBannerShow: false,
  bottomBannerTransY: 0,  
}

const Banner = ({
  x,
  y,
  background,
}) => {
  return (
    <g
      transform={`translate(${x} ${y})`}
    >
      <rect 
        width="512px" 
        height="118px"
        fill={background}
      />
    </g>
  )
}

const Editor = props => {
  const dispatch = useDispatch()

  const svgImgRef = useRef(null)
  const screen = useScreen()

  const [pos, setPos] = useState({x: 0, y: 0, dx:0, dy: 0})
  const [isMouseDown, setIsMouseDown] = useState(false)

  const [textList, setTextList] = useState([])
  const [selectedText, setSelectedText] = useState(-1)

  const [topBannerProps, setTopBannerProps] = useState({...DEFAULT_BANNER_PROPS})
  const [bottomBannerProps, setBottomBannerProps] = useState({...DEFAULT_BANNER_PROPS})

  const [layout, setLayout] = useState(LAYOUT_OPTIONS[0])
  const [svgProps, setSvgProps] = useState({...DEFAULT_SVG_PROPS})

  const textPropsChange = (key, value) => {
    if (selectedText >= 0) setSelectedTextPros({[key]: value})    
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
      const newPos = {
        x: clientX - x,
        y: clientY - y,
        dx: isInitial ? 0 : clientX - x - pos.x,
        dy: isInitial ? 0 : clientY - y - pos.y,
      }
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

  const handleTextSelect = index => {
    setSelectedText(index)
  }

  const setSelectedTextPros = (pros) => {
    const newList = [...textList]
    newList[selectedText] = {
      ...newList[selectedText],
      ...pros,
    }
    setTextList(newList)
  }

  const moveText = () => {
    setSelectedTextPros({
      x: textList[selectedText].x + pos.dx,
      y: textList[selectedText].y + pos.dy,
    })
  }

  const addText = () => {
    const newList = [...textList]
    newList.push({
      ...DEFAULT_TEXT_PROPS,
      text: '',
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
        newSvgProps.viewHeight = 276 + 118
        newSvgProps.imgTransY = 118
        newSvgProps.topBannerShow = true
        break
      case 3:
        newSvgProps.viewHeight = 276 + 118
        newSvgProps.bottomBannerShow = true
        newSvgProps.bottomBannerTransY = 276
        break
      case 4:
        newSvgProps.viewHeight = 276 + 118 + 118
        newSvgProps.imgTransY = 118
        newSvgProps.topBannerShow = true
        newSvgProps.bottomBannerShow = true
        newSvgProps.bottomBannerTransY = 276 + 118
        break
    }
    setLayout(item)
    setSvgProps(newSvgProps)
  }

  useEffect(() => {
    if (selectedText >= 0) {
      moveText()
    }
  }, [pos])

  return (
    <div 
      className="editor"
      onTouchMove={handleMouseTouchMove}
      onMouseMove={handleMouseTouchMove}
    >
      <div className="editor__svg-wrapper">
        <svg
          viewBox={`0 0 512 ${svgProps.viewHeight}`}
          width="512px"
          height={`${svgProps.viewHeight}px`}
        >
          {
            svgProps.topBannerShow && (
              <Banner
                {...topBannerProps}
              />
            )
          }
          <g
            onTouchStart={ e => handleMouseTouchDown(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchEnd={handleMouseTouchUp}
            onMouseDown={e => handleMouseTouchDown(e.clientX, e.clientY)}
            onMouseUp={handleMouseTouchUp}
            transform={`translate(0 ${svgProps.imgTransY})`}
            ref={svgImgRef}
          >
            <image
              href="http://www.ghibli.jp/gallery/marnie013.jpg"
              width="512px"
              height="276px"
            />
            {
              textList.map( (d, i) => <Text 
                {...d} 
                key={i}
                index={i}
                isSelected={i === selectedText}
                selectHandler={handleTextSelect}
                handleBBoxChange={bBox => textPropsChange('bBox', bBox) }
              />)
            }
          </g>
          {
            svgProps.bottomBannerShow && (
              <Banner
                {...bottomBannerProps}
                y={svgProps.bottomBannerTransY}
              />
            )
          }
        </svg>
      </div>
      {
        selectedText > -1 && (
          <TextEditor
            textProps={textList[selectedText]}
            isTextSelected={ selectedText > -1}
            textPropsChange={textPropsChange}
            deleteText={deleteText}
          />
        )
      }
      <div className="editor__row">
        <Button onClick={addText}>
          <TextFieldsIcon />
        </Button>
        <Selector 
          className="painter__mirror-selector"
          options={LAYOUT_OPTIONS}
          onChange={handleLayoutChange}
          selectedLabel={(<IconLabel icon={layout.icon} label={layout.label} />)}
          itemRender={ item => (<IconLabel icon={item.icon} label={item.label} />) }
        />
      </div>
    </div>
  )
}

Editor.propTypes = {}

export default Editor