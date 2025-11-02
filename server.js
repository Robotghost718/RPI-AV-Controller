/**
 * PiAV Controller - Main Express Server
 * Replaces Apache/PHP backend with Node.js
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const SerialDevice = require('./serialDevice');

const app = express();
const PORT = process.env.PORT || 80;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'Style')));

// Initialize serial devices
// These device paths and configurations can be modified based on your setup
const devices = {
  projector: null,
  switcher: null
};

// Initialize devices on startup
async function initializeDevices() {
  try {
    // Try to initialize projector on /dev/ttyUSB1 (for power commands)
    devices.projector = new SerialDevice('/dev/ttyUSB1', 9600);
    
    // Try to initialize switcher on /dev/ttyUSB0 (for input switching, volume, mic)
    devices.switcher = new SerialDevice('/dev/ttyUSB0', 9600);

    console.log('Serial devices initialized (connections will be made on demand)');
  } catch (err) {
    console.error('Error initializing devices:', err.message);
  }
}

/**
 * Helper function to send a command to a device
 */
async function sendCommand(device, command, useResponse = true) {
  try {
    if (!device) {
      throw new Error('Device not initialized');
    }

    // Open port if not already open
    if (!device.isOpen) {
      await device.open();
    }

    let result;
    if (useResponse) {
      result = await device.writeCommand(command);
    } else {
      await device.writeCommandNoResponse(command);
      result = 'OK';
    }

    return result;
  } catch (err) {
    console.error(`Error sending command: ${err.message}`);
    throw err;
  }
}

// ============================================
// POWER CONTROL ENDPOINTS
// ============================================

/**
 * Power On
 */
app.get('/api/power/on', async (req, res) => {
  try {
    await sendCommand(devices.projector, 'PWR ON', false);
    res.json({ status: 'success', message: 'Projector powered on' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

/**
 * Power Off
 */
app.get('/api/power/off', async (req, res) => {
  try {
    await sendCommand(devices.projector, 'PWR OFF', false);
    res.json({ status: 'success', message: 'Projector powered off' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ============================================
// INPUT CONTROL ENDPOINTS
// ============================================

const inputCommands = {
  1: '1!',
  2: '2!',
  3: '3!',
  4: '4!',
  5: '5!',
  6: '6!',
  7: '7!',
  8: '8!'
};

app.get('/api/input/:number', async (req, res) => {
  try {
    const inputNum = parseInt(req.params.number);
    const command = inputCommands[inputNum];

    if (!command) {
      return res.status(400).json({ status: 'error', message: 'Invalid input number' });
    }

    await sendCommand(devices.switcher, command, false);
    res.json({ status: 'success', message: `Input ${inputNum} selected` });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ============================================
// VOLUME CONTROL ENDPOINTS
// ============================================

const volumeCommands = {
  0: '\x1BD1*-1000GRPM',    // Mute
  5: '\x1BD1*-800GRPM',
  10: '\x1BD1*-600GRPM',
  15: '\x1BD1*-400GRPM',
  20: '\x1BD1*-200GRPM',
  25: '\x1BD1*0GRPM',
  30: '\x1BD1*200GRPM',
  35: '\x1BD1*400GRPM',
  40: '\x1BD1*600GRPM',
  45: '\x1BD1*800GRPM',
  50: '\x1BD1*1000GRPM',
  55: '\x1BD1*1200GRPM',
  60: '\x1BD1*1400GRPM',
  65: '\x1BD1*1600GRPM',
  70: '\x1BD1*1800GRPM',
  75: '\x1BD1*2000GRPM',
  80: '\x1BD1*2200GRPM',
  85: '\x1BD1*2400GRPM',
  90: '\x1BD1*2600GRPM',
  95: '\x1BD1*2800GRPM',
  100: '\x1BD1*3000GRPM'
};

app.get('/api/volume/:level', async (req, res) => {
  try {
    const level = parseInt(req.params.level);
    const command = volumeCommands[level];

    if (!command) {
      return res.status(400).json({ status: 'error', message: 'Invalid volume level' });
    }

    await sendCommand(devices.switcher, command, false);
    res.json({ status: 'success', message: `Volume set to ${level}` });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.get('/api/volume/mute', async (req, res) => {
  try {
    await sendCommand(devices.switcher, volumeCommands[0], false);
    res.json({ status: 'success', message: 'Volume muted' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Alias endpoints for backward compatibility
app.get('/api/volume/unmute', async (req, res) => {
  try {
    // Unmute by setting to a default volume level (e.g., 50)
    await sendCommand(devices.switcher, volumeCommands[50], false);
    res.json({ status: 'success', message: 'Volume unmuted' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ============================================
// MICROPHONE CONTROL ENDPOINTS
// ============================================

const micCommands = {
  0: 'MIC_0',
  5: 'MIC_5',
  10: 'MIC_10',
  15: 'MIC_15',
  20: 'MIC_20',
  25: 'MIC_25',
  30: 'MIC_30',
  35: 'MIC_35',
  40: 'MIC_40',
  45: 'MIC_45',
  50: 'MIC_50',
  55: 'MIC_55',
  60: 'MIC_60',
  mute: 'MIC_MUTE',
  unmute: 'MIC_UNMUTE'
};

app.get('/api/mic/:level', async (req, res) => {
  try {
    const level = req.params.level;
    const command = micCommands[level];

    if (!command) {
      return res.status(400).json({ status: 'error', message: 'Invalid mic level' });
    }

    await sendCommand(devices.switcher, command, false);
    res.json({ status: 'success', message: `Mic set to ${level}` });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// ============================================
// SERVE HTML FILES
// ============================================

// Serve the projector control pages
app.get('/projector.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'Style', 'projector.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Style', 'projector.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 'error', message: 'Internal server error' });
});

// Initialize and start server
initializeDevices().then(() => {
  app.listen(PORT, () => {
    console.log(`PiAV Controller server running on port ${PORT}`);
    console.log(`Access the controller at http://localhost/projector.html`);
  });
}).catch(err => {
  console.error('Failed to initialize devices:', err);
  // Still start the server even if devices fail to initialize
  app.listen(PORT, () => {
    console.log(`PiAV Controller server running on port ${PORT} (devices may not be available)`);
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...');
  try {
    if (devices.projector && devices.projector.isOpen) {
      await devices.projector.close();
    }
    if (devices.switcher && devices.switcher.isOpen) {
      await devices.switcher.close();
    }
  } catch (err) {
    console.error('Error closing serial ports:', err);
  }
  process.exit(0);
});

module.exports = app;
