<template>
  <div>
    <!-- 성공 메세지(dialog) -->
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="150"
      height="150"
      
    >
      <v-card
        color="rgba(255, 255, 255, 0)"
        dark
        :elevation = "0"
        class="text-center blue--text"
      >
        <h1>Perfect!</h1>
      </v-card>
    </v-dialog>
    <!-- 비교 화면 -->
    <v-row class="mx-auto my-10">
      <v-col cols="1">
      </v-col>
      <v-col cols="5">
          <!-- <canvas class="mx-auto" id='canvas'></canvas> -->
          <v-img
              class="white--text align-end mx-auto"
              height="500px"
              width="500px"
              :src="`/pose${this.idx}.jpg`"
          ></v-img>
          <div
            id="gauge"
            v-bind:style="{width: `${gauge * 10}px`, height: '30px', backgroundColor: 'green'}"
          ></div>
      </v-col>
      <v-col cols="5">
          <v-img
              class="white--text align-end mx-auto"
              height="500px"
              width="500px"
              :src="`/pose${this.idx}.jpg`"
          ></v-img>
      </v-col>
      <v-col cols="1">
      </v-col>
    </v-row>
  </div>
</template>

<script>
import * as tmPose from "@teachablemachine/pose";
import "@tensorflow/tfjs-backend-webgl";
import * as posenet from "@tensorflow-models/posenet";
import * as ps from "posenet-similarity";

const MAX_GAUGE = 33;

export default {
  name: "Training",
  data() {
    return {
      model: null,
      webcam: null,
      ctx: null,
      net: null,
      poseData: null,
      poseDataList: [],
      idx: 0,
      camWidth: 500,
      camHeight: 500,
      //다이얼로그 데이터
      dialog: false,
      //게이지
      gauge: 0
    }
  },
  watch: {
    dialog (val) {
      if (!val) return
      setTimeout(() => (this.dialog = false), 2000)
    },
  },
  methods: {
    async loop() {
      //인자 timestamp
      this.webcam.update();
      if (this.idx < 3) {
        await this.predict();
        window.requestAnimationFrame(this.loop);
      } else {
        this.webcam.pause();
      }
    },
    async predict() {
      const pose = await this.net.estimateSinglePose(this.webcam.canvas, { flipHorizontal: false })
      if (this.idx < 3) {
        const poseAccuracy = ps.poseSimilarity(this.poseDataList[this.idx], pose, { strategy: 'cosineDistance' }) 
        if (poseAccuracy <= 0.1) {
          this.gauge++;
          if (this.gauge >= MAX_GAUGE) {
            console.log(`${this.idx + 1}단계 통과`)
            this.idx++
            this.gauge = 0
          } else {
          this.gauge--;
          if (this.gauge < 0) {
            this.gauge = 0;
          }
          console.log(this.gauge);
          this.dialog = true
          console.log(this.idx)
          }
        }
      this.drawPose(pose);
      }
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
      const image1 = new Image()
      image1.src = './pose0.jpg'
      const image2 = new Image()
      image2.src = './pose1.jpg'
      const image3 = new Image()
      image3.src = './pose2.jpg'

      this.net = await posenet.load({
        architecture: "ResNet50",
        outputStride: 32,
        inputResolution: { width: this.camWidth, height: this.camHeight},
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


      const flip = true
      this.webcam = new tmPose.Webcam(this.camWidth, this.camHeight, flip)
      await this.webcam.setup()
      this.webcam.play()
      window.requestAnimationFrame(this.loop)// this.loop 일듯

      const canvas = document.getElementById('canvas')
      canvas.width = this.camWidth
      canvas.height = this.camHeight
      this.ctx = canvas.getContext('2d')
      }
    },
  async mounted() {
    this.init();
  }
};
</script>