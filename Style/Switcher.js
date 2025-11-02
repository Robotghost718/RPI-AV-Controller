/**
 * Switcher.js - Updated for Node.js/Express backend
 * Handles all UI interactions and API calls
 */

// Utility function to make API calls
async function apiCall(endpoint) {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    if (!response.ok) {
      console.error('API Error:', data.message);
    }
    return data;
  } catch (error) {
    console.error('Network error:', error);
  }
}

// Load state when page loads
document.addEventListener('DOMContentLoaded', function() {
  restoreInputState();
  restorePowerState();
  restoreMicMuteState();
  restoreVolumeMuteState();
  restoreVolumeLevel();
  restoreMicLevel();
  startClock();
});

// ============================================
// INPUT MANAGEMENT
// ============================================

// Restore previously selected input
function restoreInputState() {
  const currentInput = localStorage.getItem('input');
  if (currentInput) {
    const button = document.getElementById(currentInput);
    if (button) {
      button.classList.add('selected');
    }
  }
}

// Set input
async function setInput(inputName, inputNumber) {
  // Remove selected class from all input buttons
  document.querySelectorAll('.btn-source').forEach(btn => {
    btn.classList.remove('selected');
  });

  // Add selected class to clicked button
  const button = document.getElementById(inputName);
  if (button) {
    button.classList.add('selected');
  }

  // Save to localStorage
  localStorage.setItem('input', inputName);

  // Call API
  await apiCall(`/api/input/${inputNumber}`);
}

// Input button event listeners
document.addEventListener('DOMContentLoaded', function() {
  const Computer = document.getElementById('Computer');
  const Laptop = document.getElementById('Laptop');
  const DocCam = document.getElementById('DocCam');
  const BluRay = document.getElementById('BluRay');

  if (Computer) Computer.addEventListener('click', () => setInput('Computer', 3));
  if (Laptop) Laptop.addEventListener('click', () => setInput('Laptop', 4));
  if (DocCam) DocCam.addEventListener('click', () => setInput('DocCam', 5));
  if (BluRay) BluRay.addEventListener('click', () => setInput('BluRay', 6));
});

// ============================================
// POWER MANAGEMENT
// ============================================

// Restore power state
function restorePowerState() {
  const projectorPower = localStorage.getItem('PJPOWER');
  const powerBtn = document.getElementById('PJ_ON');
  const topBackground = document.getElementById('top-background');

  if (!powerBtn) return;

  if (projectorPower === 'on') {
    powerBtn.textContent = 'Turn Off Projector';
    powerBtn.style.backgroundColor = '#808080';
    if (topBackground) {
      topBackground.style.backgroundColor = '#7cb342';
    }
    powerBtn.dataset.clicks = 'true';
  } else {
    powerBtn.textContent = 'Turn On Projector';
    powerBtn.style.backgroundColor = '#7cb342';
    if (topBackground) {
      topBackground.style.backgroundColor = '#cccccc';
    }
    powerBtn.dataset.clicks = 'false';
  }
}

// Toggle projector power
async function togglePower() {
  const powerBtn = document.getElementById('PJ_ON');
  const topBackground = document.getElementById('top-background');
  const clicks = powerBtn.dataset.clicks === 'true';

  if (clicks) {
    // Currently on, turn off
    powerBtn.textContent = 'Turn On Projector';
    powerBtn.style.backgroundColor = '#7cb342';
    if (topBackground) {
      topBackground.style.backgroundColor = '#cccccc';
    }
    powerBtn.dataset.clicks = 'false';
    await apiCall('/api/power/off');
    localStorage.setItem('PJPOWER', 'off');
  } else {
    // Currently off, turn on
    powerBtn.textContent = 'Turn Off Projector';
    powerBtn.style.backgroundColor = '#808080';
    if (topBackground) {
      topBackground.style.backgroundColor = '#7cb342';
    }
    powerBtn.dataset.clicks = 'true';
    await apiCall('/api/power/on');
    localStorage.setItem('PJPOWER', 'on');
  }
}

// Power button event listener
document.addEventListener('DOMContentLoaded', function() {
  const powerBtn = document.getElementById('PJ_ON');
  if (powerBtn) {
    powerBtn.addEventListener('click', togglePower);
  }
});

// ============================================
// MICROPHONE MANAGEMENT
// ============================================

// Restore mic mute state
function restoreMicMuteState() {
  const mute = localStorage.getItem('micMute');
  const micIcon = document.getElementById('mic_Icon');
  const micBar = document.getElementById('micBar');

  if (mute === 'muted') {
    if (micIcon) micIcon.src = 'images/Mic_Mute.svg';
    if (micBar) micBar.classList.add('mute');
  }
}

// Toggle mic mute
async function toggleMicMute() {
  const micIcon = document.getElementById('mic_Icon');
  const micBar = document.getElementById('micBar');
  const clicks = micIcon.dataset.clicks === 'true';

  if (clicks) {
    // Currently muted, unmute
    if (micIcon) micIcon.src = 'images/Mic_Icon.svg';
    if (micBar) micBar.classList.remove('mute');
    micIcon.dataset.clicks = 'false';
    await apiCall('/api/mic/unmute');
    localStorage.setItem('micMute', 'unmuted');
  } else {
    // Currently unmuted, mute
    if (micIcon) micIcon.src = 'images/Mic_Mute.svg';
    if (micBar) micBar.classList.add('mute');
    micIcon.dataset.clicks = 'true';
    await apiCall('/api/mic/mute');
    localStorage.setItem('micMute', 'muted');
  }
}

// Mic icon event listener
document.addEventListener('DOMContentLoaded', function() {
  const micIcon = document.getElementById('mic_Icon');
  if (micIcon) {
    micIcon.addEventListener('click', toggleMicMute);
  }
});

// ============================================
// VOLUME MANAGEMENT
// ============================================

// Restore volume mute state
function restoreVolumeMuteState() {
  const mute = localStorage.getItem('volumeMute');
  const volumeIcon = document.getElementById('volume_Icon');
  const volumeBar = document.getElementById('volumeBar');

  if (mute === 'muted') {
    if (volumeIcon) volumeIcon.src = 'images/Volume_Mute.svg';
    if (volumeBar) volumeBar.classList.add('mute');
  }
}

// Toggle volume mute
async function toggleVolumeMute() {
  const volumeIcon = document.getElementById('volume_Icon');
  const volumeBar = document.getElementById('volumeBar');
  const clicks = volumeIcon.dataset.clicks === 'true';

  if (clicks) {
    // Currently muted, unmute
    if (volumeIcon) volumeIcon.src = 'images/Volume.svg';
    if (volumeBar) volumeBar.classList.remove('mute');
    volumeIcon.dataset.clicks = 'false';
    await apiCall('/api/volume/unmute');
    localStorage.setItem('volumeMute', 'unmuted');
  } else {
    // Currently unmuted, mute
    if (volumeIcon) volumeIcon.src = 'images/Volume_Mute.svg';
    if (volumeBar) volumeBar.classList.add('mute');
    volumeIcon.dataset.clicks = 'true';
    await apiCall('/api/volume/mute');
    localStorage.setItem('volumeMute', 'muted');
  }
}

// Volume icon event listener
document.addEventListener('DOMContentLoaded', function() {
  const volumeIcon = document.getElementById('volume_Icon');
  if (volumeIcon) {
    volumeIcon.addEventListener('click', toggleVolumeMute);
  }
});

// Restore volume level
function restoreVolumeLevel() {
  const volumeBar = document.getElementById('volumeBar');
  if (volumeBar) {
    const savedVolume = localStorage.getItem('volume');
    if (savedVolume) {
      volumeBar.value = JSON.parse(savedVolume);
    }
  }
}

// Volume level mapping
const volumeLevels = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];

// Handle volume slider change
async function handleVolumeChange(value) {
  const volumeValue = parseInt(value);
  localStorage.setItem('volume', JSON.stringify(volumeValue));

  // Find nearest volume level
  let nearestLevel = volumeLevels[0];
  for (let level of volumeLevels) {
    if (Math.abs(level - volumeValue) < Math.abs(nearestLevel - volumeValue)) {
      nearestLevel = level;
    }
  }

  await apiCall(`/api/volume/${nearestLevel}`);
}

// Volume slider event listener
document.addEventListener('DOMContentLoaded', function() {
  const volumeBar = document.getElementById('volumeBar');
  if (volumeBar) {
    volumeBar.addEventListener('input', (e) => handleVolumeChange(e.target.value));
  }
});

// ============================================
// MICROPHONE LEVEL MANAGEMENT
// ============================================

// Restore mic level
function restoreMicLevel() {
  const micBar = document.getElementById('micBar');
  if (micBar) {
    const savedMic = localStorage.getItem('micVolume');
    if (savedMic) {
      micBar.value = JSON.parse(savedMic);
    }
  }
}

// Mic level mapping
const micLevels = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

// Handle mic slider change
async function handleMicChange(value) {
  const micValue = parseInt(value);
  localStorage.setItem('micVolume', JSON.stringify(micValue));

  // Find nearest mic level
  let nearestLevel = micLevels[0];
  for (let level of micLevels) {
    if (Math.abs(level - micValue) < Math.abs(nearestLevel - micValue)) {
      nearestLevel = level;
    }
  }

  await apiCall(`/api/mic/${nearestLevel}`);
}

// Mic slider event listener
document.addEventListener('DOMContentLoaded', function() {
  const micBar = document.getElementById('micBar');
  if (micBar) {
    micBar.addEventListener('input', (e) => handleMicChange(e.target.value));
  }
});

// ============================================
// CLOCK
// ============================================

// Start the clock
function startClock() {
  updateClock();
  setInterval(updateClock, 1000);
}

// Update clock display
function updateClock() {
  const clockElement = document.getElementById('clock');
  if (clockElement) {
    const date = new Date();
    clockElement.textContent = date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    });
  }
}

// Legacy function for compatibility
function startTime() {
  startClock();
}
