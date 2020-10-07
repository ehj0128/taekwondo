<template>
  <div>
    <PoomsaeList />
    <!-- 성공 메세지(dialog) -->
    <v-dialog v-model="passFlag" hide-overlay persistent width="500">
      <v-card>
        <v-card-text class="text-center py-5">
          <h3>훌륭한 자세입니다!</h3>
          <div style="width: 200px; margin: 0 auto;">
            <lottie-player
              autoplay
              loop
              mode="normal"
              src="https://assets3.lottiefiles.com/private_files/lf30_YQxjey.json"
              style="width: 200px"
            />
          </div>
          <h2>{{ this.seconds }}초 뒤 다음 동작으로 넘어갑니다.</h2>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- 품새 하나 끝났을 때 -->
    <v-dialog v-model="endFlag" persistent width="500">
      <v-card>
        <!-- 1장 ~ 8장 -->
        <v-card-text
          v-if="$store.state.poomsaeCurNo < 9"
          class="text-center py-5"
        >
          <h3>{{ $store.state.poomsaeCurNo }}장을 마스터했습니다!</h3>
          <div style="width: 400px; margin: 0 auto;">
            <lottie-player
              autoplay
              loop
              mode="normal"
              speed="1"
              src="https://assets4.lottiefiles.com/packages/lf20_zmrlrM.json"
              style="width: 400px"
            />
            <h2>이제 {{ $store.state.poomsaeCurNo + 1 }}장을 연습해보세요</h2>
            <v-btn
              v-on:click="goNextStep"
              depressed
              color="primary"
              class="mt-5"
              >더 강해지기</v-btn
            >
          </div>
        </v-card-text>
        <!-- 마지막 장일 경우 -->
        <v-card-text v-else class="text-center py-5">
          <h3>고려까지 마스터했습니다!</h3>
          <div style="width: 400px; margin: 0 auto;">
            <lottie-player
              autoplay
              loop
              mode="normal"
              speed="1"
              src="https://assets4.lottiefiles.com/packages/lf20_zmrlrM.json"
              style="width: 400px"
            />
            <h2>당신은 이제 태권도 마스터입니다.</h2>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <div v-if="isError" id="info">
      this browser does not support video capture, or this device does not have
      a camera
    </div>
    <!-- 로딩화면 -->
    <div v-if="isLoading" id="loading">
      <div ref="lottieWrapper" id="lottie-wrapper">
        <lottie-player
          autoplay
          loop
          mode="normal"
          src="https://assets10.lottiefiles.com/packages/lf20_0iwOkm.json"
          style="width: 200px"
        />
        <h1>Loading...</h1>
      </div>
    </div>
    <!-- 메인화면  -->
    <div v-show="!isLoading && !isError" id="main">
      <v-row class="mx-auto my-5">
        <v-col cols="1"></v-col>
        <!-- 실습 화면 -->
        <v-col cols="5">
          <video ref="video" playsinline style="display: none;" />
          <canvas ref="canvas" style="width:90%; height: 73vh;" />
        </v-col>
        <!-- 예시 화면 -->
        <v-col class="text-center" cols="5">
          <video
            ref="reference"
            muted
            style="width: 90%; height: 73vh; object-fit: cover;"
          >
            <source type="video/mp4" />
          </video>
          <img
            ref="image"
            src="/camera.png"
            width="500px"
            height="500px"
            style="display: none;"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import * as ps from "posenet-similarity";
import "@lottiefiles/lottie-player";

import { mapState } from "vuex";
import PoomsaeList from "@/components/training/PoomsaeList.vue";

export default {
  name: "Training",
  components: {
    PoomsaeList
  },
  computed: {
    ...mapState(["poomsaeCurNo"])
  },
  watch: {
    async poomsaeCurNo() {
      this.loadFlag = true;
      this.seqNo = 0;
      await this.loadPoseData();
      this.$refs.reference.play();
    }
  },
  data() {
    return {
      video: null,
      worker: null,
      isLoading: true,
      isError: false,

      seqNo: 0,
      poseData: [],
      seqData: [],
      score: 0,
      passFlag: false,
      endFlag: false,
      loadFlag: true,
      loopCount: 0,
      seconds: 0,

      correctSound: null,
      clearSound: null,

      videoWidth: 500,
      videoHeight: 500
    };
  },
  async mounted() {
    const self = this;
    const reference = this.$refs.reference;
    reference.addEventListener("ended", function() {
      if (self.loopCount < 2) {
        self.loopCount++;
        this.play();
      } else {
        self.loopCount = 0;
        self.loadFlag = false;
      }
    });
    await this.loadPoseData();

    this.correctSound = new Audio("./correct.mp3");
    this.clearSound = new Audio("./clear.mp3");

    this.worker = new Worker("./worker.js");
    this.worker.onmessage = async event => {
      switch (event.data.command) {
        case "loadPosenet":
          const canvas = this.$refs.canvas;
          canvas.width = this.videoWidth;
          canvas.height = this.videoHeight;
          const offscreen = canvas.transferControlToOffscreen();

          this.worker.postMessage(
            {
              command: "loadCanvas",
              offscreen
            },
            [offscreen]
          );
          break;
        case "loadCanvas":
          const image = this.$refs.image;
          createImageBitmap(image).then(imageBitmap => {
            this.worker.postMessage(
              {
                command: "initPosenet",
                imageBitmap
              },
              [imageBitmap]
            );
          });
          break;
        case "initPosenet":
          this.isLoading = false;
          this.drawFrame();
          this.$refs.reference.play();
          break;
        case "drawFrame":
          if (!this.loadFlag) {
            if (this.seqData[this.seqNo].check.length) {
              const checkpoint = this.seqData[this.seqNo].check[0];

              const similarity = ps.poseSimilarity(
                this.poseData[checkpoint],
                event.data.pose,
                { strategy: "cosineDistance" }
              );

              if (similarity < 0.2) {
                console.log("중간단계 통과");
                this.seqData[this.seqNo].check.shift();
              }
            } else {
              const endpoint = this.seqData[this.seqNo].end;

              const similarity = ps.poseSimilarity(
                this.poseData[endpoint],
                event.data.pose,
                { strategy: "weightedDistance" }
              );

              if (similarity < 0.05) {
                console.log(similarity);
                this.score++;
              }

              if (this.score >= 50) {
                this.passFlag = true;
                this.correctSound.play();
                await this.waitThreeSeconds();
                this.passFlag = false;
                this.score = 0;
                this.seqNo++;

                if (this.seqNo === this.seqData.length) {
                  this.endFlag = true;
                  this.clearSound.play();
                  break;
                } else {
                  this.loadFlag = true;
                  this.$refs.reference.src = `/${this.poomsaeCurNo}jang/[SHANA]video${this.seqNo}.mp4`;
                  this.$refs.reference.play();
                }
              }
            }
          }
          this.drawFrame();
          break;
        default:
          break;
      }
    };

    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    try {
      await this.loadVideo();
    } catch (e) {
      this.isError = true;
      throw e;
    }

    this.worker.postMessage({
      command: "loadPosenet"
    });
  },
  destroyed() {
    this.worker.terminate();
    this.video.srcObject.getTracks().forEach(track => {
      track.stop();
    });
  },
  methods: {
    async loadVideo() {
      this.video = await this.setupCamera();
      this.video.play();
    },
    async setupCamera() {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error(
          "Browser API navigator.mediaDevices.getUserMedia not available"
        );
      }

      const mobile = this.isMobile();

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
          width: mobile ? undefined : this.videoWidth,
          height: mobile ? undefined : this.videoHeight
        }
      });

      const video = this.$refs.video;
      video.width = this.videoWidth;
      video.height = this.videoHeight;
      video.srcObject = stream;

      return new Promise(resolve => {
        video.onloadedmetadata = () => {
          resolve(video);
        };
      });
    },
    isAndroid() {
      return /Android/i.test(navigator.userAgent);
    },
    isiOS() {
      return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    },
    isMobile() {
      return this.isAndroid() || this.isiOS();
    },
    async loadPoseData() {
      const response = await Promise.all([
        fetch(`./${this.poomsaeCurNo}jang/pose.json`),
        fetch(`./${this.poomsaeCurNo}jang/sequence.json`)
      ]);
      this.poseData = await response[0].json();
      this.seqData = await response[1].json();

      this.$refs.reference.src = `/${this.poomsaeCurNo}jang/[SHANA]video1.mp4`;
    },
    drawFrame() {
      createImageBitmap(this.video).then(imageBitmap => {
        this.worker.postMessage(
          {
            command: "drawFrame",
            imageBitmap
          },
          [imageBitmap]
        );
      });
    },
    waitThreeSeconds() {
      this.seconds = 3;
      return new Promise(resolve => {
        setTimeout(() => {
          this.seconds--;
        }, 1000);
        setTimeout(() => {
          this.seconds--;
        }, 2000);
        setTimeout(() => {
          resolve();
        }, 3000);
      });
    },
    goNextStep() {
      this.$store.state.poomsaeCurNo += 1;
      this.endFlag = false;
    }
  }
};
</script>

<style scoped>
#lottie-wrapper {
  display: inline-block;
  position: relative;
  -webkit-animation: slideleft 5s forwards;
  animation: slideleft 5s forwards;
}

#loading {
  margin-top: 15vh;
}

@-webkit-keyframes slideleft {
  0% {
    left: 0;
  }

  100% {
    left: 1000px;
  }
}

@keyframes slideleft {
  0% {
    left: 0;
  }

  100% {
    left: 1000px;
  }
}

/*
 *  The following loading spinner CSS is from SpinKit project
 *  https://github.com/tobiasahlin/SpinKit
 */
.sk-spinner-pulse {
  width: 20px;
  height: 20px;
  margin: auto 10px;
  float: left;
  background-color: #333;
  border-radius: 100%;
  -webkit-animation: sk-pulseScaleOut 1s infinite ease-in-out;
  animation: sk-pulseScaleOut 1s infinite ease-in-out;
}

@-webkit-keyframes sk-pulseScaleOut {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}

@keyframes sk-pulseScaleOut {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}

.spinner-text {
  float: left;
}
</style>
