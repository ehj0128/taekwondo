<template>
  <div>
    <h1>되냐?</h1>
    <div>
    <canvas id='canvas'></canvas>
    </div>
    <div id='label-container'></div>
  </div>

</template>

<script>
// import * as tf from '@tensorflow/tfjs';
import * as tmPose from '@teachablemachine/pose';

const URL = "https://teachablemachine.withgoogle.com/models/zu9UKrpLG/"

export default {
  name: "HelloWorld",
  data () {
    return {
      model: null,
      webcam: null,
      ctx: null,
      labelContainer: null,
      maxPredictions: null,
      predictions: [],
    }
  },
  methods: {
    async loop() { //인자 timestamp
      this.webcam.update()
      await this.predict()
      window.requestAnimationFrame(this.loop) // this 맞는지 확인
    },
    async predict() {
      const { pose, posenetOutput } = await this.model.estimatePose(this.webcam.canvas)
      this.prediction = await this.model.predict(posenetOutput)

      for (let i = 0; i < this.maxPredictions; i++) {
        const classPrediction = 
            this.prediction[i].className + ': ' + this.prediction[i].probability.toFixed(2)
            this.labelContainer.childNodes[i].innerHTML = classPrediction
      }
      console.log(pose)
      this.drawPose(pose)
    },
    drawPose(pose) {
       this.ctx.drawImage(this.webcam.canvas, 0, 0);
        // draw the keypoints and skeleton
        if (pose) {
            const minPartConfidence = 0.5;
            tmPose.drawKeypoints(pose.keypoints, minPartConfidence, this.ctx);
            tmPose.drawSkeleton(pose.keypoints, minPartConfidence, this.ctx);
          }
      // if (this.webcam.canvas) {
      //   this.ctx.drawImage(this.webcam.canvas, 0, 0);
      //     const minPartConfidence = 0.5
      //     tmPose.drawKeypoints(pose.keypoints, minPartConfidence, this.ctx)
      //     tmPose.drawSkeleton(pose.keypoints, minPartConfidence, this.ctx)
      //   }
      },
    async init() {
      const modelURL = URL + 'model.json'
      const metadataURL = URL + 'metadata.json'

      this.model = await tmPose.load(modelURL, metadataURL)
      // 파일일경우 
      // model = tmPose.loadFromFiles(model: File, weights: File, metadata: File)
      this.maxPredictions = this.model.getTotalClasses()
      
      const flip = true
      this.webcam = new tmPose.Webcam(200, 200, flip)
      await this.webcam.setup()
      this.webcam.play()
      window.requestAnimationFrame(this.loop)// this.loop 일듯

      const canvas = document.getElementById('canvas')
      canvas.width = 200
      canvas.height = 200
      this.ctx = canvas.getContext('2d')
      this.labelContainer = document.getElementById('label-container')
      for (let i = 0; i < this.maxPredictions; i++) { // and class labels
          this.labelContainer.appendChild(document.createElement('div'));
        }
      }
    },

    async mounted () {
      this.init()
    }
}
</script>
