import { Container } from "inversify";
import DomParserService from "./services/dom.parser";
import DomQueryService from "./services/dom.query";


// Initialize DI/IoC container
const container = new Container();


container.bind(DomParserService).toSelf().inSingletonScope();
container.bind(DomQueryService).toSelf();

export { container };
