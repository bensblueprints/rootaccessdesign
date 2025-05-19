<template>
  <div class="audio-player">
    <button class="play-button" @click="togglePlay" :class="{ playing: isPlaying }">
      <i class="fas fa-play"></i><i class="fas fa-pause"></i>
    </button>
    <div class="progress-container" @click="seek">
      <div class="progress-bar" :style="{ width: progressBarWidth }"></div>
    </div>
    <audio :src="src" preload="metadata" ref="audioElement" @timeupdate="updateProgress" @ended="onEnded"></audio>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  playerId: {
    type: String,
    required: true, // Unique ID for event bus
  }
});

const audioElement = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);

// Simple event bus for cross-player communication (pausing others)
const eventBus = {
  listeners: {},
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  },
  emit(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  },
  off(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }
};

const playEventName = 'audio-play-started';

const handleOtherPlayerPlaying = (playedId) => {
  if (props.playerId !== playedId && audioElement.value && !audioElement.value.paused) {
    audioElement.value.pause();
    isPlaying.value = false;
  }
};

onMounted(() => {
  if (audioElement.value) {
    audioElement.value.onloadedmetadata = () => {
      duration.value = audioElement.value.duration;
    };
  }
  eventBus.on(playEventName, handleOtherPlayerPlaying);
});

onBeforeUnmount(() => {
  eventBus.off(playEventName, handleOtherPlayerPlaying);
});

const togglePlay = () => {
  if (!audioElement.value) return;
  if (audioElement.value.paused) {
    eventBus.emit(playEventName, props.playerId); // Notify other players
    audioElement.value.play();
    isPlaying.value = true;
  } else {
    audioElement.value.pause();
    isPlaying.value = false;
  }
};

const updateProgress = () => {
  if (!audioElement.value) return;
  currentTime.value = audioElement.value.currentTime;
};

const onEnded = () => {
  isPlaying.value = false;
  currentTime.value = 0; // Reset progress
  // audioElement.value.currentTime = 0; // Optionally reset audio element time
};

const progressBarWidth = computed(() => {
  if (duration.value === 0) return '0%';
  return (currentTime.value / duration.value) * 100 + '%';
});

const seek = (event) => {
  if (!audioElement.value || duration.value === 0) return;
  const progressContainer = event.currentTarget;
  const clickPosition = event.offsetX / progressContainer.offsetWidth;
  audioElement.value.currentTime = clickPosition * duration.value;
};

</script>

<style scoped>
/* Styles from original style.css for .audio-player, .play-button, .progress-container, .progress-bar */
/* Ensure they are scoped or specific enough if copied directly. */
.audio-player {
  display: flex;
  align-items: center;
  gap: 10px; /* Spacing between button and progress bar */
  /* Add other styles like background, padding if any */
}

.play-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em; /* Adjust as needed */
  color: #333; /* Adjust as needed */
}

.play-button .fa-pause {
  display: none;
}

.play-button.playing .fa-play {
  display: none;
}

.play-button.playing .fa-pause {
  display: inline-block; /* Or block */
}

.progress-container {
  flex-grow: 1;
  height: 8px; /* Adjust as needed */
  background-color: #e0e0e0; /* Light grey for track */
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden; /* Ensures progress-bar stays within bounds */
}

.progress-bar {
  height: 100%;
  background-color: #007bff; /* Blue for progress, adjust as needed */
  border-radius: 4px;
  width: 0%; /* Initial width */
  transition: width 0.1s linear; /* Smooth progress update */
}
</style> 