import "babel-polyfill";
import { readFile } from "fs";
import * as util from "util";
const readFileP = util.promisify(readFile);
import * as path from 'path';
import * as WebIFC from "web-ifc/web-ifc-api.js";
import { LBDParser } from "../src";     // For development
// import { LBDParser } from "../lib/bundles/bundle.esm";   // For testing the bundle
import { toRDF } from 'jsonld';

const mepModelPath = path.join(__dirname, './artifacts/MEP.ifc');
let mepModelData;

beforeAll(async () => {
    mepModelData = await readFileP(mepModelPath);
})

describe('FSO', () => {

    test('can parse MEP model', async () => {

        // Init API and load model
        const ifcApi = new WebIFC.IfcAPI();
        await ifcApi.Init();
        const modelID = ifcApi.OpenModel(mepModelData);

        // Init LBD Parser and parse FSO
        const lbdParser = new LBDParser();
        const fso: any = await lbdParser.parseFSOTriples(ifcApi, modelID);

        // Close the model, all memory is freed
        ifcApi.CloseModel(modelID);
        
        // Get all RDF triples from returned JSON-LD object
        const rdf: any = await toRDF(fso);
        const tripleCount = rdf.length;

        // // Print lengths
        // rdf.forEach(triple => {
        //     if(triple.predicate.value == "https://example.com/length"){
        //         console.log(triple);
        //     }
        // })

        // Evaluate
        expect(Array.isArray(fso["@graph"])).toBe(true);
        expect(fso["@graph"].length).toBe(605);
        expect(Array.isArray(rdf)).toBe(true);
        expect(tripleCount).toBe(3198);

    });

});