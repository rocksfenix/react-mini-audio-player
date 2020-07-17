import React from 'react'
import styled from 'styled-components'

const Marker = styled.div`
  width: 8px;
  height: 8px;
  background: yellow;
  transform: rotate(45deg) translateY(-50%);
  position: absolute;
  z-index: 10;
  top: 50%;
`

const Mark = (props) => {
  const mouseDown = (e) => {
    e.preventDefault()
    e.stopPropagation()
    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mouseup', mouseUp)
  }

  const mouseMove = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const rect = props.barRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percent = x * 100 / props.barRef.current.clientWidth
    props.onMove({
      ...props.mark,
      percent: `${percent}%`
    })
  }

  const mouseUp = (e) => {
    e.preventDefault()
    e.stopPropagation()
    window.removeEventListener('mousemove', mouseMove)
    window.removeEventListener('mouseup', mouseUp)
  }

  return (
    <Marker
      onMouseDown={mouseDown}
      style={props.style}
    />
  )
}

Mark.defaultProps = {
  progress: 10.6
}

export default Mark
