export function checkAadhaarNumber(aadhaarId: string) {
  return aadhaarId.match('^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$');
}
