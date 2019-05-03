/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, ipcMain } from 'electron';
import MenuBuilder from './menu';
import log from 'electron-log';

let mainWindow = null;

// Logger Info
const { autoUpdater } = require("electron-updater")
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...................');

const isDev = require('electron-is-dev');
if (isDev) {
	console.log('Running in development');
} else {
	console.log('Running in production');
}

autoUpdater.setFeedURL({ 
  provider: 'github', 
  owner: 'brunojob6', 
  repo: 'valid'
  
});

//updateHandle();a5a01bacfb142fdb31c587310a50f8b2507856c5 

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    minHeight: 600,
    maxHeight: 800,
    titleBarStyle: 'hidden',
    backgroundColor: '#ffcdd2',
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    mainWindow.show();
    mainWindow.focus();
  });

  //autoUpdater.updateConfigPath = path.join(_path to app-update.yml_);

  autoUpdater.checkForUpdates().then(
    function (val) {
        log.info('Promise fulfilled');
    }).catch(
    function (reason) {
        log.error('Handle rejected promise (' + reason + ') here.');
    });
    
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();
});

ipcMain.on('asynchronous-message', (event, args) => {
  runCommand(event);
});

function runCommand(event) {
	const cmd = require('node-cmd');
	const path = require('path');
	const libs = path.join(__dirname, '..\\hamsteriii\\libs');
	const jar = path.join(__dirname, '..\\hamsteriii\\hamsteriii-0.0.1-SNAPSHOT.jar');
  const commandToExecute = `java -Djava.library.path=${libs} -cp ${jar} hamsteriii.config.App`;
	const processRef = cmd.get(commandToExecute);
	let data_line = '';
	processRef.stdout.on(
		'data',
		function(data) {
			data_line += data;
			if (data_line[data_line.length-1] == '\n') {
			event.sender.send('asynchronous-reply', data_line);
			}
		}
	);
}

/*
function updateHandle () {
  autoUpdater.setFeedURL('path');
  autoUpdater.on('error', function () {
    mainWindow.webContents.send('message', 'error')
  });
  autoUpdater.on('checking-for-update', function () {
    mainWindow.webContents.send('message', 'checking')
  });
  autoUpdater.on('update-available', function () {
    mainWindow.webContents.send('message', 'update')
  });
  autoUpdater.on('update-not-available', function () {
    mainWindow.webContents.send('message', 'is_new')
  });

  autoUpdater.on('update-downloaded', function () {
    const dialog = electron.dialog;
    
    ipcMain.on('isUpdateNow', () => {
      autoUpdater.quitAndInstall();
    });
    mainWindow.webContents.send('isUpdateNow')
  });
  ipcMain.on('update-version', () => {
    autoUpdater.checkForUpdates();
  })
}
*/

///////////////////
// Auto upadater //
///////////////////
/*
autoUpdater.requestHeaders = { "PRIVATE-TOKEN": "Personal access Token" };
autoUpdater.autoDownload = true;

autoUpdater.setFeedURL({
    provider: "github",
    owner: "brunojob6",
    url: "https://gitlab.com/_example_repo_/-/jobs/artifacts/master/raw/dist?job=build"
    
    "repo": "validabio",
    "token": "18ceecc36edc85d550affe54d6111114202b0e3c"
});
*/

const sendStatusToWindow = (text) => {
  log.info(text);
  if (mainWindow) {
    mainWindow.webContents.send('message', text);
  }
};
//  AutoUpdater
autoUpdater.on('checking-for-update', () => {
  console.log('***************checking-for-update**********************')
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (ev, info) => {
  console.log('***************update-available**********************')
  sendStatusToWindow('Update available.');
})
autoUpdater.on('update-not-available', (ev, info) => {
  console.log('***************update-not-available**********************')
  sendStatusToWindow('Update not available.');
})
autoUpdater.on('error', (ev, err) => {
  console.log('ONNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN'+ err)
  sendStatusToWindow('Error in auto-updater.');
})
autoUpdater.on('download-progress', (ev, progressObj) => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
  log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
  console.log('***************download-progress**********************')
  sendStatusToWindow('Download progress...');
})
autoUpdater.on('update-downloaded', (ev, info) => {
  console.log('***************update-downloaded**********************')
  sendStatusToWindow('Update downloaded; will install in 5 seconds');
  /*
    setTimeout(function () {
      autoUpdater.quitAndInstall();
    }, 1000);
    */
});
