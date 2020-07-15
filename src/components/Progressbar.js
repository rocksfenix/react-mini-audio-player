import React from 'react'
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
  const progressStyles = {
    width: `${props.progress}%`
  }

  return (
    <Container>
      <Progress style={progressStyles} />
    </Container>
  )
}

Progressbar.defaultProps = {
  progress: 10.6
}

export default Progressbar
