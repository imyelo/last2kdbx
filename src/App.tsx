import React from "react"
import styled from '@emotion/styled'
import { createSnackbar } from '@snackbar/core'
import { format as formatDate } from 'fecha'
import { saveAs } from "file-saver"
import { convert } from "./libraries/convert"
import { convertArrayBufferToBuffer } from "./utils/buffer"
import { FileInput } from './components/FileInput'

/** color paltettes: https://coolors.co/335c67-fff3b0-e09f3e-9e2a2b-540b0e */
const Styled = styled.div`
  height: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
  background-color: #9E2A2B;
  color: #FFF3B0;
  .title {
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    margin: 2em 0;
  }
  .file {
    background-color: #E09F3E;
    border: 1px dashed #540B0E;
    color: #540B0E;
    &:hover {
      background-color: #FFF3B0;
    }
    &.dragging {
      background-color: #FFF3B0;
    }
  }
`;

const convertAndDownload = async (file: File, filename: string = 'output.csv') => {
  try {
    const ab = await file.arrayBuffer()
    const buffer = convertArrayBufferToBuffer(ab)
    const result = await convert(buffer)
    const output = new File([result], filename, {
      type: "text/plain;charset=utf-8",
    })
    saveAs(output)
  } catch (error) {
    createSnackbar(error.message)
    console.error(error)
  }
}

const App = () => {
  const handleFileChange = React.useCallback((file: File | null) => {
    if (!file) {
      return
    }
    convertAndDownload(file, `${file.name.replace(/\.csv$/, '')}-${formatDate(new Date(), 'YYYYMMDDhhmmss')}.kdbx`)
  }, [])

  return (
    <Styled>
      <div className="title">Convert LastPass CSV to KDBX</div>
      <FileInput className="file" onChange={handleFileChange} />
    </Styled>
  )
}

export default App
