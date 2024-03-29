import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './index.styl'

const Text = ({
  x, 
  y, 
  color, 
  background, 
  rotate, 
  text,
  size,
  fontFamily,
  strokeWidth,
  stroke,
  textAnchor,
  selectHandler,
  handleBBoxChange,
  isSelected, 
  index,
  scale
}) => {
  const textRef = useRef(null)
  const textRefEl = useRef(null)
  const [textBBox, setTextBBox] = useState({x:0, y:0, width:0, height:0})

  useEffect(() => {
    if(textRef.current) {
      setTextBBox(textRef.current.getBBox())
      handleBBoxChange(textRef.current.getBBox())
    }
  }, [text, size, textAnchor, scale])

  return (
    <g
      ref={textRefEl}
      transform={`translate(${x} ${y}) rotate(${rotate})`}
      onClick={(e) => {
        e.stopPropagation()
        selectHandler(index, textRefEl.current)
      }}
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
          fontSize={`${size*scale}px`}
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