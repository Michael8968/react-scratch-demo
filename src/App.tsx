import React, { useState } from 'react';
import ScratchEditor from './components/ScratchEditor';
import ScratchPlayer from './components/ScratchPlayer';
import './App.css';

function App() {
  const [mode, setMode] = useState('editor'); // 'editor' 或 'player'
  const [projectId, setProjectId] = useState('');

  return (
    <div className="app">
      <header>
        <h1>React Scratch 集成演示</h1>
        <div className="controls">
          <button onClick={() => setMode('editor')}>编辑器</button>
          <button onClick={() => setMode('player')}>播放器</button>
          <input
            type="text"
            placeholder="输入Scratch项目ID"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
          />
        </div>
      </header>
      
      <main>
        {mode === 'editor' ? (
          <ScratchEditor projectId={projectId} />
        ) : (
          projectId ? (
            <ScratchPlayer projectId={projectId} />
          ) : (
            <p>请输入有效的Scratch项目ID</p>
          )
        )}
      </main>
    </div>
  );
}

export default App;