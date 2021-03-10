import React from "react"
import styled from '@emotion/styled'

// Color Palette: https://coolors.co/355070-6d597a-b56576-e56b6f-eaac8b
const Container = styled.div`
  width: 100%;
  max-width: 100%;
  min-height: 360px;
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  background-color: #f6f6f6;
  font-weight: bold;
  font-size: 24px;
  cursor: pointer;
  transition: all .2s ease;
  &:hover {
    background-color: #fcfcfc;
  }
  .dragging {
    background-color: #f3f3f3;
  }
  .input {
    display: none;
  }
`

interface IFileInputProps {
  className?: string
  placeholder?: string
  onChange: (file: File | null) => void
}

export const FileInput = ({ className = '', placeholder= 'Load file' , onChange }: IFileInputProps) => {
  const [isDragging, setIsDragging] = React.useState(false)
  const $input = React.useRef<HTMLInputElement>(null)
  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target?.files?.[0] || null)
    },
    []
  )

  const handleClick= React.useCallback(() => {
    $input.current?.click()
  }, [])

  const handleDragOver = React.useCallback((event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(true)
  }, [])
  const handleDragLeave = React.useCallback((event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = React.useCallback((event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
    onChange(event.dataTransfer.items[0].getAsFile())
  }, [])

  return (
    <Container 
      className={`${className} ${isDragging ? 'dragging' : ''}`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}>
      <input className="input" type="file" onChange={handleInputChange} ref={$input} />
      {placeholder}
    </Container>
  )
}
