const currentDate = require('./getCurrentDay');
const currentTime = require('./getCurrentTime');
const fs = require("fs");

const direction = {
    1: '[LOG]',
    2: '[ERROR]',
    3: '[FATAL_ERROR]'
};

function logMessages(messageType, messageLevel, message) {
    var tabstringa = "";
    for (let i = 1; i < messageLevel; i++) {
        tabstringa += "\t"
    }

    const timestamp = `${currentDate()}_${currentTime()}`;
    const data = `${tabstringa}${messageType} ${timestamp} ${message} \n`;
    fs.appendFile('./error_logs/logs.txt', data, (error) => {
        if (error) {
            console.error('An error occurred:', error);
        } else {
            console.log('File has been written successfully.');
        }
    });
}
module.exports = {
    logMessages,
    direction
}