const EventEmitter = require('events');


class Plant extends EventEmitter {
    constructor() {
        super();
        this.size = 0;
        this.hasBeenPlanted = false;
        this.once('plantSeed', this.plantSeed);
        this.on('water', this.water);
        this.on('bugAttack', this.bugAttack);
        this.on('harvest', this.harvest);
        this.on('error', this.errorListener);
    }

    plantSeed(){
        this.size = 1;
        this.hasBeenPlanted = true;
        console.log(`${this.size}, ${this.hasBeenPlanted}`);

    }

    updateSize (increment) {
        if (this.hasBeenPlanted) {
            this.size += increment;
            console.log(`The plant is now ${this.size} units big`);
        } else {

            console.log("You'll need to plant this bad boy's seed first")

        }

    }
    water() {
        this.updateSize(1)

    }

    bugAttack(){
        this.updateSize(-1)

    }

    harvest () {
        if (this.hasBeenPlanted) {
            console.log(`The plant was ${this.size} units big before harvesting`);
            this.removeAllListeners();
        }
        else {
            console.log("You'll need to plant this bad boy's seed first")
        }
    }
    errorListener(err) {
        console.log(`An error has occured: ${err.message}`)
    }
}

let myPlant = new Plant();
myPlant.emit('harvest');
myPlant.emit('bugAttack');
myPlant.emit('plantSeed');
myPlant.emit('water');
myPlant.emit('bugAttack');
myPlant.emit('error', new Error('whoopsie!'));
myPlant.emit('water');
myPlant.emit('water');
myPlant.emit('water');
myPlant.emit('plantSeed');
myPlant.emit('harvest');
myPlant.emit('water');
myPlant.emit('bugAttack');
myPlant.emit('bugAttack');

process.stdin.resume();
process.stdin.setEncoding('utf8');
// var util = require('util');

process.stdin.on('data', function (text) {

    if (text === 'quit') {
        done();
    }else if(text === 'plantSeed'){
        plantSeed();
    }else if(text === 'water'){
        water();
    }else if (text === 'bugAttack'){
        bugAttack();
    }else if(text === 'harvest'){
        harvest();
    }

});

function water(){
    myPlant.emit('water');
}
function plantSeed(){
    myPlant.emit('plantSeed');
}
function bugAttack(){
    myPlant.emit('bugAttack');
}
function harvest(){
    myPlant.emit('harvest');
}

function done() {
    console.log('You are all done, how was it?');
    process.exit();
}