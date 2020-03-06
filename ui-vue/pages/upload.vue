<template>
  <section class="section">
    <h3 class="subtitle is-6 has-text-grey">
      Upload video
    </h3>

    <video :id="`video`" :src="generateSource(this.file)" type="video/mp4" controls />
    <canvas style="display:none;" :id="`canvas`" />

    <p>Note: Selected video timeframe will be the video thumbnail.</p>

    <br>
    
    <b-field class="file">
      <b-upload v-model="file" type="file" id="file" ref="file">
        <a class="button is-primary">
          <b-icon icon="upload"></b-icon>
          <span>Select Video</span>
        </a>
      </b-upload>
      <span class="file-name" v-if="file">
        {{ file.name }}
      </span>
    </b-field>

    <b-button type="is-primary" @click="uploadFile" :disabled="file ? false : true">Upload Video</b-button>

    <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :can-cancel="true"></b-loading>
  </section>
</template>

<script>
import axios from 'axios'

async function capture() {
  var canvas = document.getElementById(`canvas`);
  var video = document.getElementById(`video`);
  // video.currentTime = 2;
  canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
}

export default {
  data() {
    return {
      file: null,
      isLoading: false,
      isFullPage: true
    }
  },
  computed: {
  },
  methods: {
    generateSource(file) {
      if (file) {
        return URL.createObjectURL(file)
      }
      return
    },
    async uploadFile() {
      let component = this;

      // set loader to true
      this.isLoading = true

      try {
        await capture();
        var canvas = document.getElementById(`canvas`);
        var pngUrl = canvas.toDataURL();
        let formData = new FormData();
        formData.append("file", component.file);
        formData.append("thumbnail", pngUrl);
        await axios.post(`http://localhost:3001/api/videos/upload`, formData).then((res) => {
          if (res.status === 200) {
            component.file = null;
            var video = document.getElementById(`video`);
            video.src = "";
          }
        });
      } catch (error) {
        throw error;
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>