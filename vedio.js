var player = document.getElementById("player");

var video = document.getElementById("video");

var progress = document.querySelector(".progress");

var progressbar = document.querySelector(".progress__filed");

var toggle = document.querySelector(".toggle");

var skipButtons = document.querySelectorAll('[data-skip]');

var ranges = document.querySelectorAll(".player__slider");

var videoDuration = video.duration;

var timespan = document.querySelector("#time")



window.onload = function(){
    setTimeout(function(){
        var durationMinuts = Math.floor(video.duration / 60)
        var durationSeconds = Math.floor(video.duration - durationMinuts*60)
        timespan.textContent =`0:00 / ${durationMinuts}:${durationSeconds}`
    },100)
}
function togglePlay(){
    if(video.paused){

        video.play();  
        toggle.textContent = "⏸"
    }else{

        video.pause();
        toggle.textContent = "▶️"
    } 
}

function skip(event){
    var timeskipped = parseFloat(this.dataset.skip)
    video.currentTime += timeskipped;
    e.stopPropagation();
    
}

function progressfun(){
    var percent = (video.currentTime / video.duration )*100  + '%';
    var timespanvalue = String(video.currentTime/60).slice(0,4);

    progressbar.style.width = percent;
    timespan.textContent = timespanvalue;
    
}

function update(){
    video[this.name] = this.value;
}

function grab(event){
   
    var scrab = (event.offsetX / progress.offsetWidth)* video.duration
    video.currentTime = scrab
}

function mousemovegrab(event){
    var scrab = (event.offsetX / progress.offsetWidth)* video.duration
    video.currentTime = scrab
}

function currentTime(){
    var currentMinuts = Math.floor(video.currentTime / 60)
    var currentSeconds = Math.floor(video.currentTime - currentMinuts*60)

    var durationMinuts = Math.floor(video.duration / 60)
    var durationSeconds = Math.floor(video.duration - durationMinuts*60)

    if(currentSeconds >= 60){
        currentMinuts += 1;
        currentSeconds = 00;
    }else{

        if(currentSeconds < 10){
            currentSeconds = '0' + currentSeconds
        }
    }
    timespan.textContent = `${currentMinuts}:${currentSeconds} / ${durationMinuts}:${durationSeconds}`
}
video.addEventListener("click", function(){
    togglePlay();
})


toggle.addEventListener("click", function(){
    togglePlay();
})

window.addEventListener('keypress',function(e){
    if(e.keyCode == 32){
        togglePlay();
       
    }
})

skipButtons.forEach(btn => btn.addEventListener('click', skip))

video.addEventListener("timeupdate",progressfun)

video.addEventListener("timeupdate",currentTime)


ranges.forEach(range=> range.addEventListener('mousemove',update));

progress.addEventListener("click", grab)


mousedown=false;
progress.addEventListener("mousedown",()=>mousedown=true)
progress.addEventListener("mouseup",()=>mousedown=false)

progress.addEventListener("mousemove", function(event){

    if(mousedown && grab){
        var scrab = (event.offsetX / progress.offsetWidth)* video.duration
        
        progressbar.style.width = (event.offsetX / progress.offsetWidth)*100 + '%';
        video.currentTime = scrab
        
    }
})