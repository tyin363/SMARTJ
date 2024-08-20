import React, { useState, useRef, useEffect } from "react";
import Countdown from "react-countdown";

const VideoRecordingComponent = ({
  readingTime,
  timeLimit,
  setRecordedChunks,
  recordedChunks,
  goToSummary,
}) => {
  const [color, setTimerTextColor] = useState("black");
  const [isRecording, setIsRecording] = useState(false);
  const [isReplay, setIsReplay] = useState(false);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const [remainingTime, setRemainingTime] = useState(timeLimit);
  const countdownStartTime = useRef(Date.now() + readingTime * 1000);
  const [areCameraAndMicAvailable, setAreCameraAndMicAvailable] =
    useState(false);
  const [timerText, setTimerText] = useState(timeLimit);

  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recordingTimer = useRef(null);

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
      clearInterval(recordingTimer.current);
    }

    return () => clearInterval(recordingTimer.current);
  }, [isRecording]);

  // Effect to handle readingTime countdown
  useEffect(() => {
    setIsCountdownActive(true);
  }, [readingTime]);

  const updateTimer = (count) => {
    setTimerTextColor(count < 11 ? "red" : "black");
    setTimerText(count > 0 ? count : "Time's Up");

    if (count <= 0) {
      setTimeout(() => {
        stopRecording();
      }, 100);
    }
  };

  function startRecording() {
    setIsReplay(false);
    setIsCountdownActive(false); // Hide reading time once recording starts
    setRemainingTime(timeLimit);
    setTimerText(timeLimit);

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
    } catch (error) {
      alert(
        "Failed to start recording.\nCould not access either the microphone, webcam or both.\nPlease ensure both are working and accessible, then reload the application."
      );
      setIsRecording(false);
    }
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

  // Renderer for the countdown
  const countdownTimer = ({ minutes, seconds, completed }) => {
    if (completed) {
      startRecording();
      return <span>Start Answering!</span>;
    } else {
      // Display minutes and seconds properly
      return (
        <span style={{ fontSize: "20px", color: "red", backgroundColor: "#555", padding: "6px", borderRadius: "8px", display: "inline-block", width: "40px", textAlign: "center" }}>
          {minutes > 0
            ? `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
            : seconds}
        </span>
      );
    }
  };

  return (
    <div>
      {!isRecording && isCountdownActive && ( // Show only if countdown is active
        <div className="reading-time-container" style={{ fontSize: "18px" }}>
          {isCountdownActive && (
            <Countdown
              date={Date.now() + readingTime * 1000}
              renderer={countdownTimer}
            />
          )}
          {isCountdownActive && (
            <button
              onClick={() => {
                setIsCountdownActive(false);
                startRecording();
              }}
              className="btn btn-primary"
              style={{
                backgroundColor: "#ffcccc", // Light red color
                borderColor: "black",
                color: "black",
              }}
            >
              Skip Reading Time
            </button>
          )}
        </div>
      )}

      <div className="timer-text">
        <h5 style={{ color, display: isReplay ? "none" : "inline" }}>
          Answer Time: {timerText}
        </h5>
      </div>

      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          muted
          style={{ display: isReplay ? "none" : "inline" }}
        />
        {videoURL && isReplay && <video src={videoURL} controls />}
      </div>

      <div className="button-container">
        <button
          onClick={stopRecording}
          style={{
            display: isRecording && !isCountdownActive ? "inline" : "none", borderColor: "black"
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
              <button style={{borderColor: "black"}} onClick={replayRecording}className="btn btn-primary me-2">
                Replay Recording
              </button>
            </>
          )}
      </div>
    </div>
  );
};

export default VideoRecordingComponent;
