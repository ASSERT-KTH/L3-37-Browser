import { Container } from "inversify";
import DomParserService from "./services/dom.parser";


// Initialize DI/IoC container
const container = new Container();


container.bind(DomParserService).toSelf().inSingletonScope();

export { container };
