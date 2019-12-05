<template>
    <Page>
        <GridLayout rows="auto, *, *, *" columns="*, *">
           <Label class="fa" :text="'fa-eye' | fonticon" row="0" col="0" />
            <!-- <Image src="~/images/cheese.png" stretch="aspectFit" row="0" col='0' colspan="2" /> -->
            <TextField hint="Enter your username" v-model="username" row="1" col="0"/>
            <TextField hint="Enter your password." v-model="password" secure="true" row="2" col="0" />
            <Button text="Login" @tap="login" row="3" col="1" />
            

            
            
            
            
          
        </GridLayout>
    </Page>
</template>
<script>
import { Api } from './objects/Api.js';
import Home from './Home.vue';
const api = new Api();
export default {
    data(){
        return {
            username:'',
            password: '', 
        }
    },
    methods: {
        login(){
            let self = this;
            console.log("Coming from the login!");
            console.log(this.username);
            console.log(this.password);
            api.login(this.username, this.password).then(result => {
                console.log(results);
                self.$navigateTo('Home');
            }).catch(error => {
                console.log(error);
            });
        }
    }
}
</script>
<style scoped>
.font-awesome {
    font-family: "Font Awesome 5 Free", "fa-regular-400";
}

.font-size {
    font-size: 96;
}
</style>