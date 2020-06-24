const { app, BrowserWindow, Menu } = require('electron')

let mainWindow;
function createWindow () {
  // Create the browser window.
  let mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // const mainMenu = Menu.buildFromTemplate(menuTemplate);
  // Menu.setApplicationMenu(mainMenu);

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
}

app.whenReady().then(createWindow);

const menuTemplate = [
  {
    label: 'Reload',
    click(){
      app.relaunch();
      app.exit();
    }
  },
  {
    label: 'Dev tools',
    click(){
      mainWindow.webContents.openDevTools();
    }
  }
];