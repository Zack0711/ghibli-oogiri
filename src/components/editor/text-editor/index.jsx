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
import RotateRightIcon from '@material-ui/icons/RotateRight'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import './index.styl'

import TextInput from '../text-input'

const FONT_SIZES = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
const TEXT_STROKE_WIDTH = [0, 0.5, 1, 1.5, 2]

const TextEditor = ({
  textProps,
  isTextSelected,
  textPropsChange,
  deleteText,
}) => {

  const [textEditModalOpen, setTextEditModalOpen] = useState(false)

  const [fontColorEl, setFontColorEl] = useState(null)
  const [strokeColorEl, setStrokeColorEl] = useState(null)
  const [bgColorEl, setBGColorEl] = useState(null)

  const handleTextPropsChange = (key, value) => {
    textPropsChange(key, value)
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
    <div className="text-editor">
      <div className="text-editor__row">
        <Button 
          onClick={ () => setTextEditModalOpen(true)} 
          variant="outlined"
          className="text-editor__text-edit-btn"
        >
          <EditIcon />
          Edit Text
        </Button>
        <Modal
          open={textEditModalOpen}
          onClose={() => setTextEditModalOpen(false)}
        >
          <TextInput
            text={textProps.text}
            textUpdate={ text => handleTextPropsChange('text', text)}
            onClose={() => setTextEditModalOpen(false)}
            deleteText={deleteText}
          />
        </Modal>
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
            color={isTextSelected ? textProps.color : '#000'}
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
        <div className="text-editor__btn">
          Size: 
          <Select
            labelId="size-select"
            value={isTextSelected ? textProps.size : 12}
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
      </div>
      <div className="text-editor__row">
        <Button 
          variant={ textProps.textAnchor === 'start' ? 'contained' : 'text'}
          onClick={ () => handleTextPropsChange('textAnchor', 'start')}
        >
          <FormatAlignLeftIcon/>
        </Button>
        <Button 
          variant={ textProps.textAnchor === 'middle' ? 'contained' : 'text'}
          onClick={ () => handleTextPropsChange('textAnchor', 'middle')}
        >
          <FormatAlignCenterIcon/>
        </Button>
        <Button 
          variant={ textProps.textAnchor === 'end' ? 'contained' : 'text'}
          onClick={ () => handleTextPropsChange('textAnchor', 'end')}
        >
          <FormatAlignRightIcon/>
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
          <RotateRightIcon />
        </div>
        <Button onClick={deleteText}>
          <DeleteIcon/>
        </Button>
      </div>
    </div>
  )
}

TextEditor.propTypes = {}

export default TextEditor