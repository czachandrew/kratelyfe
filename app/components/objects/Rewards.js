export class Reward {

    constructor(type){
        this.type = type;

        this.roll = Math.floor(Math.random() * 100 + 1);

        this.offers = [
            {
                range_start: 0,
                range_stop: 3,
                releases: 2, 
                title: "$5 Shopping spree!",
                dscription: "You can make up the difference for a larger item with your own money, but you can't take cash. Choose wisely!",
                instant: false
            },
            {
                range_start: 4,
                range_stop: 20,
                releases: 5,
                title: "Pick dinner!",
                description: "Anywhere you want, anything you want - but a true winner will try and be diplomatic for everyone.",
                instant: false
            },
            {
                range_start: 21,
                range_stop: 46,
                releases: 10, 
                title: "XP Bonus!",
                description: "500 bonus xp! Wow that's exciting try for something big!",
                instant: true,
            },
            {
                range_start: 47,
                range_stop: 57, 
                releases: 10, 
                title: "Could you help me out?!",
                description: "You can have someone do a simple task for you one time, no questions asked",
                instant: false
            },
            {
                range_start: 58,
                range_stop: 100, 
                releases: -1, 
                title: "Hug", 
                description: "Get a hug from a family member!",
                instant: false
    
            }
        ];
    }

    reRoll(){
        this.roll = Math.floor(Math.random() * 100 + 1);
    }
    
    getOffers(){
        //call the api and get stored offers for a roll
        //load the offers into the class
    }

    getReward(){
        console.log("I am logging from the class");
        let self = this
        return this.offers.find( function(item) {
            if(self.roll >= item.range_start && self.roll <= item.range_stop){
                return item;
            }
        });
    }
}