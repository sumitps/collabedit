$(function() {
    $('#collabBox').css('height', $( window ).height() * 0.8);
    $('#collabBox').css('width', $( window ).width() * 0.8);
    var topic = JSON.parse($('#mqSession').val()).uuid;

    $("#collabBox").on('change keyup mouseup', function() {
        msg = new Paho.MQTT.Message($(this).val());
        msg.destinationName = topic;
        PublishMessage(msg);
        console.debug('new value: ' + $(this).val());
    });
});