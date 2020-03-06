import React from 'react';
import fetch from 'unfetch'
import useSWR from 'swr'

// material ui
import Grid from '@material-ui/core/Grid';
import VideoCard from '../components/VideoCard';

// default layout
import Layout from '../components/MyLayout';

// utils
import { API_URL, GET_VIDEOS_FROM_DB_ENDPOINT } from '../utils/constants';

async function fetcher(path) {
  const res = await fetch(API_URL + path);
  const json = await res.json();
  return json
}

function _chunkedVideos(videos) {
  return videos.reduce((video, item, index) => { 
    const chunkIndex = Math.floor(index / 4)
    if (!video[chunkIndex]) {
      video[chunkIndex] = []
    }
    video[chunkIndex].push(item)
    return video
  }, []);
}

export default function Dashboard() {
  const { data, error } = useSWR(GET_VIDEOS_FROM_DB_ENDPOINT, fetcher);

  let renderVideosHtml;
  if (data) {
    let chunkedVideos = _chunkedVideos(data);
    renderVideosHtml = chunkedVideos.map(cvParent => {
      return <Grid container spacing={3}>
        {
          cvParent.map(cvChild => {
            return <Grid item xs>
              <VideoCard video={cvChild} />
            </Grid>
          })
        }
      </Grid>
    });
  };

  return (
    <Layout title="Videos">
      {renderVideosHtml}
    </Layout>
  );
}