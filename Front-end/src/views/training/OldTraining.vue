<template>
  <div>
    <PoomsaeList />
    <!-- To do. Navbar 호버 했을시 내려오게끔    -->
    <!-- 임시버튼   -->
    <v-btn
      :disabled="dialog"
      class="white--text"
      color="purple darken-2"
      @click="dialog = true"
    >
      Start loading
    </v-btn>
    <!-- 성공 메세지(dialog) 나중에 그림으로 대체 -->
    <v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="400px"
      height="400px"
    >
      <!-- - 로띠 - 로띠 - 로띠 - - 로띠 - 로띠 - 로띠 - - 로띠 - 로띠 - 로띠 - - 로띠 - 로띠 - 로띠 - - 로띠 - 로띠 - 로띠 - - 로띠 - 로띠 - 로띠 -  -->
      <lottie-player
        src="https://assets10.lottiefiles.com/datafiles/kbuj8xpg2U73q9B/data.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px;"
        loop
        autoplay
      ></lottie-player>
      <!-- - 로띠 - 로띠 - 로띠 - - 로띠 - 로띠 - 로띠 - - 로띠 - 로띠 - 로띠 - - 로띠 - 로띠 - 로띠 - - 로띠 - 로띠 - 로띠 - - 로띠 - 로띠 - 로띠 - - 로띠 - 로띠 - 로띠 -  -->
    </v-dialog>
    <!-- 비교 화면 -->
    <v-row class="mx-auto my-5">
      <v-col cols="1"> </v-col>
      <v-col cols="5">
        <h2 class="mb-5">우측 사진의 동작을 따라해주세요</h2>
        <video v-if="this.idx < 4" id="video"></video>
        <v-img
          v-else
          class="white--text align-end mx-auto"
          height="500px"
          width="500px"
          :src="`/umhongus.jpg`"
        ></v-img>
        <div id="canvas-container">
          <!-- <canvas v-if="this.idx < 4" id="canvas"></canvas> -->
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
          :src="`/${$store.state.poomsaeCurNo}jang/pose${this.idx}.jpg`"
        ></v-img>
      </v-col>
      <v-col cols="1"> </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from "vuex";
import "@lottiefiles/lottie-player";

// import * as tmPose from "@teachablemachine/pose";
import "@tensorflow/tfjs-backend-webgl";
import * as posenet from "@tensorflow-models/posenet";
import * as ps from "posenet-similarity";

const MAX_GAUGE = 2;

export default {
  // name: "Training",
  // components: {
  //   PoomsaeList
  // },
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
      gauge: 0,
      //캠설정변경하면서 추가
      mobile: null,
      video: null,
      //루프 멈추기
      loopVar: null
    };
  },
  computed: {
    ...mapState(["poomsaeCurNo"])
  },
  watch: {
    dialog(val) {
      if (!val) return;
      setTimeout(() => (this.dialog = false), 2000);
    }
  },
  methods: {
    async loop() {
      //인자 timestamp
      // this.video.update();
      if (this.idx < 5) {
        await this.predict();
        this.loopVar = window.requestAnimationFrame(this.loop);
      } else {
        this.video.pause();
      }
    },
    async predict() {
      const pose = await this.net.estimateSinglePose(this.video, {
        flipHorizontal: false
      });
      // console.log(pose)
      if (this.idx < 5) {
        const poseAccuracy = ps.poseSimilarity(
          this.poseDataList[this.idx],
          pose,
          { strategy: "cosineDistance" }
        );
        console.log(poseAccuracy);
        if (poseAccuracy <= 0.2) {
          this.gauge++;
          if (this.gauge >= MAX_GAUGE) {
            console.log(`${this.idx + 1}단계 통과`);
            this.idx++;
            this.dialog = true;
            this.gauge = 0;
          }
        } else {
          this.gauge--;
          if (this.gauge < 0) {
            this.gauge = 0;
          }
        }
      }
      // this.drawPose(pose);
    },
    // drawPose(pose) {
    // this.ctx.drawImage(this.video, 0, 0);
    // draw the keypoints and skeleton
    // if (pose) {
    //   const minPartConfidence = 0.5;
    //   tmPose.drawKeypoints(pose.keypoints, minPartConfidence, this.ctx);
    //   tmPose.drawSkeleton(pose.keypoints, minPartConfidence, this.ctx);
    // }
    // },
    async setupCamera() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
          "Browser API navigator.mediaDevices.getUserMedia not available"
        );
      }
      this.video = document.getElementById("video");
      this.video.width = this.camWidth;
      this.video.height = this.camHeight;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
          width: this.mobile ? undefined : this.camWidth,
          height: this.mobile ? undefined : this.camHeight
        }
      });
      this.video.srcObject = stream;

      return new Promise(resolve => {
        this.video.onloadedmetadata = () => {
          resolve(this.video);
        };
      });
    },
    async loadVideo() {
      this.video = await this.setupCamera();
      this.video.play();
      this.loop();
    },
    async init() {
      // switch(this.poomsaeCurNo) {
      //   case 1:
      //     break;
      //   default:
      //     console.log('TBU')
      // }
      const image1 = new Image();
      image1.src = "./pose0.jpg";
      const image2 = new Image();
      image2.src = "./pose1.jpg";
      const image3 = new Image();
      image3.src = "./pose2.jpg";
      const image4 = new Image();
      image4.src = "./pose3.jpg";

      this.net = await posenet.load({
        architecture: "ResNet50",
        outputStride: 32,
        inputResolution: 250, // { width: this.camWidth, height: this.camHeight },
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

      // 기존 tmPose 활용 웹캠 //
      // const flip = true
      // this.webcam = new tmPose.Webcam(this.camWidth, this.camHeight, flip)
      // await this.webcam.setup()
      // this.webcam.play()
      // // console.log(this.webcam)
      // window.requestAnimationFrame(this.loop)// this.loop 일듯

      // const canvas = document.getElementById('canvas')
      // canvas.width = this.camWidth
      // canvas.height = this.camHeight
      // this.ctx = canvas.getContext('2d')
    },
    isAndroid() {
      return /Android/i.test(navigator.userAgent);
    },
    isiOS() {
      return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    isMobile() {
      return this.isAndroid() || this.isiOS();
    }
  },
  async mounted() {
    this.init();
    this.mobile = this.isMobile();
    this.loadVideo();
  },
  destroyed() {
    console.log(this.video);
    this.video.srcObject.getTracks().forEach(function(track) {
      track.stop();
    });
    window.cancelAnimationFrame(this.loopVar);
    this.video.srcObject = null;
  }
};
</script>

<style scoped>
#canvas-container {
  width: 100%;
  text-align: center;
}
#canvas {
  display: inline;
}
#video {
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg); /* Safari and Chrome */
}
.reaction {
  font-size: 6rem;
}
</style>
