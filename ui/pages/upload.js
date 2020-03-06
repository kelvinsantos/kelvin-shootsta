import React from 'react';
import fetch from 'unfetch'

// material ui
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// default layout
import Layout from '../components/MyLayout';

// utils
import { API_URL, POST_VIDEOS_ENDPOINT } from '../utils/constants';

async function fetcher(path, formData) {
  const res = await fetch(API_URL + path, {
    method: 'POST',
    body: formData
  });
  const json = await res.json();
  return json
}

async function capture() {
  var canvas = document.getElementById('canvas');
  var video = document.getElementById('video');
  // video.currentTime = 2;
  canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
}

export default function Upload() {
  const [ loading, setLoading ] = React.useState(false);
  const [ video, setVideo ] = React.useState(false);
  const [ videoObjectURL, setVideoObjectURL ] = React.useState(false);

  function handleCapture({ target }) {
    setVideo(target.files[0]);
    setVideoObjectURL(URL.createObjectURL(target.files[0]));
  };

  async function uploadVideo() {
    setLoading(true);

    try {
      await capture();
      var canvas = document.getElementById(`canvas`);
      var pngUrl = canvas.toDataURL();
      let formData = new FormData();
      formData.append("file", video);
      formData.append("thumbnail", pngUrl);
      let data = await fetcher(POST_VIDEOS_ENDPOINT, formData);
      if (data) {
        setVideo("");
        setVideoObjectURL("");
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout title="Upload">
      <h3>
        Upload video
      </h3>

      <video id="video" src={videoObjectURL} type="video/mp4" controls />
      <canvas id="canvas" style={{ display: "none"  }} />

      <p>Note: Selected video timeframe will be the video thumbnail.</p>

      <Button
        variant="contained"
        component="label"
      >
        Select Video
        <input
          type="file"
          style={{ display: "none" }}
          onChange={handleCapture}
        />
      </Button>
      <br />
      <br />
      {
        loading
        ?
        <CircularProgress />
        :
        <Button variant="contained" color="primary" onClick={uploadVideo} disabled={!video}>
          Upload Video
        </Button>
      }
    </Layout>
  );
}