<template>
  <v-container>
    <h1>영상수업</h1>
    <iframe
      width="240"
      src="https://www.youtube.com/embed/4WTADD73ddk"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>

    <iframe
      width="240"
      src="https://www.youtube.com/embed/4WTADD73ddk"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>


    <iframe
      width="240"
      src="https://www.youtube.com/embed/4WTADD73ddk"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>


    <iframe
      width="240"
      src="https://www.youtube.com/embed/4WTADD73ddk"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name:"VideoClass",
  data(){
    return {
      actions: ""
    }
  },
  mounted(){
    axios.get("http://j3b309.p.ssafy.io:8085/educations/poomsae/")
      .then(res => {
        this.actions = res;
        console.log(this.actions);
      })
      .catch(err => console.log(err))
  }
};
</script>

<style>
</style>