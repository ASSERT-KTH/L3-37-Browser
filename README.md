
# Mini browser through the looking glass

L3-37 is a mini browser that superimposes a structural view of the web page, on top of the actual page. This browser is inspired by the [Web stalker](http://bak.spc.org/iod/nettime.html), as it aims at letting the users browse the web, while looking through the glass of web pages.

![Preview](docs/imgs/brw.png)

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
