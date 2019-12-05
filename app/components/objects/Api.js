import * as http from 'tns-core-modules/http';
import * as appSettings from "tns-core-modules/application-settings";

export class Api {

    constructor(){

    }

    login(user, pass){
        console.log("Loggin in from class");
        let self = this;
        //we should return a promise from make request
        return new Promise(function (resolve, reject) {
           
            var creds = { 
                grant_type: 'password',
                client_id: 4,
                client_secret: '1sPByBgMUpZZHVSfmMDEK14GG4B1YHD1taKPJx1R',
                username:user,
                password:pass
            }

           
            console.log("IN the promise");

            self.makeRequest('oauth/token', "POST", creds ).then(response => {
                //check the response content for error
                console.log("Back!");
                console.log(response);
                console.log("data to local");
                var tokens = response.content.toJSON();
                console.log(tokens);
                console.log("App settings");
                appSettings.setBoolean('isLoggedIn', true);
                console.log("Access TOken");
                appSettings.setString('accessToken', tokens.access_token);
                appSettings.setString('refreshToken', tokens.refresh_token);
                resolve('success');
            }).catch(error => {
                console.log(error);
                reject(error);
            });   
        })
    }

    getKrates(){
        this.makeRequest('api/krates/list', 'GET').then(response => {
            return response.content.toJSON();
        }).catch(error => {
            console.log(error);
        })
    }

    testDataGet(){
        this.makeRequest('api/challenges', 'GET').then(response => {
            console.log(response.content.toJSON());
        }).catch(error => {
            console.log(error);
        })
    }

    makeRequest(url, method, payload){
        // console.log("making the request");
        // console.log(payload);
        console.log("in request");
        var headers = { "Content-Type" : "application/json"};
        if(appSettings.getBoolean('isLoggedIn') === true){
            //attach the token header
            console.log("Header STuff");
            headers["Authorization"] = "Bearer " + appSettings.getString('accessToken');
        }
        console.log("Make request");
        var requestObj = {
            url: "https://andogrando.ngrok.io/" + url,
            method: method,
            headers: headers
        };
        console.log("Assigning payload if present");

        if(payload !== undefined){
            requestObj['content'] = JSON.stringify(payload);
        }

        return http.request(requestObj);

    }


}