import {
  loadClassFromFile,
  importClassesFromDirectories,
} from "../../utils/fs-utils";
import { RestrictedBaseController } from "../controllers/restricted-base-controller";
import * as fs from "fs";
import { RoutesSetupValidator } from "../validator/routes-setup-validator";
import { SkipFile } from "../validator/constants/validate-constants";
import { BaseController } from "../controllers/base-controller";

class RoutesAuthzValidator extends RoutesSetupValidator {
  validate(controllers: string[]) {
    return importClassesFromDirectories(controllers).then((files) =>
      files.filter(filterFiles).map((x) => {
        const controller = loadClassFromFile<BaseController>(x);
        console.log(`Validating Controller ${x}`);
      })
    );
  }
}
function filterFiles(x: string): boolean {
  const data = fs.readFileSync(x);
  const validFile = !data.toString().includes(SkipFile);
  if (!validFile) {
    console.log(`skipping file ${x}`);
  }
  return validFile;
}

export const routesAuthzValidator = new RoutesAuthzValidator();
