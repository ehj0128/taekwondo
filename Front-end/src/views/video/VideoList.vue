<template>
  <div style="width:100%;">
    <v-row
      class="justify-center"
      style="background-color:rgb(245, 245, 247, 0.7)"
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
            @click="$store.state.poomsaeCurNo = i;"
            style="outline:none"
          >
            <v-img
              v-if="$store.state.poomsaeCurNo == i"
              height="50px"
              width="50px"
              :src="imgList[i].imgPath2"
            ></v-img>
            <v-img
              v-else
              height="50px"
              width="50px"
              :src="imgList[i].imgPath"
            ></v-img>
          </v-btn>
          <div
            v-if="$store.state.poomsaeCurNo == i"
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
          <VideoItem :video="actions[$store.state.poomsaeCurNo]" />
        </v-container>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import VideoItem from "../../components/video/VideoItem.vue";
import { mapState } from "vuex";
import axios from 'axios';

export default {
  name: "VideoList",
  components: {
    VideoItem
  },
  computed: {
    ...mapState(["poomsaeCurNo"])
  },
  data() {
    return {
      imgList: [
        { //id: 1,
          //name: "기본 동작",
          imgPath: require("./../../assets/class-img/img-class1.png"),
          imgPath2: require("./../../assets/class-img/img-class1-a.png"),
          // videoUrl: "https://www.youtube.com/embed/HfQ_yrZyQmg",
          // description: "기본 동작입니다. 천천히 따라해보세요."
        },
        {
          // id: 2,
          // name: "태극 1장",
          imgPath: require("./../../assets/class-img/img-class2.png"),
          imgPath2: require("./../../assets/class-img/img-class2-a.png"),
          // videoUrl: "https://www.youtube.com/embed/4WTADD73ddk",
          // description:
          //   "태극 1장은 팔괘의 건(乾)을 의미하며 건은 하늘과 양을 뜻한다. \
          //               건이 만물의 근원이 되는 시초를 나타낸 것과 같이 태권도에 있어서도 맨 처음의 품새이다."
        },
        {
          // id: 3,
          // name: "태극 2장",
          imgPath: require("./../../assets/class-img/img-class3.png"),
          imgPath2: require("./../../assets/class-img/img-class3-a.png"),
          // videoUrl: "https://www.youtube.com/embed/cw6nK5e95YU",
          // description:
          //   "태극 2장은 팔괘의 태(兌)를 의미하며 태는 속으로는 단단하고 겉으로는 부드럽다는 뜻이다. \
          //               태극 1장을 수련하여 품새에 대한 알찬 마음이 생겨 기초적인 막기와 차기를 할 수 있는 품새다."
        },
        {
          // id: 4,
          // name: "태극 3장",
          imgPath: require("./../../assets/class-img/img-class4.png"),
          imgPath2: require("./../../assets/class-img/img-class4-a.png"),
          // videoUrl: "https://www.youtube.com/embed/It6BAg4znQM",
          // description:
          //   "태극 3장은 팔괘의 이(離)를 의미하며 이는 불을 나타내고 뜨겁고 밝음을 지닌다. \
          //               태권도 품새 수련을 통한 불같은 정의심과 수련의욕이 생겨난 파란띠로 승급할 수 있는 과정이다."
        },
        {
          // id: 5,
          // name: "태극 4장",
          imgPath: require("./../../assets/class-img/img-class5.png"),
          imgPath2: require("./../../assets/class-img/img-class5-a.png"),
          // videoUrl: "https://www.youtube.com/embed/scB6S4X2zYY",
          // description:
          //   "태극 4장은 팔괘의 진(震)을 의미하며 진은 우뢰를 나타내고 큰 힘과 위엄있는 듯을 지니고 있다. \
          //               겨루기에 대비한 각종 동작과 뒷굽이 서기가 많다는 것이 특징이다."
        },
        {
          // id: 6,
          // name: "태극 5장",
          imgPath: require("./../../assets/class-img/img-class6.png"),
          imgPath2: require("./../../assets/class-img/img-class6-a.png"),
          // videoUrl: "https://www.youtube.com/embed/e2ffyREbPUE",
          // description:
          //   "태극 5장은 팔괘의 손(巽)을 의미하며 손은 바람을 나타내며 바람의 강약에 따라 위세와 고요의 뜻을 지닌다. \
          //               힘의 강약을 조절할 수 있는 수련단계라 할 수 있겠다."
        },
        {
          // id: 7,
          // name: "태극 6장",
          imgPath: require("./../../assets/class-img/img-class7.png"),
          imgPath2: require("./../../assets/class-img/img-class7-a.png"),
          // videoUrl: "https://www.youtube.com/embed/ZZUQwYzPjK4",
          // description:
          //   "태극 6장은 팔괘의 감(坎)을 의미하며 감은 물을 나타내고 끊임없는 흐름과 유연함을 뜻한다. \
          //               만물의 생명원인 물의 특성처럼 기술의 연결이 물흐르듯 해야 한다."
        },
        {
          // id: 8,
          // name: "태극 7장",
          imgPath: require("./../../assets/class-img/img-class8.png"),
          imgPath2: require("./../../assets/class-img/img-class8-a.png"),
          // videoUrl: "https://www.youtube.com/embed/XbPM3yI6KHg",
          // description:
          //   "태극 7장은 팔괘의 간(艮)을 의미하며 산을 나타내고 육주함과 굳건하다는 뜻을 지닌다. \
          //               태권도 빨간띠가 되면 흔들리지 않는 수련의식과 기술습득으로 인한 힘의 무게를 지닐 수 있다."
        },
        {
          // id: 9,
          // name: "태극 8장",
          imgPath: require("./../../assets/class-img/img-class9.png"),
          imgPath2: require("./../../assets/class-img/img-class9-a.png"),
          // videoUrl: "https://www.youtube.com/embed/uFcjtWeq2lc",
          // description:
          //   "태극 8장은 팔괘의 곤(坤)을 의미하며 곤은 음과 땅을 나타내고 뿌리와 안정 그리고 시작과 끝의 뜻을 지닌다. \
          //               유급자의 마지막 품새로서 연성이 끝나면 1장에서 8장까지 총연습 기간을 거쳐 국기원 승단(품)심사에 나갈 수 있는 자격이 부여된다."
        },
        {
          // id: 10,
          // name: "고려",
          imgPath: require("./../../assets/class-img/img-class10.png"),
          imgPath2: require("./../../assets/class-img/img-class10-a.png"),
          // videoUrl: "https://www.youtube.com/embed/K9WrxPjRLxg",
          // description:
          //   "1품/단이 수련하는 품새. 품새선은 '선비 사'자(士)이다. 유단자가 되어 처음 배우는 품새이지만, 굉장히 어렵다. 오히려 2품의 품새인 금강이 수련 난이도는 더 쉬울 정도이다."
        },
        {
          // id: 11,
          // name: "금강",
          imgPath: require("./../../assets/class-img/img-class11.png"),
          imgPath2: require("./../../assets/class-img/img-class11-a.png"),
          // videoUrl: "https://www.youtube.com/embed/ZwO4M_IXKXY",
          // description:
          //   "2품/단 이 수련하는 품새. 품새선은 '뫼 산'자(山)이다. 불교의 수호신으로써 인왕역사라 불리우는 금강역사에서 따 왔다. 의미는 단단하고 굳건함. 그에 걸맞게 육중하고 무게감이 있다."
        },
        {
          // id: 12,
          // name: "태백",
          imgPath: require("./../../assets/class-img/img-class12.png"),
          imgPath2: require("./../../assets/class-img/img-class12-a.png"),
          // videoUrl: "https://www.youtube.com/embed/jIlqwVuMLsY",
          // description:
          //   "3품/단 이 수련하는 품새. 품새선은 '장인 공'자(工)이다. \
          //               그 의미는 태백산이 아닌 밝은산, 제사를 드리던 신성한 산을 의미한다."
        }
      ],
      toggle_exclusive: undefined,
      now: 0,
      length: 12,
      length2: 3,
      onboarding: 0,
      actions: []
    };
  },
  mounted(){
    axios.get("http://j3b309.p.ssafy.io:8085/educations/poomsae/")
      .then(res => {
        this.actions = res.data.data;
        console.log(this.actions);
      })
      .catch(err => console.log(err))
  }
};
</script>

<style scoped>
.v-btn--active.no-active::before {
  background-color: transparent !important;
}
</style>