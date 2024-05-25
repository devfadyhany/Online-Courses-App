const playPauseBtn = document.querySelector(".playPauseBtn");
const fullscreenBtn = document.querySelector(".fullscreenBtn");
const muteBtn = document.querySelector(".muteBtn");
const speedBtn = document.querySelector(".speedBtn");

const volumeSlider = document.querySelector(".volumeSlider");

const currentTimeElement = document.querySelector(".currentTime");
const totalTimeElement = document.querySelector(".totalTime");

const previewImg = document.querySelector(".previewImg");
const thumbnailImg = document.querySelector(".thumbnailImg");

const timelineContainer = document.querySelector(".timelineContainer");

const overlayIcon = document.querySelector(".icon");
const volumeOverlay = document.querySelector(".volumeO");
const speedOverlay = document.querySelector(".speedO");

const videoContainer = document.querySelector(".videoContainer");
const video = document.querySelector("video");

// Shortcuts
document.addEventListener("keydown", (e) => {
  const tagName = document.activeElement.tagName.toLowerCase();

  if (tagName === "input") return;

  switch (e.key.toLowerCase()) {
    case " ":
      if (tagName === "button") return;
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
});

// Timeline

timelineContainer.addEventListener("mousemove", handleTimelineUpdate);
timelineContainer.addEventListener("mousedown", toggleScrubbing);

document.addEventListener("mouseup", (e) => {
  if (isScrubbing) toggleScrubbing(e);
});

document.addEventListener("mousemove", (e) => {
  if (isScrubbing) toggleScrubbing(e);
});

let isScrubbing = false;
function toggleScrubbing(e) {
  const rect = timelineContainer.getBoundingClientRect();
  const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;

  isScrubbing = (e.buttons & 1) === 1;

  videoContainer.classList.toggle("scrubbing", isScrubbing);
  if (isScrubbing) {
    wasPaused = video.paused;
    video.pause();
  } else {
    video.currentTime = percent * video.duration;
    if (!wasPaused) video.play();
  }

  handleTimelineUpdate();
}

function handleTimelineUpdate(e) {
  const rect = timelineContainer.getBoundingClientRect();
  const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
  const previewImgNumber = Math.max(
    1,
    Math.floor((percent * video.duration) / 10)
  );
  previewImgSrc = `previewImgs/preview${previewImgNumber}.jpg`;
  previewImg.src = previewImgSrc;
  timelineContainer.style.setProperty("--preview-position", percent);

  if (isScrubbing) {
    e.preventDefault();
    thumbnailImg.src = previewImgSrc;
    timelineContainer.style.setProperty("--progress-position", percent);
  }
}

// Playback Speed
speedBtn.addEventListener("click", changePlaybackSpeed);

function changePlaybackSpeed() {
  let newPlaybackRate = video.playbackRate + 0.25;
  if (newPlaybackRate > 2) newPlaybackRate = 0.25;
  video.playbackRate = newPlaybackRate;
  speedBtn.textContent = `${newPlaybackRate}x`;


  clearOverlay();

  speedOverlay.textContent = `${newPlaybackRate}x`;
  overlayIcon.classList.add("speed");

  videoContainer.classList.remove("hideOverlay");
  setTimeout(() => {
    videoContainer.classList.add("hideOverlay");
    clearOverlay();
  }, 500);
}

// Duration
video.addEventListener("loadeddata", () => {
  totalTimeElement.textContent = formatDuration(video.duration);
});

video.addEventListener("timeupdate", () => {
  currentTimeElement.textContent = formatDuration(video.currentTime);
  const percent = video.currentTime / video.duration;
  timelineContainer.style.setProperty("--progress-position", percent);
});

const leadingZeroFormater = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

function formatDuration(time) {
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
}

function skip(duration) {
  video.currentTime += duration;

  clearOverlay();
  if (duration > 0) {
    overlayIcon.classList.add("forward");
  } else {
    overlayIcon.classList.add("backward");
  }

  videoContainer.classList.remove("hideOverlay");
  setTimeout(() => {
    videoContainer.classList.add("hideOverlay");
    clearOverlay();
  }, 500);
}

// Volume
muteBtn.addEventListener("click", toggleMute);
volumeSlider.addEventListener("input", (e) => {
  video.volume = e.target.value;
  video.muted = e.target.value === 0;
});

function toggleMute() {
  video.muted = !video.muted;
}

video.addEventListener("volumechange", () => {
  volumeSlider.value = video.volume;
  let volumeLevel;
  if (video.muted || video.volume === 0) {
    volumeSlider.value = 0;
    volumeLevel = "muted";
  } else if (video.volume >= 0.5) {
    volumeLevel = "high";
  } else {
    volumeLevel = "low";
  }
  videoContainer.dataset.volumeLevel = volumeLevel;
});

function changeVol(amount) {
  if (video.volume + amount <= 0) {
    video.volume = 0;
  } else if (video.volume + amount >= 1) {
    video.volume = 1;
  } else {
    video.volume += amount;
  }

  clearOverlay();

  volumeOverlay.textContent = Math.round(video.volume * 100);
  overlayIcon.classList.add("volume");

  videoContainer.classList.remove("hideOverlay");
  setTimeout(() => {
    videoContainer.classList.add("hideOverlay");
    clearOverlay();
  }, 500);
}

// FullScreen
fullscreenBtn.addEventListener("click", toggleFullScreenMode);
videoContainer.addEventListener("dblclick", toggleFullScreenMode);

function toggleFullScreenMode() {
  if (document.fullscreenElement == null) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

document.addEventListener("fullscreenchange", () => {
  videoContainer.classList.toggle("fullScreen");
});

// Play/Pause
playPauseBtn.addEventListener("click", togglePlay);
video.addEventListener("click", togglePlay);

function togglePlay() {
  video.paused ? video.play() : video.pause();

  clearOverlay();

  if (video.paused) {
    overlayIcon.classList.add("pause");
  } else {
    overlayIcon.classList.add("play");
  }

  videoContainer.classList.remove("hideOverlay");
  setTimeout(() => {
    videoContainer.classList.add("hideOverlay");
    clearOverlay();
  }, 500);
}

video.addEventListener("play", () => {
  videoContainer.classList.remove("paused");
});

video.addEventListener("pause", () => {
  videoContainer.classList.add("paused");
});

function clearOverlay() {
  overlayIcon.classList.remove("play");
  overlayIcon.classList.remove("pause");
  overlayIcon.classList.remove("forward");
  overlayIcon.classList.remove("backward");
  overlayIcon.classList.remove("volume");
  overlayIcon.classList.remove("speed");
}
