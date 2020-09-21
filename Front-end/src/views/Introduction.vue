<template>
  <div>
    <div>
      <v-item-group mandatory active-class="primary">
          <v-row class="justify-center" style="background-color:rgb(249, 249, 250)">
            <v-col
              v-for="(menu, i) in menus"
              :key="menu"
              cols="1"
              >
              <v-item v-slot:default="{ toggle, active }">
                <v-card class="d-flex align-center" color="rgb(249, 249, 250)" flat height="50px" width="50px" @click="toggle; window=i;">
                  <v-scroll-y-transition>
                    <div v-if="active" class="flex-grow-1 text-center">
                      <v-img height="50px" width="50px" :src="menu.imgPath" alt></v-img>  
                    </div>
                    <div v-else class="flex-grow-1 text-center">
                        <v-img height="50px" width="50px" :src="menu.imgPath" alt></v-img>  
                    </div>
                  </v-scroll-y-transition>
                </v-card>
              </v-item>
              <div>{{ menu.title }}</div> 
            </v-col>
          </v-row>
      </v-item-group>
    </div>    

    <v-container style="width: 63rem;">
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
      menus : [
        { 
          title: "소개",
          imgPath: require("./../assets/class-img/img-class1.png")
        },
        { 
          title: "역사",
          imgPath: require("./../assets/class-img/img-class1.png")
        },
        { 
          title: "기술 체계",
          imgPath: require("./../assets/class-img/img-class1.png")
        },
        { 
          title: "용어 사전",
          imgPath: require("./../assets/class-img/img-class1.png")
        },
      ],
      model: 0,
      length: 4,
      window: 0,
    }
  }
}
</script>

<style>

</style>