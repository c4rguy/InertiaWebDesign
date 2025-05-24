"use client"

import type React from "react"

import { useState, useRef } from "react"

interface ResizableProps {
  children: React.ReactNode
  direction: "up" | "down" | "left" | "right"
  defaultSize: number
  minSize?: number
  maxSize?: number
}

export function Resizable({ children, direction, defaultSize, minSize = 100, maxSize = 800 }: ResizableProps) {
  const [size, setSize] = useState(defaultSize)
  const resizableRef = useRef<HTMLDivElement>(null)
  const startPosRef = useRef(0)
  const startSizeRef = useRef(0)

  const isHorizontal = direction === "left" || direction === "right"
  const resizeHandleClass = isHorizontal
    ? "absolute top-0 w-1 h-full cursor-col-resize"
    : "absolute left-0 h-1 w-full cursor-row-resize"

  const resizeHandlePosition = {
    left: direction === "left" ? "0" : "auto",
    right: direction === "right" ? "0" : "auto",
    top: direction === "up" ? "0" : "auto",
    bottom: direction === "down" ? "0" : "auto",
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    startPosRef.current = isHorizontal ? e.clientX : e.clientY
    startSizeRef.current = size

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    const currentPos = isHorizontal ? e.clientX : e.clientY
    const delta =
      direction === "left" || direction === "up" ? startPosRef.current - currentPos : currentPos - startPosRef.current

    const newSize = Math.max(minSize, Math.min(maxSize, startSizeRef.current + delta))
    setSize(newSize)
  }

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove)
    document.removeEventListener("mouseup", handleMouseUp)
  }

  return (
    <div
      ref={resizableRef}
      className="relative"
      style={{
        width: isHorizontal ? `${size}px` : "100%",
        height: isHorizontal ? "100%" : `${size}px`,
      }}
    >
      <div
        className={`${resizeHandleClass} bg-transparent hover:bg-zinc-600 z-10`}
        style={resizeHandlePosition}
        onMouseDown={handleMouseDown}
      />
      {children}
    </div>
  )
}
