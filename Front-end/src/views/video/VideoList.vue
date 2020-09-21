<template>
  <div style="width:100%;">
    <v-row class="justify-center" style="background-color:rgb(249,249,250)">
      <div v-for="lesson in classList" :key="lesson.id" class="text-center mx-4 my-2" cols="1">
        <v-img height="50px" width="50px" :src="lesson.imgPath" alt></v-img>
        <span class="text-caption">{{lesson.name}}</span>
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "VideoList",
  data() {
    return {
      classList: [
        {
          id: 1,
          name: "기본동작",
          imgPath: require("./../../assets/class-img/img-class1.png")
        },
        {
          id: 2,
          name: "태극 1장",
          imgPath: require("./../../assets/class-img/img-class2.png")
        },
        {
          id: 3,
          name: "태극 2장",
          imgPath: require("./../../assets/class-img/img-class3.png")
        },
        {
          id: 4,
          name: "태극 3장",
          imgPath: require("./../../assets/class-img/img-class4.png")
        },
        {
          id: 5,
          name: "태극 4장",
          imgPath: require("./../../assets/class-img/img-class5.png")
        },
        {
          id: 6,
          name: "태극 5장",
          imgPath: require("./../../assets/class-img/img-class6.png")
        },
        {
          id: 7,
          name: "태극 6장",
          imgPath: require("./../../assets/class-img/img-class7.png")
        },
        {
          id: 8,
          name: "태극 7장",
          imgPath: require("./../../assets/class-img/img-class8.png")
        },
        {
          id: 9,
          name: "태극 8장",
          imgPath: require("./../../assets/class-img/img-class9.png")
        },
        {
          id: 10,
          name: "고려",
          imgPath: require("./../../assets/class-img/img-class10.png")
        },
        {
          id: 11,
          name: "금강",
          imgPath: require("./../../assets/class-img/img-class11.png")
        },
        {
          id: 12,
          name: "태백",
          imgPath: require("./../../assets/class-img/img-class12.png")
        }
      ]
    };
  }
};
</script>

<style>
</style>