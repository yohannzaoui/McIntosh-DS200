# McIntosh DS200 Network Player

A premium web-based audio player inspired by the legendary McIntosh audio equipment, featuring an authentic VFD display, real-time spectrum analyzer, and comprehensive playback controls.
![McIntosh DS200](https://img.shields.io/badge/McIntosh-DS2000-blue)
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-green)

<img width="1280" height="343" alt="McIntosh_Logo" src="https://github.com/user-attachments/assets/36ea3b5c-d932-4af0-a648-0a984e82c769" />


## Overview

McIntosh DS200 Network Player is a fully-functional web audio player that recreates the premium experience of high-end McIntosh audio components. It features a detailed vacuum fluorescent display (VFD) simulation with real-time spectrum analysis, professional transport controls, and advanced audio processing capabilities.

## Features

### Core Playback

- **Multi-format Support**: Plays MP3, FLAC, WAV, and MP4 audio formats
- **Playlist Management**: Load and manage multiple tracks with track counter
- **Transport Controls**: Play, pause, stop, next, previous with professional layout
- **Long Press Seek**: Hold next/prev buttons for fast forward/rewind (3-second jumps)
- **Direct Track Access**: Click track number to open full playlist view
- **Shuffle & Repeat**: Random playback and repeat modes (single track or all tracks)
- **A-B Loop**: Create precise loops between two points in a track

### Audio Visualization

- **Real-time Spectrum Analyzer**: 8-band frequency display (20Hz - 15kHz)
- **Color-Coded Levels**: Blue (normal), Orange (high), Red (peak)
- **Segmented VU Display**: Professional meter-style visualization
- **Frequency Labels**: Accurate frequency markings (20, 60, 150, 400, 1k, 2.5k, 6k, 15k Hz)

### Audio Processing

- **Bass Control**: Low-shelf EQ filter (±10dB at 200Hz)
- **Treble Control**: High-shelf EQ filter (±10dB at 3000Hz)
- **Tone Reset**: One-click return to flat response
- **Volume Control**: Rotary knob-style volume adjustment with visual feedback
- **Mute Function**: Quick mute/unmute with LED indicator

### Visual Interface

- **Authentic VFD Display**: McIntosh-style vacuum fluorescent display with cyan/green aesthetics
- **Display Power Toggle**: Turn display on/off while maintaining playback
- **Time Display Modes**: Click time to toggle between elapsed and remaining time
- **Status Icons**: Real-time playback status (play/pause/stop) indicators
- **Album Art Viewer**: Full-screen album artwork display (click title to view)
- **Metadata Display**: Track number, format (MP3/FLAC/WAV), bitrate, artist, album
- **McIntosh Aesthetics**: Brushed metal knobs, green LEDs, classic McIntosh styling

### Advanced Features

- **Options Menu**: Popup panel for advanced controls (Random, Repeat, A-B, Tone)
- **Media Session API**: Integration with OS media controls and lock screen
- **Metadata Support**: Reads ID3 tags for artist, album, title, and artwork
- **Progressive Web App**: Installable as a standalone application
- **Keyboard Shortcuts**: Full keyboard control support
- **Hover Tooltips**: Volume and tone levels shown on VFD when hovering controls

## Installation

### Online Use

Simply open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge).

### Local Installation

1. Clone or download this repository
1. Ensure all files are in the same directory structure:
   
   ```
   /
   ├── index.html
   ├── style.css
   ├── script.js
   ├── manifest.json
   └── img/
       ├── logo_ref.png
       └── favicon.png
   ```
1. Open `index.html` in your browser

### PWA Installation

1. Visit the application in Chrome, Edge, or Safari
1. Click the install icon in the address bar
1. Confirm installation to add to your home screen/applications

## Usage

### Loading Music

1. Click the **INPUT** knob (left side)
1. Select one or multiple audio files from your device
1. The first track will load automatically

### Basic Playback

- **Play/Pause**: Click the play/pause button
- **Stop**: Click stop button to halt playback and reset to beginning
- **Next/Prev**: Click once to skip tracks
- **Fast Seek**: Hold next/prev buttons for 0.5 seconds to activate fast seek
- **Track Selection**: Click the track counter to view and select from playlist

### Volume Control

- **Adjust Volume**: Click left or right side of LEVEL knob to decrease/increase
- **Mute**: Click MUTE button (LED indicator shows mute status)
- **Volume Display**: Hover over knob to see current level on VFD

### Time Display

- **Toggle Mode**: Click the time display to switch between:
  - Elapsed time (00:00)
  - Remaining time (-00:00)

### Advanced Controls (Options Menu)

1. Click **OPTIONS** button to open the popup menu
1. Available controls:
- **Random**: Enable/disable shuffle mode (blue glow when active)
- **Repeat**: Cycle through off → repeat one → repeat all (blue glow indicates mode)
- **A-B Loop**: Set loop points (orange glow when active)
  - Click once: Set point A (shows “A-”)
  - Click twice: Set point B (shows “A-B”, activates loop)
  - Click third time: Clear loop
- **Bass +/-**: Adjust low-frequency response (±10dB)
- **Treble +/-**: Adjust high-frequency response (±10dB)
- **Tone Reset**: Return all EQ to flat (0dB)

### Display Control

- **Display Toggle**: Turn VFD display on/off while maintaining playback
- **Green LED**: Indicates display power status

### Album Art

- **View Cover**: Click the track title on VFD to open full-screen album art
- **Close**: Click X or anywhere outside the image to close

## Keyboard Shortcuts

|Key   |Function      |
|------|--------------|
|Space |Play/Pause    |
|←     |Previous track|
|→     |Next track    |
|Escape|Close modals  |

## Technical Details

### Technologies Used

- **HTML5 Audio API**: Core audio playback
- **Web Audio API**: Real-time spectrum analysis and EQ filters
- **Canvas API**: Spectrum visualizer rendering
- **MediaSession API**: OS-level media controls
- **LocalStorage**: Preference persistence
- **jsmediatags**: ID3 tag reading for metadata
- **CSS3**: Brushed metal effects, gradients, and animations
- **Font Awesome**: Icon library for controls
- **Google Fonts**: Bitcount Single (digital display), Roboto (UI text)

### Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

### Audio Processing Chain

```
Audio Source → Bass Filter → Treble Filter → Analyzer → Destination
                (200Hz)       (3000Hz)       (FFT 64)
```

### Performance

- **FFT Size**: 64 samples for real-time spectrum analysis
- **Canvas Update**: 60fps via requestAnimationFrame
- **Visualizer Bands**: 8 frequency ranges with color-coded levels
- **Time Display Update**: Event-driven (ontimeupdate)

### Display Specifications

- **VFD Resolution**: 800x300 pixels
- **Chassis Dimensions**: 1800x650 pixels
- **Color Scheme**: Cyan (#33ccff), Green (#22ff22), Gold (#ffd700)
- **Font**: Roboto (lightweight 300) for authentic McIntosh look

## File Structure

```
├── index.html          # Main HTML structure
├── style.css           # All styling and VFD effects
├── script.js           # Audio engine and UI logic
├── manifest.json       # PWA manifest
└── img/                # Image assets
    ├── logo_ref.png    # McIntosh logo
    └── favicon.png     # App icon
```

## Features Breakdown

### VFD Display Elements

- **Track Counter**: Shows current track and total tracks (e.g., “3/12”)
- **File Format**: Displays audio format (MP3, FLAC, WAV, MP4)
- **Bitrate Display**: Shows calculated bitrate in KBPS
- **Volume Display**: Temporary overlay showing level percentage
- **Tone Display**: Shows BASS/TREBLE adjustments when hovering controls
- **Title Line**: Scrollable track title (click to view album art)
- **Metadata Line**: Artist and album information
- **Time Counter**: Elapsed or remaining time with playback status icon
- **Status Indicators**: RANDOM, REPEAT 1, REPEAT ALL, A-B mode indicators

### Transport Button Layout

Arranged in authentic McIntosh style:

- Previous Track (backward-step icon)
- Next Track (forward-step icon)
- Play/Pause (dual icons)
- Stop (stop icon)
- “STREAMING CONTROLS” gold separator line

### Utility Buttons

- **Options**: Opens popup menu for advanced features
- **Display**: Toggles VFD power (maintains playback)
- **Mute**: Audio mute with LED indicator
- **Standby/On**: Red button - reloads application

## Limitations

- Browser storage limits apply to PWA caching
- Web Audio API requires user interaction before first play (browser security)
- Fast seek uses interval-based jumping (3-second increments)
- Spectrum analyzer displays frequency analysis (not true VU metering)
- Maximum practical playlist size: ~100 tracks for optimal performance
- Bitrate calculation is estimated from file size and duration

## Customization

### Changing VFD Colors

Edit CSS variables in `style.css`:

```css
:root {
    --mc-green: #22ff22;
    --mc-blue: #33ccff;
    --mc-gold: #ffd700;
    --vfd-background: #020502;
}
```

### Adjusting Default Volume

Modify the initial volume in `script.js`:

```javascript
audio.volume = 0.2; // Range: 0.0 to 1.0 (default 20%)
```

### Modifying EQ Ranges

Change filter parameters in `initVisualizer()`:

```javascript
bassFilter.frequency.value = 200;    // Hz (low-shelf frequency)
trebleFilter.frequency.value = 3000; // Hz (high-shelf frequency)
```

### Adjusting Seek Speed

Modify the seek step in `script.js`:

```javascript
const SEEK_STEP = 3; // Seconds per interval (default: 3)
```

### Changing Spectrum Analyzer Sensitivity

Adjust FFT size in `initVisualizer()`:

```javascript
analyser.fftSize = 64; // Values: 32, 64, 128, 256, etc.
```

## Design Philosophy

This application recreates the McIntosh aesthetic with:

- **Authentic Materials**: Brushed metal knobs, black glass front panel
- **Classic Typography**: Roboto lightweight for clean, modern digital displays
- **Signature Colors**: McIntosh green for labels, cyan for VFD, gold for accents
- **Premium Details**: LED indicators, segmented displays, professional layouts
- **Functional Beauty**: Every element serves both aesthetic and functional purposes

## Credits

**Author**: Yohann Zaoui  
**Design Inspiration**: McIntosh Laboratory audio equipment  
**Fonts**:

- Bitcount Single (Google Fonts) - Digital display
- Roboto 300 (Google Fonts) - UI text  
  **Icons**: Font Awesome 6.5.1  
  **Metadata Library**: jsmediatags 3.9.5

## License

This project is provided as-is for educational and personal use. McIntosh is a trademark of McIntosh Laboratory, Inc. This project is not affiliated with or endorsed by McIntosh Laboratory.

## Changelog

### Version 1.0 (DS200)

- Initial release with full feature set
- Real-time spectrum analyzer with 8 frequency bands
- VFD display simulation with authentic McIntosh aesthetics
- Options popup menu for advanced controls
- A-B loop functionality with visual indicators
- Bass and treble tone controls
- Long-press seek functionality
- PWA support with offline capabilities
- MediaSession API integration
- Hoverable volume and tone displays
- Clickable time display for elapsed/remaining toggle
- Full playlist management with modal view

## Support

For issues, suggestions, or contributions, please contact the author or submit feedback through the application interface.

## Acknowledgments

Special thanks to McIntosh Laboratory for decades of audio excellence that inspired this tribute project.

-----
<img width="1887" height="736" alt="8" src="https://github.com/user-attachments/assets/f766f16f-c75b-475d-b9cf-4a8b97f1c402" />
**Experience premium audio playback with authentic McIntosh style! 🎵**
