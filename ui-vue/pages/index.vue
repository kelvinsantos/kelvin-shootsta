<template>
  <section class="section">
    <div v-if="chunkedVideos.length > 0">
      <div v-for="(chunkedVideo, loopIndex) in chunkedVideos" :key="loopIndex">
        <div class="columns">
          <div class="column" v-for="(video, videoIndex) in chunkedVideo" :key="videoIndex">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img @click="openPopupPlayer(video)" :src="video.thumbnail" alt="Placeholder image">
                </figure>
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-4">{{ video.key }}</p>
                      <p class="subtitle is-6">@kelvinsantos</p>
                    </div>
                  </div>

                  <div class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris. <a>@bulmaio</a>.
                    <a href="#">#css</a> <a href="#">#responsive</a>
                    <br>
                    <time datetime="2016-1-1">1{{ video.createdAt }}</time>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      No Videos Found :(
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HomePage',
  data() {
    return {
      chunkedVideos: [],
      perChunk: 4
    }
  },
  computed: {
  },
  methods: {
    _chunkedVideos: async function(videos) {
      return await videos.reduce((video, item, index) => { 
        const chunkIndex = Math.floor(index / this.perChunk)
        if (!video[chunkIndex]) {
          video[chunkIndex] = []
        }
        video[chunkIndex].push(item)
        return video
      }, []);
    },
    getVideoList: async function() {
      return await axios.get(`http://localhost:3001/api/videos/list`)
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      })
    },
    getVideoListFromDb: async function() {
      return await axios.get(`http://localhost:3001/api/videos/list-from-db`)
      .then((res) => {
        if (res.status === 200) {
          return res.data;
        }
      })
    },
    openPopupPlayer(video) {
      console.log(`https://shootsta.s3-ap-southeast-1.amazonaws.com/videos/${video.key.replace(/ /g, "+")}`);
      this.$buefy.dialog.alert({
        message: '<video height="720" width="1280" preload="auto" autoplay="autoplay" controls>' +
        `<source src="https://shootsta.s3-ap-southeast-1.amazonaws.com/videos/${video.key.replace(/ /g, "+")}" type="video/mp4">` +
        '</video>',
      })
    }
  },
  async mounted() {
    let component = this;
    let videos = await component.getVideoListFromDb();
    this.chunkedVideos = await component._chunkedVideos(videos);
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>