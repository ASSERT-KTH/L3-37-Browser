const session = (window as any).require('electron').remote.session;

export function getAllCookies() {
    return session.defaultSession.cookies.get({})
        .then((cookies) => {
            return cookies;
        }).catch((error) => {
            console.log(error)
        })
}

export function getCookiesFrom(domain: String) {
    return session.defaultSession.cookies.get({ url: domain })
        .then((cookies) => {
            return cookies;
        }).catch((error) => {
            console.log(error)
        })
}

export function deleteData() {
    return session.defaultSession.clearStorageData({ options: { storages: ['cookies'] } }, function (data) {
    });
}

export default {
    getAllCookies,
    getCookiesFrom,
    deleteData
}
