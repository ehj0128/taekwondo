<template>
  <v-expansion-panels popout flat hover focusable multiple>
    <v-expansion-panel v-for="(item, i) in contents" :key="i">
      <v-expansion-panel-header
        ><h3>{{ item.name }}</h3></v-expansion-panel-header
      >
      <v-expansion-panel-content class="mt-4">
        {{ item.content }}
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {
      contents: [
        {
          name: "준비자세",
          content:
            "• 태권도 기술 수행 전 신체의 긴장을 풀고 호흡을 조절하며 정신을 집중하는 자세. 품새에서는 고유한 5가지 정형화된 준비자세가 있으며, 겨루기를 할 때는 자신의 신체와 특성에 맞도록 자유롭게 자세를 취할 수 있다."
        },
        {
          name: "꺾기",
          content:
            "• 상대방의 관절을 누르거나 비틀어서 움직이지 못하게 하는 기술. 손으로 상대방의 손목, 팔굽, 어깨, 발목, 무릎 등을 누르거나 비틀어서 제압하는 기술로서 가까운 거리에서 상대방에게 잡혔을 때나 상대방을 잡았을 때 활용하는 기술이다."
        },
        {
          name: "넘기기",
          content:
            "• 상대방을 잡아당기거나 밀치며 중심을 무너뜨린 다음, 쓰러뜨리는 야비한 기술."
        },
        {
          name: "뛰기",
          content:
            "• 태권도의 기술 동작을 다양하게 활용할 수 있도록 몸을 아래에서 위로 솟구치는 동작. 높이 있거나 멀리 있는 목표물을 가격하거나 상대방의 공격을 피하려는 동작이며 가로 또는 세로로 온몸이 한 바퀴 이상 돌기도 하는 동작이다."
        },
        {
          name: "막기",
          content:
            "• 손이나 팔, 발이나 다리로 상대방의 공격을 차단하여 주요 신체 부위를 보호하는 기술. 상대방의 공격에 맞서거나 쳐내는 '쳐막기'가 일반적이나, 경우에 따라서는 충격을 흡수하는 '받아막기', 공격을 미리 차단하는 '걸어막기', 밀어 내어 공격의 진행 방향을 바꾸는 '걷어막기' 등으로 활용한다."
        },
        {
          name: "밀기",
          content:
            "• 상대방을 손이나 발로 밀거나 밀쳐 내는 동작. 상대방과의 거리 조절을 위해 손이나 발로 밀거나 밀쳐 냄으로써 공격할 수 있는 공간을 확보하거나 상대방이 공격 가능한 거리에서 벗어나는 동작이다."
        },
        {
          name: "빼기",
          content:
            "• 상대방에게 몸의 일부가 잡혔을 때, 빼내는 기술. 상대방이 자신의 팔목이나 발목 등을 잡았을 때에 관절을 틀거나 돌려 빼낼 수 있도록 하는 기술이다."
        },
        {
          name: "서기",
          content:
            "• 공격이나 방어 기술을 수행하려고 지면을 발로 지탱하는 여러 자세. 몸의 중심 이동과 방향 전환을 효율적으로 수행하려고 지면을 발로 지탱하는 여러 자세이다."
        },
        {
          name: "잡기",
          content:
            "• 상대방의 몸이나 옷깃 등을 손으로 잡는 보조 기술.상대방의 신체 일부를 손으로 잡아 움직임을 방해하거나 움직이지 못하도록 고정하는 보조 기술이다."
        }
      ]
    };
  }
};
</script>

<style></style>
