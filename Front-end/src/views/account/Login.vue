<template>
  <v-container>
    <v-row>
      <!-- 로그인 -->
      <v-col cols="10" sm="8" md="6" lg="5" offset="1">
        <v-form>
          <h1 class="mt-10">로그인.</h1>
          <v-text-field
            outlined
            label="ID"
            name="login"
            class="mt-10"
            append-icon="mdi-account"
            type="text"
            color="teal"
          ></v-text-field>
          <v-text-field
            outlined
            id="Password"
            label="Password"
            name="password"
            append-icon="mdi-lock"
            type="password"
            color="teal"
          ></v-text-field>
        </v-form>
        <div>
          <span class="text-caption">ID는 (서비스이름)에 로그인할 때 사용하는 이메일 주소입니다.</span>
        </div>
        <div>          
          <v-btn
            color="teal"
            x-large
            class="my-5 white--text"
            block
          >로그인</v-btn>
        </div>
        
        <a>ID가 없으신가요? 지금 생성.</a>
       
      </v-col>

      <!-- 캐러셀 -->
      <!-- <v-col>
        <img src="https://cphoto.asiae.co.kr/listimglink/1/2019031517182795174_1552637908.jpg" alt="">
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Login"
};
</script>

<style>
</style>