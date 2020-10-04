import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGesture } from 'react-use-gesture'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './index.styl'

const Text = ({
  x, 
  y, 
  color, 
  background,
  zoom,
  rotate,
  text,
  size,
  fontFamily,
  strokeWidth,
  stroke,
  textAnchor,
  onSelect,
  isSelected, 
  index,
  scale,
  imgWidth,
  imgHeight,
  onChange,
}) => {
  const textRef = useRef(null)
  const scaleRef = useRef(null)

  const [textBBox, setTextBBox] = useState({x:0, y:0, width:0, height:0})
  const [textState, setTextState] = useState({
    rotate: 0,
    zoom: 1,
    x: 0,
    y: 0,
  })

  const getX = () => imgWidth * scale / 2 + x
  const getY = () => imgHeight * scale / 2 + y

  const handleOnPinch = ({ offset: [d, a] }) => {
    const rotate = a >= 0 ? a : 360 + a
    //setTextState({ ...textState, zoom: d / 200, rotate: a })
    onChange({ zoom: d / 200, rotate })
  }

  const bind = useGesture(
    {
      onDragStart: () => {
        onSelect(index)
      },
      onDrag: ({ movement: [x, y] }) => {
        isSelected && onChange({ x, y })
      },
      onDragEnd: () => {
      },
      onPinch: handleOnPinch,
    },{
      drag: { 
        initial: () => [ x, y],
        bounds: { 
          left: - imgWidth * scale / 2, 
          right: imgWidth * scale / 2, 
          top: - imgHeight * scale / 2, 
          bottom: imgHeight * scale / 2,
        },
      },
      pinch: {
        distanceBounds: {
          max: 1200,
          min: 120,
        }
      }
    }
  )

  useEffect(() => {
    if(textRef.current) {
      setTextBBox(textRef.current.getBBox())
    }
  }, [text, textAnchor, scale])

  useEffect(() => {
    if (scaleRef.current) {
      setTextState({ 
        ...textState, 
        x: textState.x / scaleRef.current * scale, 
        y: textState.y / scaleRef.current * scale,
      })      
    }
    scaleRef.current = scale
  }, [scale])

  return (
    <g
      { ...bind() }
      transform={`translate(${getX()} ${getY()}) rotate(${rotate}) scale(${zoom * scale})`}
    >
      <g
        transform={`translate(${-textBBox.width/2 - (textBBox.x)} ${-textBBox.height/2})`}
      >
        <rect 
          width={textBBox.width} 
          height={textBBox.height}
          fill={background}
          x={textBBox.x}
        />
        <g
          ref={textRef}
          fontSize={`${40}px`}
          fontFamily={fontFamily}
        >
          {
            text.split(/[\n\r|\n|\r\n]/).map( (d, i) => (
              <text
                dominantBaseline="text-before-edge"
                textAnchor={textAnchor}
                strokeWidth={strokeWidth}
                stroke={stroke}
                fill={color}
                key={i}
                x={0}
                y={ i * size * scale * 1.2}
              >
                { d }
              </text>
            ))
          }
        </g>
        <rect 
          width={textBBox.width} 
          height={textBBox.height}
          fill="transparent"
          stroke={ isSelected ? 'white' : 'transparent' }
          x={textBBox.x}
        />
      </g>
    </g>
  )
}

Text.propTypes = {}

export default Text