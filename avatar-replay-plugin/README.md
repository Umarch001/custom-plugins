# Avatar Replay Plugin

A WordPress plugin that displays a replay overlay after an avatar stream finishes, with a 2-second delay before unloading the avatar.

## Features

- **Automatic Replay Overlay**: After the video stream ends, waits 2 seconds before displaying a replay overlay
- **Semi-Opaque Overlay**: The overlay features the original poster image with a semi-transparent black overlay
- **Prominent Replay Button**: Large, interactive replay button with smooth hover effects
- **Smooth Transitions**: Fade-in and fade-out effects for professional appearance
- **Re-initialization**: Clicking replay restarts the video from the beginning
- **New Session Support**: Can be triggered programmatically for new streaming sessions
- **Responsive Design**: Works on all screen sizes

## Installation

1. Copy the `avatar-replay-plugin` folder to your WordPress `wp-content/plugins/` directory
2. Activate the plugin through the WordPress admin panel
3. Use the `[avatar_player]` shortcode in your posts or pages

## Usage

### Basic Shortcode

```
[avatar_player]
```

### With Custom Poster Image

```
[avatar_player poster="https://example.com/path/to/poster.jpg"]
```

### With Stream URL

```
[avatar_player poster="https://example.com/poster.jpg" stream_url="https://example.com/stream.mp4"]
```

## How It Works

1. When the video stream ends, the plugin detects the `ended` event
2. After a 2-second delay, the replay overlay appears
3. The overlay displays the poster image with a semi-opaque black overlay (60% opacity)
4. A prominent "Replay" button is centered on the overlay
5. Clicking the replay button:
   - Hides the overlay with a fade-out effect
   - Resets the video to the beginning
   - Starts playback automatically

## Testing

A test HTML file (`test.html`) is included for testing the functionality without WordPress:

1. Open `test.html` in a web browser
2. Play the video and wait for it to finish
3. After 2 seconds, the replay overlay should appear
4. Click the "Replay" button to restart the video

## Technical Details

### Files

- `avatar-replay-plugin.php` - Main plugin file with WordPress integration
- `js/avatar-replay.js` - JavaScript logic for replay functionality
- `css/avatar-replay.css` - Styling for the player and overlay
- `test.html` - Standalone test file

### Key Functions

#### JavaScript

- `AvatarReplayManager.init()` - Initialize the replay manager
- `AvatarReplayManager.onStreamEnd()` - Handle stream end event
- `AvatarReplayManager.showReplayOverlay()` - Display the replay overlay
- `AvatarReplayManager.hideReplayOverlay()` - Hide the replay overlay
- `AvatarReplayManager.reinitializePlayback()` - Restart video playback
- `AvatarReplayManager.startNewSession(url)` - Start a new streaming session

#### PHP

- `avatar_replay_enqueue_scripts()` - Enqueue JavaScript files
- `avatar_replay_enqueue_styles()` - Enqueue CSS files
- `avatar_player_shortcode()` - Generate HTML for the avatar player

## Customization

### Modify Delay Time

To change the 2-second delay, edit `js/avatar-replay.js`:

```javascript
replayDelay: 2000, // Change to desired milliseconds
```

### Customize Overlay Opacity

To change the overlay opacity, edit `css/avatar-replay.css`:

```css
.avatar-replay-overlay {
    background-color: rgba(0, 0, 0, 0.6); /* Change 0.6 to desired opacity */
}
```

### Style the Replay Button

The replay button can be customized in `css/avatar-replay.css` under `.avatar-replay-button`.

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Version

1.0 - Initial release

## Author

Muhammad Umar Farooq
