<template>
  <div>
    <VideoClass/>
    <Practice />
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
