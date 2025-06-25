import React, { useState } from 'react';
import AudioRecorder from './components/AudioRecorder';
import VideoRecorder from './components/VideoRecorder';
import {
  AudioOutlined,
  VideoCameraOutlined,
  CustomerServiceOutlined,
} from '@ant-design/icons';
import "./App.scss"

function App() {
  const [mode, setMode] = useState('audio');

  return (
    <div className="app-container">
      <h1>
        <CustomerServiceOutlined style={{ fontSize: 32, marginRight: 10 }} />
        Audio & Video Recorder
      </h1>

      <div className="mode-toggle">
        <button onClick={() => setMode('audio')}>
          <AudioOutlined style={{ marginRight: 8 }} />
          Audio Mode
        </button>
        <button onClick={() => setMode('video')}>
          <VideoCameraOutlined style={{ marginRight: 8 }} />
          Video Mode
        </button>
      </div>

      {mode === 'audio' ? <AudioRecorder /> : <VideoRecorder />}
    </div>
  );
}

export default App;
