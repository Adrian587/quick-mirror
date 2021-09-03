import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import useWindowDimensions from './hooks/useWindowDimensions';
function App() {
  const videoRef = useRef(null);
  const { height, width } = useWindowDimensions();
  const [isMirrorFlipped, setIsMirrorFlipped] = useState(false);

  const HEIGHT = height - 40;
  const WIDTH = width;

  useEffect(() => {
    navigator.getUserMedia(
      {
        video: true,
      },
      (stream) => {
        let video = videoRef.current;
        if (video) {
          video.srcObject = stream;
        }
      },
      (err) => console.error(err)
    );
  }, []);


  return (
    <div className="app">
      <div className="columns">
        <video
          height={HEIGHT}
          width={WIDTH}
          muted
          autoPlay
          ref={videoRef}
          className={isMirrorFlipped ? 'video-flipped' : null}
        ></video>
      </div>
      {!isMirrorFlipped ? <text> This is how your Zoom coworkers see you!</text> : null}

      <div className="app__input">
        <button onClick={() => setIsMirrorFlipped(!isMirrorFlipped)} className="button-one">
          Mirror
        </button>

      </div>
    </div>
  );
}

export default App;