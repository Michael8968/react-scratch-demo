import React from 'react';

const ScratchPlayer: React.FC<{ projectId: string }> = ({ projectId }) => {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <iframe
        src={`https://scratch.mit.edu/projects/${projectId}/embed`}
        title="Scratch Project"
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default ScratchPlayer;