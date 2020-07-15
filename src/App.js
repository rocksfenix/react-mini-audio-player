import React, { useState } from 'react'
import Dropzone from './components/Dropzone'
import Layout from './components/Layout'
import Player from './components/Player'
import { calculateCurrentValue, calculateTotalValue } from './util'

function App () {
  const [hasAudio, setHasAudio] = useState(false)
  const [audio, setAudio] = useState()
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [duration, setDuration] = useState('0:00')
  const [currentTime, setCurrentTime] = useState('0:00')

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
            progress={progress}
            onClickButton={handleClickButton}
            isPlaying={isPlaying}
            duration={duration}
            currentTime={currentTime}
          />
        )
        : <Dropzone onSelectedAudio={onSelectAudioFile} />}
    </Layout>
  )
}

export default App
