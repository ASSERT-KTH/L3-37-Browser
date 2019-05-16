import { injectable } from "inversify";
import 'reflect-metadata';
//import reqp from 'request-promise'

//const electron = (window as any).require('electron');
//const parser = electron.remote.require('node-html-parser');


@injectable()
export default class DomQueryService{

    getLinks(content: string): Promise<string>{
        return new Promise<string>((resolve, reject) => {

            /*const dom = parser.parse(content)

            const hrefs = dom.querySelectorAll("a");
            console.log(hrefs)

            //console.log(hrefs)

            resolve(hrefs);*/
        })
    }

}