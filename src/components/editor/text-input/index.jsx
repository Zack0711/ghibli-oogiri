import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'

import './index.styl'

const TextInput = ({text, onClose, textUpdate, deleteText}) => {
  const [inputText, setInputText] = useState('')

  const handleConfirm = () => {
    if (!inputText && deleteText) {
      deleteText()
    } else {
      textUpdate(inputText)
      onClose()
    }
  }

  const handleCancel = () => {
    if (!text && text) {
      deleteText()
    } else {
      onClose()
    }
  }

  useEffect(() => {
    setInputText(text)
  }, [])

  return (
    <div className='text-input'>
      <div className='text-input__content'>
        <h5 className='text-input__title'>輸入文字</h5>
        <TextField
          multiline
          rows={4}
          variant="outlined"
          value={inputText}
          onChange={ e => setInputText(e.target.value)}
        />
        {
          deleteText && (
            <div className='text-input__warning'>
              ＊如果沒有輸入文字，會自動刪除此文字塊
            </div>
          )
        }
        <div className='text-input__actions'>
          <Button 
            onClick={handleConfirm}
            className="text-input__action-btn"
          >
            <CheckIcon/> 確定
          </Button>
          <Button 
            onClick={handleCancel}
            className="text-input__action-btn"
          >
            <CloseIcon/> 取消
          </Button>
        </div>
      </div>
    </div>
  )
}

TextInput.propTypes = {}

export default TextInput