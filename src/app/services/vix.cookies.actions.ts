import * as d3 from 'd3';

export function getCookiesWithURL(cookieArr, url) {
    return cookieArr.filter(el => {
        return ((el['type'] === 'FIRST_PARTY' && url.includes(el['domain'])) || (el['origin'].includes(url) && el['type'] === 'THIRD_PARTY'))
    });
}

export function getCookies(cookieArr, urlStr, displayType) {
    switch (displayType) {
        case 'CURRENT_URL':
            // const url = urlStr.replace('http://', '').replace('https://', '').replace('www', '').replace(/.$/, "")
            return getCookiesWithURL(cookieArr, urlStr)
        case 'ALL_URLS':
            return cookieArr;
        default:
            console.log('GET COOKIES DEFAULT')
            break;
    }
}

export function getNonRepeatUrls(cArr) {
    //sort array in alphabetical domain order
    return cArr.sort((a, b) => {
        const domainA = a['domain'].toUpperCase();
        const domainB = b['domain'].toUpperCase();
        let comparison = 0;
        if (domainA > domainB) {
            comparison = 1;
        } else if (domainA < domainB) {
            comparison = -1;
        }
        return comparison;
    })
        .filter(el => el['type'] === "FIRST_PARTY")
        .reduce((a, e) => a.length !== 0 && e['domain'] === a[a.length - 1]['domain'] ? a : (a.push(e), a), []).map(el => {
            el['numCookies'] = getNumCookiesRelated(el, cArr)
            return el;
        })
}

function getNumCookiesRelated(element, arr) {
    const cookies = arr.filter(el => {
        return el['domain'] === element['domain'] && el['origin'] === element['origin'] ? true :
            el['type'] === "THIRD_PARTY" && el['origin'] === element['domain'] ? true :
                false
    });
    let first = 0;
    let third = 0;

    for (let el of cookies) {
        if (el['type'] === 'FIRST_PARTY') {
            first++;
        } else if (el['type'] === 'THIRD_PARTY') {
            third++;
        }
    }

    return { total: first + third, first: first, thrid: third };
}

export function orderBy(orderType, arr) {
    switch (orderType) {
        case "TYPE":
            return arr.sort((a, b) => a.type === b.type ? 0 : a.type > b.type ? -1 : 1)
        case "NAME":
            return arr.sort(function (a, b) {
                const nameA = a.name.toUpperCase(); // ignore upper and lowercase
                const nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) { return -1; }
                if (nameA > nameB) { return 1; }
                return 0;
            });
        case "DATE":
            return arr.sort(function (a, b) {
                const nameA = a.expirationDate; // ignore upper and lowercase
                const nameB = b.expirationDate; // ignore upper and lowercase
                if (nameA === undefined) return -1
                if (nameB === undefined) return 1
                if (nameA < nameB) { return -1; }
                if (nameA > nameB) { return 1; }
                return 0;
            });
        case "DOMAIN":
            return arr.sort(function (a, b) {
                const nameA = a.domain.toUpperCase(); // ignore upper and lowercase
                const nameB = b.domain.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) { return -1; }
                if (nameA > nameB) { return 1; }
                return 0;
            });
        case "TYPE_DOMAIN":
            return arr.sort((a, b) => {
                return a.origin === undefined || a.origin === '' ? -1 : 1
            })

        default:
            break;
    }
}

export function tiltUrls(arr, id, domain, origin, type) {
    if (type === "FIRST_PARTY") {
        return arr.map((el, index) => {
            el['tilt'] = el['type'] === 'THIRD_PARTY' && el['origin'].includes(domain) ? true : false;
            el['highlight'] = el['type'] === 'FIRST_PARTY' && el['domain'] === (domain) ? true : el['type'] === 'FIRST_PARTY' && el['domain'] === (domain) && el['selected'] ? true : false;
            return el;
        })
    } if (type === "THIRD_PARTY") {
        return arr.map(el => {
            el['tilt'] = el['type'] === 'FIRST_PARTY' && origin.includes(el['domain']) ? true : false;
            el['highlight'] = el['type'] === 'THIRD_PARTY' && el['domain'] === (domain) ? true : el['type'] === 'THIRD_PARTY' && el['domain'] === (domain) && el['selected'] ? true : false;
            return el;
        })
    }
}

export function tiltCookies(arr, id, domain, origin, type) {
    return arr.map(el => {
        el['tilt'] = el['type'] === 'THIRD_PARTY' && el['domain'] === (domain) ? true : el['type'] === 'FIRST_PARTY' && el['origin'].includes(origin) ? true : false;
        return el;
    })
}

export function restoreTilt(arr) {
    return arr.map(el => {
        el['tilt'] = false;
        el['highlight'] = el['selected'];
        return el;
    })
}

export function existInSelected(ele, arr) {
    return arr.some(e => e['id'] === ele['id'])
}

export function upDateSelected(selectedArr, arr) {
    //if array is empty just asign false to every element
    const cleanArr = arr.map(el => {
        el['selected'] = false;
        return el;
    })
    if (selectedArr.length === 0) return cleanArr;

    let nArray = cleanArr;
    for (const cookie of selectedArr) {
        nArray = modifySelected(cookie, arr);
    }
    return nArray;
}

function modifySelected(element, arr) {
    return arr.map(el => {
        el['selected'] = el['domain'] === element['domain'] && el['origin'] === element['origin'] ? true :
            element['type'] === "FIRST_PARTY" && el['type'] === 'THIRD_PARTY' && el['origin'].includes(element['domain']) ? true :
                element['type'] === "THIRD_PARTY" && el['type'] === 'FIRST_PARTY' && element['origin'].includes(el['domain']) ? true :
                    el['selected'];
        return el;
    })
}

export function removeCookie(element, arr) {
    return arr.filter(el => el['domain'] !== element['domain']);
}


export function createArc(arr, radius) {
    const arcGenerator = d3
        .arc()
        .padAngle(0) //pad angle defines the distance between each arc
        .cornerRadius(4); //cornerRadius

    const arcs = d3.pie()(arr);

    const slices = arcs.map((d) => {
        const path = arcGenerator({
            startAngle: d.startAngle,
            endAngle: d.endAngle,
            innerRadius: radius,
            outerRadius: radius,
        });
        d['path'] = path;
        return d;
    })
    return slices;
}