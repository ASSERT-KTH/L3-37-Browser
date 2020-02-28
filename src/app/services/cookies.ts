const session = (window as any).require('electron').remote.session;

export function getAllCookies(): void {
    session.defaultSession.cookies.get({})
        .then((cookies) => {
            console.log(cookies)
        }).catch((error) => {
            console.log(error)
        })
}

export function getCookiesFrom(domain: String): void {
    session.defaultSession.cookies.get({ url: domain })
        .then((cookies) => {
            console.log(cookies)
        }).catch((error) => {
            console.log(error)
        })
}

export default {
    getAllCookies,
    getCookiesFrom
}
