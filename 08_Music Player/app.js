const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const audio = document.querySelector("#audio");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const play = document.querySelector("#controls #play");
const prev = document.querySelector("#controls #prev");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volumeBar = document.querySelector("#volume-bar");
const volume = document.querySelector("#volume");
const ul = document.querySelector("#music-list ul");


const player = new Musicplayer(musicList); // music.js'den geliyor.

window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
    displayMusicList(player.musicList);
    isPlaying();
});

const displayMusic = (music) => {
    progressBar.value = 0;
    title.textContent = music.title;
    singer.textContent = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

play.addEventListener("click", () => {
    const isMusicPlaying = container.classList.contains("playing");
    isMusicPlaying ? pauseMusic() : playMusic();
});

// TODO: i'taglerinde click event'i vardi ama button eklenince degiştirdik idleri butona verdik onlara event eklenmiş oldu!
next.addEventListener("click", () => { nextMusic() } ); // bu şekilde veya
prev.addEventListener("click",prevMusic);                         // boyle çagrılabilir fonksiyon!

const nextMusic = () => {
        player.next();
        let music = player.getMusic();
        displayMusic(music);
        changeIcon();
        isPlaying();
};

function prevMusic() {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    changeIcon();
    isPlaying();
};

const playMusic = () => {
    container.classList.add("playing");
    play.querySelector("i").classList = "fa-solid fa-pause";
    audio.play();
}

const pauseMusic = () => {
    changeIcon();
    audio.pause();
}

const changeIcon = () => {
    container.classList.remove("playing");
    play.querySelector("i").classList = "fa-solid fa-play";
}


audio.addEventListener("loadedmetadata", () => {
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
})

const calculateTime = (duration) => { // arrow function
    const minute = Math.floor(duration/60);
    const seconds = Math.floor(duration % 60);
    const updateSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    sonuc = `${minute}:${updateSeconds}`;
    return sonuc;
};

audio.addEventListener("timeupdate", () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
})

progressBar.addEventListener("input",() =>{
    currentTime.textContent =  calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});

volumeBar.addEventListener("input", (e) => { // referansını gonderiyoruz!
    const value = e.target.value;
    audio.volume = value/100;
    if(value == 0){
        audio.muted = true;
        volume.classList = "fa-solid fa-volume-xmark";
        muteState = "muted";
    }else{
        audio.muted = false;
        volume.classList = "fa-solid fa-volume-high";
        muteState = "unmute";
    }
});

let muteState = "unmute"; // TODO: play durumunda playing class'i eklenmişti şimdi degişken ile kontrol edelim
volume.addEventListener("click",  () => {
   if (muteState === "unmute"){
       audio.muted = true;
       volume.classList = "fa-solid fa-volume-xmark";
       volumeBar.value = 0;
       muteState = "muted";
   }else{
       audio.muted = false;
       volume.classList = "fa-solid fa-volume-high";
       volumeBar.value = 100;
       muteState = "unmute";
   }
})

const displayMusicList = (list) => {
    for (let i=0; i<list.length; i++) {
       let liTag = ` 
        <li li-index='${i}' class="list-group-item d-flex justify-content-between align-items-center" onclick="selectedMusic(this)">
                        <span>${list[i].getName()}</span>
                        <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
                        <audio class="music-${i}" src="mp3/${list[i].file}"></audio> 
            </li> `;         // TODO: Süreye ulaşmak için audio'yu tanımlamak lazımış! music-${i} ile ulaşacagız!

        ul.insertAdjacentHTML("beforeend",liTag);

        let liAudioDuration = ul.querySelector(`#music-${i}`);
        let liAudioTag = ul.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadedmetadata",() => {
            liAudioDuration.textContent = calculateTime(liAudioTag.duration);
        });

    }
};

const selectedMusic = (li) => {
    player.index  = li.getAttribute("li-index");
    displayMusic(player.getMusic());
    playMusic();
    isPlaying();
}

const isPlaying = () => {
    for (let li of ul.querySelectorAll("li")) {
        if (li.classList.contains("playing")){
            li.classList.remove("playing");
        }

        if (li.getAttribute("li-index") == player.index){
            li.classList.add("playing");
        }
    }
};

audio.addEventListener("ended",function (){
    nextMusic()
    playMusic();
});