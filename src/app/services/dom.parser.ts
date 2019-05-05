import { injectable } from "inversify";
import 'reflect-metadata';

@injectable()
export default class DomParserService{

    public getTree(): Promise<any>{
        return new Promise<any>((resolve, reject) => {
            resolve(true);
        });
    }

}