import React, { useState, useEffect } from 'react'
import Mousetrap from 'mousetrap'
import Dropzone from './components/Dropzone'
import Layout from './components/Layout'
import Player from './components/Player'
import { calculateCurrentValue, calculateTotalValue } from './util'

const getNextMark = (marks, currentTime) => {
  let next = null

  for (let i = 0; i < marks.length; i++) {
    if (marks[i].time > currentTime) {
      next = marks[i]
      break
    }
  }

  return next
}

const getPrevMark = (marks, currentTime, delta = 3) => {
  let prev = null

  for (let i = 0; i < marks.length; i++) {
    if (currentTime - delta > marks[i].time) {
      prev = marks[i]
    }
  }

  return prev
}

function App () {
  const [hasAudio, setHasAudio] = useState(false)
  const [audio, setAudio] = useState()
  const [title, setTitle] = useState('')
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [duration, setDuration] = useState('0:00')
  const [currentTime, setCurrentTime] = useState('0:00')
  const [marks, setMarks] = useState([])

  useEffect(() => {
    Mousetrap.bind('left', backTime)
    Mousetrap.bind('right', nextTime)
    Mousetrap.bind('up', play)
    Mousetrap.bind('down', pause)
    Mousetrap.bind('del', reset)
  }, [audio])

  useEffect(() => {
    Mousetrap.bind('ctrl+left', goPrevMark)
    Mousetrap.bind('ctrl+right', goNextMark)
  }, [marks])

  const backTime = () => {
    audio.currentTime = audio.currentTime - 5
  }

  const nextTime = () => {
    audio.currentTime = audio.currentTime + 5
  }

  const play = () => {
    audio.play()
    setIsPlaying(true)
  }

  const pause = () => {
    audio.pause()
    setIsPlaying(false)
  }

  const reset = () => {
    audio.pause()
    setHasAudio(false)
    setIsPlaying(false)
    setProgress(0)
    setDuration('0:00')
    setAudio(null)
  }

  const goNextMark = () => {
    const mark = getNextMark(marks, audio.currentTime)
    if (mark) {
      audio.currentTime = mark.time
    }
  }

  const goPrevMark = () => {
    const mark = getPrevMark(marks, audio.currentTime)
    if (mark) {
      audio.currentTime = mark.time
    }
  }

  const handleSeek = (percent) => {
    audio.currentTime = percent * audio.duration / 100
  }

  const handleClickButton = () => {
    if (isPlaying) {
      setIsPlaying(false)
      audio.pause()
    } else {
      setIsPlaying(true)
      audio.play()
    }
  }

  const handleAddMarker = (percent) => {
    const newMark = {
      percent: `${percent}%`,
      id: Math.random().toString(16),
      time: (percent * audio.duration) / 100
    }

    setMarks([
      ...marks,
      newMark
    ])
  }

  const handleMoveMark = (markUpdated) => {
    setMarks(marks.map(mark => (
      mark.id === markUpdated.id
        ? markUpdated
        : mark
    )))
  }

  const onSelectAudioFile = (file) => {
    try {
      setTitle(file.name)
      const tempUrl = window.URL.createObjectURL(file)
      const audioElement = new window.Audio(tempUrl)
      setAudio(audioElement)
      audioElement.addEventListener('canplay', () => {
        const duration = audioElement.duration
        audioElement.play()
        setDuration(calculateTotalValue(duration))
        setHasAudio(true)
      })
      audioElement.addEventListener('timeupdate', (e) => {
        // calculate current value time
        const currentTime = calculateCurrentValue(audioElement.currentTime)
        setCurrentTime(currentTime)
        setProgress(audioElement.currentTime * 100 / audioElement.duration)
      })
    } catch (error) {

    }
  }

  return (
    <Layout>
      {hasAudio
        ? (
          <Player
            title={title}
            progress={progress}
            duration={duration}
            isPlaying={isPlaying}
            currentTime={currentTime}
            onClickButton={handleClickButton}
            onSeek={handleSeek}
            onAddMarker={handleAddMarker}
            marks={marks}
            onMoveMark={handleMoveMark}
          />
        )
        : <Dropzone onSelectedAudio={onSelectAudioFile} />}
    </Layout>
  )
}

export default App
