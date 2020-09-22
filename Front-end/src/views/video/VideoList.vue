<template>
  <div style="width:100%;">
    <v-row class="justify-center" style="background-color:rgb(245, 245, 247, 0.7)">
      <v-btn-toggle v-model="toggle_exclusive" mandatory>
        <v-col class="text-center" v-for="(clss, i) in classList" :key="clss.name" style="background-color:rgb(245, 245, 247, 0.7)">
          <v-btn active-class="no-active" text @click="now=i" style="outline:none">
            <v-img v-if="now==i" height="50px" width="50px" :src="clss.imgPath2"></v-img>
            <v-img v-else height="50px" width="50px" :src="clss.imgPath"></v-img>
          </v-btn>
          <div v-if="now==i" style="color:rgb(0, 112, 201)" class="text-caption">{{ clss.name }}</div>
          <div v-else class="text-caption">{{ clss.name }}</div>
        </v-col>
      </v-btn-toggle>
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
          imgPath: require("./../../assets/class-img/img-class1.png"),
          imgPath2: require("./../../assets/class-img/img-class1-a.png")
        },
        {
          id: 2,
          name: "태극 1장",
          imgPath: require("./../../assets/class-img/img-class2.png"),
          imgPath2: require("./../../assets/class-img/img-class2-a.png")
        },
        {
          id: 3,
          name: "태극 2장",
          imgPath: require("./../../assets/class-img/img-class3.png"),
          imgPath2: require("./../../assets/class-img/img-class3-a.png")
        },
        {
          id: 4,
          name: "태극 3장",
          imgPath: require("./../../assets/class-img/img-class4.png"),
          imgPath2: require("./../../assets/class-img/img-class4-a.png")
        },
        {
          id: 5,
          name: "태극 4장",
          imgPath: require("./../../assets/class-img/img-class5.png"),
          imgPath2: require("./../../assets/class-img/img-class5-a.png")
        },
        {
          id: 6,
          name: "태극 5장",
          imgPath: require("./../../assets/class-img/img-class6.png"),
          imgPath2: require("./../../assets/class-img/img-class6-a.png")
        },
        {
          id: 7,
          name: "태극 6장",
          imgPath: require("./../../assets/class-img/img-class7.png"),
          imgPath2: require("./../../assets/class-img/img-class7-a.png")
        },
        {
          id: 8,
          name: "태극 7장",
          imgPath: require("./../../assets/class-img/img-class8.png"),
          imgPath2: require("./../../assets/class-img/img-class8-a.png")
        },
        {
          id: 9,
          name: "태극 8장",
          imgPath: require("./../../assets/class-img/img-class9.png"),
          imgPath2: require("./../../assets/class-img/img-class9-a.png")
        },
        {
          id: 10,
          name: "고려",
          imgPath: require("./../../assets/class-img/img-class10.png"),
          imgPath2: require("./../../assets/class-img/img-class10-a.png")
        },
        {
          id: 11,
          name: "금강",
          imgPath: require("./../../assets/class-img/img-class11.png"),
          imgPath2: require("./../../assets/class-img/img-class11-a.png")
        },
        {
          id: 12,
          name: "태백",
          imgPath: require("./../../assets/class-img/img-class12.png"),
          imgPath2: require("./../../assets/class-img/img-class12-a.png")
        }
      ],
      toggle_exclusive: undefined,
      now: 0,
    };
  }
};
</script>

<style scoped>
.v-btn--active.no-active::before {                                                                             
  background-color: transparent !important;
}

</style>