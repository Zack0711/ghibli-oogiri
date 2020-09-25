import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '@material-ui/core/Button'
import Modal from '@material-ui/core/Modal'

import useScreen from '../../hooks/use-screen'

import './index.styl'

const Text = ({x, y, color, background, rotate, text}) => {

  const textRef = useRef(null)
  const [textBBox, setTextBBox] = useState({x:0, y:0, width:0, height:0})

  useEffect(() => {
    if(textRef.current) {
      setTextBBox(textRef.current.getBBox())
    }
  }, [text])

  return (
    <g
      transform={`translate(${x} ${y}) rotate(${rotate})`}
    >
      <g
        transform={`translate(${-textBBox.width/2} ${-textBBox.height/2})`}
        ref={textRef}
      >
        <text
          dominantBaseline="text-before-edge"
          textAnchor="start"
        >
          { text }
        </text>
      </g>
    </g>
  )
}

const DEFAULT_TEXT_PROPS = {
  x: 0,
  y: 0,
  color: '#000',
  background: 'transparent',
  text: 'Sample Text',
  rotate: 0,
}

const Editor = props => {
  const dispatch = useDispatch()

  const svgRef = useRef(null)
  const screen = useScreen()

  const [pos, setPos] = useState({x: 0, y: 0, dx:0, dy: 0})
  const [isMouseDown, setIsMouseDown] = useState(false)

  const [textList, setTextList] = useState([DEFAULT_TEXT_PROPS])
  const [selectedText, setSelectedText] = useState(0)

  const setRelativePosition = (clientX, clientY, isInitial = false) => {
    const {
      top, 
      left, 
      bottom, 
      right,
      x,
      y,
    } = svgRef.current.getBoundingClientRect()

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

  const setSelectedTextPos = (pos) => {
    const newList = [...textList]
    newList[selectedText] = {
      ...newList[selectedText],
      ...pos,
    }
    setTextList(newList)
  }

  const moveText = () => {
    setSelectedTextPos({
      x: textList[selectedText].x + pos.dx,
      y: textList[selectedText].y + pos.dy,
    })
  }

  useEffect(() => {
    moveText()
  }, [pos])

  return (
    <div 
      className="editor"
      onTouchMove={handleMouseTouchMove}
      onMouseMove={handleMouseTouchMove}
    >
      <div className="editor__svg-wrapper">
        <svg
          viewBox="0 0 512 512"
          width="512px"
          height="512px"
          ref={svgRef}
          onTouchStart={ e => handleMouseTouchDown(e.touches[0].clientX, e.touches[0].clientY)}
          onTouchEnd={handleMouseTouchUp}
          onMouseDown={e => handleMouseTouchDown(e.clientX, e.clientY)}
          onMouseUp={handleMouseTouchUp}
        >
          <g>
            <image
              href="http://www.ghibli.jp/gallery/marnie013.jpg"
              width="512px"
              height="276px"
            />
          </g>
          {
            textList.map( d => <Text {...d} />)
          }          
        </svg>
      </div>
    </div>
  )
}

Editor.propTypes = {}

export default Editor