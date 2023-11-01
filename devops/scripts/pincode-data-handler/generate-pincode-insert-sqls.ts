import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse";
import * as _ from "lodash";
import {
  createPincodess,
  getConnectionDbCtx,
  prepareTestDbCtx,
} from "@emojiTracker-js/data-access";

type PincodeData = {
  Pincode: string;
  District: string;
  StateName: string;
  OfficeType: string;
  OfficeName: string;
};

export interface Pincodes {
  id?: number;
  pincode: string;
  districtName: string;
  stateName: string;
}

async function readPincodesCsv() {
  const pincodeDir: string = process.cwd();
  const pincodeFilePath: string =
    pincodeDir + "/scripts/pincode-data-handler/Pincode_30052019.csv";
  console.log(`cwd is ${pincodeDir}`);
  console.log(`pincodeFilePath is ${pincodeFilePath}`);
  const headers = [
    "Circle Name",
    "Region Name",
    "Division Name",
    "Office Name",
    "Pincode",
    "OfficeType",
    "Delivery",
    "District",
    "StateName",
  ];

  const fileContent = fs.readFileSync(pincodeFilePath, { encoding: "utf-8" });

  var pincodes: PincodeData[] = [];

  const a = await parse(
    fileContent,
    {
      delimiter: ",",
      columns: true,
    },
    (error, result) => {
      if (error) {
        console.error(error);
      }
      console.log(
        "result is ",
        result.slice(0, 5).map((e) => e)
      );
      pincodes = result;
      const rseultParsed: PincodeData[] = result.map((e) => {
        // console.log(e['Office Name']);
        let rs: PincodeData = {
          Pincode: e["Pincode"],
          District: e["District"],
          StateName: e["StateName"],
          OfficeType: e["OfficeType"],
          OfficeName: e["Office Name"],
        };
        return rs;
      });

      // console.log('result parsed is ', rseultParsed);
      processPincodes(rseultParsed);
    }
  );

  // console.log(
  //   'Result',
  //   fileContent.replaceAll('\r', '').split('\n').slice(0, 5)
  // );
}

function processPincodes(pincodes: PincodeData[]) {
  const a: _.Dictionary<PincodeData[]> = _.groupBy(pincodes, "OfficeType");

  // console.log('keys are ', a)

  let pincodeMap = new Map<string, Pincodes>();

  //HO,SO,BO
  const hos: PincodeData[] = a["HO"] || [];
  const sos: PincodeData[] = a["SO"] || [];
  const bos: PincodeData[] = a["BO"] || [];
  // console.log('value is', hos);

  hos.forEach((ho) => {
    const pinInfo: Pincodes = {
      pincode: ho.Pincode,
      districtName: ho.OfficeName.replaceAll("H.O", "").trim(),
      stateName: ho.StateName,
    };
    if (!pincodeMap.has(ho.Pincode)) {
      pincodeMap.set(ho.Pincode, pinInfo);
    }
  });

  sos.forEach((so) => {
    const pinInfo: Pincodes = {
      pincode: so.Pincode,
      districtName: so.OfficeName.replaceAll("S.O", "").trim(),
      stateName: so.StateName,
    };
    if (!pincodeMap.has(so.Pincode)) {
      pincodeMap.set(so.Pincode, pinInfo);
    }
  });

  bos.forEach((bo) => {
    const pinInfo: Pincodes = {
      pincode: bo.Pincode,
      districtName: bo.OfficeName.replaceAll("B.O", "").trim(),
      stateName: bo.StateName,
    };
    if (!pincodeMap.has(bo.Pincode)) {
      pincodeMap.set(bo.Pincode, pinInfo);
    }
  });

  console.log("map size is ", pincodeMap.size);

  const data: Pincodes[] = Array.from(pincodeMap.values());
  // console.log('map is ', data);

  dumpPincodesData(data);
}

async function dumpPincodesData(data: Pincodes[]) {
  const mwCtx = await getCtx();

  mwCtx.mwDbCtx.tables!.pincodes!.bulkCreate(data);
}

function getCtx() {
  return getConnectionDbCtx().then((dbCtx) => prepareTestDbCtx(dbCtx));
}

function updateMap(
  pincodeMap: Map<string, Pincodes>,
  pincode: string,
  pinInfo: Pincodes
) {
  if (!pincodeMap.has(pincode)) {
    pincodeMap.set(pincode, pinInfo);
  }
}

readPincodesCsv();
