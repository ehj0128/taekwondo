<template>
   <img id='cat' src='/images/cat.jpg '/>
</template>

<script>
const posenet = require('@tensorflow-models/posenet');

export default {
  name: "HelloWorld",

  data: () => ({
  }),
  methods : {
    async estimatePoseOnImage(imageElement) {
      // load the posenet model from a checkpoint
      const net = await posenet.load();

      const pose = await net.estimateSinglePose(imageElement, {
        flipHorizontal: false
      });
      return pose;
    }
  },
  mounted() {
    const imageElement = document.getElementById('cat');
    const pose = this.estimatePoseOnImage(imageElement);
    console.log(pose);
  }
};
</script>
