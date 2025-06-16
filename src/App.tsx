import { useState } from "react";
// import ScratchEditor from './components/ScratchEditor';
import ScratchPlayer from "./components/ScratchPlayer";

import "./App.css";

function App() {
  const [mode] = useState("editor"); // 'editor' 或 'player'
  const [projectId] = useState("");
  return (
    <div className="app">
      <main>
        {mode === "editor" ? (
          <iframe src="/scratch/index.html" />
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
