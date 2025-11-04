(function() {
    'use strict';

    // Avatar Replay Manager Constructor
    function AvatarReplayManager(wrapper) {
        this.wrapper = wrapper;
        this.playerId = wrapper.getAttribute('data-player-id');
        this.video = document.getElementById(this.playerId + '-video');
        this.overlay = document.getElementById(this.playerId + '-overlay');
        this.replayButton = document.getElementById(this.playerId + '-replay-button');
        this.posterUrl = wrapper.getAttribute('data-poster') || '';
        this.streamUrl = wrapper.getAttribute('data-stream-url') || '';
        this.replayDelay = 2000; // 2 seconds delay before showing overlay

        if (this.video && this.overlay && this.replayButton) {
            this.bindEvents();
        }
    }

    // Instance methods
    AvatarReplayManager.prototype = {
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
            
            // Play the video with proper promise handling
            var playPromise = this.video.play();
            
            if (playPromise !== undefined) {
                playPromise.then(function() {
                    // Playback started successfully
                    console.log('New session started');
                }).catch(function(error) {
                    // Auto-play was prevented
                    console.log('New session play prevented:', error);
                });
            }
        }
    };

    // Initialize all avatar players on the page
    function initializeAvatarPlayers() {
        var wrappers = document.querySelectorAll('.avatar-player-wrapper');
        var managers = [];
        
        for (var i = 0; i < wrappers.length; i++) {
            var manager = new AvatarReplayManager(wrappers[i]);
            managers.push(manager);
            
            // Store manager instance on the wrapper for external access
            wrappers[i].avatarReplayManager = manager;
        }
        
        return managers;
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            window.avatarReplayManagers = initializeAvatarPlayers();
        });
    } else {
        window.avatarReplayManagers = initializeAvatarPlayers();
    }

    // Expose constructor for external access
    window.AvatarReplayManager = AvatarReplayManager;
})();

