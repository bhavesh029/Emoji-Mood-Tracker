import { Moods } from "../dao/models/moods";
import { Users } from "../dao/models/users";

export interface MwTables {
  users?: typeof Users;
  moods?: typeof Moods;
}
