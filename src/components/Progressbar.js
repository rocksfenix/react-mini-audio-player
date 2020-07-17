import React, { useRef } from 'react'
import styled from 'styled-components'
import Mark from './Mark'

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
    // Only fire on left click
    if (e.buttons === 1) {
      props.onSeek(getPercent(e))
    }
  }

  const getPercent = (e) => {
    var rect = barRef.current.getBoundingClientRect()
    var x = e.clientX - rect.left
    const percent = x * 100 / barRef.current.clientWidth
    return percent
  }

  const handleRightClick = (e) => {
    e.stopPropagation()
    e.preventDefault()
    props.onAddMarker(getPercent(e))
  }

  return (
    <Container
      onMouseDown={handleClick}
      onContextMenu={handleRightClick}
      ref={barRef}
    >
      {props.marks.map(mark => (
        <Mark
          key={mark.id}
          style={{ left: mark.percent }}
          mark={mark}
          barRef={barRef}
          onMove={props.onMoveMark}
        />
      ))}
      <Progress style={progressStyles} />
    </Container>
  )
}

Progressbar.defaultProps = {
  progress: 10.6
}

export default Progressbar
