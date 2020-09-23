<template>
  <v-card flat class="mt-15">
    <v-row>
      <v-col cols="5">
        <v-card flat height="100%" class="pt-15">
          <p class="text-h2 font-weight-bold mb-6">태권도</p>
          <p class="text-h5 ml-1 font-weight-bold mb-0">인내 극기</p>
          <p class="text-h5 ml-1 font-weight-bold">그리고, 예의</p>
          <p class="text-subtitle-1 ml-1">
            대표적인 한민족 고유의 무술로, 세계적으로 널리 보급된 투기
            스포츠이자 대한민국의 국기이다.
          </p>

          <v-card-actions>
            <v-btn large @click="openLink" rounded color="primary">
              나무위키</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="7">
        <v-img src="../../../public/tkd_imgs/1.jpg"></v-img>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Intro",
  methods: {
    openLink() {
      window.open("https://namu.wiki/w/%ED%83%9C%EA%B6%8C%EB%8F%84", "_blank");
    },
  },
};
</script>

<style></style>
