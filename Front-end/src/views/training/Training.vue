<template>
  <div>
    <!-- 임시버튼   -->
    <v-btn
      :disabled="dialog"
      class="white--text"
      color="purple darken-2"
      @click="dialog = true"
    >
      Start loading
    </v-btn>
    <!-- 성공 메세지(dialog) -->
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="400"
      height="400"
    >
      <v-card
        color="rgba(0, 0, 0, 0.0)"
        dark
        :elevation = "0"
        class="text-center blue--text text--accent-1"
      >
        <h1 class="reaction">Perfect!</h1>
      </v-card>
    </v-dialog>
    <!-- 비교 화면 -->
    <v-row class="mx-auto my-5">
      <v-col cols="1">
      </v-col>
      <v-col cols="5">
        <div id="canvas-container">
          <h2 class="mb-5">우측 사진의 동작을 따라해주세요</h2>
          <canvas v-if="this.idx < 4" id="canvas"></canvas>
          <v-img
              v-else
              class="white--text align-end mx-auto"
              height="500px"
              width="500px"
              :src="`/umhongus.jpg`"
          ></v-img>
        </div>
          <!-- <div
            id="gauge"
            v-bind:style="{width: `${gauge * 166}px`, height: '30px', backgroundColor: 'green'}"
          ></div> -->
      </v-col>
      <v-col class="text-center" cols="5">
          <h2 class="mb-5">예시 사진</h2>
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

const MAX_GAUGE = 2;

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
      if (this.idx < 5) {
        await this.predict();
        window.requestAnimationFrame(this.loop);
      } else {
        this.webcam.pause();
      }
    },
    async predict() {
      const pose = await this.net.estimateSinglePose(this.webcam.canvas, { flipHorizontal: false })

      if (this.idx < 5) {
        const poseAccuracy = ps.poseSimilarity(this.poseDataList[this.idx], pose, { strategy: 'cosineDistance' }) 
        // console.log(poseAccuracy)
        if (poseAccuracy <= 0.4) {
          this.gauge++;
          // console.log(this.gauge)
          if (this.gauge >= MAX_GAUGE) {
            console.log(`${this.idx + 1}단계 통과`)
            this.idx++
            this.dialog = true
            this.gauge = 0
          }
        } else {
          this.gauge--;
          if (this.gauge < 0) {
            this.gauge = 0;
          }
          // console.log(this.gauge);
          // console.log(this.idx)
          }
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
      const image1 = new Image()
      image1.src = './pose0.jpg'
      const image2 = new Image()
      image2.src = './pose1.jpg'
      const image3 = new Image()
      image3.src = './pose2.jpg'
      const image4 = new Image()
      image4.src = './pose3.jpg'

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
      this.poseData = await this.net.estimateSinglePose(image4, {
        flipHorizontal: false
      });
      this.poseDataList.push(this.poseData);


      const flip = true
      this.webcam = new tmPose.Webcam(this.camWidth, this.camHeight, flip)
      await this.webcam.setup()
      this.webcam.play()
      console.log(this.webcam)
      window.requestAnimationFrame(this.loop)// this.loop 일듯

      const canvas = document.getElementById('canvas')
      canvas.width = this.camWidth
      canvas.height = this.camHeight
      this.ctx = canvas.getContext('2d')
      }
    },
  async mounted() {
    this.init();
  },
  destroyed() {
    this.webcam.stop()
  }
};
</script>

<style scoped>
#canvas-container {
   width: 100%;
   text-align:center;
}
#canvas {
  display: inline;
}
.reaction {
  font-size: 6rem;
}
</style>