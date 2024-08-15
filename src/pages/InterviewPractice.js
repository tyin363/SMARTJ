import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Countdown from 'react-countdown';
import '../InterviewPractice.css';

function InterviewPractice() {
  const navigate = useNavigate();
  
  const [color,setTimerTextColor]=useState('black');
  const [isRecording, setIsRecording] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoURL, setVideoURL] = useState(null);
  const timeLimit = 20;
  const [timerText, setTimerText] = useState(timeLimit);
  // CHANGED: Converted remainingTime to a state variable
  const [remainingTime, setRemainingTime] = useState(timeLimit);
  const recordingTimer = useRef(null);
  
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    // Access the webcam and set up the preview
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        streamRef.current = stream; // Save the stream reference
        videoRef.current.srcObject = stream; // Set the video element's source to the stream
      })
      .catch(error => console.error('Error accessing webcam:', error));

    // Cleanup: stop the webcam when the component unmounts
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks(); // Gets the media tracks from the stream
        tracks.forEach(track => track.stop()); // Stop each track
      }
    };
  }, []);

  useEffect(() => {
    // Check if the recording is active
    if (isRecording) {
      // CHANGED: Update remainingTime using setState
      recordingTimer.current = setInterval(() => {
        setRemainingTime(prevTime => {
          const newTime = prevTime - 1;
          updateTimer(newTime);
          return newTime;
        });
      }, 1000); 
    } 
    else if (recordingTimer.current) {
      clearInterval(recordingTimer.current);
    }

    // Cleanup function to clear the interval when the component unmounts or isRecording changes
    return () => clearInterval(recordingTimer.current);
  }, [isRecording]); // Dependency array to re-run the effect when isRecording changes

  // CHANGED: Updated to use the count parameter
  const updateTimer = (count) => {
    setTimerTextColor(count < 11 ? 'red' : 'black');
    setTimerText(count > 0 ? count : "Time's Up");

    if (count <= 0) {
      setTimeout(()=>{
      stopRecording();},100);
    }
  };

  function startRecording() {
    setIsReplay(false);
    setIsCountdownActive(true);
    // CHANGED: Reset remainingTime
    setRemainingTime(timeLimit);
    setTimerText(timeLimit);
    setTimerTextColor('black');
    const countdown=setTimeout(() => {
      setIsRecording(true); 
      setRecordedChunks([]);

      mediaRecorderRef.current = new MediaRecorder(streamRef.current); // Create a MediaRecorder with the stream
      mediaRecorderRef.current.ondataavailable = handleDataAvailable;

      mediaRecorderRef.current.start(); // Starts the recording process
      setIsCountdownActive(false);
    }, 3000);
  }

  function stopRecording() {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    
    setIsRecording(false); 
  }

  //checks if any data was recorded and adds it to the recordedChunks array
  function handleDataAvailable(event) {
    if (event.data.size > 0) {
       setRecordedChunks(prev => [...prev, event.data]);
    }
  }

  //saves the recorded chunks as a Blob and displays it as a video
  function replayRecording() {
    const blob = new Blob(recordedChunks, { type: 'video/webm' });

    setVideoURL(URL.createObjectURL(blob));

    setIsReplay(true);
  }

  //countdown before video starts recording
  function countdownTimer({ seconds, completed }) {
    if (completed) {   return <span>Go!</span>; 
    } else { return <span>{seconds}</span>; 
    }
  }

  // CHANGED: Updated goToSummary function to use current remainingTime
  function goToSummary() {
    const duration = timeLimit - remainingTime;
    navigate('/summary', { 
      state: { 
        duration: duration,
        date: new Date().toLocaleDateString(),
        question: "Tell me about a challenging project you've worked on."
      } 
    });
  }

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Interview Practice</h1>
      <p className="lead">
        Prepare for your interviews with our customizable practice questions and
        recording features.
      </p>
      <div>
        <div className='timer-text'>
          <h2 style={{color, display:isReplay? "none":"inline"}}>{timerText}</h2>
        </div>

        <div className="video-container" >
          <video
            ref={videoRef}
            autoPlay
            muted
            style={{  display: isReplay ? "none" : "inline" }}
          />
          
          {isCountdownActive && (
            <div className="overlay-text" >
              <Countdown date={Date.now() + 3000} renderer={countdownTimer} />
            </div>
          )}

          {videoURL && isReplay && (
            <video src={videoURL} controls   onPlay={(e) => {
              console.log(`Video length: ${e.target.duration} seconds`);
            }}/>
          )}
        </div>
      </div>

      <div className='button-container'>
        {!isRecording && !isCountdownActive && (
          <button onClick={startRecording} className="btn btn-primary">Start New Recording</button>
        )}
        
        <button 
          onClick={stopRecording} 
          style={{ display: (isRecording && !isCountdownActive)? "inline" : "none" }} 
          className="btn btn-primary"
        >
          Stop Recording
        </button>

        {recordedChunks.length > 0 && !isRecording && !isReplay && !isCountdownActive && (
          <>
            <button onClick={replayRecording} className="btn btn-primary me-2">Replay Recording</button>
            {/* ADDED: New Next button */}
            <button onClick={goToSummary} className="btn btn-success">Next</button>
          </>
        )}
      </div>
    </div>
  );
}

export default InterviewPractice;