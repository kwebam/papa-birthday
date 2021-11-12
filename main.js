song = "";

function preload() 
{
  song = loadSound("feso.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup() {
          canvas =  createCanvas(600, 500);
          canvas.center()

          video = createCapture(VIDEO);
          video.hide()

          poseNet = ml5.poseNet(video, modelLoaded) ;
          poseNet.on('pose', gotPoses);
}

function modelLoaded() {
          console.log('poseNet is Initialized');
}

function draw() {
          image(video, 0, 0, 600, 500);

          fill(0 , 128 , 0);
          stroke(0 , 128 , 0);

          if(scoreLeftWrist > 0.2) {
          circle(leftWristX , leftWristY , 20);
          InNumberleftWristY = Number(leftWristY);
          remove_decimals = floor(InNumberleftWristY);
          volume = remove_decimals/500;	
          document.getElementById("volume").innerHTML = "Volume = " + volume;	
          song.setVolume(volume);    
          }

}

function play() {
          song.play();
          song.setVolume(1);
}

function gotPoses(results) {
          if(results.length > 0) {
                    console.log(results);

                    scoreLeftWrist =  results[0].pose.keypoints[9].score;
                    console.log("Score Left Wrist = " + scoreLeftWrist)

                    leftWristX = results[0].pose.leftWrist.x;
                    leftWristY = results[0].pose.leftWrist.y;

                    console.log("Left Wrist X = " + leftWristX +" Left Wrist Y = "+ leftWristY);

          }
}