import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { withStyles } from '@material-ui/core/styles'

import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import Button from '@material-ui/core/Button'

import AppsIcon from '@material-ui/icons/Apps'
import ListIcon from '@material-ui/icons/List'
import CheckIcon from '@material-ui/icons/Check'

import './index.styl'

import { genArray} from '../../utils/tools'

const BASE_URL = 'http://www.ghibli.jp/gallery/'
const MOVIE = [
  'marnie',
  'kaguyahime',
  'kazetachinu',
  'kokurikozaka',
  'karigurashi',
  'ponyo',
  'ged',
  'chihiro',
]

const MOVIE_NAME = {
  marnie: '回憶中的瑪妮',
  kaguyahime: '輝耀姬物語',
  kazetachinu: '風起',
  kokurikozaka: '來自紅花坂',
  karigurashi: '借物少女艾莉緹',
  ponyo: '崖上的波妞',
  ged: '地海戰記',
  chihiro: '神隱少女',
}

const PIC = genArray(50)


const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    width: '100%',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion)

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary)

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails)

const Gallery = ({ selectImage }) => {

  const [expanded, setExpanded] = useState(MOVIE[0])
  const [selectedImg, setSelectedImg] = useState('')
  const [viewMode, setViewMode] = useState('grid')

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  const toggleViewMode = () => {
    const newMode = viewMode === 'grid' ? 'list' : 'grid'
    setViewMode(newMode)
  }

  const onSelectConfirm = () => {
    selectImage(selectedImg)
  }

  useEffect(() => {
  }, [])

  return (
    <div className="gallery">
      <div className="gallery__header">
        <h2 className="gallery__title">選擇一張圖片進行創作</h2>
        <Button onClick={toggleViewMode}>
          {
            viewMode === 'list'
             ? <ListIcon/> : <AppsIcon/>
          }
        </Button>
      </div>
      <div className="gallery__wrap">
        {
          MOVIE.map(movie => (
            <Accordion 
              square 
              expanded={expanded === movie} o
              onChange={handleChange(movie)}
              key={movie}
            >
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                {MOVIE_NAME[movie]}
              </AccordionSummary>
              <AccordionDetails>
                <div className="gallery__detail-wrap">
                  <div className="gallery__thumb">
                    {
                      PIC.map((d, i) => (
                        <div 
                          className="gallery__thumb-wrap"
                          className={classNames(
                            'gallery__thumb-wrap',
                            {
                              'gallery__thumb-wrap--list': viewMode === 'list'
                            }
                          )}
                          key={`${movie}${('00' + (i+1)).slice(-3)}`}
                          onClick={() => setSelectedImg(`${movie}${('00' + (i+1)).slice(-3)}`)}
                        >
                          <img 
                            className="gallery__thumb-img"
                            className={classNames(
                              'gallery__thumb-img',
                              {
                                'gallery__thumb-img--active': selectedImg === `${movie}${('00' + (i+1)).slice(-3)}`,
                              }
                            )}
                            src={`${BASE_URL}thumb-${movie}${('00' + (i+1)).slice(-3)}.png`} 
                          />
                        </div>
                      ))
                    }
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          ))
        }
      </div>
      <div className="gallery__actions">
        <Button 
          onClick={onSelectConfirm}
          disabled={!selectedImg}
        >
          <CheckIcon/>
          我選好了！
        </Button>
      </div>
    </div>
  )
}

Gallery.propTypes = {}

export default Gallery