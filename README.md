# McIntosh DS200 Network Player

A premium web-based audio player inspired by the legendary McIntosh audio equipment, featuring an authentic VFD display, real-time spectrum analyzer, and comprehensive playback controls.

![McIntosh_Logo](https://github.com/user-attachments/assets/546956b6-126e-48e9-b088-475e840d1fee)

<img width="1865" height="699" alt="McIntosh DS200 Interface" src="https://github.com/user-attachments/assets/978e8101-0bc0-40cf-b13e-2c0671174db2" />

## Overview

McIntosh DS200 Network Player is a fully-functional web audio player that recreates the premium experience of high-end McIntosh audio components. It features a detailed vacuum fluorescent display (VFD) simulation with real-time spectrum analysis, professional transport controls, and advanced audio processing capabilities.

## Features

### Core Playback

- **Multi-format Support**: MP3, FLAC, WAV, and MP4 audio playback
- **Playlist Management**: Load and manage multiple tracks with live counter
- **Transport Controls**: Professional Play, Pause, Stop, Next, Previous buttons
- **Long Press Seek**: Hold Next/Prev buttons for fast forward/rewind (3-second intervals)
- **Direct Track Access**: Click track number to view full playlist
- **Shuffle & Repeat**: Random playback and repeat modes (single track or all)
- **A-B Loop**: Create precise loops between two points for practice or analysis

### Audio Visualization

- **Real-time Spectrum Analyzer**: 8-band frequency display (20Hz - 15kHz)
- **Color-Coded Levels**: 
  - Blue (normal)
  - Orange (high)
  - Red (peak)
- **Segmented VU Display**: Professional meter-style visualization
- **Frequency Labels**: Accurate markings at 20, 60, 150, 400, 1k, 2.5k, 6k, 15k Hz

### Audio Processing

- **Bass Control**: Low-shelf EQ filter (±10dB at 200Hz)
- **Treble Control**: High-shelf EQ filter (±10dB at 3000Hz)
- **Tone Reset**: One-click return to flat frequency response
- **Volume Control**: Rotary knob-style adjustment with visual feedback
- **Mute Function**: Quick mute/unmute with LED indicator

### Visual Interface

- **Authentic VFD Display**: McIntosh-style vacuum fluorescent display with cyan/green aesthetics
- **Display Power Toggle**: Turn display on/off while maintaining playback
- **Time Display Modes**: Click time to toggle between elapsed and remaining
- **Status Icons**: Real-time playback status indicators (▶/⏸/⏹)
- **Album Art Viewer**: Full-screen album artwork display (click title)
- **Metadata Display**: Track number, format, bitrate, artist, album information
- **McIntosh Aesthetics**: Brushed metal knobs, green LEDs, classic styling

### Advanced Features

- **Options Menu**: Popup panel for Random, Repeat, A-B, and Tone controls
- **Media Session API**: Integration with OS media controls and lock screen
- **Metadata Support**: Reads ID3 tags for artist, album, title, and artwork
- **Progressive Web App**: Installable as a standalone application
- **Keyboard Shortcuts**: Full keyboard control support
- **Hover Tooltips**: Volume and tone levels displayed on VFD when hovering controls

## Installation

### Online Use

Simply open `index.html` in a modern web browser (Chrome, Firefox, Safari, Edge).

### Local Installation

1. Clone or download this repository
2. Ensure all files maintain this directory structure:
   ```
   /
   ├── index.html
   ├── style.css
   ├── script.js
   ├── manifest.json
   ├── LICENSE
   ├── README.md
   └── img/
       ├── logo_ref.png
       ├── logo_b.png
       └── favicon.png
   ```
3. Open `index.html` in your browser

### PWA Installation

1. Visit the application in Chrome, Edge, or Safari
2. Click the install icon in the address bar
3. Confirm installation to add to your home screen/applications

## Usage

### Loading Music

1. Click the **INPUT** knob (left side)
2. Select one or multiple audio files from your device
3. The first track will load automatically

### Basic Playback

- **Play/Pause**: Click the play/pause button
- **Stop**: Halt playback and reset to beginning
- **Next/Prev**: Click once to skip tracks
- **Fast Seek**: Hold Next/Prev buttons for 0.5 seconds to activate
- **Track Selection**: Click the track counter to view and select from playlist

### Volume Control

- **Adjust Volume**: Click left or right side of LEVEL knob
- **Mute**: Click MUTE button (LED indicates status)
- **Volume Display**: Hover over knob to see current level on VFD

### Time Display

- **Toggle Mode**: Click the time display to switch between:
  - Elapsed time (00:00)
  - Remaining time (-00:00)

### Advanced Controls (Options Menu)

1. Click **OPTIONS** button to open the popup menu
2. Available controls:
   - **Random**: Enable/disable shuffle mode (blue glow when active)
   - **Repeat**: Cycle through Off → Repeat One → Repeat All (blue glow indicates mode)
   - **A-B Loop**: Set loop points (orange glow when active)
     - First click: Set point A (shows "A-")
     - Second click: Set point B (shows "A-B", activates loop)
     - Third click: Clear loop
   - **Bass +/-**: Adjust low-frequency response (±10dB)
   - **Treble +/-**: Adjust high-frequency response (±10dB)
   - **Tone Reset**: Return all EQ to flat (0dB)

### Display Control

- **Display Toggle**: Turn VFD display on/off while maintaining playback
- **Green LED**: Indicates display power status

### Album Art

- **View Cover**: Click the track title on VFD to open full-screen album art
- **Close**: Click × or anywhere outside the image to close

## Keyboard Shortcuts

| Key | Function |
|-----|----------|
| Space | Play/Pause |
| ← | Previous track |
| → | Next track |
| Escape | Close modals |

## Technical Details

### Technologies Used

- **HTML5 Audio API**: Core audio playback engine
- **Web Audio API**: Real-time spectrum analysis and EQ filters
- **Canvas API**: Spectrum visualizer rendering
- **MediaSession API**: OS-level media controls integration
- **LocalStorage**: User preference persistence
- **jsmediatags**: ID3 tag reading for metadata extraction
- **CSS3**: Brushed metal effects, gradients, and animations
- **Font Awesome 7**: Icon library for transport controls
- **Google Fonts**: 
  - Bitcount Single (digital display)
  - Roboto 300 (UI text)

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

### Performance Specifications

- **FFT Size**: 64 samples for real-time spectrum analysis
- **Canvas Update**: 60fps via requestAnimationFrame
- **Visualizer Bands**: 8 frequency ranges with color-coded levels
- **Time Display Update**: Event-driven (ontimeupdate)

### Display Specifications

- **VFD Resolution**: 800×300 pixels
- **Chassis Dimensions**: 1800×650 pixels
- **Color Scheme**: 
  - Cyan (#33ccff)
  - Green (#22ff22)
  - Gold (#786b46)
- **Typography**: Roboto 300 for authentic McIntosh aesthetic

## File Structure

```
├── index.html          # Main HTML structure
├── style.css           # All styling and VFD effects
├── script.js           # Audio engine and UI logic
├── manifest.json       # PWA manifest
├── LICENSE             # Project license
├── README.md           # This file
└── img/                # Image assets
    ├── logo_ref.png    # Main McIntosh logo
    ├── logo_b.png      # Options menu logo
    └── favicon.png     # App icon
```

## Features Breakdown

### VFD Display Elements

- **Track Counter**: Current/total tracks (e.g., "3/12")
- **File Format**: Audio format indicator (MP3, FLAC, WAV, MP4)
- **Bitrate Display**: Calculated bitrate in KBPS
- **Volume Display**: Temporary overlay showing level percentage
- **Tone Display**: Bass/Treble adjustments when hovering controls
- **Title Line**: Scrollable track title (clickable for album art)
- **Metadata Line**: Artist and album information
- **Time Counter**: Elapsed or remaining time with status icon
- **Status Indicators**: RANDOM, REPEAT 1, REPEAT ALL, A-B mode displays

### Transport Button Layout

Authentic McIntosh arrangement:
- Previous Track (⏮)
- Next Track (⏭)
- Play/Pause (▶/⏸)
- Stop (⏹)
- "STREAMING CONTROLS" gold separator line

### Utility Buttons

- **Options**: Opens advanced controls popup
- **Display**: Toggles VFD power (maintains playback)
- **Mute**: Audio mute with LED indicator
- **Standby/On**: Red button - application reload

## Limitations & Notes

- Browser storage limits apply to PWA caching
- Web Audio API requires user interaction before first play (browser security policy)
- Fast seek uses interval-based jumping (3-second increments)
- Spectrum analyzer displays frequency analysis (not true VU metering)
- Recommended maximum playlist size: ~100 tracks for optimal performance
- Bitrate calculation is estimated from file size and duration

## Customization

### Changing VFD Colors

Edit CSS variables in `style.css`:

```css
:root {
    --mc-green: #22ff22;
    --mc-blue: #33ccff;
    --mc-gold: #786b46;
    --vfd-background: #020502;
}
```

### Adjusting Default Volume

Modify initial volume in `script.js`:

```javascript
audio.volume = 0.2; // Range: 0.0 to 1.0 (default: 20%)
```

### Modifying EQ Ranges

Change filter parameters in `initVisualizer()`:

```javascript
bassFilter.frequency.value = 200;    // Hz (low-shelf)
trebleFilter.frequency.value = 3000; // Hz (high-shelf)
```

### Adjusting Seek Speed

Modify seek step in `script.js`:

```javascript
const SEEK_STEP = 3; // Seconds per interval
```

### Changing Spectrum Analyzer Sensitivity

Adjust FFT size in `initVisualizer()`:

```javascript
analyser.fftSize = 64; // Options: 32, 64, 128, 256, 512
```

## Design Philosophy

This application recreates the McIntosh aesthetic through:

- **Authentic Materials**: Brushed metal knobs, black glass front panel
- **Classic Typography**: Roboto lightweight for clean, modern digital displays
- **Signature Colors**: McIntosh green labels, cyan VFD, gold accents
- **Premium Details**: LED indicators, segmented displays, professional layouts
- **Functional Beauty**: Every element serves both aesthetic and functional purposes

The design pays homage to decades of McIntosh excellence in audio equipment while leveraging modern web technologies for a fully-functional, beautiful audio experience.

## Credits

**Author**: Yohann Zaoui  
**Design Inspiration**: McIntosh Laboratory audio equipment  
**Fonts**:
- Bitcount Single (Google Fonts) - Digital display
- Roboto 300 (Google Fonts) - UI text

**Icon Library**: Font Awesome 7  
**Metadata Library**: jsmediatags 3.9.5

## License

This project is provided as-is for educational and personal use. McIntosh is a registered trademark of McIntosh Laboratory, Inc. This project is not affiliated with or endorsed by McIntosh Laboratory.

## Changelog

### Version 1.0 (DS200)

- Initial release with full feature set
- Real-time spectrum analyzer with 8 frequency bands
- VFD display simulation with authentic McIntosh aesthetics
- Options popup menu for advanced controls
- A-B loop functionality with visual indicators
- Bass and treble tone controls (±10dB)
- Long-press seek functionality
- PWA support with offline capabilities
- MediaSession API integration
- Hoverable volume and tone displays
- Clickable time display for elapsed/remaining toggle
- Full playlist management with modal view

## Support

For issues, suggestions, or contributions, please open an issue on the project repository or contact the author.

## Acknowledgments

Special thanks to McIntosh Laboratory for decades of audio excellence that inspired this tribute project. This web application aims to bring the premium McIntosh experience to digital audio playback.

---

**Experience premium audio playback with authentic McIntosh style! 🎵**
