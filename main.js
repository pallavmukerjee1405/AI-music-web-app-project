peter_pan_song="";
harry_potter_song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
song1_status="";

function preload(){
    peter_pan_song=loadSound("music2.mp3");
    harry_potter_song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log('PoseNet is Initialized.');
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("LeftWristX = "+leftWristX+", LeftWristY = "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("RightWristX = "+rightWristX+", RightWristY = "+rightWristY);
    }
}

function draw(){
    image(video,0,0,600,500);
    song1_status=harry_potter_song.isPlaying();
    
    fill('#FF0000');
    stroke('#FF0000');

    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY,20);
        peter_pan_song.stop();
    }

    if(song1_status=false){
        harry_potter_song.play();
        document.getElementById("song_name").innerHTML="Song Name - "+harry_potter_song;
    }
}

