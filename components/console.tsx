interface ConsoleOutput {
  time: string
  message: string
  type: "info" | "error" | "warning" | "success"
}

interface ConsoleProps {
  output: ConsoleOutput[]
}

export function Console({ output }: ConsoleProps) {
  return (
    <div className="h-full overflow-auto bg-zinc-950 font-mono text-sm p-2">
      {output.map((item, index) => (
        <div key={index} className="flex">
          <span className="text-zinc-500 mr-2">[{item.time}]</span>
          <span
            className={`
            ${item.type === "error" ? "text-red-400" : ""}
            ${item.type === "warning" ? "text-yellow-400" : ""}
            ${item.type === "success" ? "text-green-400" : ""}
            ${item.type === "info" ? "text-blue-400" : ""}
          `}
          >
            {item.message}
          </span>
        </div>
      ))}
    </div>
  )
}
