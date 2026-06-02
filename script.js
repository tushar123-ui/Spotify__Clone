// Select all necessary elements from HTML using their classes
const audio = document.querySelector('audio');

const playBtn = document.querySelectorAll('.player-control-icon')[2]; // 3rd icon is the play button

const progressBar = document.querySelector('.progress-bar');
const volumeBar = document.querySelector('.range-con');

const currentTimeDisplay = document.querySelector('.current-time');
const totalTimeDisplay = document.querySelector('.tot-time');

let isPlaying = false;

// 1. Play / Pause logic
playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        // Gaana rukne par purana Play icon dikhao
        playBtn.src = "./assets/player_icon3.png"; 
        // Filter hata do taki Play icon apne original color mein dikhe
        playBtn.style.filter = "none"; 

        playBtn.style.transform = "scale(1)";
    } else {
        audio.play();
        // Gaana chalne par aapki nayi pause wali PNG image dikhao
        playBtn.src = "./assets/circle-pause-solid.png"; 
        // MAGIC TRICK: Dark icon ko completely White karne ke liye
        playBtn.style.filter = "brightness(0) invert(1)"; 

        playBtn.style.transform = "scale(1.2)";
    }
    isPlaying = !isPlaying;
});

// 2. Update progress bar and current time while song is playing
audio.addEventListener('timeupdate', () => {
    let progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;

    let currentMin = Math.floor(audio.currentTime / 60);
    let currentSec = Math.floor(audio.currentTime % 60);
    
    // Agar seconds 10 se kam hain toh aage '0' lagayein (Jaise 0:04)
    let formattedSec = currentSec < 10 ? `0${currentSec}` : currentSec;
    currentTimeDisplay.innerText = `${currentMin}:${formattedSec}`;
});

// 3. Set total time once the audio file is loaded
audio.addEventListener('loadedmetadata', () => {
    let totalMin = Math.floor(audio.duration / 60);
    let totalSec = Math.floor(audio.duration % 60);
    
    // Agar seconds 10 se kam hain toh aage '0' lagayein
    let formattedSec = totalSec < 10 ? `0${totalSec}` : totalSec;
    totalTimeDisplay.innerText = `${totalMin}:${formattedSec}`;
});

// 4. Seek/Change song position when user clicks on progress bar
progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value * audio.duration) / 100;
});

// 5. Change volume when user uses the volume slider
volumeBar.addEventListener('input', () => {
    // volume is between 0 and 1
    audio.volume = volumeBar.value / 100; 
});




// Bottom player ki image aur text ko select kiya
const playerImg = document.getElementById('player-img');
const playerTitle = document.getElementById('player-title');
const playerArtist = document.getElementById('player-artist');

// Ye function naya gaana aur nayi photo lagayega
function changeSong(songPath, imgPath, songName, artistName) {
    // 1. Gaana change karo
    audio.src = songPath;
    
    // 2. Bottom player ki photo aur naam change karo
    playerImg.src = imgPath;
    playerTitle.innerText = songName;
    playerArtist.innerText = artistName;

    // 3. Gaana play karo
    audio.play();
    isPlaying = true;

    // 4. Play button ko Pause icon mein badal do
    playBtn.src = "./assets/circle-pause-solid.png"; 
    playBtn.style.filter = "brightness(0) invert(1)"; 
    playBtn.style.transform = "scale(1.2)"; 
}


// like icon logic 
const heartIcon = document.getElementById('heart-icon');

heartIcon.addEventListener('click', () => {
    // Agar normal hai, toh red kar do
    if (heartIcon.style.filter === "" || heartIcon.style.filter === "none") {
        heartIcon.style.filter = "invert(24%) sepia(85%) saturate(7483%) hue-rotate(352deg) brightness(110%) contrast(114%)";
    } 
    // Agar red hai, toh wapas normal kar do
    else {
        heartIcon.style.filter = "none";
    }
});



// Auto play next song logic

// 1. Aapke folder ke hisaab se puri Playlist
const playlist = [
    {
        songPath: './music/Chaleya.mpeg',
        imgPath: '/assets/card1img.jpeg',
        songName: 'Top 50 - Global',
        artistName: 'New Music'
    },
    {
        songPath: './music/mahiya_jinha.mpeg',
        imgPath: '/assets/card2img.jpeg',
        songName: 'Mahiya-jinha',
        artistName: 'Darshan Raval.'
    },
    {
        songPath: './music/hare_krishna.mpeg',
        imgPath: '/assets/card3img.jpeg',
        songName: 'Hare Krishna Hare Rama',
        artistName: 'Flutewala'
    },
    {
        songPath: './music/vijay_tamil_nadu.mpeg',
        imgPath: '/assets/card4img.jpeg',
        songName: 'Naa Ready',
        artistName: 'Anirudh'
    },
    {
        songPath: './music/safarnama.mpeg',
        imgPath: '/assets/card3img.jpeg',
        songName: 'Safarnama',
        artistName: 'Arijit Singh'
    },
    {
        songPath: './music/pushpa.mpeg',
        imgPath: '/assets/card4img.jpeg',
        songName: 'Pushpa (The Rise)',
        artistName: 'Allu Arjun'
    },
    {
        songPath: './music/Arijit_Singh.mpeg',
        imgPath: '/assets/card5img.jpeg',
        songName: 'Jaan Nisaar (Arijit)',
        artistName: 'Arijit Singh'
    },
    {
        songPath: './music/Brahmastra.mpeg',
        imgPath: '/assets/card6img.jpeg',
        songName: 'Deva Deva (From Brahmastra)',
        artistName: 'Arijit Singh'
    },
    {
        songPath: './music/o_mahi.mpeg',
        imgPath: '/assets/card5img.jpeg',
        songName: 'O Maahi',
        artistName: 'Arijit Singh'
    }
];

let currentSongIndex = 0; // Shuruaati gaana

// 2. Jaise hi current gaana khatam ho, agla bajao
audio.addEventListener('ended', () => {
    // Current index badhao
    currentSongIndex++;

    // Agar aakhiri gaana khatam ho gaya, toh loop karke first pe aa jao
    if (currentSongIndex >= playlist.length) {
        currentSongIndex = 0;
    }

    // Agle gaane ka data nikalo
    const nextSong = playlist[currentSongIndex];

    // Aapka apna function call karo jo gaana change karta hai
    changeSong(nextSong.songPath, nextSong.imgPath, nextSong.songName, nextSong.artistName);
});