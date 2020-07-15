import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676'
  }
  if (props.isDragReject) {
    return '#ff1744'
  }
  if (props.isDragActive) {
    return '#2196f3'
  }
  return '#eeeeee'
}

const Box = styled.div`
  border: 2px dashed #FFF;
  padding: 8vw;
  border-color: ${props => getColor(props)};
`

function DropzoneComponent (props) {
  const onDrop = useCallback(acceptedFiles => {
    props.onSelectedAudio(acceptedFiles[0])
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop, accept: 'audio/*' })

  return (
    <Box {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
      <input {...getInputProps()} />
      {
        isDragActive
          ? <p>Drop the audio file here ...</p>
          : <p>Drag 'n' drop an audio file here, or click to select the file</p>
      }
    </Box>
  )
}

export default DropzoneComponent
