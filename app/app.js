import Vue from "nativescript-vue";

import Home from "./components/Home";
import Detail from "./components/Detail";
import {TNSFontIcon, fonticon} from 'nativescript-fonticon';

TNSFontIcon.debug = false; 
TNSFontIcon.paths = {
    'fa' : './fontawesome.css'
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);

new Vue({

    template: `
        <Frame>
            <Home />
        </Frame>`,

    components: {
        Home
    },
    data(){
        return{
            detailPage:Detail
        }
    }
}).$start();
