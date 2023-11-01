import { routesAuthzValidator } from "../authz/routes-authz-validator";

export function validateRoutesSetup(controllers: string[]) {
  const validators = [routesAuthzValidator];
  validators.forEach((v) => v.validate(controllers));
}
