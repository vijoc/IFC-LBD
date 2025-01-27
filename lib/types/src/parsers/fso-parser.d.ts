import { Parser } from "./parser";
import { JSONLD } from "../helpers/BaseDefinitions";
export declare class FSOParser extends Parser {
    doParse(): Promise<JSONLD | string>;
    /**
     * CLASS ASSIGNMENT
     */
    private classify;
    /**
     * RELATIONSHIP ASSIGNMENT
     */
    private portPort;
    private portComponent;
    private systemComponent;
    /**
     * PROPERTIES
     */
    private portFlowDirection;
    private portPlacements;
    /**
     * POST PROCESSING
     */
    private componentConections;
    private connectionInterfaces;
    private segmentLengths;
}
//# sourceMappingURL=fso-parser.d.ts.map