document.addEventListener('DOMContentLoaded', () => {
    // --- SÉLECTEURS ---
    const audio = document.getElementById('main-audio');
    const fileLoader = document.getElementById('file-loader');
    const statusLine = document.getElementById('status-line');
    const infoLine = document.getElementById('info-line');
    const vfdDisplay = document.querySelector('.vfd-display');
    const volDisplay = document.getElementById('vol-display');

    // Playlist state
    let playlist = [];
    let currentIndex = 0;

    // Boutons Rotatifs
    const inputKnob = document.getElementById('input-knob');
    const volumeKnob = document.getElementById('volume-knob');

    // Boutons de Transport (Ciblés par ID)
    const playPauseBtn = document.getElementById('play-pause');
    const stopBtn = document.getElementById('stop-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Boutons Utilitaires (Ciblés par ID)
    const displayBtn = document.getElementById('display-btn');
    const muteBtn = document.getElementById('mute-btn');
    const muteLed = document.getElementById('mute-led');
    const displayLed = document.querySelector('.utility-buttons .led.green.active'); // La led de l'écran

    // --- FONCTION DE CHARGEMENT DE PISTE ---
    const loadTrack = (index) => {
        if (playlist.length > 0 && playlist[index]) {
            const file = playlist[index];
            const fileURL = URL.createObjectURL(file);
            audio.src = fileURL;
            
            statusLine.innerText = "LOADING...";
            
            setTimeout(() => {
                const displayName = file.name.replace(/\.[^/.]+$/, "").toUpperCase();
                statusLine.innerText = displayName;
                infoLine.innerText = `TRACK ${index + 1} / ${playlist.length}`;
                
                // Si le bouton play était actif (vert), on lance la lecture automatiquement
                if (playPauseBtn.classList.contains('active')) {
                    audio.play().catch(e => console.log("Lecture auto bloquée"));
                }
            }, 500);
        }
    };

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

    // --- NAVIGATION (SUIVANT / PRÉCÉDENT) ---
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

    // Enchaînement automatique à la fin du morceau
    audio.addEventListener('ended', () => {
        if (playlist.length > 0) {
            currentIndex = (currentIndex + 1) % playlist.length;
            loadTrack(currentIndex);
            audio.play();
        }
    });

    // --- LOGIQUE DE LECTURE (PLAY/PAUSE) ---
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
        muteLed.classList.toggle('active'); // Utilise maintenant l'ID mute-led
        
        if (audio.muted) {
            infoLine.dataset.oldText = infoLine.innerText;
            infoLine.innerText = "MUTE ON";
        } else {
            infoLine.innerText = infoLine.dataset.oldText || "READY";
        }
    });

    // Initialisation
    audio.volume = 0.6;
});