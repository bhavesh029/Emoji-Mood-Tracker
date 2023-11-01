import { Moods } from "../dao/models/moods";
import { UserSharing } from "../dao/models/user-sharing";
import { Users } from "../dao/models/users";

export interface MwTables {
  users?: typeof Users;
  moods?: typeof Moods;
  userSharing?: typeof UserSharing;
}
