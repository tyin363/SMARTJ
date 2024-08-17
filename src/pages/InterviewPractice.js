import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Countdown from "react-countdown";
import QuestionComponent from "../components/QuestionComponent";
import "../InterviewPractice.css";

function InterviewPractice() {
  const navigate = useNavigate();
  const location = useLocation();

  const [color, setTimerTextColor] = useState("black");
  const [isRecording, setIsRecording] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [videoURL, setVideoURL] = useState(null);
  const [areCameraAndMicAvailable, setAreCameraAndMicAvailable] = useState(false);
  const timeLimit = 20;
  const [timerText, setTimerText] = useState(timeLimit);
  const [remainingTime, setRemainingTime] = useState(timeLimit);
  const recordingTimer = useRef(null);

  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Extract questionType from URL parameters
  const queryParams = new URLSearchParams(location.search);
  const questionType = queryParams.get("questionType") || "Behavioural";

  useEffect(() => {
    // Access the webcam and set up the preview
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        streamRef.current = stream; // Save the stream reference
        videoRef.current.srcObject = stream; // Set the video element's source to the stream
        setAreCameraAndMicAvailable(true);
        
      })
      .catch(error => {
       alert("Your webcam and microphone must be accessible to continue.\nReload the application once they are both accessible and ensure they remain accessible while recording.");
        console.error('Error accessing webcam or microphone', error);
        setAreCameraAndMicAvailable(false);
        // You can add additional error handling logic here, such as displaying a message to the user
      });

    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);
  



  useEffect(() => {
    if (isRecording) {
      recordingTimer.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          const newTime = prevTime - 1;
          updateTimer(newTime);
          
          try {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
              .then(() => {
                // Devices are accessible
                console.log('Microphone and camera are accessible.');
              })
              .catch(error => {
                // Handle the error if devices are not accessible
                console.error('Microphone or camera not accessible:', error);
                alert('Recording failed.\nPlease ensure both the microphone and camera are working and reload the application.');
                clearInterval(recordingTimer.current);
                stopRecording();
                setAreCameraAndMicAvailable(false);
              });
          }
          catch{}

          return newTime;
        });
      }, 1000);
    } else if (recordingTimer.current) {
      clearInterval(recordingTimer.current);
    }

    return () => clearInterval(recordingTimer.current);
  }, [isRecording]);

  // CHANGED: Updated to use the count parameter
  const updateTimer = (count) => {
    setTimerTextColor(count < 11 ? "red" : "black");
    setTimerText(count > 0 ? count : "Time's Up");

    if (count <= 0) {
      setTimeout(()=>{
      stopRecording();},100);
    }
  };

  function startRecording() {
    setIsReplay(false);
    setIsCountdownActive(true);
    setRemainingTime(timeLimit);
    setTimerText(timeLimit);
    const countdown=setTimeout(() => {
      setIsRecording(true); 
      setRecordedChunks([]);
      try {
        // Attempt to create a MediaRecorder with the stream
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
         
        })
        .catch(error => {
          // This is where the error is caught if getUserMedia fails
          alert(`Failed to access microphone or webcam.`);
        });
      
        mediaRecorderRef.current = new MediaRecorder(streamRef.current);
        mediaRecorderRef.current.ondataavailable = handleDataAvailable;
  
        mediaRecorderRef.current.start();
        
      
        setIsCountdownActive(false);
      
       
      } catch (error) {
        // Handle the case where the MediaRecorder fails to start
        alert("Failed to start recording.\nCould not access either the microphone, webcam or both.\nPlease ensure both are working and accessible, then reload the application.");
        setIsRecording(false); // Reset the recording state
        setIsCountdownActive(false); // Stop the countdown if it was running
      }
    }, 3000);
  }

   
    

  function stopRecording() {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    setIsRecording(false);
  }

  function handleDataAvailable(event) {
    if (event.data.size > 0) {
      setRecordedChunks((prev) => [...prev, event.data]);
    }
  }

  function replayRecording() {
    const blob = new Blob(recordedChunks, { type: "video/webm" });

    setVideoURL(URL.createObjectURL(blob));

    setIsReplay(true);
  }

  function countdownTimer({ seconds, completed }) {
    if (completed) {
      return <span>Go!</span>;
    } else {
      return <span>{seconds}</span>;
    }
  }

  function goToSummary() {
    const duration = timeLimit - remainingTime;
    navigate("/summary", {
      state: {
        duration: duration,
        date: new Date().toLocaleDateString(),
        question: "Tell me about a challenging project you've worked on.",
      },
    });
  }

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">Interview Practice</h1>
      <QuestionComponent questionType={questionType} />
      <p className="lead">
        Prepare for your interviews with our customizable practice questions and
        recording features.
      </p>
      <div>
        <div className="timer-text">
          <h2 style={{ color, display: isReplay ? "none" : "inline" }}>
            {timerText}
          </h2>
        </div>

        <div className="video-container">
          <video
            ref={videoRef}
            autoPlay
            muted
            style={{ display: isReplay ? "none" : "inline" }}
          />

          {isCountdownActive && (
            <div className="overlay-text">
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
        {!isRecording && !isCountdownActive && areCameraAndMicAvailable && areCameraAndMicAvailable &&  (
          <button onClick={startRecording}  className="btn btn-primary">Start New Recording</button>
        )}

        <button
          onClick={stopRecording}
          style={{
            display: isRecording && !isCountdownActive ? "inline" : "none",
          }}
          className="btn btn-primary"
        >
          Stop Recording
        </button>

        {recordedChunks.length > 0 &&
          !isRecording &&
          !isReplay &&
          !isCountdownActive && (
            <>
              <button
                onClick={replayRecording}
                className="btn btn-primary me-2"
              >
                Replay Recording
              </button>
              <button onClick={goToSummary} className="btn btn-success">
                Next
              </button>
            </>
          )}
      </div>
    </div>
  );
}

export default InterviewPractice;
