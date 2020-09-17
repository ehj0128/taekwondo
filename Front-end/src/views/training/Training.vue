<template>
  <div>
    <div>
      <canvas id="canvas"></canvas>
    </div>
    <div id="label-container"></div>
  </div>
</template>

<script>
import * as tmPose from "@teachablemachine/pose";
import "@tensorflow/tfjs-backend-webgl";
import * as posenet from "@tensorflow-models/posenet";
import * as ps from "posenet-similarity";

export default {
  name: "Training",
  data() {
    return {
      model: null,
      webcam: null,
      ctx: null,
      labelContainer: null,
      maxPredictions: null,
      predictions: [],
      net: null,
      poseData: null,
      poseDataList: [],
      idx: 0
    };
  },
  methods: {
    async loop() {
      //인자 timestamp
      this.webcam.update();
      await this.predict();
      window.requestAnimationFrame(this.loop);
    },
    async predict() {
      const pose = await this.net.estimateSinglePose(this.webcam.canvas, {
        flipHorizontal: false
      });
      if (
        ps.poseSimilarity(this.poseDataList[this.idx], pose, {
          strategy: "cosineDistance"
        }) <= 0.1
      ) {
        console.log("통과");
        this.idx++;
        console.log(this.idx);
      }
      this.drawPose(pose);
    },
    drawPose(pose) {
      this.ctx.drawImage(this.webcam.canvas, 0, 0);
      // draw the keypoints and skeleton
      if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, this.ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, this.ctx);
      }
    },
    async init() {
      const image1 = new Image();
      image1.src = "./pose.jpg";
      const image2 = new Image();
      image2.src = "./pose2.jpg";
      const image3 = new Image();
      image3.src = "./pose3.jpg";

      this.net = await posenet.load({
        architecture: "ResNet50",
        outputStride: 32,
        inputResolution: { width: 400, height: 400 },
        quantBytes: 2
      });

      //리스트에 추가
      this.poseData = await this.net.estimateSinglePose(image1, {
        flipHorizontal: false
      });
      this.poseDataList.push(this.poseData);
      this.poseData = await this.net.estimateSinglePose(image2, {
        flipHorizontal: false
      });
      this.poseDataList.push(this.poseData);
      this.poseData = await this.net.estimateSinglePose(image3, {
        flipHorizontal: false
      });
      this.poseDataList.push(this.poseData);

      const flip = true;
      this.webcam = new tmPose.Webcam(400, 400, flip);
      await this.webcam.setup();
      this.webcam.play();
      window.requestAnimationFrame(this.loop); // this.loop 일듯

      const canvas = document.getElementById("canvas");
      canvas.width = 400;
      canvas.height = 400;
      this.ctx = canvas.getContext("2d");
    }
  },

  async mounted() {
    this.init();
  }
};
</script>
