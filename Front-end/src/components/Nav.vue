<template>
  <v-app-bar dense app color="rgb(51,51,51)" dark>
    <v-container style="width: 63rem;">
      <v-row>
        <v-spacer></v-spacer>
        <v-btn cols=1 text @click="checkHome"><v-img width="30" src="@/assets/nav_logo.png"></v-img></v-btn>
        <v-spacer></v-spacer>
        <v-btn cols=1 text @click="checkIntroduction">태권도란</v-btn>
        <v-spacer></v-spacer>
        <v-btn cols=1 text @click="checkVideoList">영상교육</v-btn>
        <v-spacer></v-spacer>
        <v-btn cols=1 text @click="checkTraining">실습</v-btn>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
<script>
export default {
  name: "Nav",
  methods: {
    checkHome () {
      if (this.$router.history.current.path !== '/') {
        this.$router.push({name: 'Home'})
      }
    },
    checkIntroduction () {
      if (this.$router.history.current.path !== '/introduction') {
        this.$router.push({name: 'Introduction'})
      }
    },
    checkVideoList () {
      if (this.$router.history.current.path !== '/videolist') {
        this.$router.push({name: 'VideoList'})
      }
    },
    checkTraining () {
      if (this.$router.history.current.path !== '/training') {
        this.$router.push({name: 'Training'})
      }
    },
  }
};
</script>

<style>
</style>