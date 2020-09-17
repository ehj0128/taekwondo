<template>
<div style="width:100%;">

  <v-container id="tool_box" class="d-flex flex-row" style="width: 63rem;">
    <h2>Apple ID</h2>
    <v-spacer></v-spacer>
    <h5 class="align-self-center mr-5">로그인</h5>
    <h5 class="align-self-center mr-5">Apple ID 생성</h5>
    <h5 class="align-self-center">FAQ</h5>
  </v-container>
  <v-img class="align-center" style="height: 11rem;" :src="require('./watch50.jpg')">
    <div id="c-box" class="d-flex justify-center">Apple ID 생성</div>
  </v-img>
  <v-container class="mt-5 p-0" style="width: 30rem;">
    <div class="text-center mb-2">하나의 Apple ID로 모든 Apple 서비스를 이용할 수 있습니다.</div>
    <div class="text-center" style="inline">Apple ID를 가지고 계십니까?<span class="ml-5" style="font-size: 15px; color:blue; cursor: pointer;">찾아보기 ></span></div>
    <v-text-field v-model="signupData.name" class="mt-4" outlined label="이름" required></v-text-field>
    <v-text-field v-model="signupData.birth" outlined label="생년월일" required></v-text-field>
  </v-container>
  <v-container class="pt-0 pb-0 d-flex justify-center">
    <hr style="width: 75rem">
  </v-container>
  <v-container class="mt-1" style="width: 30rem;">
    새 Apple ID로 사용될 주소입니다.
    <v-text-field v-model="signupData.email" class="mt-1" outlined label="name@example.com" required></v-text-field>
    <v-text-field v-model="signupData.password" outlined label="암호" required></v-text-field>
    <v-text-field v-model="passwordConfirmation" outlined label="암호 확인" required></v-text-field>
  </v-container>
  <v-container class="mt-1 pt-0 text-center" style="width: 30rem;">
    <v-btn class="ma-2" tile color="indigo" dark>SingUp</v-btn>
  </v-container>
</div>
</template>

<script>
export default {
  name: 'Signup',
  data(){
    return {
      agree: false,
      signupData:{
        name: '',
        birth: '',
        email:'',
        password: '',
      },
      passwordConfirmation: '',
    }
  }
}
</script>

<style scoped>
  #c-box{
    font-size: 3rem;
    color: white;
  }
</style>