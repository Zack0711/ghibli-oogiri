import React, { useState, useEffect, useRef } from 'react'
import { SketchPicker, CompactPicker } from 'react-color'
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
import CheckIcon from '@material-ui/icons/Check'

import './index.styl'

import TextInput from '../text-input'

const FONT_SIZES = [18, 20, 22, 24, 26, 28, 32, 36, 40, 44, 48, 56, 64, 72, 80, 88, 96]
const TEXT_STROKE_WIDTH = [0, 0.5, 1, 1.5, 2]

const BannerEditor = ({
  bannerProps,
  isTextSelected,
  bannerPropsChange,
  unselectBanner,
}) => {

  const [textEditModalOpen, setTextEditModalOpen] = useState(false)

  const [fontColorEl, setFontColorEl] = useState(null)
  const [bgColorEl, setBGColorEl] = useState(null)

  const handleBannerPropsChange = (key, value) => {
    bannerPropsChange(key, value)
  }

  const setColor = key => color => {
    const { r, g, b, a } = color.rgb
    handleBannerPropsChange(key, `rgba(${r}, ${g}, ${b}, ${a})`)
  }

  useEffect(() => {
  }, [])

  return (
    <div 
      className="banner-editor"
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <div className="banner-editor__wrap">
        <div className="banner-editor__row">
          <Button onClick={ e => setFontColorEl(e.currentTarget)}>
            <FormatColorTextIcon htmlColor={bannerProps.color} />
          </Button>
          <Menu
            id="font-color-menu"
            anchorEl={fontColorEl}
            keepMounted
            open={Boolean(fontColorEl)}
            onClose={() => setFontColorEl(null)}
          >
            <CompactPicker
              color={bannerProps.color}
              onChangeComplete={setColor('color')}
            />
          </Menu>
          <Button onClick={ e => setBGColorEl(e.currentTarget)}>
            <FormatColorFillIcon htmlColor={bannerProps.background !== 'transparent' ? bannerProps.background : '#000'} />
          </Button>
          <Menu
            id="stroke-color-menu"
            anchorEl={bgColorEl}
            keepMounted
            open={Boolean(bgColorEl)}
            onClose={() => setBGColorEl(null)}
          >
            <CompactPicker
              color={bannerProps.background !== 'transparent' ? bannerProps.background : '#000'}
              onChangeComplete={setColor('background')}banner         />
          </Menu>
          <div className="banner-editor__selector-btn">
            Size: 
            <Select
              labelId="size-select"
              value={bannerProps.size}
              onChange={(e) => handleBannerPropsChange('size', e.target.value)}
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
            className="banner-editor__flex-btn"
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
                text={bannerProps.text}
                textUpdate={ text => handleBannerPropsChange('text', text)}
                onClose={() => setTextEditModalOpen(false)}
              />
            </>
          </Modal>
        </div>
        <div className="banner-editor__row">
          <Button 
            variant={ bannerProps.textAnchor === 'start' ? 'contained' : 'text'}
            onClick={ () => handleBannerPropsChange('textAnchor', 'start')}
          >
            <FormatAlignLeftIcon/>
          </Button>
          <Button 
            variant={ bannerProps.textAnchor === 'middle' ? 'contained' : 'text'}
            onClick={ () => handleBannerPropsChange('textAnchor', 'middle')}
          >
            <FormatAlignCenterIcon/>
          </Button>
          <Button 
            variant={ bannerProps.textAnchor === 'end' ? 'contained' : 'text'}
            onClick={ () => handleBannerPropsChange('textAnchor', 'end')}
          >
            <FormatAlignRightIcon/>
          </Button>
          <Button onClick={unselectBanner} className="banner-editor__flex-btn" variant="contained">
            <CheckIcon/>
            完成
          </Button>
        </div>
      </div>
    </div>
  )
}

BannerEditor.propTypes = {}

export default BannerEditor