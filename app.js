'use strict';

const Electron = require('electron');
const app = Electron.app;
const localShortcut = require('electron-localshortcut');
const BrowserWindow = Electron.BrowserWindow;
const ipcMain = Electron.ipcMain;

var MainWin = null;

var DebugMode = true;

var ShortcutTrigger;

app.on('ready', function() {
	MainWin = new BrowserWindow({
		width: 1000,
		height: 800,
        x: 100,
        y: 100,
		//frame: false
	});
	if (!DebugMode) {
		
	}
	MainWin.setMenu(null);
	MainWin.loadURL('file://' + __dirname + '/views/MainWin.html');

	localShortcut.register(MainWin, 'Ctrl+R', () => {
		MainWin.webContents.send('shortcutActivated', 'reload');
	});
	localShortcut.register(MainWin, 'Ctrl+D', () => {
		MainWin.webContents.send('shortcutActivated', 'devtools');
	});

	MainWin.on('closed', function() {
		MainWin = null;
	});
})
