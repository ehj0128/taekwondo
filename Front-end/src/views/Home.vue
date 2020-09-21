<template>
<div>
  <video loop="loop" autoplay playsinline muted preload="none" src="https://mediadistribution.espn.com/wp-content/themes/Divi-MD/assets/videos/media_distribution_trim.mp4" style="width:100%"></video>
  <v-container style="width: 63rem;">
    <VideoClass/>
    <Practice />
  </v-container>
</div>
</template>

<script>
// @ is an alias to /src
import Practice from "../components/Home/Practice"
import VideoClass from "../components/Home/VideoClass"

export default {
  name: "Home",
  components: {
    Practice,
    VideoClass
  }
};
</script>
