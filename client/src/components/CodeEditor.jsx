import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { socket } from "../socket";

function CodeEditor({ roomId }) {
  const [code, setCode] = useState("// Start coding...");

  useEffect(() => {
    socket.on("receive-code", (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.off("receive-code");
    };
  }, []);

  const handleCodeChange = (value) => {
    setCode(value);

    socket.emit("code-change", {
      roomId,
      code: value,
    });
  };

  return (
    <div className="h-full">
      <Editor
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleCodeChange}
      />
    </div>
  );
}

export default CodeEditor;