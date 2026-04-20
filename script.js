
const audio = document.getElementById('myAudio');
const playPauseBtn = document.getElementById('playPauseBtn');
const skipBackBtn = document.getElementById('skipBackBtn');
const skipForwardBtn = document.getElementById('skipForwardBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');
const speedSelect = document.getElementById('speedSelect');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

//Duration
audio.addEventListener('loadedmetadata', () => {
    durationDisplay.textContent = formatTime(audio.duration);
});

// Play / Pause
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = 'Pause';
        playPauseBtn.style.backgroundColor = '#dc3545'; // Change to red when playing
    } else {
        audio.pause();
        playPauseBtn.textContent = 'Play';
        playPauseBtn.style.backgroundColor = '#28a745'; // Change back to green
    }
}
playPauseBtn.addEventListener('click', togglePlayPause);

//Update Time Display
audio.addEventListener('timeupdate', () => {
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

//Skip Forward / Backward 
skipForwardBtn.addEventListener('click', () => {
    audio.currentTime += 5; 
});

skipBackBtn.addEventListener('click', () => {
    audio.currentTime -= 5; 
});

// Volume Control
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
    if (audio.volume > 0 && audio.muted) {
        audio.muted = false;
        muteBtn.textContent = 'Mute';
    }
});

// Mute / Unmute 
muteBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    if (audio.muted) {
        muteBtn.textContent = 'Unmute';
    } else {
        muteBtn.textContent = 'Mute';
    }
});

// Playback Speed Control 
speedSelect.addEventListener('change', (e) => {
    audio.playbackRate = e.target.value;
});

// Keyboard Accessibility 
document.addEventListener('keydown', (e) => {
    if(["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }

    switch(e.code) {
        case 'Space':
            togglePlayPause();
            break;
        case 'KeyM':
            muteBtn.click();
            break;
        case 'ArrowRight':
            audio.currentTime += 5;
            break;
        case 'ArrowLeft':
            audio.currentTime -= 5;
            break;
        case 'ArrowUp':
            if (audio.volume < 1) {
                audio.volume = Math.min(1, audio.volume + 0.1);
                volumeSlider.value = audio.volume;
            }
            break;
        case 'ArrowDown':
            if (audio.volume > 0) {
                audio.volume = Math.max(0, audio.volume - 0.1);
                volumeSlider.value = audio.volume;
            }
            break;
    }
});