let numButtonClicks = 0;
function buttonClicked() {
    numButtonClicks = numButtonClicks + 1;
    document.getElementById("mainDiv").textContent =
        "Button Clicked times: " + numButtonClicks;
}

// 🎵 Define your playlist (array of objects)
const playlist = [
  { title: "Army Dreamers", artist: "Kate Bush", link: "https://raw.githubusercontent.com/Rapolaro/Music-Hosting/main/Army%20Dreamers%20-%20Kate%20Bush%20%5Bmicrotonal%20cover%20in%2029edo%5B.mp3" },
  { title: "Atariwave", artist: "Quoc", link: "https://raw.githubusercontent.com/Rapolaro/Music-Hosting/main/Atariwave%20-%20Quoc.mp3" },
  { title: "Lilium", artist: "Elfen Lied OST", link: "https://raw.githubusercontent.com/Rapolaro/Music-Hosting/main/Lilium%20-%20Elfen%20Lied%20%5BMusic%20Box%5D.mp3" },
  { title: "My Will", artist: "Dream", link: "https://raw.githubusercontent.com/Rapolaro/Music-Hosting/main/My%20Will%20-%20Dream%20%5BInuyasha%20ED1%5D.mp3" },
  { title: "Passion", artist: "Utada Hikaru (Piano Cover)", link: "https://raw.githubusercontent.com/Rapolaro/Music-Hosting/main/Passion%20-%20Utada%20Hikaru%20%5BPiano%20Cover%20-%20Kyle%20Landry%5D%20(1).mp3" },
  { title: "Luv(sic) Part 2", artist: "Nujabes feat. Shing02", link: "https://raw.githubusercontent.com/Rapolaro/Music-Hosting/main/Nujabes%20-%20Luv(sic)%20Part%202%20feat.Shing02.mp3" },
  { title: "Promise (Reprise)", artist: "Akira Yamaoka (Music Box)", link: "https://raw.githubusercontent.com/Rapolaro/Music-Hosting/main/Promise%20(Reprise)%20-%20Akira%20Yamaoka%20%5BMusic%20Box%5D.mp3" },
  { title: "Simple and Clean", artist: "Utada Hikaru (Music Box)", link: "https://raw.githubusercontent.com/Rapolaro/Music-Hosting/main/Simple%20and%20Clean%20-%20Kingdom%20Hearts%20%5BMusic%20Box%5D.mp3" },
  { title: "夢見てもいいじゃないの (Can't I Even Dream)", artist: "Hatsune Miku", link: "https://raw.githubusercontent.com/Rapolaro/Music-Hosting/main/夢見てもいいじゃないの%20-Can't%20I%20Even%20Dream%20-%20Miku%20Hatsune%20(1).mp3" }
];
let activePlaylist = [...playlist];
let currentSongIndex = 0; // Tracks the currently playing song

// AUDIO ELEMENT
        const audio = document.getElementById('audioPlayer');

// SHUFFLE LOGIC (Fisher-Yates)
        function shufflePlaylist() {
            for (let i = activePlaylist.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [activePlaylist[i], activePlaylist[j]] = [activePlaylist[j], activePlaylist[i]];
            }
        }

// PLAYER CONTROLS
        function loadSong(index) {
    audio.src = playlist[index].link;
    document.getElementById("songTitle").textContent = playlist[index].title;
    document.getElementById("artist").textContent = playlist[index].artist;
    console.log("Now playing:", playlist[index].title);
    audio.load(); // Load the song but DON'T autoplay
        }

       document.getElementById('playPause').addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
});

        document.getElementById('fastForward').addEventListener('click', () => {
          currentSongIndex = (currentSongIndex + 1) % playlist.length; // Move to next song
          loadSong(currentSongIndex);
          audio.play();
        });

        document.getElementById('rewind').addEventListener('click', () => {
          currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length; // Move to previous song
          loadSong(currentSongIndex);
          audio.play();
        });


    // NIGHTCORE SPEED CONTROL
        document.querySelector('.speed-control').addEventListener('input', (e) => {
            audio.playbackRate = e.target.value;
        });

    // 🐰 Make Bunny Slider Work
const bunny = document.querySelector('.bunny-progress');
const progressContainer = document.querySelector('.progress-container');

// Visually update bunny as song plays
audio.addEventListener("timeupdate", () => {
    let percent = (audio.currentTime / audio.duration) * 100;
    bunny.style.left = `${percent}%`; 
});

// Let the user drag the bunny
bunny.addEventListener('mousedown', (e) => {
    const moveBunny = (event) => {
        let rect = progressContainer.getBoundingClientRect();
        let percent = (event.clientX - rect.left) / rect.width;

        // Keep within bounds
        percent = Math.max(0, Math.min(1, percent));

        // Set song position based on bunny
        audio.currentTime = percent * audio.duration;
    };

    document.addEventListener('mousemove', moveBunny);
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', moveBunny);
    }, { once: true });
});


// Sets const for Times current & total
const currentTimeDisplay = document.getElementById("currentTime");
const totalTimeDisplay = document.getElementById("totalTime");

// Function to format seconds into MM:SS
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}

// Update time on play
audio.addEventListener("timeupdate", () => {
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// Set total duration when metadata loads
audio.addEventListener("loadedmetadata", () => {
    totalTimeDisplay.textContent = formatTime(audio.duration);
});

        // PLAYLIST AUTOPLAY
        audio.addEventListener('ended', () => {
            activePlaylist.shift();
            if (activePlaylist.length === 0) {
                activePlaylist = [...playlist];
                shufflePlaylist();
            }
    audio.src = activePlaylist[0].link;
            audio.play();
        });

        // INITIAL SHUFFLE
        shufflePlaylist();
audio.src = activePlaylist[0].link;
    

        // NAVIGATION DROPDOWN 
  const toggleBtn = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu-items');

  toggleBtn.addEventListener('click', () => {
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
  });

  // Optional: hide menu if user clicks outside it
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-nav')) {
      menu.style.display = 'none';
    }
  });
