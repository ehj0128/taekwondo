<template>
  <div>
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
        <img ref="image" src="/ex1.jpg" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import * as ps from "posenet-similarity";
import "@lottiefiles/lottie-player";

export default {
  data() {
    return {
      video: null,
      worker: null,
      isLoading: true,
      isError: false,

      videoWidth: 600,
      videoHeight: 600,

      prePoseData: {
        score: 0.9893847563687492,
        keypoints: [
          {
            score: 0.9976716637611389,
            part: "nose",
            position: { x: 320.59912109375, y: 70.54020182291666 }
          },
          {
            score: 0.9965251088142395,
            part: "leftEye",
            position: { x: 329.0542399088542, y: 63.0699462890625 }
          },
          {
            score: 0.9957560896873474,
            part: "rightEye",
            position: { x: 311.13555908203125, y: 66.45992024739583 }
          },
          {
            score: 0.9118151664733887,
            part: "leftEar",
            position: { x: 344.4140828450521, y: 68.4049072265625 }
          },
          {
            score: 0.9527170658111572,
            part: "rightEar",
            position: { x: 298.79585774739587, y: 70.64479573567708 }
          },
          {
            score: 0.9987209439277649,
            part: "leftShoulder",
            position: { x: 361.8331298828125, y: 123.860595703125 }
          },
          {
            score: 0.9997641444206238,
            part: "rightShoulder",
            position: { x: 284.59641520182294, y: 118.22543334960938 }
          },
          {
            score: 0.9986870884895325,
            part: "leftElbow",
            position: { x: 403.7472330729167, y: 123.0157470703125 }
          },
          {
            score: 0.9941114783287048,
            part: "rightElbow",
            position: { x: 226.4210205078125, y: 126.80727132161456 }
          },
          {
            score: 0.994631290435791,
            part: "leftWrist",
            position: { x: 462.17305501302087, y: 118.08270263671875 }
          },
          {
            score: 0.9935768842697144,
            part: "rightWrist",
            position: { x: 171.533935546875, y: 131.80354817708331 }
          },
          {
            score: 0.9941556453704834,
            part: "leftHip",
            position: { x: 353.61521402994794, y: 245.44219970703125 }
          },
          {
            score: 0.9989436268806458,
            part: "rightHip",
            position: { x: 294.44384765625, y: 246.06221516927081 }
          },
          {
            score: 0.9977378845214844,
            part: "leftKnee",
            position: { x: 362.977294921875, y: 345.1719563802083 }
          },
          {
            score: 0.9995817542076111,
            part: "rightKnee",
            position: { x: 289.6876627604167, y: 343.4333089192708 }
          },
          {
            score: 0.9958552718162537,
            part: "leftAnkle",
            position: { x: 382.9208984375, y: 438.753173828125 }
          },
          {
            score: 0.9992897510528564,
            part: "rightAnkle",
            position: { x: 264.25567626953125, y: 448.2675374348958 }
          }
        ]
      }
    };
  },
  async mounted() {
    this.worker = new Worker("./worker.js");
    this.worker.onmessage = event => {
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
          createImageBitmap(this.video).then(imageBitmap => {
            this.worker.postMessage(
              {
                command: "drawFrame",
                imageBitmap
              },
              [imageBitmap]
            );
          });
          break;
        case "drawFrame":
          const similarity = ps.poseSimilarity(
            this.prePoseData,
            event.data.pose,
            { strategy: "cosineDistance" }
          );

          similarity < 0.2 && console.log(similarity);

          createImageBitmap(this.video).then(imageBitmap => {
            this.worker.postMessage(
              {
                command: "drawFrame",
                imageBitmap
              },
              [imageBitmap]
            );
          });
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
