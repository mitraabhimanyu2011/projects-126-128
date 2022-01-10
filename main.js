avengers = "";
starWars = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

scoreLeftWrist = 0;
leftWristY_divide_1000 = 0;

function preload()
{
    avengers = loadSound("avengers_themeMusic.mp3");
    starWars = loadSound("starWars_themeMusic.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw()
{
    image(video, 0, 0, 600, 500);

    avengers_status = avengers.isPlaying();
    fill("FF0000");
    stroke("FF0000");
    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX, leftWristY, 20);
    starWars.stop();
        if(avengers_status == false)
        {
            avengers.play();
            document.getElementById("song").innerHTML = "Avengers Theme Music";
        }
    }
}

function modelLoaded()
{
    console.log("PoseNet is initialized!");
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
        
    }
}