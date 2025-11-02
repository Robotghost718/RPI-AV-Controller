#!/bin/bash
timedatectl set-timezone America/New_York

raspi-config nonint do_boot_behaviour B2

# Install Node.js and npm from NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

PACKAGES="nodejs npm build-essential python3"

PACKAGESNORECS="xserver-xorg-video-all xserver-xorg-input-all xserver-xorg-core xinit x11-xserver-utils chromium-browser unclutter"

apt-get update

apt-get upgrade -y

for i in  $PACKAGES; do apt-get install -y $i;done

for i in  $PACKAGESNORECS; do apt-get install --no-install-recommends -y $i;done

cp -a Style/. /var/www/piav-controller/

echo -n "Which Switcher are you using?
(1) IN1608
(2) MPS602
(3) IN1508
(4) SW 2 or SW4
(5) IN1604
(6) None

(1 to 6): "
read SWITCHER

echo -n "What projector or display?
(1) Epson 
(2) NEC 
(3) Panasonic
(4) Samsung
(5) Dell

(1 to 5): "
read PROJECTOR
if [[ $SWITCHER -eq 1 ]] && [[ $PROJECTOR -eq 1 ]]
  then 
  cp -a ScriptPackages/IN1608_Epson/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 1 ]] && [[ $PROJECTOR -eq 2 ]]
  then 
  cp -a ScriptPackages/IN1608_NEC/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 1 ]] && [[ $PROJECTOR -eq 3 ]]
  then 
  cp -a ScriptPackages/IN1608_Panasonic/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 1 ]] && [[ $PROJECTOR -eq 4 ]]
  then 
  cp -a ScriptPackages/IN1608_Epson/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 1 ]] && [[ $PROJECTOR -eq 5 ]]
  then 
  cp -a ScriptPackages/IN1608_Epson/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 2 ]] && [[ $PROJECTOR -eq 1 ]]
  then 
  cp -a ScriptPackages/IN1608_Epson/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 2 ]] && [[ $PROJECTOR -eq 2 ]]
  then 
  cp -a ScriptPackages/IN1608_NEC/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 2 ]] && [[ $PROJECTOR -eq 3 ]]
  then 
  cp -a ScriptPackages/IN1608_Panasonic/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 2 ]] && [[ $PROJECTOR -eq 4 ]]
  then 
  cp -a ScriptPackages/IN1608_Epson/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 2 ]] && [[ $PROJECTOR -eq 5 ]]
  then 
  cp -a ScriptPackages/IN1608_Epson/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 3 ]] && [[ $PROJECTOR -eq 1 ]]
  then 
  cp -a ScriptPackages/IN1608_Epson/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 3 ]] && [[ $PROJECTOR -eq 2 ]]
  then 
  cp -a ScriptPackages/IN1608_NEC/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 3 ]] && [[ $PROJECTOR -eq 3 ]]
  then 
  cp -a ScriptPackages/IN1608_Panasonic/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 3 ]] && [[ $PROJECTOR -eq 4 ]]
  then 
  cp -a ScriptPackages/IN1608_Epson/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 3 ]] && [[ $PROJECTOR -eq 5 ]]
  then 
  cp -a ScriptPackages/IN1608_Epson/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 4 ]] && [[ $PROJECTOR -eq 1 ]]
  then 
  cp -a ScriptPackages/IN1608_Epson/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 4 ]] && [[ $PROJECTOR -eq 2 ]]
  then 
  cp -a ScriptPackages/IN1608_NEC/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 4 ]] && [[ $PROJECTOR -eq 3 ]]
  then 
  cp -a ScriptPackages/IN1608_Panasonic/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 4 ]] && [[ $PROJECTOR -eq 4 ]]
  then 
  cp -a ScriptPackages/IN1608_Epson/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 4 ]] && [[ $PROJECTOR -eq 5 ]]
  then 
  cp -a ScriptPackages/IN1608_Epson/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 5 ]] && [[ $PROJECTOR -eq 1 ]]
  then 
  cp -a ScriptPackages/IN1608_Epson/Switcher.js /var/www/piav-controller 
elif [[ $SWITCHER -eq 5 ]] && [[ $PROJECTOR -eq 2 ]]
  then 
  cp -a ScriptPackages/IN1608_NEC/Switcher.js /var/www/piav-controller 
elif [[ $SWITCHER -eq 5 ]] && [[ $PROJECTOR -eq 3 ]]
  then 
  cp -a ScriptPackages/IN1608_Panasonic/Switcher.js /var/www/piav-controller 
elif [[ $SWITCHER -eq 5 ]] && [[ $PROJECTOR -eq 4 ]]
  then 
  cp -a ScriptPackages/IN1608_Epson/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 5 ]] && [[ $PROJECTOR -eq 5 ]]
  then 
  cp -a ScriptPackages/IN1608_Epson/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 6 ]] && [[ $PROJECTOR -eq 1 ]]
  then 
  cp -a ScriptPackages/IN1608_Epson/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 6 ]] && [[ $PROJECTOR -eq 2 ]]
  then 
  cp -a ScriptPackages/IN1608_NEC/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 6 ]] && [[ $PROJECTOR -eq 3 ]]
  then 
  cp -a ScriptPackages/IN1608_Panasonic/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 6 ]] && [[ $PROJECTOR -eq 4 ]]
  then 
  cp -a ScriptPackages/IN1608_Epson/Switcher.js /var/www/piav-controller
elif [[ $SWITCHER -eq 6 ]] && [[ $PROJECTOR -eq 5 ]]
  then 
  cp -a ScriptPackages/IN1608_Epson/Switcher.js /var/www/piav-controller
else 
  echo "Error please start again"
fi

echo -n "How many inputs?(2 to 4): "
read INPUTS
echo -n "Is a microphone being used? (y or n): "
read MIC

# Create application directory
mkdir -p /var/www/piav-controller
cd /var/www/piav-controller

# Copy all project files
cp -r ../../../app/* .

# Install npm dependencies
npm install

# Set up systemd service file
sudo tee /etc/systemd/system/piav-controller.service > /dev/null <<EOF
[Unit]
Description=PiAV Controller Service
After=network.target

[Service]
Type=simple
User=pi
WorkingDirectory=/var/www/piav-controller
ExecStart=/usr/bin/node /var/www/piav-controller/server.js
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the service
systemctl daemon-reload
systemctl enable piav-controller
systemctl start piav-controller

chown -R pi:pi /var/www/piav-controller/
echo 'owner updated'
chmod -R 755 /var/www/piav-controller/
echo 'permissions updated'

grep -qF -- "[[ -z \$DISPLAY && \$XDG_VTNR -eq 1 ]] && startx -- -nocursor" "/home/pi/.profile" || echo "[[ -z \$DISPLAY && \$XDG_VTNR -eq 1 ]] && startx -- -nocursor" >> "/home/pi/.profile"

echo '.profile appended'

cat << EOF > '/home/pi/.xinitrc'
#!/usr/bin/env sh
xset -dpms
xset s off
xset s noblank

unclutter &
chromium-browser http://localhost/projector.html \
  --window-position=0,0 \
  --start-fullscreen \
  --kiosk \
  --incognito \
  --noerrdialogs \
  --disable-translate \
  --no-first-run \
  --fast \
  --fast-start \
  --disable-infobars \
  --disable-features=TranslateUI \
  --disk-cache-dir=/dev/null \
  --overscroll-history-navigation=0 \
  --disable-pinch
EOF

echo '.xinitrc written'

usermod -a -G dialout pi

echo "pi user added to dialout group"

echo 'Installer complete rebooting...'

sleep 10

reboot