import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useGesture } from 'react-use-gesture'

import PropTypes from 'prop-types'
import classNames from 'classnames'

import './index.styl'

const TextAnimate = ({imgWidth, imgHeight, scale}) => {
  const textRef = useRef(null)
  const scaleRef = useRef(null)

  const text = '測試文字！！'
  const [textBBox, setTextBBox] = useState({x:0, y:0, width:0, height:0})

  const [textProps, set] = useState({
    rotate: 0,
    zoom: 1,
    x: 0,
    y: 0,
  })

  const [drag, setDrag] = useState(false)

  const getX = () => imgWidth * scale / 2 + textProps.x
  const getY = () => imgHeight * scale / 2 + textProps.y
  const getTextProps = () => textProps

  const bind = useGesture(
    {
      onDragStart: () => setDrag(true),
      onDrag: ({ movement: [x, y] }) => set({ ...textProps, x, y }),
      onDragEnd: () => setDrag(false),
      onPinch: ({ offset: [d, a] }) => set({ ...textProps, zoom: d / 200, rotate: a }),
    },{
      drag: { 
        initial: () => [ textProps.x, textProps.y],
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
  }, [text])

  useEffect(() => {
    if (scaleRef.current) {
      set({ 
        ...textProps, 
        x: textProps.x / scaleRef.current * scale, 
        y: textProps.y / scaleRef.current * scale,
      })      
    }
    scaleRef.current = scale
  }, [scale])

  return (
    <g
      { ...bind() }
      transform={`translate(${getX()} ${getY()}) rotate(${textProps.rotate}) scale(${textProps.zoom * scale})`}
    >
      <g
        transform={`translate(${-textBBox.width/2 - (textBBox.x)} ${-textBBox.height/2})`}
      >
        <rect 
          width={textBBox.width} 
          height={textBBox.height}
          fill="transparent"
          x={textBBox.x}
        />
        <g
          ref={textRef}
//          fontSize={`${40*(1 + zoom.value)}px`}
          fontSize={`20px`}
        >
          {
            text.split(/[\n\r|\n|\r\n]/).map( (d, i) => (
              <text
                dominantBaseline="text-before-edge"
                key={i}
                x={0}
                y={0}
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
          stroke={'white'}
          x={textBBox.x}
        />
      </g>
    </g>
  )
}

TextAnimate.propTypes = {}

export default TextAnimate