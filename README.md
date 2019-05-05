
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

## Compile scripts

```
electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds
```

### Compile linux (MACOS)

1. ``` brew install fakeroot dpkg ```

