(function() {
    'use strict';

    // Avatar Replay Manager
    var AvatarReplayManager = {
        video: null,
        overlay: null,
        replayButton: null,
        wrapper: null,
        posterUrl: '',
        streamUrl: '',
        replayDelay: 2000, // 2 seconds delay before showing overlay

        init: function() {
            this.video = document.getElementById('avatar-video-player');
            this.overlay = document.getElementById('avatar-replay-overlay');
            this.replayButton = document.getElementById('avatar-replay-button');
            this.wrapper = document.querySelector('.avatar-player-wrapper');

            if (!this.video || !this.overlay || !this.replayButton || !this.wrapper) {
                return;
            }

            // Get poster and stream URL from wrapper data attributes
            this.posterUrl = this.wrapper.getAttribute('data-poster') || '';
            this.streamUrl = this.wrapper.getAttribute('data-stream-url') || '';

            this.bindEvents();
        },

        bindEvents: function() {
            var self = this;

            // Listen for video end event
            this.video.addEventListener('ended', function() {
                self.onStreamEnd();
            });

            // Listen for replay button click
            this.replayButton.addEventListener('click', function() {
                self.onReplayClick();
            });
        },

        onStreamEnd: function() {
            var self = this;
            
            // Wait 2 seconds before showing the replay overlay
            setTimeout(function() {
                self.showReplayOverlay();
            }, this.replayDelay);
        },

        showReplayOverlay: function() {
            // Set the poster image as background
            if (this.posterUrl) {
                this.overlay.style.backgroundImage = 'url(' + this.posterUrl + ')';
                this.overlay.style.backgroundSize = 'cover';
                this.overlay.style.backgroundPosition = 'center';
            }

            // Show the overlay with fade-in effect
            this.overlay.style.display = 'flex';
            var self = this;
            setTimeout(function() {
                self.overlay.classList.add('active');
            }, 10);
        },

        hideReplayOverlay: function() {
            var self = this;
            
            // Hide with fade-out effect
            this.overlay.classList.remove('active');
            setTimeout(function() {
                self.overlay.style.display = 'none';
            }, 300);
        },

        onReplayClick: function() {
            // Hide the overlay
            this.hideReplayOverlay();

            // Re-initialize playback
            this.reinitializePlayback();
        },

        reinitializePlayback: function() {
            // Reset video to beginning
            this.video.currentTime = 0;

            // Play the video
            var playPromise = this.video.play();

            if (playPromise !== undefined) {
                playPromise.then(function() {
                    // Playback started successfully
                    console.log('Avatar replay started');
                }).catch(function(error) {
                    // Auto-play was prevented
                    console.log('Replay prevented:', error);
                });
            }
        },

        // Public method to trigger new session (can be called externally)
        startNewSession: function(newStreamUrl) {
            this.hideReplayOverlay();
            
            if (newStreamUrl) {
                this.streamUrl = newStreamUrl;
                this.video.src = newStreamUrl;
            }
            
            this.video.load();
            this.video.play();
        }
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            AvatarReplayManager.init();
        });
    } else {
        AvatarReplayManager.init();
    }

    // Expose to global scope for external access
    window.AvatarReplayManager = AvatarReplayManager;
})();

