document.addEventListener('DOMContentLoaded', () => {
    // --- SÉLECTEURS ---
    const audio = document.getElementById('main-audio');
    const fileLoader = document.getElementById('file-loader');
    const statusLine = document.getElementById('status-line');
    const vfdDisplay = document.querySelector('.vfd-display');
    const volDisplay = document.getElementById('vol-display');
    const trackNumberDisplay = document.getElementById('track-number');
    const timeDisplay = document.getElementById('time-display');
    const albumDisplay = document.getElementById('album-name');
    const artistDisplay = document.getElementById('artist-name');
    const statusIcon = document.getElementById('status-icon');

    // Playlist state
    let playlist = [];
    let currentIndex = 0;
    let volTimeout;

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

    // --- VISUALISEUR (VU-MÈTRE) ---
    const canvas = document.getElementById('vfd-visualizer');
    const ctx = canvas.getContext('2d');
    let audioCtx, analyser, source, dataArray;

    function initVisualizer() {
        if (audioCtx) return;
        
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioCtx.createAnalyser();
        source = audioCtx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
        analyser.fftSize = 64; 
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        // --- CORRECTION DU FLOU (HDPI) ---
        const dpr = window.devicePixelRatio || 1;
        // On ajuste la taille interne du canvas au ratio de l'écran
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = canvas.offsetHeight * dpr;
        // On scale le contexte pour pouvoir dessiner avec des unités logiques
        ctx.scale(dpr, dpr);

        draw();
    }

    function draw() {
        requestAnimationFrame(draw);
        if (!analyser) return;
        analyser.getByteFrequencyData(dataArray);

        // On utilise les dimensions réelles pour le calcul
        const logicalWidth = canvas.width / (window.devicePixelRatio || 1);
        const logicalHeight = canvas.height / (window.devicePixelRatio || 1);
        
        ctx.clearRect(0, 0, logicalWidth, logicalHeight);

        const barWidth = Math.floor((logicalWidth / dataArray.length) * 0.85);
        const segmentHeight = 4; 
        const segmentGap = 1; // Espace réduit pour plus de densité
        const totalSegments = Math.floor(logicalHeight / (segmentHeight + segmentGap));
        
        let x = 0;
        for (let i = 0; i < dataArray.length; i++) {
            const intensity = dataArray[i] / 255;
            const segmentsToFill = Math.floor(intensity * totalSegments);

            for (let j = 0; j < segmentsToFill; j++) {
                // Utilisation de Math.floor pour éviter les demi-pixels (cause du flou)
                const y = Math.floor(logicalHeight - (j * (segmentHeight + segmentGap)));
                
                let color = "#00ff00"; // VERT
                const percent = j / totalSegments;
                if (percent > 0.85) color = "#ff0000";      // ROUGE
                else if (percent > 0.65) color = "#ffaa00"; // ORANGE

                ctx.fillStyle = color;
                
                // Dessin du segment net
                ctx.fillRect(Math.floor(x), y - segmentHeight, barWidth, segmentHeight);
                
                // Optionnel : un petit reflet interne pour l'effet "cristal"
                ctx.fillStyle = "rgba(255,255,255,0.1)";
                ctx.fillRect(Math.floor(x), y - segmentHeight, barWidth, 1);
            }
            x += (logicalWidth / dataArray.length);
        }
    }

    // --- FONCTION DE CHARGEMENT DE PISTE ---
    const loadTrack = (index) => {
        if (playlist.length > 0 && playlist[index]) {
            const file = playlist[index];
            const fileURL = URL.createObjectURL(file);
            audio.src = fileURL;
            
            trackNumberDisplay.innerText = `${index + 1}/${playlist.length}`;
            timeDisplay.innerText = "00:00";
            statusLine.innerText = "READING TAGS...";
            albumDisplay.innerText = "LOADING...";
            artistDisplay.innerText = "LOADING...";

            jsmediatags.read(file, {
                onSuccess: function(tag) {
                    const tags = tag.tags;
                    const title = tags.title ? tags.title.toUpperCase() : file.name.replace(/\.[^/.]+$/, "").toUpperCase();
                    const artist = tags.artist ? tags.artist.toUpperCase() : "UNKNOWN ARTIST";
                    const album = tags.album ? tags.album.toUpperCase() : "SINGLE";

                    statusLine.innerText = title;
                    artistDisplay.innerText = artist;
                    albumDisplay.innerText = album;
                },
                onError: function(error) {
                    statusLine.innerText = file.name.replace(/\.[^/.]+$/, "").toUpperCase();
                    artistDisplay.innerText = "DS200 PLAYER";
                    albumDisplay.innerText = "NO METADATA";
                }
            });

            if (playPauseBtn.classList.contains('active')) {
                audio.play().catch(e => console.log("Lecture auto impossible"));
            }
        }
    };

    // --- LOGIQUE VOLUME (2%) ---
    volumeKnob.addEventListener('click', (e) => {
        const volContainer = document.querySelector('.volume-center');
        const volLabel = volContainer.querySelector('.vol-label');
        
        if (audio.muted) {
            audio.muted = false;
            muteLed.classList.remove('active');
            volLabel.innerText = "LEVEL";
        }

        const rect = volumeKnob.getBoundingClientRect();
        const x = e.clientX - rect.left;
        if (x < rect.width / 2) {
            audio.volume = Math.max(0, audio.volume - 0.02);
        } else {
            audio.volume = Math.min(1, audio.volume + 0.02);
        }

        volDisplay.innerText = `${Math.round(audio.volume * 100)}%`;
        volContainer.classList.add('visible');

        clearTimeout(volTimeout);
        volTimeout = setTimeout(() => {
            if (!audio.muted) volContainer.classList.remove('visible');
        }, 2000);
    });

    // --- LOGIQUE MUTE (VERT) ---
    muteBtn.addEventListener('click', () => {
        audio.muted = !audio.muted;
        muteLed.classList.toggle('active');
        const volContainer = document.querySelector('.volume-center');
        const volLabel = volContainer.querySelector('.vol-label');

        if (audio.muted) {
            volLabel.innerText = "STATUS";
            volDisplay.innerText = "MUTE";
            volContainer.classList.add('visible');
            clearTimeout(volTimeout);
        } else {
            volLabel.innerText = "LEVEL";
            volDisplay.innerText = `${Math.round(audio.volume * 100)}%`;
            volTimeout = setTimeout(() => volContainer.classList.remove('visible'), 1000);
        }
    });

    // --- TRANSPORT & EVENTS ---
    audio.addEventListener('timeupdate', () => {
        if (timeDisplay && !isNaN(audio.currentTime)) {
            const mins = Math.floor(audio.currentTime / 60).toString().padStart(2, '0');
            const secs = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
            timeDisplay.innerText = `${mins}:${secs}`;
        }
    });

    playPauseBtn.addEventListener('click', () => {
        if (!audio.src) return;
        initVisualizer(); 

        if (audio.paused) {
            audio.play();
            playPauseBtn.classList.add('active');
            statusIcon.innerHTML = '<i class="fa-solid fa-play"></i>'; // Affiche PLAY
        } else {
            audio.pause();
            playPauseBtn.classList.remove('active');
            statusIcon.innerHTML = '<i class="fa-solid fa-pause"></i>'; // Affiche PAUSE
        }
    });

    stopBtn.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;
        
        // Mise à jour du compteur de temps
        if (timeDisplay) timeDisplay.innerText = "00:00";
        
        // Retrait de l'état actif du bouton Play
        playPauseBtn.classList.remove('active');
        
        // AFFICHAGE DU SYMBOLE STOP (Carré)
        // On utilise l'icône FontAwesome correspondante
        statusIcon.innerHTML = '<i class="fa-solid fa-stop"></i>';
        
        // Optionnel : On peut vider le nom de la piste ou mettre "STOPPED"
        infoLine.innerText = "STOPPED";
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % playlist.length;
        loadTrack(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentIndex);
    });

    inputKnob.addEventListener('click', () => fileLoader.click());
    fileLoader.addEventListener('change', (e) => {
        playlist = Array.from(e.target.files);
        if (playlist.length > 0) { currentIndex = 0; loadTrack(currentIndex); }
    });

    displayBtn.addEventListener('click', () => {
        vfdDisplay.classList.toggle('power-off');
        if(displayLed) displayLed.classList.toggle('active');
    });

    standbyBtn.addEventListener('click', () => window.location.reload());

    audio.volume = 0.6;
});