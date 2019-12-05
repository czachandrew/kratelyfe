<template>
    <GridLayout rows="auto, auto, auto" columns="*, *, *">
        <!-- images of three krates booze, food, family --> 
      <Label text="Food Stuff" row="0" col="0" />
      <!-- a list of purchase buttons -->
      <Label text="Booze Stuff" row="0" col="1" />
      <Label text="Family Stuff" row="0" col="2" />
      <!-- a row for status messages to appear --> 
      <Button text="100 XP" @tap="purchaseBox('Food')" row="1" col="0" />
      <Button text="100 XP" @tap="purchaseBox('Booze')" row="1" col="1" />
      <Button text="100 XP" @tap="purchaseBox('Family')" row="1" col="2" />
      
      
      
      <Label v-if="showError" :text="error" colSpan="3" row="2" col="0" />
      
    </GridLayout>
</template>
<script>
import { Api } from './objects/Api.js';
const api = new Api();
export default {
  props: ['user'],
  data () {
    return {
        error:'',
        showError: false,
        krates:null
    };
  },
  methods: {
      getKrates(){

      },
      purchaseBox(type){
          var amount = 0;
          switch(type){
              case 'Food':
                  amount = 100;
                  break;
              case 'Booze':
                  amount = 100;
                  break;
              case 'Family':
                  amount = 100;
                  break;
              default:
                  break;
          }
          if(amount == 0){
              //throw error invalid selection
              this.error = "Sorry that's not a valid selection."
              this.showError = true;
              return;
          }
          if(this.user.progression.xp < amount){
              //throw error insufficient funds
              this.error = "Sorry you don't have enough xp";
              this.showError = true;
              return;
          }
        this.showError = false;
        var balance =  this.user.progression.xp - amount;
          this.$emit('purchase-successful', {'type': type, 'newBalance': balance})

      }
  }
};
</script>
