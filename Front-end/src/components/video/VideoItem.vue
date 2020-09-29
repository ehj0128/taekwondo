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
      :src="video.videoUrl"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>

    <v-card-text>{{ video.description }}</v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="deep-purple accent-4">
        실습하기
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "VideoItem",
  props: {
    video: Object
  }
};
</script>

<style>
</style>