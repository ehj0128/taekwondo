<template>
  <v-app-bar dense app color="rgb(51,51,51)" dark>
    <v-container style="width: 63rem;">
      <v-row>
        <v-btn cols=1 text @click="$router.push({name: 'Home'})">로고</v-btn>
        <v-spacer></v-spacer>
        <v-btn cols=1 text>태권도란</v-btn>
        <v-spacer></v-spacer>
        <v-btn cols=1 text @click="$router.push({name: 'VideoList'})">영상교육</v-btn>
        <v-spacer></v-spacer>
        <v-btn cols=1 text @click="$router.push({name: 'Training'})">실습</v-btn>
        <v-spacer></v-spacer>
        <v-btn cols=1 text @click="$router.push({name: 'Login'})">로그인</v-btn>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
<script>
export default {
  name: "Nav",
  
};
</script>

<style>
</style>