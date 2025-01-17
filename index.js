const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

const isDev = process.env.NODE_ENV !== 'development';
const isMac = process.platform === 'darwin';

function createMainWindow(){
	const mainWindow = new BrowserWindow({
		title: 'Image Resizer',
		width: isDev ? 1000 : 500,
		height: 600,
	});

	if(isDev){
		mainWindow.webContents.openDevTools();
	}

	mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));
}

app.whenReady().then(() => {
	createMainWindow();

	const mainMenu = Menu.buildFromTemplate(menu);
	Menu.setApplicationMenu(mainMenu);
});

app.on('activate', () => {
	if (BrowserWindow.getALLWindows().length === 0){
		createMainWindow();
	}
})

const menu = [
	{
		label: "File",
		submenu: [
			{
				label: 'Quit'
				click: () => app.quit(),
				accelerator: 'CmdOrCtrl+W'
			}
		]
	}
]

app.on('window-all-closed', () => {
	if (!isMac){
		app.quit();
	}
})
