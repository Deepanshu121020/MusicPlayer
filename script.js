let trackList = [
    {
        name: "Song 1",
        artist: "Artist 1",
        image: "https://media.istockphoto.com/id/1175435360/vector/music-note-icon-vector-illustration.jpg?s=2048x2048&w=is&k=20&c=t67ObhPpf-m3plSUNdUd8vYF4HGNKDkWwN9itE4PQKM=",
        path: "songs/1.mp3"
    },
    {
        name: "Song 2",
        artist: "Artist 2",
        image: "https://picsum.photo/320/180",
        path: "songs/2.mp3"
    }
    , {
        name: "Song 3",
        artist: "Artist 3",
        image: "https://picsum.photo/480/270",
        path: "songs/3.mp3"
    },
    {
        name: "Song 4",
        artist: "Artist 4",
        image: "favicon.ico.png",
        path: "songs/4.mp3"
    }
];



let nowPlaying = document.querySelector(".now-playing");
let trackArt = document.querySelector(".track-art");
let trackName = document.querySelector(".track-name");
let trackArtist = document.querySelector(".track-artist");

let playPauseBtn = document.querySelector(".playpause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");

let seekSlider = document.querySelector(".seek_slider");
let volumeSlider = document.querySelector(".volume_slider");
let currTime = document.querySelector(".current-time");
let totalDuration = document.querySelector(".total-duration");


let currIndex = 0;
let isPlaying = false;
let currTrack = document.createElement('audio');
let updateTimer;

function loadTrack() {
    let song = trackList[currIndex];
    currTrack.src = song.path;
    currTrack.load();

    nowPlaying.innerText = "Playing " +( currIndex + 1 ) + " of " + trackList.length;
    trackArt.style.backgroundImage = `url("${song.image}")`;
    trackName.innerText = song.name;
    trackArtist.innerText = song.artist;
    
    clearInterval(updateTimer);
    updateTimer = setInterval( seekUpdate, 1000);

    volumeSlider.addEventListener('input',()=>{
        currTrack.volume = volumeSlider.value/100;
    });

    seekSlider.addEventListener('input',()=>{
        let seekTo = currTrack.duration * (seekSlider.value/100);
        currTrack.currentTime = seekTo;
    });

};
function playPauseTrack() {
    if (isPlaying === false) 
        playTrack();
    
    else 
        pauseTrack();
    
    totalDuration.innerText = getFormattedDuration(currTrack.duration);
};
function playTrack() {
    isPlaying = true;
    currTrack.play();
    updatePlayPauseBtn();

};
function pauseTrack() {
    isPlaying = false;
    currTrack.pause();
    updatePlayPauseBtn();
};
function updatePlayPauseBtn(){
    if(isPlaying){
        playPauseBtn.innerHTML = '<i class="fas fa-pause-circle fa-5x"></i>';
    }
    else{
        playPauseBtn.innerHTML = '<i class="fas fa-play-circle fa-5x"></i>';
    }
};
function seekUpdate(){
    let seekPosition = (currTrack.currentTime / currTrack.duration)*100;
    seekSlider.value = seekPosition;

     currTime.innerText = getFormattedDuration(currTrack.currentTime)
};
function getFormattedDuration(duration){
    let minutes = '' + Math.floor( duration/60 );
    let seconds = '' + Math.floor(duration - minutes * 60);

    return minutes.padStart(2, '0') +':'+ seconds.padStart(2, '0') ;     
};
function nextTrack(){
    currIndex = (currIndex+1) % trackList.length;
    loadTrack();
    playTrack();
};
function prevTrack(){
    currIndex = (currIndex-1) % trackList.length;
    loadTrack();
    playTrack();
};




loadTrack();



playPauseBtn.addEventListener('click', playPauseTrack)
currTrack.addEventListener('ended', nextTrack);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);