importScripts("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs");
importScripts("https://cdn.jsdelivr.net/npm/@tensorflow-models/posenet");

const modelInputs = {
  architecture: "ResNet50",
  outputStride: 32,
  inputResolution: 250,
  multiplier: 1.0,
  quantBytes: 2,
  minPoseConfidence: 0.1,
  minPartConfidence: 0.5,
};

const modelOutputs = {
  showVideo: true,
  showSkeleton: true,
  showPoints: true,
  showBoundingBox: false,
};

const minPoseConfidence = 0.1;
const minPartConfidence = 0.5;

const videoWidth = 600;
const videoHeight = 600;

let canvas;
let ctx;
let net;

function toTuple({ y, x }) {
  return [y, x];
}

function drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

const color = "aqua";
const boundingBoxColor = "red";
const lineWidth = 2;

let defalutImage;

/**
 * Draw pose keypoints onto a canvas
 */
function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
  for (let i = 0; i < keypoints.length; i++) {
    const keypoint = keypoints[i];

    if (keypoint.score < minConfidence) {
      continue;
    }

    const { y, x } = keypoint.position;
    drawPoint(ctx, y * scale, x * scale, 3, color);
  }
}

/**
 * Draws a line on a canvas, i.e. a joint
 */
function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
  ctx.beginPath();
  ctx.moveTo(ax * scale, ay * scale);
  ctx.lineTo(bx * scale, by * scale);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = color;
  ctx.stroke();
}

/**
 * Draws a pose skeleton by looking up all adjacent keypoints/joints
 */
function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  );

  adjacentKeyPoints.forEach((keypoints) => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      scale,
      ctx
    );
  });
}

addEventListener("message", async (event) => {
  switch (event.data.command) {
    case "loadPosenet":
      net = await posenet.load(modelInputs);
      postMessage({
        command: event.data.command,
      });
      break;
    case "loadCanvas":
      canvas = event.data.offscreen;
      ctx = canvas.getContext("2d");
      postMessage({
        command: event.data.command,
      });
      break;
    case "initPosenet":
      defalutImage = event.data.imageBitmap;
      ctx.drawImage(defalutImage, 0, 0, videoWidth, videoHeight);
      await net.estimateSinglePose(canvas);
      postMessage({
        command: event.data.command,
      });
      break;
    case "initFrame":
      ctx.drawImage(defalutImage, 0, 0, videoWidth, videoHeight);
      postMessage({
        command: event.data.command,
      });
      break;
    case "drawFrame":
      const pose = await net.estimateSinglePose(canvas, {
        flipHorizontal: false,
      });

      ctx.clearRect(0, 0, videoWidth, videoHeight);
      ctx.save();
      ctx.scale(-1, 1);
      ctx.translate(-videoWidth, 0);
      ctx.drawImage(event.data.imageBitmap, 0, 0, videoWidth, videoHeight);
      ctx.restore();

      if (pose.score >= minPoseConfidence) {
        if (modelOutputs.showPoints) {
          drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        }
        if (modelOutputs.showSkeleton) {
          drawSkeleton(pose.keypoints, minPartConfidence, ctx);
        }
        if (modelOutputs.showBoundingBox) {
          drawBoundingBox(pose.keypoints, ctx);
        }
      }

      postMessage({
        command: event.data.command,
        pose,
      });
      break;
    default:
      break;
  }
});
