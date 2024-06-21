"use client";

import { LoginContext } from "@/components/LoginContext";
import VideoForm from "@/components/VideoForm";
import { useParams } from "next/navigation";
import styles from "@/styles/dashboard/page.module.css";
import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { API_URL } from "@/app/layout";

function InstructorVideos() {
  const { logged } = useContext(LoginContext);
  const [showForm, setShowForm] = useState(false);
  const [videos, setVideos] = useState([]);
  const [messageBox, setMessageBox] = useState({
    show: false,
    message: "",
    yesFunction: null,
    noFunction: null,
  });
  const [EditMode, setEditMode] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState({});
  const params = useParams();
  
  async function GetVideos() {
    await fetch(`${API_URL}video/${params.course_id}`)
      .then((res) => res.json())
      .then((videos) => setVideos(videos.data));
  }
  useEffect(() => {
    GetVideos();
  }, [videos]);

  const CreateMessageBox = (message, yesFunction, noFunction) => {
    setMessageBox({
      show: true,
      message: message,
      yesFunction: yesFunction,
      noFunction: noFunction,
    });
  };

  const CloseMessageBox = () => {
    setMessageBox({
      show: false,
      message: "",
      yesFunction: null,
      noFunction: null,
    });
  };

  const CloseVideoForm = () => {
    setShowForm(false);
  };

  const DeleteVideo = async (video_src) => {
    await fetch(`${API_URL}video/source/${video_src}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          toast.success("Video Has Been Deleted Successfully", {
            closeOnClick: true,
            autoClose: 2000,
            theme: "dark",
          });
        } else {
          toast.error(data.message, {
            closeOnClick: true,
            autoClose: 2000,
            theme: "dark",
          });
        }
      });

    CloseMessageBox();
  };

  return (
    <>
      {logged.user ? (
        <div className={`container ${styles.content}`}>
          {logged.user.id == params.id ? (
            <>
              {messageBox.show && (
                <MessageBox
                  message={messageBox.message}
                  yesFunction={messageBox.yesFunction}
                  noFunction={messageBox.noFunction}
                />
              )}

              {showForm && (
                <div>
                  <button
                    className={styles.closeFormButton}
                    onClick={CloseVideoForm}
                  >
                    <FontAwesomeIcon icon={fas.faX} />
                  </button>
                  <VideoForm
                    EditMode={EditMode}
                    video_src={selectedVideo.video_src}
                    courseId={params.course_id}
                    CloseForm={CloseVideoForm}
                  />
                </div>
              )}

              <div className={styles.header}>
                <h1>Videos:</h1>
                <button
                  onClick={() => {
                    setEditMode(false);
                    setShowForm(true);
                  }}
                >
                  <FontAwesomeIcon icon={fas.faPlus} />
                </button>
              </div>

              {videos ? (
                <div className={styles.videosTable}>
                  <table>
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Operation</th>
                      </tr>
                    </thead>

                    <tbody>
                      {videos.map((video) => {
                        return (
                          <tr key={video.video_src}>
                            <td>{video.title}</td>
                            <td>
                              {video.description.length > 48
                                ? `${video.description.slice(0, 48)}...`
                                : video.description}
                            </td>
                            <td>{video.duration}</td>
                            <td className={styles.OperationCell}>
                              <div>
                                <button
                                  className={styles.EditBtn}
                                  onClick={() => {
                                    setSelectedVideo(video);
                                    setEditMode(true);
                                    setShowForm(true);
                                  }}
                                >
                                  <FontAwesomeIcon icon={fas.faPenToSquare} />
                                </button>
                              </div>
                              <div>
                                <button
                                  className={styles.DeleteBtn}
                                  onClick={() => {
                                    CreateMessageBox(
                                      `Are You Sure You Want To Delete ${video.title}`,
                                      () => {
                                        DeleteVideo(video.video_src);
                                      },
                                      CloseMessageBox
                                    );
                                  }}
                                >
                                  <FontAwesomeIcon icon={fas.faTrash} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <h1>No Videos Yet.</h1>
              )}
            </>
          ) : (
            <h1>Unauthorized</h1>
          )}
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  );
}

export default InstructorVideos;
