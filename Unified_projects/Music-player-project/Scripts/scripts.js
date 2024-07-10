const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const progress = document.getElementById('progress');
const volume = document.getElementById('volume');

let isPlaying = false;
let currentSongIndex = 0;

const songs = [
    {
        title: "Song 1",
        artist: "Artist 1",
        album: "Album 1",
        src: "../Songs/Enna Solla Pogirai Bgm Ringtone Download - MobCup.Com.Co.mp3",
        albumArt: "../images/music-poster-design-template_23-2149081201.avif"
    },
    {
        title: "Song 2",
        artist: "Artist 2",
        album: "Album 2",
        src: "../Songs/Devathai Vamsam Neeyo Ringtone Download - MobCup.Com.Co.mp3",
        albumArt: "../images/jazz-concert-print-template_23-2149016077.avif"
    },
    {
        title: "Song 3",
        artist: "Artist 3",
        album: "Album 3",
        src: "../Songs/Enna Solla Pogirai Bgm Ringtone Download - MobCup.Com.Co.mp3",
        albumArt: "../images/dust-concept-flyer-square-template_23-2148744937.avif"
    },
    {
        title: "Song 4",
        artist: "Yuvan",
        album: "Album 4",
        src: "../Songs/Deiva Thirumagal BGM Ringtone Download - MobCup.Com.Co.mp3",
        albumArt: "../images/abstract-music-background-with-notes-violin-vector_1077802-41167.avif"
    }
];

function loadSong(song) {
    document.getElementById('song-title').innerText = song.title;
    document.getElementById('song-artist').innerText = song.artist;
    document.getElementById('song-album').innerText = song.album;
    audio.src = song.src;
    document.getElementById('album-art').src = song.albumArt;
    audio.load(); // Ensure the new song is loaded
}

function playPause() {
    if (isPlaying) {
        audio.pause();
        playPauseButton.innerText = 'Play';
    } else {
        audio.play();
        playPauseButton.innerText = 'Pause';
    }
    isPlaying = !isPlaying;
}

function updateProgress() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;
}

function setProgress(e) {
    const newTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
}

function setVolume(e) {
    audio.volume = e.target.value;
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
    if (isPlaying) audio.play();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
    if (isPlaying) audio.play();
}

// Ensure the functions are in the global scope
window.playPause = playPause;
window.nextSong = nextSong;
window.prevSong = prevSong;

audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('input', setProgress);
volume.addEventListener('input', setVolume);

// Load the first song initially
loadSong(songs[currentSongIndex]);
