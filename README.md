# McIntosh DS200 Hi-Fi Digital Audio Player

A premium, web-based digital audio player inspired by high-end vintage Hi-Fi rack systems. Featuring a responsive VFD (Vacuum Fluorescent Display), real-time spectrum analysis, and advanced tonal controls.

## Features

- **VFD Visualizer**: A 32-band real-time spectrum analyzer with segmented LED aesthetics.
- **Tone Control Suite**: Integrated Bass and Treble adjustments using the Web Audio API.
- **Media Session Integration**: Full support for Chrome and Edge multimedia controls.
- **Metadata Engine**: Automatic extraction of ID3 tags and high-resolution cover art.
- **Advanced Playback**: A-B Loop, Shuffle, Repeat modes, and Time toggle.
- **Analog Interface**: Interactive rotary knobs for Volume and Input selection.

## Technical Architecture

The application uses the Web Audio API to create a modular signal path:

1. **Audio Source**: Browser-based File API.
2. **Processing Chain**: BiquadFilterNodes for LowShelf (200Hz) and HighShelf (3000Hz).
3. **Analysis**: Fast Fourier Transform (FFT) via AnalyserNode.



## Installation

1. Clone the repository.
2. Ensure `jsmediatags.js` and `FontAwesome` are linked.
3. Open `index.html` in a modern browser (Chrome or Edge recommended).

## Controls Reference

| Component | Function |
|-----------|----------|
| Volume Knob | Click left/right to adjust level |
| Tone Buttons | Adjust Bass/Treble by 2dB steps |
| A-B Button | Set start/end points for looping |
| Display Button | Toggles VFD Power (Sleep Mode) |

## License

This project is licensed under the MIT License.

<img width="1840" height="690" alt="1" src="https://github.com/user-attachments/assets/8191352f-7b4c-4d54-abbf-1bf614b0780d" />
