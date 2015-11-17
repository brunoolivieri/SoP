/****************************************************************************

What: Basic API for LAB robot
Why:  Project of SoftWare of Places
Who:  Bruno Olivieri
Where:SecondLab
When: 2015.2
How:  Everything made during the classes
How Many/Much: 1 basic robot API. Hardware from Intel & Student
How to use: Please, check it out on <instructables link>

****************************************************************************/

//  00-19-5B-B3-7B-13 mac do RT

"use strict";

/////////////////// Begin of Movement Module   //////////////////////////////

var cylon = require("cylon");

cylon.api("http", {
  host: "0.0.0.0",
  ssl: false // serve unsecured, over HTTP
  // optional configuration here.
  // for details see 'Configuration' section.
});
 
cylon.robot({
  name: "JohnnyTwo",
    
  connections: {
    galileo: { adaptor: "intel-iot" }
  },
  devices: {
    // i2c devices
    screen: { driver: "upm-jhd1313m1", connection: "galileo" },
      
    //Define Pins - Motor A
    enableA: { driver: "led", pin: 8, connection: "galileo" }, // é para ser a porta 8
    pinA1: { driver: "led", pin: 9, connection: "galileo" },
    pinA2: { driver: "led", pin: 10, connection: "galileo" },
            
    //Define Pins - Motor B
    enableB: { driver: "led", pin: 2, connection: "galileo" },
    pinB1: { driver: "led", pin: 3, connection: "galileo" },
    pinB2: { driver: "led", pin: 4, connection: "galileo" }
  },
  write2Backlight: function(message, color) {
    var that = this;
    var str = message.toString();
    while (str.length < 16) {
      str = str + " ";
    }
    console.log(message);
    that.screen.setCursor(0,0);
    that.screen.write(str);
    switch(color)
    {
      case "red":
        that.screen.setColor(255, 0, 0);
        break;
      case "green":
        that.screen.setColor(0, 255, 0);
        break;
      case "blue":
        that.screen.setColor(0, 0, 255);
        break;
      default:
        that.screen.setColor(255, 255, 255);
        break;
    }
  },
  reset: function() {
    this.brake;
    this.write2Backlight("Reseting...", "red");
    var that = this;
    setTimeout(function(){ that.write2Backlight("Fresh new!", "green"); }, 2000);
  },
    
  motorAOn: function() {
    this.enableA.turnOn();
  },    
  motorBOn: function() {
    this.enableB.turnOn();
  }, 
  motorAOff: function() {
    this.enableA.turnOff();
  },    
  motorBOff: function() {
    this.enableB.turnOff();
  },     
  motorAForward: function(){
    this.pinA1.turnOn();
    this.pinA2.turnOff();
  },  
  motorABackward: function(){
    this.pinA1.turnOff();
    this.pinA2.turnOn();
  },    
  motorBForward: function(){
    this.pinB1.turnOn();
    this.pinB2.turnOff();
  },  
  motorBBackward: function(){
    this.pinB1.turnOff();
    this.pinB2.turnOn();
  },     
  motorACoast: function(){
    this.pinA1.turnOff();
    this.pinA2.turnOff();
  },     
  motorBCoast: function(){
    this.pinB1.turnOff();
    this.pinB2.turnOff();
  },    
  motorABrake: function(){
    this.pinA1.turnOn();
    this.pinA2.turnOn();
  },  
  motorBBrake: function(){
    this.pinB1.turnOn();
    this.pinB2.turnOn();
  },    
  enableMotors: function(){
    this.motorAOn();
    this.motorBOn();
  },            
  disableMotors: function(){
    this.motorAOff();
    this.motorBOff();
  },         
  forward: function(){
    this.motorAForward();
    this.motorBForward();
    this.write2Backlight("Move: FORWARD", "red");
  },        
  backward: function(){
    this.motorABackward();
    this.motorBBackward();
    this.write2Backlight("Move: BACKWARD", "red");
  },       
  turnLeft: function(){
    this.motorABackward();
    this.motorBForward();
    this.write2Backlight("Move: Turn LEFT", "red");
  },      
  turnRight: function(){
    this.motorAForward();
    this.motorBBackward();
    this.write2Backlight("Move: Turn RIGHT", "red");      
  },         
  coast: function(){
    this.motorACoast();
    this.motorACoast();
  },   
  
  brake: function(){
    this.motorABrake();
    this.motorBBrake();
    this.write2Backlight("Move: STOP", "green");      
  },   
  stop: function(){
    this.brake;      
  },   
    
  work: function() {
    var that = this;
    that.reset();
    
    this.disableMotors;
    
      
  }          
}).start();

/////////////////// End of Movement Module   //////////////////////////////


///////////////////  Begin of Web Command Module   //////////////////////////////


/*

var express = require('express');
var app = express();

app.get('/hello', function(req, res){
  res.send('hello world');
});

app.get('/movement/:id', function(req, res) { 
    switch(req.params.id) {
        case 'goForward':
            res.send('@forwardResponse');
            cylon.robot.write2Backlight("COOL...", "red");
            console.log('#forward command'); 
            break;
        case 'goBackward':
            res.send('@backwardResponse');
            cylon.robot.reset;
            
            console.log('#backward command'); 
            break;
        case 'turnLeft':
            res.send('@turnLeftResponse');
            console.log('#turnLeft command'); 
            break;
        case 'turnRight':
            res.send('@turnRightResponse');
            console.log('#turnRight command'); 
            break;
        default:
            res.send('Unkwon movement command');
            console.log('Unkwon movement command');            
    }
});

app.listen(4000,function(){

console.log('Running on PORT: 4000');

});

*/

///////////////////  End of Web Command Module   //////////////////////////////

