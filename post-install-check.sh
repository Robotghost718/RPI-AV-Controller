#!/bin/bash

# This is an optional setup script that can be run after npm install
# It helps verify the installation is correct

echo "🚀 PiAV Controller - Post Installation Verification"
echo "===================================================="
echo ""

# Check Node.js version
echo "✓ Checking Node.js installation..."
node_version=$(node -v)
echo "  Node.js version: $node_version"

# Check npm version
echo "✓ Checking npm installation..."
npm_version=$(npm -v)
echo "  npm version: $npm_version"

# Check dependencies
echo ""
echo "✓ Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "  ✓ node_modules directory exists"
    if [ -d "node_modules/express" ]; then
        echo "  ✓ Express installed"
    fi
    if [ -d "node_modules/cors" ]; then
        echo "  ✓ CORS installed"
    fi
    if [ -d "node_modules/serialport" ]; then
        echo "  ✓ Serial Port library installed"
    fi
else
    echo "  ✗ node_modules not found - run 'npm install'"
fi

# Check key files
echo ""
echo "✓ Checking key files..."
files_to_check=("server.js" "serialDevice.js" "Style/Switcher.js" "Style/projector.html" "package.json")
for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file found"
    else
        echo "  ✗ $file NOT found"
    fi
done

# Check serial ports (Linux only)
echo ""
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "✓ Checking serial ports..."
    tty_devices=$(ls /dev/tty* 2>/dev/null | grep -E "ttyUSB|ttyACM" | wc -l)
    if [ $tty_devices -gt 0 ]; then
        echo "  ✓ Found $tty_devices USB serial devices:"
        ls -la /dev/tty* 2>/dev/null | grep -E "ttyUSB|ttyACM"
    else
        echo "  ℹ No USB serial devices detected (normal if not connected)"
    fi
else
    echo "⊘ Serial port check skipped (not on Linux)"
fi

echo ""
echo "===================================================="
echo "✓ Installation verification complete!"
echo ""
echo "Next steps:"
echo "1. Connect your serial devices (projector/switcher)"
echo "2. Update serial port paths in server.js if needed"
echo "3. Run: npm start"
echo "4. Access: http://localhost/projector.html"
echo ""
echo "For more information, see:"
echo "  - README_NEW.md (overview)"
echo "  - IMPLEMENTATION_GUIDE.md (technical details)"
echo "  - MIGRATION_GUIDE.md (migration information)"
echo ""
