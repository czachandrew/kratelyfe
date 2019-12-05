<template>
    <Page class="page">
        <ActionBar title="KRATE LYFE!" class="action-bar" >
            <!-- here is where we'll add the navigation button --> 
            <GridLayout rows="*" columns="auto,auto,auto">>
              <Button text="Details" row="0" col="0" @tap="goTo('detail')" />
              <Label text="Krates" row="0" col="1" textWrap="true" />
              
              <Button text="Logout" row="0" col="2" @tap="logout" />
              
            </GridLayout>
        </ActionBar>

        <TabView height="300px">
            <TabViewItem title="Get Krates" textTransform="uppercase">
                <StackLayout class="home-panel">
                    <!--Add your page content here-->
                    
                    <Label textWrap="true" :text="user.name" class="h2 description-label" />
                    <Label textWrap="true" :text="user.progression.xp + 'xp'"
                        class="h2 description-label" />
                    <Label textWrap="true" :text="user.crates.length + ' krates to open'"
                        class="h2 description-label" />
                    <Button text="Give me xp" @tap="onButtonTap" />
                    <Button text="Food Krate" @tap="onBuySomething('Food')" />
                    <Button text="Booze Krate" @tap="onBuySomething('Booze')" />
                    <Button text="Login" @tap="goTo('login')" />
                    <Button text="Test Class Import" @tap="testLogin" class="btn btn-primary" />
                    <ActivityIndicator row="1" #activityIndicator :busy="loggingIn" width="100" height="100" class="activity-indicator"></ActivityIndicator>
                    <Button text="Show from settings" @tap="showSettings" class="primary" />
                    <Button text="Test Data Grab" @tap="getTest" />
                    <Label :text="token" v-show="token" textWrap="true" />
                    
                    <Label :text="errorMessage" class="error" v-show="error" textWrap="true" />
                </StackLayout>
            </TabViewItem>
            <TabViewItem title="Open Krates" textTransform="uppercase">
                <StackLayout class="home-panel">
                    <Label text="Tap a Krate to open it" class="h2 description-label" />
                    <ListView class="list-group" for="(crate, key) in user.crates"
                        @itemTap="redeemCrate" style="height:1250px">
                        <v-template>
                            <FlexboxLayout flexDirection="row" class="list-group-item">
                                <Label :text="crate.name" />
                                <Label :text="crate.value" class="list-group-item-heading"
                                    style="width: 60%" />
                            </FlexboxLayout>
                        </v-template>
                    </ListView>
                </StackLayout>
            </TabViewItem>
        </TabView>
        


    </Page>
</template>

<script>
import { Reward } from './objects/Rewards.js';
import { Api } from './objects/Api.js';
import * as http from "tns-core-modules/http";
import * as appSettings from "tns-core-modules/application-settings";
import { ActivityIndicator } from "tns-core-modules/ui/activity-indicator";
import Detail from './Detail.vue';
import Login from './Login.vue';
const Pages = {
    "detail": Detail,
    "login": Login
}
const api = new Api();
    export default {
        methods: {
            goTo: function (page) {
                console.log("Going to " + page);
                this.$navigateTo(Pages[page]);
            },
            onItemTap: function(args) {
                //console.log("Item with index: " + args.index + " tapped");
                var reward = new Reward('test');
                console.log("Here is the first roll " + reward.roll);
                let item = reward.getReward();
                console.log("Here is the item that you won ");
                console.log(item);
            },
            getTest: function() {
                api.testDataGet();
            },
            testLogin: function(){
                console.log('Have a try at logging in');
                console.log("I have created the api");
                let self = this;
                this.loggingIn = true;
                api.login('czachandrew@gmail.com','fjop245').then(response => {
                    console.log("Back from login");
                    self.loggingIn = false;
                    //here is where we would redirect

                })

                //console.log(tokens);
            },
            showSettings: function(){
                console.log(appSettings.getString('accessToken'));
                this.token = appSettings.getString('accessToken');
            },
            onButtonTap() {
                console.log("Button was pressed");
                this.user.progression.xp += 200;
            },
            onBuySomething(crate) {
                console.log("Buy something was tapped");
                //make sure we got enough money
                if (this.user.progression.xp < 100) {
                    this.errorMessage = "You have insufficient funds";
                    this.error = true;
                    return;
                }
                this.user.crates.unshift({
                    name: crate,
                    value: "100",
                    prob: ".1"
                });
                this.user.progression.xp -= 100;
                this.error = false;
            },
            logout(){
                appSettings.setString('accessToken', '')
                appSettings.setBoolean('isLoggedIn', false)

            },
            redeemCrate(args) {
                console.log(args.index);
                let crate = this.user.crates[args.index];
                console.log("Redeeming!");
                console.log(crate);
                switch (crate.name) {
                    case "Food":
                        //display alert
                        action(
                            "Hey that is so awesome you just won $100 to Casa Blanca!",
                            "Cancel",
                            ["Oh Yeah!!"]
                        ).then(result => {
                            console.log(result);
                            this.user.crates.splice(args.index, 1);
                        });
                        break;
                    case "Booze":
                        //display thing
                        action(
                            "Hey that is so awesome you just won an infinite bar tab!",
                            "Cancel",
                            ["Oh Yeah!"]
                        ).then(result => {
                            console.log(result);
                            this.user.crates.splice(args.index, 1);
                        });
                        break;
                    case "Family":
                        //display thing
                        action(
                            "Hey that is so awesome you just won a Sea Turtle to take home!",
                            "Cancel",
                            ["Oh Yeah!"]
                        ).then(result => {
                            console.log(result);
                            this.user.crates.splice(args.index, 1);
                        });
                        break;
                    default:
                        break;
                }
            }
        },

        data() {
            return {
                user: {
                    name: "Andy",
                    progression: {
                        xp: 200
                    },
                    crates: []
                },
                error: false,
                errorMessage: "",
                token:"",
                loggingIn : false
            };
        },
        mounted(){
            console.log('Mounted!');
            if(appSettings.getBoolean('isLoggedIn') !== true ){
                //not logged in  redire 
                console.log("Go login boy!");
                this.$navigateTo(Login);
            } else {
                console.log("Should be logged in then");
                console.log(appSettings.getString('accessToken'));
            }
        }
    };
</script>

<style scoped>
    .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .description-label {
        margin-bottom: 15;
    }

    .error {
        font-size: 40;
        color: red;
        font-weight: bold;
    }
</style>