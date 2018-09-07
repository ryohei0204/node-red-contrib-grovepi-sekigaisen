module.exports = function(RED){
    'use strict'
    var GrovePi = require('node-grovepi').GrovePi;
    var Digital = GrovePi.sensors.base.Digital;
    var board = GrovePi.board;

    function infraredNode(n){
    RED.nodes.createNode(this,n);
    this.pin = n.pin;
    this.sensor = n.sensor;
    this.repeat = n.repeat;
    if (RED.settings.verbose) { this.log("Digital Sensor: Pin: " + this.pin + ", Repeat: " + this.repeat); }
    var node = this;
    if(node.boardConfig){
      if(!node.boardConfig.board){
        node.boardConfig.board = new GrovePiBoard();
        node.boardConfig.board.init();
      }
    //Board has been initialized
    node.status({fill:"green",shape:"dot",text:"ok"});
    var digital = new Digital(node.pin);
    board.pinMode(node.pin,'output');

    node.on('input',function(input_msg){
      //どのタイミングでinput_msgにデータを投げているのか。
      //var msg = new Object();
      if(input_msg == 0){
        msg.payload = "true";
      }else{
        msg.payload = "false";
      }
      node.send(msg.payload);
    });
  }
    RED.nodes.registerType("infrared",infraredNode);
  }