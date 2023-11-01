// @ts-nocheck
import { getCtrlCtx } from "@emojiTracker-js/data-access";
import * as fs from "fs";

async function updateVersionInfo() {
  const envTypeArg = process.argv;
  const envs: string[] = envTypeArg[3].split(",").map((x) => x.trim());
  console.log(`Your Environment Type is: ${envs}`);
  const filePath = `libs/data-access/src/context/data/ctrl-ctx.ts`;
  const file = fs.createWriteStream(filePath);
  file.write(
    `
    import { ControllerContext } from '../controller-context';

    export const ctrlCtxMap = new Map<string, ControllerContext>();
    `
  );

  console.log(`Envirements` + envs);
  for (const env of envs) {
    await getCtrlCtx(env)
      .then((ctrlCtx) => {
        const envVarName = env.replaceAll("-", "_");
        console.log(`ctrlCtx ${env} ####\n`, ctrlCtx);
        const ctrlCtxStr = JSON.stringify(ctrlCtx, null, "\t");
        const constName = `${envVarName}CtrlCtxVal`;
        file.write(`
    export const ${constName} = ${ctrlCtxStr}\n`);
        const mapSetString = `
    ctrlCtxMap.set('${env}', ${constName});\n`;
        file.write(mapSetString);
        return;
      })
      .catch((err) => console.error(err));
  }
}

updateVersionInfo();
