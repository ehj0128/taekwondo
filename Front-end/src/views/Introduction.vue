<template>
  <div>
    <div>
  <v-item-group mandatory active-class="primary">
    <v-container>
      <v-row>
        <v-col
          v-for="(menu) in menus"
          :key="menu"
        >
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              class="d-flex align-center"
              dark
              height="200"
              @click="toggle"
            >
              <v-scroll-y-transition>
                <div
                  v-if="active"
                  class="display-3 flex-grow-1 text-center"
                >
                  {{ menu }}
                </div>
              </v-scroll-y-transition>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
    </div>    







    <v-container style="width: 63rem;">
      <v-row>
        <v-col cols="3" style="background-color: red">
            <v-card class="mx-auto" max-width="500">
            <v-list>
              <v-list-item-group v-model="model" mandatory>
                <v-list-item v-for="(item, i) in menus" :key="item">
                  <v-list-item-content>
                    <v-list-item-title v-text="item" @click="window=i"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>

        <v-col cols="9" style="background-color: blue">
          <v-window v-model="window" class="elevation-1">
            <v-window-item v-for="n in length" :key="n">
              <v-card flat>
                <v-card-text>
                  <v-row class="mb-4" align="center">
                    <strong class="title">Title {{ n }}</strong>
                    <v-spacer></v-spacer>
                  </v-row>
                  <div v-if="window==0"><Intro /></div>
                  <div v-else-if="window==1"><History /></div>
                  <div v-else-if="window==2"><Category /></div>
                  <div v-else><Technique /></div>
                </v-card-text>
              </v-card>
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Intro from '../components/Introduction/Intro.vue'
import History from '../components/Introduction/History.vue'
import Category from '../components/Introduction/Category.vue'
import Technique from '../components/Introduction/Technique.vue'

export default {
  name: "introduction",
  components:{
    Intro,
    History,
    Category,
    Technique
  },
  data(){
    return {
      menus : ["소개", "역사", "기술 체계", "용어 사전"],
      model: 0,
      length: 4,
      window: 0,
    }
  }
}
</script>

<style>

</style>