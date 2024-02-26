var musicfile1 = "";
var musicfile2 = "";
var leftWristX = 0;
var rightWristX = 0;
var rightWristY = 0;
var leftWristY = 0;
var leftWristScore = 0;
var rightWristScore = 0;
var song1Status = "";

function preload() {

}

function draw() {
    image(video, 0, 0, 800, 600)
    fill("red")
    if (leftWristScore > 0.1) {
        circle(leftWristX, leftWristY, 20);
        musicfile2.stop()
        if (musicfile1.isPlaying() == false) {
            musicfile1.play()
        }
    }

    if (rightWristScore > 0.1) {
        circle(rightWristX, rightWristY, 20);
        musicfile1.stop()
        if (musicfile2.isPlaying() == false) {
            musicfile2.play()
        }
    }
}

function setup() {
    canvas = createCanvas(800, 600)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('Model is Loaded')
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        rightWristScore = results[0].pose.keypoints[10].score;
        leftWristScore = results[0].pose.keypoints[9].score;
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;
    }
}