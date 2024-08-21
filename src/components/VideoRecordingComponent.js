import React, { useState, useRef, useEffect } from "react";
import Countdown from "react-countdown";

// VideoRecordingComponent handles video recording with a countdown timer
const VideoRecordingComponent = ({
  readingTime,
  timeLimit,
  setRecordedChunks,
  recordedChunks,
  goToSummary,
}) => {
  const [color, setTimerTextColor] = useState("black"); // Color of the timer text
  const [isRecording, setIsRecording] = useState(false); // Whether recording is in progress
  const [isReplay, setIsReplay] = useState(false); // Whether to replay the recorded video
  const [isCountdownActive, setIsCountdownActive] = useState(false); // Whether countdown is active
  const [videoURL, setVideoURL] = useState(null); // URL of the recorded video
  const [remainingTime, setRemainingTime] = useState(timeLimit); // Remaining time for recording
  const countdownStartTime = useRef(Date.now() + readingTime * 1000); // Start time for countdown
  const [areCameraAndMicAvailable, setAreCameraAndMicAvailable] =
    useState(false); // Camera and mic availability status
  const [timerText, setTimerText] = useState(timeLimit); // Displayed timer text

  const mediaRecorderRef = useRef(null); // Reference to MediaRecorder instance
  const videoRef = useRef(null); // Reference to video element
  const streamRef = useRef(null); // Reference to media stream
  const recordingTimer = useRef(null); // Timer for tracking recording duration

  // Check and initialize media devices (camera and microphone) on component mount
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        videoRef.current.srcObject = stream;
        setAreCameraAndMicAvailable(true);
      })
      .catch((error) => {
        alert(
          "Your webcam and microphone must be accessible to continue.\nReload the application once they are both accessible and ensure they remain accessible while recording."
        );
        console.error("Error accessing webcam or microphone", error);
        setAreCameraAndMicAvailable(false);
      });

    // Cleanup media stream on component unmount
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // Timer to handle the recording duration and check media access
  useEffect(() => {
    if (isRecording) {
      recordingTimer.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          const newTime = prevTime - 1;
          updateTimer(newTime);

          try {
            navigator.mediaDevices
              .getUserMedia({ video: true, audio: true })
              .then(() => {
                console.log("Microphone and camera are accessible.");
              })
              .catch((error) => {
                console.error("Microphone or camera not accessible:", error);
                alert(
                  "Recording failed.\nPlease ensure both the microphone and camera are working and reload the application."
                );
                clearInterval(recordingTimer.current);
                stopRecording();
                setAreCameraAndMicAvailable(false);
              });
          } catch {}

          return newTime;
        });
      }, 1000);
    } else if (recordingTimer.current) {
      clearInterval(recordingTimer.current); // Clear timer if not recording
    }

    // Cleanup timer on component unmount
    return () => clearInterval(recordingTimer.current);
  }, [isRecording]);

  // Effect to handle the countdown before recording starts
  useEffect(() => {
    setIsCountdownActive(true);
    const readingTimer = setTimeout(() => {
      setIsCountdownActive(false);
      startRecording(); // Start recording after reading time
    }, readingTime * 1000);

    // Cleanup countdown timer on component unmount
    return () => clearTimeout(readingTimer);
  }, [readingTime]);

  // Update the timer text and color based on the remaining time
  const updateTimer = (count) => {
    setTimerTextColor(count < 11 ? "red" : "black"); // Change color when time is less than 11 seconds
    setTimerText(count > 0 ? count : "Time's Up"); // Update timer text

    if (count <= 0) {
      setTimeout(() => {
        stopRecording(); // Automatically stop recording when time is up
      }, 100);
    }
  };

  // Start the recording process
  function startRecording() {
    setIsReplay(false);
    setIsCountdownActive(true);
    setRemainingTime(timeLimit);
    setTimerText(timeLimit);

    setTimeout(() => {
      setIsRecording(true);
      setRecordedChunks([]);

      try {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            mediaRecorderRef.current = new MediaRecorder(stream);
            mediaRecorderRef.current.ondataavailable = handleDataAvailable;
            mediaRecorderRef.current.start();
          })
          .catch((error) => {
            alert(`Failed to access microphone or webcam.`);
          });

        setIsCountdownActive(false);
      } catch (error) {
        alert(
          "Failed to start recording.\nCould not access either the microphone, webcam or both.\nPlease ensure both are working and accessible, then reload the application."
        );
        setIsRecording(false);
        setIsCountdownActive(false);
      }
    }, readingTime * 1000);
  }

  // Stop the recording process
  function stopRecording() {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  }

  // Handle data availability from the MediaRecorder
  function handleDataAvailable(event) {
    if (event.data.size > 0) {
      setRecordedChunks((prev) => [...prev, event.data]);
    }
  }

  // Replay the recorded video
  function replayRecording() {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    setVideoURL(URL.createObjectURL(blob));
    setIsReplay(true);
  }

  // Renderer for the countdown timer
  const countdownTimer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <span>Start Answering!</span>;
    } else {
      // Display minutes and seconds properly
      return (
        <span>
          {minutes > 0
            ? `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
            : seconds}
        </span>
      );
    }
  };

  return (
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
            <Countdown
              date={Date.now() + readingTime * 1000}
              renderer={countdownTimer}
            />
          </div>
        )}
        {videoURL && isReplay && <video src={videoURL} controls />}
      </div>

      <div className="button-container">
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
            </>
          )}
      </div>
    </div>
  );
};

export default VideoRecordingComponent;
