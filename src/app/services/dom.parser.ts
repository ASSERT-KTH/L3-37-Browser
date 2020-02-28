import { injectable } from "inversify";
import 'reflect-metadata';
//import reqp from 'request-promise'
import parse from 'parse5';

const electron = (window as any).require('electron');
const reqp = electron.remote.require('request-promise');

@injectable()
export default class DomParserService {

    structureFromDOM = (tree) => {
        let result = { name: tree.nodeName, children: [] };
        if (tree.childNodes) {
            //TODO: Optimize later
            result.children = tree.childNodes.map(this.structureFromDOM);

        }
        return result;
    }

    structureFromHTML = (html) => {
        let tree = parse.parse(html);
        return this.structureFromDOM(tree);
    }

    public getContent(path): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            if (path) {
                reqp(path).then((content) => {
                    resolve(content)
                })
                    .catch(err => reject(err))
            }
        });
    }

    public getTree(path): Promise<any> {

        return new Promise<any>((resolve, reject) => {

            if (path) {
                reqp(path).then((content) => {
                    const tree = this.structureFromHTML(content);
                    resolve(tree)
                }
                ).catch(err => {
                    reject(err)
                });
            }

        });
    }

}