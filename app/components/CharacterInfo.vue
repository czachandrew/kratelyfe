<template>

  <GridLayout rows="auto, auto, auto" columns="*, auto">
    <Label :text="localUser.name" textWrap="true" row="0" col="0" />
    <Label :text="experienceInfo" textWrap="true" row="1" col="0" />
    <GridLayout row="0" rowSpan="2" col="1" rows="*" columns="auto, *">
        <Label text="Krate image" row="0" col="0"  textWrap="true" />
        <Label :text="crates.length" row="0" col="1" />
    </GridLayout>
    <Button row="2" col="1" class="btn btn-primary" text="Add Experience" @tap="addExperience(100)" />
    
  </GridLayout>

</template>
<script>
export default {
  props: ['user', 'crates'],
  data () {
    return {
        localUser: {
            name: 'Andy',
            progression: {
                xp: 2000,
                lifetime_xp: 40000
            }
        }
    };
  },
  computed: {
      experienceInfo(){
          return 'Experience : ' + this.localUser.progression.xp;
      }
  },
  methods: {
      addExperience(xp){
          this.localUser.progression.xp += xp;
          this.$emit('add-xp', xp);
      }
  }
};
</script>