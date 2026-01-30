---

# McIntosh DS200 Hi-Fi Digital Audio Player

A premium, web-based digital audio player inspired by high-end vintage Hi-Fi rack systems (like McIntosh and Accuphase). Featuring a responsive VFD (Vacuum Fluorescent Display), real-time spectrum analysis, and advanced tonal controls.

## ## Features

* **VFD Visualizer**: A 32-band real-time spectrum analyzer with segmented LED aesthetics.
* **Tone Control Suite**: Integrated **Bass** and **Treble** adjustments using the Web Audio API ().
* **Media Session Integration**: Full support for Chrome and Edge multimedia controls (Keyboard shortcuts, OS media overlays, and headphone buttons).
* **Metadata Engine**: Automatic extraction of ID3 tags (Artist, Album, Title) and high-resolution cover art using `jsmediatags`.
* **Advanced Playback**:
* **A-B Loop**: Set custom start and end points for precise looping.
* **Shuffle & Repeat**: Multiple modes (Repeat One, Repeat All, Random).
* **Time Toggle**: Switch between elapsed and remaining time.


* **Analog Interface**: Interactive rotary knobs for Volume and Input selection.

---

## ## Technical Architecture

The application is built using a modular approach to handle the audio signal path effectively:

1. **Audio Source**: Browser-based File API.
2. **Processing Chain**:
* **LowShelf Filter**: Controls frequencies around **200Hz** ().
* **HighShelf Filter**: Controls frequencies above **3000Hz** ().


3. **Analysis**: **Fast Fourier Transform (FFT)** via `AnalyserNode` to drive the visualizer.
4. **Output**: System default audio destination.

---

## ## Installation & Usage

1. **Clone the repository**:
```bash
git clone https://github.com/your-username/ds200-player.git

```


2. **External Dependencies**: Ensure you have `jsmediatags.js` and `FontAwesome` linked in your HTML header.
3. **Launch**: Simply open `index.html` in a modern web browser.
4. **Loading Music**:
* Click the **INPUT** knob to select files from your local drive.
* Use the **TRACK** number display to view and select from your playlist.



---

## ## Controls Reference

| Component | Function |
| --- | --- |
| **Volume Knob** | Click left/right to adjust level. |
| **Tone Buttons** | Increment/Decrement Bass and Treble by 2dB steps. |
| **A-B Button** | 1st click: Set A / 2nd click: Set B / 3rd click: Reset. |
| **Status Line** | Click to view the album cover in full screen. |
| **Display Button** | Toggles the VFD power (Sleep Mode). |

---

## ## Browser Support

* **Chrome / Edge**: Full support (including Media Session and Audio API).
* **Firefox**: Full support (Media Session support may vary by OS).
* **Safari**: Supported (Requires user interaction to initialize AudioContext).

---

## ## License

This project is licensed under the MIT License - feel free to use it for your own Hi-Fi builds!

---
