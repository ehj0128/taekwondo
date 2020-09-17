<template>
  <v-container style="width: 63rem;">
    <v-row>
      <!-- 로그인 -->
      <v-col cols="10" sm="8" md="6" lg="5">
        <v-form>
          <div class="mt-10" style='font-size: 3rem; font-weight: bold'>로그인.</div>
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
        
        <p class="mt-1" @click="$router.push({name: 'Signup'})" style='color: blue; cursor: pointer'>ID가 없으신가요? 지금 생성.</p>
       
      </v-col>
      <img src="http://i.stack.imgur.com/SBv4T.gif" alt="대신 귀여운 야돈을 드리겠습니다"  width=500/>
      <!-- <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4d1046b6-0439-477c-9301-ef79e8eb7b57/ddaqbi7-738ef4da-0c8e-4dff-9f53-112a99a227a5.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvNGQxMDQ2YjYtMDQzOS00NzdjLTkzMDEtZWY3OWU4ZWI3YjU3XC9kZGFxYmk3LTczOGVmNGRhLTBjOGUtNGRmZi05ZjUzLTExMmE5OWEyMjdhNS5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.8zBA1oD64-HP8p6FpgUhva3Hmh8zzyo2TfUo8W_gveM" alt=""> -->
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