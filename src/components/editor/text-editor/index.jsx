import React, { useState, useEffect, useRef } from 'react'
import { SketchPicker } from 'react-color'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Slider from '@material-ui/core/Slider'
import Modal from '@material-ui/core/Modal'

import FormatSizeIcon from '@material-ui/icons/FormatSize'
import FormatColorTextIcon from '@material-ui/icons/FormatColorText'
import BorderColorIcon from '@material-ui/icons/BorderColor'
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter'
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight'
import ReplayIcon from '@material-ui/icons/Replay';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import CheckIcon from '@material-ui/icons/Check'

import './index.styl'

import TextInput from '../text-input'

const FONT_SIZES = [14, 16, 18, 20, 22, 24, 26, 28, 32, 36, 40, 44, 48, 56, 64, 72, 80, 88, 96, 114]
const TEXT_STROKE_WIDTH = [0, 0.5, 1, 1.5, 2]
const TEXT_ALIGN = ['start', 'middle', 'end']

const TextEditor = ({
  textProps,
  textPropsChange,
  unselectText,
  deleteText,
}) => {

  const [textEditModalOpen, setTextEditModalOpen] = useState(false)

  const [fontColorEl, setFontColorEl] = useState(null)
  const [strokeColorEl, setStrokeColorEl] = useState(null)
  const [bgColorEl, setBGColorEl] = useState(null)

  const handleTextPropsChange = (key, value) => {
    textPropsChange(key, value)
  }

  const onAlignChange = () => {
    let nextIndex = TEXT_ALIGN.indexOf(textProps.textAnchor) + 1

    if(nextIndex >= TEXT_ALIGN.length ) nextIndex = 0

    textPropsChange('textAnchor', TEXT_ALIGN[nextIndex])
//handleTextPropsChange('size', e.target.value)    
  }

  const setColor = key => color => {
    const { r, g, b, a } = color.rgb
    handleTextPropsChange(key, `rgba(${r}, ${g}, ${b}, ${a})`)
  }

  useEffect(() => {
    if(!textProps.text) {
      setTextEditModalOpen(true)
    }
  }, [textProps])

  return (
    <div 
      className="text-editor"
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <div className="text-editor__wrap">
        <div className="text-editor__row">
          <Button onClick={ e => setFontColorEl(e.currentTarget)}>
            <FormatColorTextIcon htmlColor={textProps.color} />
          </Button>
          <Menu
            id="font-color-menu"
            anchorEl={fontColorEl}
            keepMounted
            open={Boolean(fontColorEl)}
            onClose={() => setFontColorEl(null)}
          >
            <SketchPicker
              color={textProps.color}
              onChangeComplete={setColor('color')}
            />
          </Menu>
          <Button onClick={ e => setBGColorEl(e.currentTarget)}>
            <FormatColorFillIcon htmlColor={textProps.background !== 'transparent' ? textProps.background : '#000'} />
          </Button>
          <Menu
            id="stroke-color-menu"
            anchorEl={bgColorEl}
            keepMounted
            open={Boolean(bgColorEl)}
            onClose={() => setBGColorEl(null)}
          >
            <SketchPicker
              color={textProps.background !== 'transparent' ? textProps.background : '#000'}
              onChangeComplete={setColor('background')}
            />
          </Menu>
          <div className="text-editor__selector-btn">
            Size: 
            <Select
              labelId="size-select"
              value={textProps.size}
              onChange={(e) => handleTextPropsChange('size', e.target.value)}
              variant="filled"
            >
              {
                FONT_SIZES.map(size => (
                  <MenuItem key={size} value={size}>{size}</MenuItem>
                ))
              }
            </Select>
          </div>
          <Button 
            onClick={ () => setTextEditModalOpen(true)} 
            variant="outlined"
            className="text-editor__flex-btn"
          >
            <EditIcon />
            Edit Text
          </Button>
          <Modal
            open={textEditModalOpen}
            onClose={() => setTextEditModalOpen(false)}
          >
            <>
              <TextInput
                text={textProps.text}
                textUpdate={ text => handleTextPropsChange('text', text)}
                onClose={() => setTextEditModalOpen(false)}
                deleteText={deleteText}
              />
            </>
          </Modal>
        </div>
        <div className="text-editor__row">
          <Button 
            onClick={onAlignChange}
          >
            { textProps.textAnchor === 'start' && <FormatAlignLeftIcon/> }
            { textProps.textAnchor === 'middle' && <FormatAlignCenterIcon/> }
            { textProps.textAnchor === 'end' && <FormatAlignRightIcon/> }
          </Button>
          <div className="text-editor__rotate-slider">
            <div className="text-editor__rotate-slider-wrap">
              <Slider 
                value={textProps.rotate} 
                onChange={(e, val) => handleTextPropsChange('rotate', val)}
                min={0}
                max={360}
                aria-labelledby="continuous-slider"
              />
            </div>
            <ReplayIcon />
          </div>
        </div>
        <div className="text-editor__row">
          <Button onClick={unselectText} className="text-editor__flex-btn" variant="contained">
            <CheckIcon/>
            完成
          </Button>
          <Button onClick={deleteText} className="text-editor__flex-btn">
            <DeleteIcon/>
            刪除
          </Button>
        </div>
      </div>
    </div>
  )
}

TextEditor.propTypes = {}

export default TextEditor