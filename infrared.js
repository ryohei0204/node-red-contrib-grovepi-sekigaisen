module.exports = function(RED){
    'use strict'
    var GrovePi = require('node-grovepi').GrovePi;
    var Digital = GrovePi.sensors.base.Digital;
    var board = GrovePi.board;

    function InfraredNode(config){
    RED.nodes.createNode(this,config);
    this.pin = config.pin;
    this.sensor = config.sensor;
    this.repeat = config.repeat;
    if (RED.settings.verbose) { this.log("Digital Sensor: Pin: " + this.pin + ", Repeat: " + this.repeat); }
    //RED.settings.~のところ名所変更必要あり？
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

    node.on('input',function(msg){//入力で渡されたmsgに対して操作をする
      //どのタイミングでinput_msgにデータを投げているのか。
      //var msg = new Object();
      if(msg.payload == 0){
        msg.payload = "true";
      }else{
        msg.payload = "false";
      }
      node.send(msg);//ノードの出力定義、変換後の出力を返す。
    });
  }
    RED.nodes.registerType("infrared",InfraredNode);
  }