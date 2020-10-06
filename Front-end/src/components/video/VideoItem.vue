<template>
  <v-card class="mx-auto">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">{{ video.name }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <iframe
      width="100%"
      height="500"
      :src="video.url"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>

    <v-card-text><h4>{{ video.description }}</h4></v-card-text>

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
  computed: {
    ...mapState(["poomsaeCurNo"])
  },
  methods: {
    tryTraining() {
      this.$router.push({ name: "Training"})
    }
  }
};
</script>

<style>
</style>