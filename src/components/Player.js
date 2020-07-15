import React from 'react'
import styled from 'styled-components'
import Progressbar from './Progressbar'
import Button from './Button'
import Icon from './Icon'
import Timer from './Timer'
import Title from './Title'
import pauseIcon from '../images/pause.svg'
import playIcon from '../images/play.svg'

const Container = styled.section`
  width: 50%;
  max-width: 1000px;
  min-height: 35vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(0deg, rgba(4, 32, 83, 0.34), rgba(2, 45, 255, 0));
`

const Player = (props) => {
  return (
    <Container>
      <Title>{props.title}</Title>
      <Button onClick={props.onClickButton}>
        <Icon src={props.isPlaying ? pauseIcon : playIcon} />
      </Button>
      <Timer>{props.currentTime} / {props.duration}</Timer>
      <Progressbar
        progress={props.progress}
        onSeek={props.onSeek}
      />
    </Container>
  )
}

export default Player
