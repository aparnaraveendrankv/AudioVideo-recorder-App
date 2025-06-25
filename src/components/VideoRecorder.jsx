import React, { useRef, useState } from 'react';
import './Recorder.scss';

function VideoRecorder() {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState('');
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoRef.current.srcObject = stream;

      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        setVideoURL(URL.createObjectURL(blob));
        chunksRef.current = [];
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      alert('Camera or mic access denied.');
    }
  };

  const stopRecording = () => {
    const stream = videoRef.current.srcObject;
    stream.getTracks().forEach((track) => track.stop());
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  return (
    <div className="recorder-box">
      <h2>📹 Video Recorder</h2>
      <video ref={videoRef} autoPlay muted width={400} />

      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop' : 'Start'} Recording
      </button>

      {videoURL && (
        <div className="preview-section">
          <h4>🎞️ Preview</h4>
          <video src={videoURL} controls width={400}></video>
          <a href={videoURL} download="video_recording.webm">
            <button>Download Video</button>
          </a>
        </div>
      )}
    </div>
  );
}

export default VideoRecorder;
