<template>
  <div style="width:100%;">
    <v-row
      class="justify-center"
      style="background-color:rgb(245, 245, 247, 0.7); overflow: auto;"
    >
      <v-btn-toggle v-model="toggle_exclusive" mandatory>
        <v-col
          class="text-center"
          v-for="(clss, i) in actions"
          :key="clss.name"
          style="background-color:rgb(245, 245, 247, 0.7)"
        >
          <v-btn
            active-class="no-active"
            text
            @click="now = i"
            style="outline:none"
          >
            <v-img
              v-if="now == i"
              height="50px"
              width="50px"
              :src="actions[i].imgPath2"
            ></v-img>
            <v-img
              v-else
              height="50px"
              width="50px"
              :src="actions[i].imgPath"
            ></v-img>
          </v-btn>
          <div
            v-if="now == i"
            style="color:rgb(0, 112, 201)"
            class="text-caption"
          >
            {{ clss.name }}
          </div>
          <div v-else class="text-caption">{{ clss.name }}</div>
        </v-col>
      </v-btn-toggle>
    </v-row>

    <v-container style="width: 63rem;" class="mt-2">
      <v-card class="mx-auto mb-10">
        <v-container class="mt-5">
          <VideoItem :video="actions[now]" :now="now" />
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import VideoItem from "../../components/video/VideoItem.vue";
import { mapState } from "vuex";

export default {
  name: "VideoList",
  components: {
    VideoItem
  },
  computed: {
    ...mapState(["poomsaeCurNo", "videoList"])
  },
  data() {
    return {
      toggle_exclusive: undefined,
      now: 1,
      length: 12,
      length2: 3,
      onboarding: 0,
      actions: []
    };
  },
  mounted() {
    this.actions = this.$store.state.videoList;
  }
};
</script>

<style scoped>
.v-btn--active.no-active::before {
  background-color: transparent !important;
}
</style>
