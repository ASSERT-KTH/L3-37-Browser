
# Mini browser electron app with structure rendering with d3

Executable linux release: [https://github.com/Jacarte/page-structure-browser/releases/tag/0.0.1]()

![Preview](docs/imgs/preview.png)

Input the url and press enter

## Run dev

```
npm run start
npm run watch:css
npm run electron-dev
```


## Compile linux (MACOS)

1. ```bash
    brew install fakeroot dpkg 
    ```
2. ```
    npm run package-linux
    ```


## Tips


### Access electron from host

```
const electron = window.require('electron');
const fs = electron.remote.require('fs');
const ipcRenderer  = electron.ipcRenderer;
```
