var camera = document.getElementById("camera");
Webcam.set({
    height : 300,
    width : 400,
    image_format : "png",
    png_quality : 90
});
Webcam.attach(camera);
function capture(){
    Webcam.snap(function(web_uri){
        console.log("clicked");
        document.getElementById("result").innerHTML = "<img src='" + web_uri + "' id='result_image'>";
    });
}
classifier = ml5.imageClassifier("https://storage.googleapis.com/tm-model/9AjMLKcPi/model.json", model_loaded);
function model_loaded(){
    console.log("model_loaded");
}
function predict(){
    img = document.getElementById("result_image");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if (error){
        console.error(error);
    }else {
        document.getElementById("predict_1").innerHTML = results[0].label;
        var synth = window.speechSynthesis;
        var speechData = "The first prediction is " + results[0].label;
        var utterThis = new SpeechSynthesisUtterance(speechData);
        synth.speak(utterThis);
        document.getElementById("predict2").innerHTML = results[1].label;
        var synth = window.speechSynthesis;
        var speechData = "The second prediction is " + results[1].label;
        var utterThis = new SpeechSynthesisUtterance(speechData);
        synth.speak(utterThis);
    }
    if (results[0].label == "happy"){
        document.getElementById("predict_1").innerHTML = results[0].label + "😊";
    }
    if (results[1].label == "happy"){
        document.getElementById("predict2").innerHTML = results[1].label + "😊";
    }
    if (results[1].label == "angry"){
        document.getElementById("predict2").innerHTML = results[1].label + "🤬";
    }
    if (results[0].label == "angry"){
        document.getElementById("predict_1").innerHTML = results[0].label + "🤬";
    }
    if (results[0].label == "sleepy"){
        document.getElementById("predict_1").innerHTML = results[0].label + "😪";
    }
    if (results[1].label == "sleepy"){
        document.getElementById("predict2").innerHTML = results[1].label + "😪";
    }
}
