import * as d3 from 'd3';
import moment from 'moment';

export function getMinMax(arr, key) {
    const min = d3.min(arr, d => d[key])
    const max = d3.max(arr, d => d[key])
    return { min: min, max: max };
}

export function truncateString(nString, useWordBoundary) {
    if (useWordBoundary >= nString.length) { return nString }
    return nString.substr(0, useWordBoundary) + "...";
}

export function getTwoToneColor(type, lengh, opacityLimit, element) {
    const grayColors = { min: "#d3d3d3", max: "#4f4f4f" };
    // const orange = { min: "ffd9b3", max: "#347ecb" }

    var range = d3.scaleLinear().domain([opacityLimit.min, opacityLimit.max]).range([0, 100])

    const interpol = d3.interpolateRgb(grayColors.min, grayColors.max);
    const color = interpol(range(element['expirationDate']))

    const dcolor = d3.color(color)
    return "#" + fullColorHex(dcolor['r'], dcolor['g'], dcolor['b'])
}

export function getDateViz(eDate, size, limit) {
    const today = moment();
    const elDate = moment(eDate)

    if (today > elDate) {
        const min = new Date(limit.min * 1000);
        const rangeExpired = d3.scaleLinear().domain([min, new Date()]).range([0, size / 2]);
        return { type: "EXPIRED", value: rangeExpired(new Date(eDate)) }
    } else {

        const max = new Date(limit.max * 1000)
        const rangeLive = d3.scaleLinear().domain([new Date(), max]).range([0, size / 2]);
        return { type: "LIVE", value: rangeLive(new Date(eDate)) }
    }
}

export function getLifespan(opacityLimit, expirationDate) {
    const range = d3.scaleLinear().domain([opacityLimit.min, opacityLimit.max]).range([0.1, 1])
    return range(expirationDate)
}

function fullColorHex(r, g, b) {
    const red = rgbToHex(r);
    const green = rgbToHex(g);
    const blue = rgbToHex(b);
    return red + green + blue;

}
function rgbToHex(rgb) {
    let hex = Number(rgb).toString(16);
    if (hex.length < 2) {
        hex = "0" + hex;
    }
    return hex;
};

export function cleanURL(url) {
    return url.replace(/^(\.)?/i, '')
        .replace(/(https?:\/\/)?/i, '')
        .replace(/(www.)?/i, '')
        .replace(/^(\.)?/i, '');
}

export function trimString(s, n) {
    return s.length > n ? s.substring(0, n) + "..." : s;
}
export default {
    getMinMax,
    getDateViz,
}