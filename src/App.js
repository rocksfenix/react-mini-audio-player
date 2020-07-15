import React, { useState, useEffect } from 'react'
import Mousetrap from 'mousetrap'
import Dropzone from './components/Dropzone'
import Layout from './components/Layout'
import Player from './components/Player'
import { calculateCurrentValue, calculateTotalValue } from './util'

function App () {
  const [hasAudio, setHasAudio] = useState(false)
  const [audio, setAudio] = useState()
  const [title, setTitle] = useState('')
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [duration, setDuration] = useState('0:00')
  const [currentTime, setCurrentTime] = useState('0:00')

  useEffect(() => {
    Mousetrap.bind('left', backTime)
    Mousetrap.bind('right', nextTime)
    Mousetrap.bind('up', play)
    Mousetrap.bind('down', pause)
  }, [audio])

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

  const handleClickButton = () => {
    if (isPlaying) {
      setIsPlaying(false)
      audio.pause()
    } else {
      setIsPlaying(true)
      audio.play()
    }
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
          />
        )
        : <Dropzone onSelectedAudio={onSelectAudioFile} />}
    </Layout>
  )
}

export default App
