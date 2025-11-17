import { useState, useRef, useEffect } from "react";
// import ScratchEditor from './components/ScratchEditor';
import ScratchPlayer from "./components/ScratchPlayer";
import downloadBlob from "./download-blob";

import "./App.css";

function App() {
  const [mode] = useState("editor"); // 'editor' 或 'player'
  const [projectId] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 导出 Scratch 项目为 .sb3 文件
//   const handleExport = () => {
//     if (iframeRef.current) {
//       // 向 iframe 发送导出请求
//       iframeRef.current.contentWindow?.postMessage(
//         {
//           type: "EXPORT_PROJECT",
//         },
//         "*"
//       );
//     }
//   };

  // 监听来自 iframe 的消息
  const handleMessage = (event: MessageEvent) => {
    if (event.data.type === "PROJECT_EXPORTED") {
      // 处理导出的项目数据，创建 .sb3 文件
      const projectData = event.data.projectData;
      const isEmpty = event.data.isEmpty;
      if (isEmpty) {
        alert("项目为空，无法导出");
        return;
      }
      downloadBlob("scratch-project.sb3", projectData);
    }
  };

  // 添加消息监听器
  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="app">
      <main>
        {mode === "editor" ? (
          <div className="scratch-editor-container">
            {/* <div className="controls">
              <button onClick={handleExport} className="export-btn">
                导出 .sb3 文件
              </button>
            </div> */}
            <iframe
              ref={iframeRef}
              src="/react-scratch-demo/scratch/index.html"
              width="100%"
              height="600px"
              frameBorder="0"
            />
          </div>
        ) : projectId ? (
          <ScratchPlayer projectId={projectId} />
        ) : (
          <p>请输入有效的Scratch项目ID</p>
        )}
      </main>
    </div>
  );
}

export default App;
