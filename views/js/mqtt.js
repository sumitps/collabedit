var hostname = "localhost";
var port = 9001;
var clientId = "WebSocket";
clientId += new Date().getUTCMilliseconds();;

mqttClient = new Paho.MQTT.Client(hostname, port, clientId);
mqttClient.onMessageArrived = MessageArrived;
mqttClient.onConnectionLost = ConnectionLost;
Connect();

/*Initiates a connection to the MQTT broker*/
function Connect(){
	mqttClient.connect({
	onSuccess: Connected,
	onFailure: ConnectionFailed,
	keepAliveInterval: 10,
});
}

/*Callback for successful MQTT connection */
function Connected() {
	console.log("Connected to broker");
    var topic = JSON.parse($('#mqSession').val()).uuid;
	mqttClient.subscribe(topic);
}

/*Callback for failed connection*/
function ConnectionFailed(res) {
	console.log("Connect failed:" + res.errorMessage);
}

/*Callback for lost connection*/
function ConnectionLost(res) {
	if (res.errorCode !== 0) {
		console.log("Connection lost:" + res.errorMessage);
		Connect();
	}
}

/*Callback for incoming message processing */
function MessageArrived(message) {
	console.debug(message.destinationName +" : " + message.payloadString);
	$('#collabBox').val(message.payloadString);
}

/*Publish new message*/
function PublishMessage(message){
    console.debug('sending message: ' + message);
    mqttClient.send(message);
}