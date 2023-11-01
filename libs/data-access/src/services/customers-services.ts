import { DbContext } from "@emojiTracker/blackhole-common";
import { getCustomerNameAndPhoneNoDao } from "../dao/customers";
import { CustomerNamePhoneNoBody } from "./models/customer-name-phone-no-body";

export function getCustomerNameAndPhoneNo(ctx: DbContext, customerId: string) {
  return getCustomerNameAndPhoneNoDao(ctx, customerId).then((obj) => {
    const res: CustomerNamePhoneNoBody = {
      phoneNo: obj["phone_number"],
      fullName: obj["full_name"],
    };
    return res;
  });
}
