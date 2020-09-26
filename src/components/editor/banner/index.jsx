import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './index.styl'

const Banner = ({
  x,
  y,
  color,
  text,
  textAnchor,
  size,
  fontFamily,
  background,
  scale,
  imgWidth,
  bannerHeight,
  pos,
  selectHandler,
  handleBBoxChange,
  isSelected,
}) => {
  const textRef = useRef(null)
  const [textBBox, setTextBBox] = useState({x:0, y:0, width:0, height:0})

  useEffect(() => {
    if(textRef.current) {
      setTextBBox(textRef.current.getBBox())
      handleBBoxChange(textRef.current.getBBox())
    }
  }, [text, size, textAnchor])

  return (
    <g
      transform={`translate(${x} ${y})`}
      onClick={(e) => {
        e.stopPropagation()
        selectHandler(pos)
      }}
    >
      <rect 
        width={`${imgWidth * scale}px`}
        height={`${bannerHeight * scale}px`}
        fill={background}
        stroke={ isSelected ? 'red' : 'transparent' }
      />
      <g
        ref={textRef}
        fontSize={`${size*scale}px`}
        fontFamily={fontFamily}
        transform={`translate(${ (imgWidth * scale - textBBox.width )/2  - textBBox.x} ${ (bannerHeight * scale - textBBox.height)/2})`}
      >
        {
          text.split(/[\n\r|\n|\r\n]/).map( (d, i) => (
            <text
              dominantBaseline="text-before-edge"
              textAnchor={textAnchor}
              fill={color}
              key={i}
              x={0}
              y={ i * size * scale}
            >
              { d }
            </text>
          ))
        }
      </g>
    </g>
  )
}


Banner.propTypes = {}

export default Banner