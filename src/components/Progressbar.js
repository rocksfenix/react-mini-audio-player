import React, { useRef } from 'react'
import styled from 'styled-components'

const Progress = styled.section`
  height: 100%;
  background: #2270ff;
  position: absolute;
  left: 0;
`

const Container = styled.section`
  width: 100%;
  height: 25px;
  background: #101010;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
`

const Progressbar = (props) => {
  const barRef = useRef()
  const progressStyles = {
    width: `${props.progress}%`
  }

  const handleClick = (e) => {
    e.stopPropagation()
    var rect = barRef.current.getBoundingClientRect()
    var x = e.clientX - rect.left
    const percent = x * 100 / barRef.current.clientWidth
    props.onSeek(percent)
  }

  return (
    <Container
      onClick={handleClick}
      ref={barRef}
    >
      <Progress style={progressStyles} />
    </Container>
  )
}

Progressbar.defaultProps = {
  progress: 10.6
}

export default Progressbar
