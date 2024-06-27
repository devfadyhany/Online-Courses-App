"use client";

import { API_URL } from "@/app/layout";
import VideoPlayer from "@/components/VideoPlayer";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "@/styles/watch/page.module.css";

function WatchCourse() {
  const searchParams = useSearchParams();
  const params = useParams();
  const [videosList, setVideosList] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({});

  const GetVideos = async () => {
    await fetch(`${API_URL}video/${params.course_id}`)
      .then((res) => res.json())
      .then((videos) => setVideosList(videos.data));
  };

  const GetSelectedVideo = async () => {
    await fetch(`${API_URL}video/source/${searchParams.get("video")}`)
      .then((res) => res.json())
      .then((video) => setSelectedVideo(video.data));
  };

  useEffect(() => {
    try {
      GetVideos();
      GetSelectedVideo();
    } catch (err) {
      console.log("Failed To Retreive Videos");
    }
  }, [searchParams]);

  return (
    <>
      <VideoPlayer
        selectedVideoSrc={searchParams.get("video")}
        videosList={videosList}
        course_id={params.course_id}
      />
      {selectedVideo && (
        <div className={styles.videoInfo}>
          <h1>Description:</h1>
          <p>{selectedVideo.description}</p>
        </div>
      )}
    </>
  );
}

export default WatchCourse;
