const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;
const globalShortcut = electron.globalShortcut;

const path = require('path');
var fs = require("fs");
const isDev = require('electron-is-dev');
const spawn = require("child_process").spawn;
const portfinder = require('portfinder');
const axios = require('axios');

// start python code
let port;
if (isDev) {
    portfinder.getPort(function (err, p) {
        port = p;
        spawn("pythonw", [`${path.join(__dirname, 'sentiment_analyzer', 'index.py')}`, port], { detached: true, stdio: 'ignore' });
    })
} else {
    // code for production
}

ipc.on('getPort', event => {
    event.returnValue = port;
});

// electron code
let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        icon: __dirname + '/logo.png',
        width: 1200,
        height: 680,
        minWidth: 940,
        minHeight: 560,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            devTools: true,
            enableRemoteModule: true,
            webSecurity: false
        }
    });
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    mainWindow.on('closed', () => mainWindow = null);
    mainWindow.webContents.openDevTools();

    ipc.on('minimizeApp', () => {
        mainWindow.minimize();
    });
    ipc.on('maximizeApp', () => {
        if (mainWindow.isMaximized())
            mainWindow.restore();
        else
            mainWindow.maximize();
    });
    ipc.on('closeApp', () => {
        mainWindow.close();
    });
    ipc.on('saveFile', (e, file, filePath) => {
        if (file == "dataset") {
            fs.copyFile(path.join(__dirname, "files", "amazon_alexa.tsv"), filePath, () => { });
        }
        if (file == "py") {
            fs.copyFile(path.join(__dirname, "files", "index.py"), filePath, () => { });
        }
        if (file == "ipynb") {
            fs.copyFile(path.join(__dirname, "files", "index.ipynb"), filePath, () => { });
        }
        if (file == "h5") {
            fs.copyFile(path.join(__dirname, "files", "model.h5"), filePath, () => { });
        }
    });

    mainWindow.on('maximize', () => {
        mainWindow.webContents.send('maximized');
    })
    mainWindow.on('unmaximize', () => {
        mainWindow.webContents.send('unmaximized');
    })

    globalShortcut.register('CommandOrControl+0', () => {
        mainWindow.webContents.send('screenChange', 0);
    })
    globalShortcut.register('CommandOrControl+1', () => {
        mainWindow.webContents.send('screenChange', 1);
    })
    globalShortcut.register('CommandOrControl+2', () => {
        mainWindow.webContents.send('screenChange', 2);
    })
    globalShortcut.register('CommandOrControl+3', () => {
        mainWindow.webContents.send('screenChange', 3);
    })
    globalShortcut.register('CommandOrControl+4', () => {
        mainWindow.webContents.send('screenChange', 4);
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    axios.get("http://localhost:" + port + "/close").then(response => {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    }).catch(err => {
        console.log("Error in closing")
        console.log(err)
    });
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
