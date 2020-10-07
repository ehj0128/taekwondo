<template>
  <v-card flat class="mx-auto">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title v-if="incoming" class="headline">{{ video.name }}</v-list-item-title>
        <v-list-item-title v-else class="headline">태극 1장</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <iframe
      v-if="incoming"
      width="100%"
      height="500"
      :src="video.url"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>

    <iframe
      v-else
      width="100%"
      height="500"
      src="https://www.youtube.com/embed/4WTADD73ddk"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>

    <v-card-text v-if="incoming"><h4>{{ video.description }}</h4></v-card-text>
    <v-card-text v-else ><h4>태극 1장은 팔괘의 건(乾)을 의미하며 건은 하늘과 양을 뜻합니다. 건이 만물의 근원이 되는 시초를 나타낸 것과 같이 태권도에 있어서도 맨 처음의 품새입니다.</h4></v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="deep-purple accent-4" @click="tryTraining()">
        <h3>실습하기</h3>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "VideoItem",
  props: {
    video: Object,
  },
  methods: {
    tryTraining() {
      this.$router.push({ name: "Training"})
    }
  },
  computed: {
    ...mapState(["poomsaeCurNo"]),
    incoming(){
      return !!this.video
    }
  },
};
</script>

<style>
</style>