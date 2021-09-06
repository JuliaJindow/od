var img = "";
var status = "";
var objects = [];
function preload() {
    img = loadImage("dog_cat.jpg");
}

function setup() {
    canvas = createCanvas(640,400);
    canvas.center();
    ObjectD = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("The model is loaded!!");
    status = true;
    ObjectD.detect(img, gotResult);
}

function gotResult(error, results){
if (results){
console.log(results);
objects = results;
}
else{
console.error(error);
}
}
function draw() {
    image(img,0,0,640,400);

    if (status != "") {
        for (i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            fill("#ff1493");
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#ff1493");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}