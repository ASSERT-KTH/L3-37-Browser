const storage = (window as any).require('electron-json-storage-sync');

const { dialog } = (window as any).require('electron').remote
var fs = (window as any).require('fs'); // Load the File System to execute our common tasks (CRUD)


export function exportData(content, message) {
    console.log('export data', dialog);
    // JSON.stringify(content)
    const data = {
        user: '',
        cookies: content
    }
    const fileInfo = JSON.stringify(data);
    let filename = dialog.showSaveDialog({}
    ).then(result => {
        filename = result.filePath;
        filename = /.txt$/.test(filename) ? filename : filename + ".txt";
        console.log(filename)
        if (filename === undefined) {
            console.log('the user clicked the btn but didn\'t created a file');
            message.info('Error creating the file');

            return;
        }
        fs.writeFile(filename, fileInfo, (err) => {
            if (err) {
                console.log('an error ocurred with file creation ' + err.message);
                message.info('Error creating the file');
                return
            }
            message.info('File saved ;)');
        })
    }).catch(err => {
        message.info('Error creating the file');
    })
}


export function getKey(key) {
    const result = storage.get(key);
    if (result.status) {
        // do something with result.data
        return result.data;
    } else {
        console.log('there is no key', key, result.status)
        return null;
        // handle result.error
    }
}

export function setKey(key, value) {
    const result = storage.set(key, value);
    if (result.status) {
        // data has been stored
    } else {
        // handle result.error
        console.log('ERROR not able to set', key, value)
    }
}

export function clearData() {
    const result = storage.clear();
    if (result.status) {
        // storage has been cleared
    } else {
        console.log('ERROR can not delete data')
    }
}

export function addCookies(nCookies, oCookies) {
    //get arrays with only the names
    // const nCookiesNames = nCookies.map(el => el.name + ':' + el.domain)
    const oCookiesNames = oCookies.length === 0 ? [] : oCookies.map(el => el.name + ':' + el.domain)
    //filter New cookies if they already exist in old cookies
    const newCookies = nCookies.filter(el => {
        return oCookiesNames.indexOf(el.name + ':' + el.domain) < 0;
    })
    return [...oCookies, ...newCookies];
}

export default {
    getKey,
    setKey,
    clearData,
    addCookies
}
