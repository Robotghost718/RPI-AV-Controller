# PiAV Controller - JavaScript Edition

A Raspberry Pi-based AV Controller system built entirely in JavaScript (Node.js + Express), replacing the previous multi-language stack (Python, PHP, Apache).

## Features

- 🎬 **Projector Control** - Turn on/off and manage display settings
- 📺 **Input Switching** - Switch between up to 8 different inputs
- 🔊 **Volume Control** - Precise volume adjustment (0-100)
- 🎤 **Microphone Control** - Mic level adjustment and muting
- 💾 **State Persistence** - LocalStorage-based configuration saving
- 🕐 **Real-time Clock** - Digital clock display
- 📱 **Responsive UI** - Bootstrap-based responsive design
- 🖥️ **Kiosk Mode** - Full-screen Chromium browser integration
- 🚀 **Fast & Lightweight** - Node.js server with minimal overhead
- 🔧 **Pure JavaScript** - No PHP, Python, or Apache dependencies

## Quick Start

### Installation on Raspberry Pi

```bash
sudo apt update && sudo apt install git -y
git clone https://github.com/Robotghost718/PiAVController.git ~/Installer
cd ~/Installer
sudo bash RaspiInstaller.sh
```

Follow the interactive prompts to configure:
- Switcher type (IN1608, MPS602, IN1508, etc.)
- Projector/display model (Epson, NEC, Panasonic, Samsung, Dell)
- Number of inputs (2-4)
- Microphone usage (yes/no)

### Local Development

```bash
# Clone repository
git clone https://github.com/Robotghost718/PiAVController.git
cd PiAVController

# Install dependencies
npm install

# Start server
npm start

# Access at http://localhost/projector.html
```

## Architecture

```
┌─────────────────────────────────────┐
│   Web Browser (Chromium)            │
│   ├─ HTML (projector.html)          │
│   └─ JavaScript (Switcher.js)       │
└──────────────┬──────────────────────┘
               │ (HTTP/Fetch)
┌──────────────▼──────────────────────┐
│   Express Server (server.js)        │
│   ├─ REST API Endpoints             │
│   ├─ Request Processing             │
│   └─ Response Handling              │
└──────────────┬──────────────────────┘
               │ (Serial Commands)
┌──────────────▼──────────────────────┐
│   Serial Device Module              │
│   ├─ Port Management                │
│   ├─ Command Formatting             │
│   └─ Response Parsing               │
└──────────────┬──────────────────────┘
               │ (Serial Data)
┌──────────────▼──────────────────────┐
│   Hardware (Projector/Switcher)     │
└─────────────────────────────────────┘
```

## API Endpoints

### Power Control
- `GET /api/power/on` - Power on projector
- `GET /api/power/off` - Power off projector

### Input Selection
- `GET /api/input/1` through `GET /api/input/8` - Select input

### Volume
- `GET /api/volume/0` through `GET /api/volume/100` - Set volume level
- `GET /api/volume/mute` - Mute volume
- `GET /api/volume/unmute` - Unmute volume

### Microphone
- `GET /api/mic/0` through `GET /api/mic/60` - Set mic level (by 5dB increments)
- `GET /api/mic/mute` - Mute microphone
- `GET /api/mic/unmute` - Unmute microphone

### Status
- `GET /api/health` - Server health check

## Project Structure

```
PiAVController/
├── server.js                 # Main Express server
├── serialDevice.js           # Serial communication module
├── package.json              # NPM dependencies
├── RaspiInstaller.sh         # Installation script
├── MIGRATION_GUIDE.md        # Detailed migration documentation
├── Style/
│   ├── projector.html        # Main UI
│   ├── Switcher.js           # Frontend JavaScript
│   ├── theme.css             # Custom styles
│   ├── css/                  # Bootstrap and utilities
│   ├── js/                   # JavaScript libraries
│   └── images/               # SVG icons and images
├── ScriptPackages/
│   ├── IN1608_Epson/
│   ├── IN1608_NEC/
│   └── IN1608_Panasonic/
└── GUIs/
    ├── 2_input_w_mic/
    ├── 2_input_no_mic/
    ├── 3_input_w_mic/
    ├── 3_input_no_mic/
    ├── 4_input_w_mic/
    └── 4_input_no_mic/
```

## Configuration

### Serial Ports

Edit `server.js` to change serial port paths:

```javascript
// For power commands (usually /dev/ttyUSB1)
devices.projector = new SerialDevice('/dev/ttyUSB1', 9600);

// For input/volume/mic commands (usually /dev/ttyUSB0)
devices.switcher = new SerialDevice('/dev/ttyUSB0', 9600);
```

Check device paths:
```bash
ls -la /dev/tty*
```

### Server Port

Change the server port in `server.js`:
```javascript
const PORT = process.env.PORT || 80;
```

Or set via environment variable:
```bash
PORT=3000 npm start
```

## Service Management

On Raspberry Pi, the application runs as a systemd service:

```bash
# Check status
sudo systemctl status piav-controller

# View logs
sudo journalctl -u piav-controller -n 50

# Restart service
sudo systemctl restart piav-controller

# Stop service
sudo systemctl stop piav-controller

# Start service
sudo systemctl start piav-controller
```

## Browser Console

Press `F12` in Chromium to access developer tools for debugging:

```javascript
// Check stored settings
console.log(localStorage.getItem('PJPOWER'));
console.log(localStorage.getItem('volume'));

// Manually call API
fetch('/api/power/on').then(r => r.json()).then(console.log);
```

## Troubleshooting

### Serial Port Not Found
```bash
# Check permissions
sudo usermod -a -G dialout $USER
sudo usermod -a -G dialout www-data

# Verify devices
dmesg | grep -i usb
```

### Port 80 Already in Use
```bash
# Find process using port 80
sudo lsof -i :80

# Use different port
PORT=3000 npm start
```

### Service Won't Start
```bash
# Check logs
sudo journalctl -u piav-controller -f

# Restart and check
sudo systemctl restart piav-controller
sudo systemctl status piav-controller
```

### Hardware Not Responding
1. Verify serial connections are secure
2. Test with direct serial communication:
   ```bash
   # Install minicom: sudo apt install minicom
   sudo minicom -D /dev/ttyUSB0 -b 9600
   ```
3. Check device documentation for correct command format
4. Review server logs for communication errors

## Development

### Adding New Features

1. **New API Endpoint:**
   ```javascript
   // In server.js
   app.get('/api/feature/:param', async (req, res) => {
     try {
       const result = await sendCommand(device, 'COMMAND');
       res.json({ status: 'success', message: result });
     } catch (err) {
       res.status(500).json({ status: 'error', message: err.message });
     }
   });
   ```

2. **Call from Frontend:**
   ```javascript
   // In Switcher.js
   await apiCall('/api/feature/value');
   ```

### Testing

Test API endpoints with curl:
```bash
curl http://localhost/api/power/on
curl http://localhost/api/volume/50
curl http://localhost/api/input/1
```

## Advantages Over Original Stack

| Aspect | Old Stack | New Stack |
|--------|-----------|-----------|
| Runtime | Apache + PHP + Python | Node.js |
| Memory Usage | High | Low |
| Startup Time | Slow | Fast |
| Dependencies | Apache, PHP, Python, pyserial | Node.js, npm packages |
| Code Maintainability | Multiple languages | Single JavaScript |
| Frontend Framework | jQuery | Vanilla ES6+ |
| Real-time Features | Polling | WebSocket-ready |
| Deployment | Complex | Simple |

## Supported Hardware

### Switchers
- IN1608 series
- MPS602
- IN1508
- IN1604
- SW2/SW4

### Projectors/Displays
- Epson
- NEC
- Panasonic
- Samsung
- Dell

### Number of Inputs
- 2 inputs (with optional mic)
- 3 inputs (with optional mic)
- 4 inputs (with optional mic)

## Future Roadmap

- [ ] WebSocket support for real-time updates
- [ ] Mobile app interface
- [ ] REST API documentation (Swagger)
- [ ] Docker containerization
- [ ] Advanced scheduling and automation
- [ ] Multi-room control
- [ ] User authentication
- [ ] Event logging and analytics

## Migration from Old System

See [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for detailed information on:
- Architecture changes
- API endpoint mapping
- Frontend refactoring
- Python to JavaScript conversion
- Troubleshooting common issues

## License

[Your License Here]

## Support & Contribution

For issues, feature requests, or contributions:
- Open an issue on GitHub
- Submit a pull request
- Review the migration guide for context

## Changelog

### v2.0.0 (JavaScript Edition)
- ✨ Complete rewrite in pure JavaScript
- 🚀 Node.js/Express backend (replacing Apache/PHP)
- 📦 Single runtime environment
- 🔧 Improved error handling
- 📡 RESTful API endpoints
- 💻 Vanilla JavaScript frontend (no jQuery)
- 📚 Comprehensive documentation

### v1.0.0 (Original)
- Initial release with Apache/PHP/Python stack

---

**Created with ❤️ for Raspberry Pi and AV Control**
