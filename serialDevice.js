/**
 * Serial Communication Module
 * Handles all serial port communication with AV equipment
 */

const SerialPort = require('serialport');

class SerialDevice {
  constructor(port, baudRate = 9600) {
    this.port = port;
    this.baudRate = baudRate;
    this.serialPort = null;
    this.isOpen = false;
  }

  /**
   * Opens the serial port connection
   */
  async open() {
    return new Promise((resolve, reject) => {
      try {
        this.serialPort = new SerialPort.SerialPort({
          path: this.port,
          baudRate: this.baudRate,
          byteSize: 8,
          parity: 'none',
          stopBits: 1,
          timeout: 5000
        });

        this.serialPort.on('open', () => {
          this.isOpen = true;
          console.log(`Serial port ${this.port} opened successfully`);
          resolve();
        });

        this.serialPort.on('error', (err) => {
          console.error(`Serial port error: ${err.message}`);
          reject(err);
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Closes the serial port connection
   */
  async close() {
    return new Promise((resolve, reject) => {
      if (this.serialPort && this.isOpen) {
        this.serialPort.close((err) => {
          if (err) {
            reject(err);
          } else {
            this.isOpen = false;
            console.log(`Serial port ${this.port} closed`);
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }

  /**
   * Writes a command to the serial port and reads the response
   * @param {string} command - The command to send
   * @returns {Promise<string>} The response from the device
   */
  async writeCommand(command) {
    return new Promise((resolve, reject) => {
      if (!this.isOpen) {
        reject(new Error(`Serial port ${this.port} is not open`));
        return;
      }

      let response = '';
      let timeoutHandle;

      const responseListener = (data) => {
        response += data.toString('utf-8');
      };

      const onData = responseListener;
      this.serialPort.on('data', onData);

      // Set a timeout to stop listening for response
      timeoutHandle = setTimeout(() => {
        this.serialPort.removeListener('data', onData);
        resolve(response);
      }, 100);

      // Write the command
      this.serialPort.write(`${command}\r`, (err) => {
        if (err) {
          clearTimeout(timeoutHandle);
          this.serialPort.removeListener('data', onData);
          reject(err);
        }
      });
    });
  }

  /**
   * Writes a command without waiting for response
   * @param {string} command - The command to send
   */
  async writeCommandNoResponse(command) {
    return new Promise((resolve, reject) => {
      if (!this.isOpen) {
        reject(new Error(`Serial port ${this.port} is not open`));
        return;
      }

      this.serialPort.write(`${command}\r`, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

module.exports = SerialDevice;
