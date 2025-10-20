import { useState, useRef, useEffect } from "react";
// import ScratchEditor from './components/ScratchEditor';
import ScratchPlayer from "./components/ScratchPlayer";

import "./App.css";

function App() {
  const [mode] = useState("editor"); // 'editor' 或 'player'
  const [projectId] = useState("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 导出 Scratch 项目为 .sb3 文件
  const handleExport = () => {
    if (iframeRef.current) {
      // 向 iframe 发送导出请求
      iframeRef.current.contentWindow?.postMessage({
        type: 'EXPORT_PROJECT'
      }, '*');
    }
  };

  // 创建 .sb3 文件（ZIP 格式）
  const createSb3File = (projectData: any) => {
    // .sb3 文件实际上是一个 ZIP 文件，包含项目数据
    // 这里我们创建一个简化的实现
    const sb3Data = {
      targets: projectData.targets || [],
      monitors: projectData.monitors || [],
      extensions: projectData.extensions || [],
      meta: {
        semver: "3.0.0",
        vm: "0.2.0",
        agent: "Mozilla/5.0"
      }
    };

    // 将数据转换为 JSON 字符串
    const jsonString = JSON.stringify(sb3Data, null, 2);
    
    // 创建 Blob 并下载
    const blob = new Blob([jsonString], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scratch-project-${Date.now()}.sb3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // 监听来自 iframe 的消息
  const handleMessage = (event: MessageEvent) => {
    if (event.data.type === 'PROJECT_EXPORTED') {
      // 处理导出的项目数据，创建 .sb3 文件
      const projectData = event.data.projectData;
      createSb3File(projectData);
    }
  };

  // 添加消息监听器
  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="app">
      <main>
        {mode === "editor" ? (
          <div className="scratch-editor-container">
            <div className="controls">
              <button onClick={handleExport} className="export-btn">
                导出 .sb3 文件
              </button>
            </div>
            <iframe 
              ref={iframeRef}
              src="/react-scratch-demo/scratch/index.html" 
              width="100%" 
              height="600px"
              frameBorder="0"
            />
          </div>
        ) : projectId ? (
         <ScratchPlayer projectId={projectId } />
        ) : (
          <p>请输入有效的Scratch项目ID</p>
        )}
      </main>
    </div>
  );
}

export default App;
