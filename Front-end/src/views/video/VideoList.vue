<template>
  <div style="width:100%;">
    <v-row class="justify-center">
      <div v-for="lesson in classList" :key="lesson.name" class="mx-4 my-2" cols="1">
        <v-img height="50px" width="50px" :src="lesson.img" alt></v-img>  
        <span>{{lesson.name}}</span>
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
          name: "기본동작",
          img: "/class-img/img-class1.png"
        },
        {
          name: "태극 1장",
          img: "/class-img/img-class1.png"
        },
        {
          name: "태극 2장",
          img: "/class-img/img-class2.png"
        },
        {
          name: "태극 3장",
          img: "/class-img/img-class3.png"
        },
        {
          name: "태극 4장",
          img: "/class-img/img-class4.png"
        },
        {
          name: "태극 5장",
          img: "/class-img/img-class5.png"
        },
        {
          name: "태극 6장",
          img: "/class-img/img-class6.png"
        },
        {
          name: "태극 7장",
          img: "/class-img/img-class7.png"
        },
        {
          name: "태극 8장",
          img: "/class-img/img-class1.png"
        },
        {
          name: "고려",
          img: "/class-img/img-class1.png"
        },
        {
          name: "금강",
          img: "/class-img/img-class1.png"
        },
        {
          name: "태백",
          img: "/class-img/img-class1.png"
        }
      ]
    };
  }
};
</script>

<style>
</style>