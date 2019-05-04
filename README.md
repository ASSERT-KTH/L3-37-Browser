
## Access electron from host

```
const electron = window.require('electron');
const fs = electron.remote.require('fs');
const ipcRenderer  = electron.ipcRenderer;
```

## Run dev

```
npm run start
npm run watch:css
npm run electron-dev
```