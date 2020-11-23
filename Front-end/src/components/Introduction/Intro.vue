<template>
  <v-card flat class="mt-15">
    <v-row>
      <v-col cols="12" lg="5">
        <v-card flat height="100%">
          <p class="text-h2 font-weight-bold mb-2">태권도</p>
          <v-btn @click="openLink('namu')" rounded class="mr-3" color="primary">
            나무위키</v-btn
          >
          <v-btn
            @click="openLink('official')"
            rounded
            color="indigo darken-3"
            dark
          >
            대한태권도협회</v-btn
          >
          <p class="text-h5 ml-1 font-weight-bold mb-1 mt-10">
            예의 염치 인내 극기
          </p>
          <p class="text-h5 ml-1 font-weight-bold">그리고, 백절불굴</p>
          <p class="text-subtitle-1 ml-1 mb-10">
            태권도는 남·여·노·소 어떤 사람이나 제한없이 아무런 무기를 지니지
            않고, 언제, 어디서나 손과 발을 사용해 방어와 공격의 기술을 연마하여
            심신의 단련을 통해 인간다운 길을 걷도록 하는 무도이자 스포츠이다.
          </p>
          <p class="text-h3 font-weight-bold my-6">신체적 효과</p>
          <p class="text-subtitle-1 ml-1 mb-10">
            어린이의 성장발육, 청장년과 노인의 체력증진, 여성의 건강과
            미용증진에 큰 효과를 준다. 태권도의 기술체계와 운동형태는 신체의 각
            분절을 좌우 균형있게 구사하도록 짜여져 있어, 인체관절의 유연성이
            고르게 발달하도록 한다 그리고 문명발달에 따라 가중되는 정신적 장해,
            스트레스 해소에도 큰 도움을 준다.
          </p>
        </v-card>
      </v-col>
      <v-col class="d-none d-lg-flex" cols="7">
        <v-img src="../../../public/tkd_imgs/1.jpg"></v-img>
      </v-col>
    </v-row>
    <p class="text-h3 font-weight-bold my-6">맨몸투기</p>
    <p class="text-subtitle-1 ml-1 mb-10">
      맨손과 맨발로 상대방을 타격하는 기술체계를 갖는다. 특히 다른 무술과 뚜렸이
      차이를 갔는 것은 위력적이고 다양한 발 기술이다. 발 기술이야말로 태권도가
      세계 최강의 투기고 존재하는 이유이다. 태권도는 어떤 무기의 사용도 없이
      인체를 사용하지만 일편필승의 가공할 공격력을 갖고 있다. 그러나 태권도는
      방어를 우선하는 기술습득원리를 강조한다. 이는 평화와 공정성을 존중하는
      태권도의 정신적 기반에서 비롯한다. 이를 통해 태권도는 배우는 이가 수련의
      목적을 결코 남을 공격해서 제압하려는 것이 아니라 자기 극복의 고결한 태도에
      두도록 만든다.
    </p>
    <p class="text-h3 font-weight-bold my-6">스포츠</p>
    <p class="text-subtitle-1 ml-1 mb-10">
      팬암게임, 아시안게임, 올아프리칸게임, 남아메리카게임 등의 대륙별 종합경기
      대회는 물론 올림픽 경기장의 관중들이 환호하는 새로운 가치를 지니게 되었다.
      아시안게임이나 올림픽의 개회식에서 처럼 1,000명이 넘는 많은 수련자가
      아름답고, 정확하고, 강력한 힘이 표출되는 태권도 매스게임을 보이는 장면은
      어떤 스포츠종목에서도 발견하기 어려울 것이다 . 더욱이 맨몸투기로서 인명에
      미칠 피해를 없애고 합리적이고 공정한 경쟁을 하도록 과학적인 경기규칙과
      보호용구를 개발한 건은 태권도가 각광받는 국제스포츠로 발전한 원동력이다.
      이제 태권도는 고도산업문명사회의 길을 가고 있는 인류에게 적합한
      현대스포츠로서 유희성, 안전성, 규칙성, 경제성을 골고루 갖추게 된 것이다.
    </p>
    <p class="text-h3 font-weight-bold my-6">교육</p>
    <p class="text-subtitle-1 ml-1 mb-10">
      태권도가 표방하는 수련의 목적은 수련자를 사람다운 사람, 즉 인간의 신체적
      조건과 아울러 정신적 기틀을 보다 개선하겠다는 지향점을 갖는 다는 것으로
      설명된다. 태권도의 교육적 역할은, 자아완성에의 의지를 실천하도록
      안내한다는 점으로 귀결된다. 이를 위해서 태권도 수련자는 평화지향적인
      기술체득원리를 이해하며 빈번하고 반복적인 예절 교육을 통해 자칫 빠지기
      쉬운 자기중심적 삶을 뛰어넘어 인간생활에의 광범위한 적응력을 높이는
      것이다. 이런 인간생활에서의 덕목들이 교육으로서 태권도가 추구하는 바이며
      바로 이점이 태권도의 무도적 가치관이다.
    </p>
    <v-card-text class="text-right">
      출처 : 대한태권도협회
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Intro",
  methods: {
    openLink(site) {
      switch (site) {
        case "namu":
          return window.open(
            "https://namu.wiki/w/%ED%83%9C%EA%B6%8C%EB%8F%84",
            "_blank"
          );
        case "official":
          return window.open("https://www.koreataekwondo.co.kr/", "_blank");
      }
    }
  }
};
</script>

<style></style>
