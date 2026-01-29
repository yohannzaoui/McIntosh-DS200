document.addEventListener('DOMContentLoaded', () => {
    // --- SÉLECTEURS ---
    const audio = document.getElementById('main-audio');
    const fileLoader = document.getElementById('file-loader');
    const statusLine = document.getElementById('status-line');
    const infoLine = document.getElementById('info-line');
    const vfdDisplay = document.querySelector('.vfd-display');
    const volDisplay = document.getElementById('vol-display');
    const trackNumberDisplay = document.getElementById('track-number');
    const timeDisplay = document.getElementById('time-display'); // Sélectionné ici

    // Playlist state
    let playlist = [];
    let currentIndex = 0;

    // Boutons Rotatifs
    const inputKnob = document.getElementById('input-knob');
    const volumeKnob = document.getElementById('volume-knob');

    // Boutons de Transport
    const playPauseBtn = document.getElementById('play-pause');
    const stopBtn = document.getElementById('stop-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Boutons Utilitaires
    const displayBtn = document.getElementById('display-btn');
    const muteBtn = document.getElementById('mute-btn');
    const standbyBtn = document.getElementById('standby-btn');
    const muteLed = document.getElementById('mute-led');
    const displayLed = document.querySelector('.utility-buttons .led.green.active');

    // --- FONCTION DE CHARGEMENT DE PISTE ---
    const loadTrack = (index) => {
        if (playlist.length > 0 && playlist[index]) {
            const file = playlist[index];
            const fileURL = URL.createObjectURL(file);
            audio.src = fileURL;
            
            // Mise à jour du compteur de piste (ex: 5/15)
            if (trackNumberDisplay) {
                trackNumberDisplay.innerText = `${index + 1}/${playlist.length}`;
            }

            // Réinitialisation du temps à l'écran
            if (timeDisplay) timeDisplay.innerText = "00:00";
            
            statusLine.innerText = "READING TAGS...";

            // Lecture des métadonnées
            jsmediatags.read(file, {
                onSuccess: function(tag) {
                    const tags = tag.tags;
                    const artist = tags.artist ? tags.artist.toUpperCase() : "UNKNOWN ARTIST";
                    const title = tags.title ? tags.title.toUpperCase() : file.name.replace(/\.[^/.]+$/, "").toUpperCase();

                    statusLine.innerText = title;
                    infoLine.innerText = artist;
                },
                onError: function(error) {
                    statusLine.innerText = file.name.replace(/\.[^/.]+$/, "").toUpperCase();
                    infoLine.innerText = "NO METADATA";
                }
            });

            if (playPauseBtn.classList.contains('active')) {
                audio.play().catch(e => console.log("Lecture auto impossible"));
            }
        }
    };

    // --- MISE À JOUR DU COMPTEUR DE TEMPS (EN DIRECT) ---
    audio.addEventListener('timeupdate', () => {
        if (timeDisplay && !isNaN(audio.currentTime)) {
            const mins = Math.floor(audio.currentTime / 60);
            const secs = Math.floor(audio.currentTime % 60);
            const formattedMins = mins.toString().padStart(2, '0');
            const formattedSecs = secs.toString().padStart(2, '0');
            timeDisplay.innerText = `${formattedMins}:${formattedSecs}`;
        }
    });

    // --- LOGIQUE DE CHARGEMENT MULTIPLE ---
    inputKnob.addEventListener('click', () => fileLoader.click());

    fileLoader.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            playlist = files;
            currentIndex = 0;
            loadTrack(currentIndex);
        }
    });

    // --- NAVIGATION ---
    nextBtn.addEventListener('click', () => {
        if (playlist.length === 0) return;
        currentIndex = (currentIndex + 1) % playlist.length;
        loadTrack(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        if (playlist.length === 0) return;
        currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentIndex);
    });

    audio.addEventListener('ended', () => {
        if (playlist.length > 0) {
            currentIndex = (currentIndex + 1) % playlist.length;
            loadTrack(currentIndex);
            audio.play();
        }
    });

    // --- LOGIQUE DE LECTURE ---
    playPauseBtn.addEventListener('click', () => {
        if (!audio.src) {
            infoLine.innerText = "NO FILES LOADED";
            return;
        }
        if (audio.paused) {
            audio.play();
            playPauseBtn.classList.add('active');
            infoLine.innerText = "PLAYING";
        } else {
            audio.pause();
            playPauseBtn.classList.remove('active');
            infoLine.innerText = "PAUSED";
        }
    });

    // --- LOGIQUE STOP ---
    stopBtn.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;
        if (timeDisplay) timeDisplay.innerText = "00:00"; // Reset chrono au stop
        playPauseBtn.classList.remove('active');
        infoLine.innerText = "STOPPED";
    });

    // --- LOGIQUE DISPLAY (ON/OFF) ---
    displayBtn.addEventListener('click', () => {
        vfdDisplay.classList.toggle('power-off');
        if(displayLed) displayLed.classList.toggle('active');
    });

    // --- LOGIQUE MUTE ---
    muteBtn.addEventListener('click', () => {
        audio.muted = !audio.muted;
        muteLed.classList.toggle('active');
        if (audio.muted) {
            infoLine.dataset.oldText = infoLine.innerText;
            infoLine.innerText = "MUTE ON";
        } else {
            infoLine.innerText = infoLine.dataset.oldText || "READY";
        }
    });

    // --- LOGIQUE STANDBY (RESET) ---
    standbyBtn.addEventListener('click', () => {
        statusLine.innerText = "SHUTDOWN...";
        infoLine.innerText = "REBOOTING";
        setTimeout(() => {
            window.location.reload();
        }, 500);
    });

    // Initialisation
    audio.volume = 0.6;
});