<template>
  <div>
    <v-dialog v-model="passFlag" persistent width="500">
      <v-card>
        <v-card-text class="text-center">
          <span>Good Job!</span>
          <div style="width: 200px; margin: 0 auto;">
            <lottie-player
              autoplay
              mode="normal"
              src="https://assets1.lottiefiles.com/datafiles/8UjWgBkqvEF5jNoFcXV4sdJ6PXpS6DwF7cK4tzpi/Check Mark Success/Check Mark Success Data.json"
              style="width: 200px"
            />
          </div>
          <span>{{ this.seconds }}초 뒤 다음 단계로 넘어갑니다.</span>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="endFlag" persistent width="500">
      <v-card>
        <v-card-text class="text-center">
          <div style="width: 400px; margin: 0 auto;">
            <lottie-player
              autoplay
              loop
              mode="normal"
              speed="1.5"
              src="https://assets7.lottiefiles.com/packages/lf20_htEgHu.json"
              style="width: 400px"
            />
            <div>
              <span>Excellent!</span>
            </div>
            <v-btn depressed color="primary">go Next Step</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <div v-if="isError" id="info">
      this browser does not support video capture, or this device does not have
      a camera
    </div>
    <div v-if="isLoading" id="loading">
      <div ref="lottieWrapper" id="lottie-wrapper">
        <lottie-player
          autoplay
          loop
          mode="normal"
          src="https://assets10.lottiefiles.com/packages/lf20_0iwOkm.json"
          style="width: 200px"
        />
      </div>
    </div>
    <div v-show="!isLoading && !isError" id="main">
      <div>
        <video ref="video" playsinline style="display: none;" />
        <canvas ref="canvas" />
      </div>
      <div>
        <video
          ref="reference"
          width="600px"
          height="600px"
          muted
          style="object-fit: cover;"
        >
          <source src="/1jang/[SHANA]video1.mp4" type="video/mp4" />
        </video>
        <img
          ref="image"
          src="/camera.png"
          width="600px"
          height="600px"
          style="display: none;"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import * as ps from "posenet-similarity";
import "@lottiefiles/lottie-player";

var iteration = 0;

export default {
  data() {
    return {
      video: null,
      worker: null,
      isLoading: true,
      isError: false,

      stage: "1jang",
      poseNo: 0,
      seqNo: 0,
      poseData: [],
      seqData: [],
      score: 0,
      passFlag: false,
      endFlag: false,
      loopCount: 0,

      seconds: 0,

      correctSound: null,
      clearSound: null,

      videoWidth: 600,
      videoHeight: 600
    };
  },
  async mounted() {
    var self = this;
    const reference = this.$refs.reference;
    reference.addEventListener("ended", function() {
      if (iteration < 2) {
        iteration++;
        this.play();
      } else {
        iteration = 0;
        createImageBitmap(self.video).then(imageBitmap => {
          self.worker.postMessage(
            {
              command: "drawFrame",
              imageBitmap
            },
            [imageBitmap]
          );
        });
      }
    });

    this.correctSound = new Audio("./correct.mp3");
    this.clearSound = new Audio("./clear.mp3");

    const response = await Promise.all([
      fetch(`./1jang/pose.json`),
      fetch(`./1jang/sequence.json`)
    ]);
    this.poseData = await response[0].json();
    this.seqData = await response[1].json();

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
          this.$refs.reference.play();
          // createImageBitmap(this.video).then(imageBitmap => {
          //   this.worker.postMessage(
          //     {
          //       command: "drawFrame",
          //       imageBitmap
          //     },
          //     [imageBitmap]
          //   );
          // });
          break;
        case "drawFrame":
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

            createImageBitmap(this.video).then(imageBitmap => {
              this.worker.postMessage(
                {
                  command: "drawFrame",
                  imageBitmap
                },
                [imageBitmap]
              );
            });
          } else {
            const endpoint = this.seqData[this.seqNo].end;

            const similarity = ps.poseSimilarity(
              this.poseData[endpoint],
              event.data.pose,
              { strategy: "cosineDistance" }
            );

            if (similarity < 0.1) {
              console.log(similarity);
              this.score++;
            }

            if (this.score < 10) {
              createImageBitmap(this.video).then(imageBitmap => {
                this.worker.postMessage(
                  {
                    command: "drawFrame",
                    imageBitmap
                  },
                  [imageBitmap]
                );
              });
            } else {
              this.passFlag = true;
              this.correctSound.play();
              this.seconds = 3;
              const promise = new Promise(resolve => {
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
              await promise;
              this.passFlag = false;
              this.score = 0;
              this.seqNo++;

              if (this.seqNo === this.seqData.length) {
                this.endFlag = true;
                this.clearSound.play();
              } else {
                this.$refs.image.src = `/${this.stage}/pose${
                  this.seqData[this.seqNo].end
                }.jpg`;
                createImageBitmap(this.video).then(imageBitmap => {
                  this.worker.postMessage(
                    {
                      command: "drawFrame",
                      imageBitmap
                    },
                    [imageBitmap]
                  );
                });
              }
            }
          }
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
