
import * as d3 from 'd3';

export function getLayout(r, wd, he, pd) {
    const layout = d3.partition().size([wd, he]).padding(pd);
    layout(r);
}

export function getHierarchy(r) {
    const root = d3.hierarchy(r);
    root.sum(function (d) {
        return d.name === "div" || d.name === "#text" || d.name === '#document' || d.name === "div" ? 0 : 1;
    });
    return root;
}


