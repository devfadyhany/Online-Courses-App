"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "@/styles/watch/page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "@/app/layout";
import { useRouter } from "next/navigation";

function VideoPlayer({ selectedVideoSrc, videosList, course_id }) {
  const router = useRouter();

  const video = useRef(null);
  const videoContainer = useRef(null);
  const volumeSlider = useRef(null);

  const [videoPlaying, setVideoPlaying] = useState(false);
  const [overlay, setOverlay] = useState({
    play: false,
    pause: false,
    forward: false,
    backward: false,
    volume: false,
    speed: false,
  });
  const [showOverlay, setShowOverlay] = useState(false);
  const [fullscreenState, setFullscreenState] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState("1x");

  useEffect(() => {
    document.addEventListener("keydown", (e) => HandleShortcuts(e));
  }, []);

  const HandleShortcuts = (e) => {
    switch (e.key.toLowerCase()) {
      case " ":
      case "k":
        togglePlay();
        break;
      case "f":
        toggleFullScreenMode();
        break;
      case "m":
        toggleMute();
        break;
      case "arrowup":
        changeVol(0.05);
        break;
      case "arrowdown":
        changeVol(-0.05);
        break;
      case "arrowleft":
      case "j":
        skip(-5);
        break;
      case "arrowright":
      case "l":
        skip(5);
        break;
    }
  };

  const changePlaybackSpeed = () => {
    if (video.current == null) return;

    let newPlaybackRate = video.current.playbackRate + 0.25;
    if (newPlaybackRate > 2) newPlaybackRate = 0.25;
    video.current.playbackRate = newPlaybackRate;
    setSpeed(`${newPlaybackRate}x`);

    setOverlay({
      play: false,
      pause: false,
      forward: false,
      backward: false,
      volume: false,
      speed: true,
    });

    setShowOverlay(true);
    setTimeout(() => {
      setShowOverlay(false);
    }, 1000);
  };

  const leadingZeroFormater = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });

  const formatDuration = (time) => {
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor(time / 60) % 60;
    const hours = Math.floor(time / 3600);

    if (hours === 0) {
      return `${minutes}:${leadingZeroFormater.format(seconds)}`;
    } else {
      return `${hours}:${leadingZeroFormater.format(
        minutes
      )}:${leadingZeroFormater.format(seconds)}`;
    }
  };

  const skip = (skipAmount) => {
    if (video.current == null) return;

    video.current.currentTime += skipAmount;

    if (skipAmount > 0) {
      setOverlay({
        play: false,
        pause: false,
        forward: true,
        backward: false,
        volume: false,
        speed: false,
      });
    } else {
      setOverlay({
        play: false,
        pause: false,
        forward: false,
        backward: true,
        volume: false,
        speed: false,
      });
    }

    setShowOverlay(true);
    setTimeout(() => {
      setShowOverlay(false);
    }, 1000);
  };

  const toggleMute = () => {
    if (video.current == null) return;

    video.current.muted = !video.current.muted;
    setMuted(!muted);
  };

  const changeVol = (amount) => {
    if (video.current == null) return;

    if (video.current.volume + amount <= 0) {
      video.current.volume = 0;
    } else if (video.current.volume + amount >= 1) {
      video.current.volume = 1;
    } else {
      video.current.volume += amount;
    }

    setVolume(video.current.volume);

    setOverlay({
      play: false,
      pause: false,
      forward: false,
      backward: false,
      volume: true,
      speed: false,
    });

    setShowOverlay(true);
    setTimeout(() => {
      setShowOverlay(false);
    }, 1000);
  };

  const toggleFullScreenMode = () => {
    if (videoContainer.current == null) return;

    if (document.fullscreenElement == null) {
      videoContainer.current.requestFullscreen();
      setFullscreenState(true);
    } else {
      document.exitFullscreen();
      setFullscreenState(false);
    }
  };

  const togglePlay = async () => {
    if (video.current == null) return;

    video.current.paused ? video.current.play() : video.current.pause();

    if (video.current.paused) {
      setOverlay({
        play: false,
        pause: true,
        forward: false,
        backward: false,
        volume: false,
        speed: false,
      });
    } else {
      setOverlay({
        play: true,
        pause: false,
        forward: false,
        backward: false,
        volume: false,
        speed: false,
      });
    }

    setShowOverlay(true);
    await setTimeout(() => {
      setShowOverlay(false);
    }, 1000);
  };

  return (
    <div
      ref={videoContainer}
      className={`${styles.videoContainer} ${!videoPlaying && styles.paused} ${
        styles.hideOverlay
      } ${fullscreenState && styles.fullscreen}`}
      onDoubleClick={toggleFullScreenMode}
      onKeyDown={(e) => {
        HandleShortcuts(e);
      }}
    >
      {showOverlay && (
        <div className={`${styles.iconOverlay}`}>
          <div className={styles.icon}>
            {overlay.speed && <h5 className={styles.speedO}>{speed}</h5>}
            {overlay.play && (
              <FontAwesomeIcon icon={fas.faPlay} className={styles.playO} />
            )}
            {overlay.pause && (
              <FontAwesomeIcon icon={fas.faPause} className={styles.pauseO} />
            )}
            {overlay.forward && (
              <FontAwesomeIcon
                icon={fas.faForward}
                className={styles.forwardO}
              />
            )}
            {overlay.backward && (
              <FontAwesomeIcon
                icon={fas.faBackward}
                className={styles.backwardO}
              />
            )}
            {overlay.volume && (
              <h5 className={styles.volumeO}>{Math.round(volume * 100)}</h5>
            )}
          </div>
        </div>
      )}

      <div className={styles.videoControlsContainer}>
        <div className={styles.controls}>
          <button onClick={togglePlay} className={styles.playPauseBtn}>
            {videoPlaying ? (
              <FontAwesomeIcon
                icon={fas.faPause}
                className={styles.pauseIcon}
              />
            ) : (
              <FontAwesomeIcon icon={fas.faPlay} className={styles.playIcon} />
            )}
          </button>

          <div className={styles.volumeContainer}>
            <button onClick={toggleMute} className={styles.muteBtn}>
              {!muted ? (
                <>
                  {volume > 0.5 && (
                    <FontAwesomeIcon
                      icon={fas.faVolumeHigh}
                      className={styles.highVolumeIcon}
                    />
                  )}

                  {volume <= 0.5 && (
                    <FontAwesomeIcon
                      icon={fas.faVolumeLow}
                      className={styles.lowVolumeIcon}
                    />
                  )}
                </>
              ) : (
                <FontAwesomeIcon
                  icon={fas.faVolumeXmark}
                  className={styles.muteIcon}
                />
              )}
            </button>
            <input
              ref={volumeSlider}
              className={styles.volumeSlider}
              type="range"
              min="0"
              max="1"
              step="any"
              value={volume}
              onChange={(e) => {
                video.current.volume = e.target.value;
                video.current.muted = e.target.value === 0;
                setVolume(e.target.value);
              }}
            />
          </div>

          <div className={styles.durationContainer}>
            <div className={styles.currentTime}>{currentTime}</div>/
            <div className={styles.totalTime}>{duration}</div>
          </div>

          <select
            className={styles.videosList}
            value={selectedVideoSrc}
            onChange={(e) => {
              router.push(`/course/${course_id}/watch?video=${e.target.value}`);
            }}
          >
            {videosList.map((video) => {
              return (
                <option key={video.video_src} value={video.video_src}>
                  {video.title}
                </option>
              );
            })}
          </select>

          <button
            onClick={changePlaybackSpeed}
            className={`${styles.speedBtn} ${styles.wide}`}
          >
            {speed}
          </button>

          <button
            onClick={toggleFullScreenMode}
            className={styles.fullscreenBtn}
          >
            {fullscreenState ? (
              <FontAwesomeIcon
                icon={fas.faCompress}
                className={styles.minimizeIcon}
              />
            ) : (
              <FontAwesomeIcon
                icon={fas.faExpand}
                className={styles.fullscreenIcon}
              />
            )}
          </button>
        </div>
      </div>
      <video
        ref={video}
        onClick={(e) => togglePlay(e)}
        onPlay={() => {
          setVideoPlaying(true);
        }}
        onPause={() => {
          setVideoPlaying(false);
        }}
        onVolumeChange={() => {
          volumeSlider.current.value = video.current.volume;
          let volumeLevel;
          if (video.current.muted || video.current.volume === 0) {
            volumeSlider.current.value = 0;
            setMuted(true);
          } else {
            setMuted(false);
          }
          videoContainer.current.dataset.volumeLevel = volumeLevel;
        }}
        onLoadedData={() => {
          setDuration(formatDuration(video.current.duration));
        }}
        onTimeUpdate={() => {
          setCurrentTime(formatDuration(video.current.currentTime));
        }}
        src={`${API_URL}video/sources/${selectedVideoSrc}`}
      ></video>
    </div>
  );
}

export default VideoPlayer;
