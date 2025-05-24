import React from "react"

export function MonacoEmbed() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        src="/monaco-main/index.html" // Make sure path matches where your Monaco folder is served
        style={{ width: "100%", height: "100%", border: "none" }}
        title="Monaco Editor"
      />
    </div>
  )
}
