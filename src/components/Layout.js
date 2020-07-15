import React from 'react'
import styled from 'styled-components'

const Container = styled.section`
  background-color: #282c34;
  background: radial-gradient(#212121, black);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const Layout = (props) => {
  return (
    <Container>
      {props.children}
    </Container>
  )
}

export default Layout
