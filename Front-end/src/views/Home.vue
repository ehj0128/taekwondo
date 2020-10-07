<template>
  <div style="height:10px;">
    <video
      loop="loop"
      autoplay
      playsinline
      muted
      preload="none"
      src="../assets/video/taekwondo_intro.mp4"
      style="width:100%; position:relative"
    ></video>
    <div
      id="gotop"
      class="animate__animated animate__fadeInLeft"
      style="position:absolute; top: 30vh; left: 15vw; color: #f4f4f4; font-family: 'Noto Serif KR', serif; font-size: 3rem;"
    >
      <p>태권도(跆拳道)</p>
      <p style="font-size: 2rem;">[명사]</p>
      <p style="font-size: 2.5rem;">
        대표적인 한민족 고유의 무술로,
      </p>
      <p style="font-size: 2.5rem;">
        세계적으로 널리 보급된 투기 스포츠이자 대한민국의 국기.
      </p>
    </div>
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@500&display=swap"
      rel="stylesheet"
    />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    />
  </div>
</template>

<script>
// @ is an alias to /src
// import Practice from "../components/Home/Practice"
// import VideoClass from "../components/Home/VideoClass"

export default {
  name: "Home",
  methods: {
    initMoving(target, position, topLimit, btmLimit) {
      if (!target) return false;

      var obj = target;
      var isMoving = false;
      var initTop = position;
      var bottomLimit =
        Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight
        ) -
        btmLimit -
        obj.offsetHeight;
      var top = initTop;

      obj.style.position = "absolute";

      if (typeof window.pageYOffset == "number") {
        //WebKit
        var getTop = function() {
          return window.pageYOffset;
        };
      } else if (typeof document.documentElement.scrollTop == "number") {
        getTop = function() {
          return Math.max(
            document.documentElement.scrollTop,
            document.body.scrollTop
          );
        };
      } else {
        getTop = function() {
          return 0;
        };
      }

      if (self.innerHeight) {
        //WebKit
        var getHeight = function() {
          return self.innerHeight;
        };
      } else if (document.documentElement.clientHeight) {
        getHeight = function() {
          return document.documentElement.clientHeight;
        };
      } else {
        getHeight = function() {
          return 500;
        };
      }

      function move() {
        isMoving = true;
        if (initTop > 0) {
          var pos = getTop() + initTop;
        } else {
          pos = getTop() + getHeight() + initTop;
        }

        if (pos > bottomLimit) pos = bottomLimit;
        if (pos < topLimit) pos = topLimit;

        var interval = top - pos;

        top = top - interval / 70;
        obj.style.top = top + "px";
        if (Math.abs(interval) > 2) {
          window.setTimeout(function() {
            move();
          }, 4);
        } else {
          isMoving = false;
        }
      }

      function addEvent(obj, type, fn) {
        if (obj.addEventListener) {
          obj.addEventListener(type, fn, false);
        } else if (obj.attachEvent) {
          obj["e" + type + fn] = fn;
          obj[type + fn] = function() {
            obj["e" + type + fn](window.event);
          };
          obj.attachEvent("on" + type, obj[type + fn]);
        }
      }
      document.addEventListener("scroll", function() {
        if (!isMoving) {
          move();
        }
      });

      addEvent(window, "load", function() {
        move();
      });
    }
  },
  mounted() {
    this.initMoving(document.getElementById("gotop"), 200, 50, 50);
  }
};
</script>
