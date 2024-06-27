"use client";

import { API_URL } from "@/app/layout";
import styles from "@/styles/dashboard/page.module.css";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const VideoForm = ({ EditMode, video_src, CloseForm }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [duration, setDuration] = useState(0);
  const [preview, setPreview] = useState("");
  const videoElement = useRef(null);
  const params = useParams();
  const formData = new FormData();

  useEffect(() => {
    async function fetchData() {
      await fetch(`${API_URL}video/source/${video_src}`)
        .then((res) => res.json())
        .then(async (video) => {
          setTitle(video.data.title);
          setDescription(video.data.description);
        });
    }

    if (EditMode) {
      fetchData();
    }
  }, []);

  const ValidData = (title, description, duration) => {
    if (title.length < 3) {
      toast.error("Invalid title", {
        closeOnClick: true,
        autoClose: 2000,
        theme: "dark",
      });
      return false;
    }

    if (description.length < 3) {
      toast.error("Invalid description", {
        closeOnClick: true,
        autoClose: 2000,
        theme: "dark",
      });
      return false;
    }

    if (duration == 0){
      return false;
    }

    return true;
  };

  const AddVideo = async () => {
    if (ValidData(title, description)) {
      if (video) {
        const file = new File([video], `${Date.now()}${video.name[0]}`);
        formData.append("video", file);

        await fetch(`${API_URL}video/`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            video_src: file.name,
            title: title,
            description: description,
            duration: duration,
            course_id: params.course_id,
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            await fetch(`${API_URL}video/upload`, {
              method: "POST",
              body: formData,
            });

            if (data.status === 200) {
              toast.success("New Video Has Been Added Successfully", {
                closeOnClick: true,
                autoClose: 2000,
                theme: "dark",
                onClose: CloseForm,
              });
              CloseForm();
            } else {
              toast.error(data.message, {
                closeOnClick: true,
                autoClose: 2000,
                theme: "dark",
              });
            }
          });
      }
    }
  };

  const EditVideo = async () => {
    if (ValidData(title, description)) {
      await fetch(`${API_URL}video/source/${video_src}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            toast.success("Video Has Been Edited Successfully", {
              closeOnClick: true,
              autoClose: 2000,
              theme: "dark",
              onClose: CloseForm,
            });
          } else {
            toast.error(data.message, {
              closeOnClick: true,
              autoClose: 2000,
              theme: "dark",
            });
          }
        });
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (EditMode) {
      await EditVideo();
    } else {
      await AddVideo();
    }
  };

  const HandleLoadedMetaData = () => {
    const videoEl = videoElement.current;

    if (!videoEl) return;

    setDuration(videoEl.duration);
  };

  return (
    <>
      <div className={styles.createVideoFormOverlay}>
        <form
          onSubmit={HandleSubmit}
          encType="multipart/form-data"
          className={styles.createVideoForm}
        >
          <h1 className={styles.formTitle}>
            {EditMode ? "Edit" : "Add A New"} Video
          </h1>

          <input
            type="text"
            name="title"
            value={title}
            placeholder="Enter video title..."
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            rows={5}
            cols={64}
            name="description"
            value={description}
            placeholder="Enter video description..."
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          {!EditMode && (
            <div className={styles.fileGroup}>
              <div>
                <p>Upload Video:</p>
                <input
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={(e) => {
                    setVideo(e.target.files[0]);
                    setPreview(URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </div>
              <video
                src={preview}
                width={100}
                height={100}
                ref={videoElement}
                onLoadedMetadata={HandleLoadedMetaData}
              ></video>
            </div>
          )}

          <button type="submit">{EditMode ? "Edit" : "Add"}</button>
        </form>
      </div>
    </>
  );
};

export default VideoForm;
