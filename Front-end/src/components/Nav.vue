<template>
  <v-app-bar dense app color="rgb(51,51,51)" dark>
    <v-spacer></v-spacer>
    <v-btn text>로고</v-btn>
    <v-btn text>태권도란</v-btn>
    <v-btn text>영상교육</v-btn>
    <v-btn text>실습</v-btn>
    <v-btn text @click="$router.push({name: 'Login'})">로그인</v-btn>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>
<script>
export default {
  name: "Nav",
  
};
</script>

<style>
</style>