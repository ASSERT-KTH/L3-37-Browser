const storage = (window as any).require('electron-json-storage-sync');

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
    const nCookiesNames = nCookies.map(el => el.name + ':' + el.domain)
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
