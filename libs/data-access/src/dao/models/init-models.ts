import type { Sequelize } from "sequelize";
import { Moods as _Moods } from "./moods";
import type { MoodsAttributes, MoodsCreationAttributes } from "./moods";
import { UserSharing as _UserSharing } from "./user-sharing";
import type { UserSharingAttributes, UserSharingCreationAttributes } from "./user-sharing";
import { Users as _Users } from "./users";
import type { UsersAttributes, UsersCreationAttributes } from "./users";

export {
  _Moods as Moods,
  _UserSharing as UserSharing,
  _Users as Users,
};

export type {
  MoodsAttributes,
  MoodsCreationAttributes,
  UserSharingAttributes,
  UserSharingCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Moods = _Moods.initModel(sequelize);
  const UserSharing = _UserSharing.initModel(sequelize);
  const Users = _Users.initModel(sequelize);

  Moods.belongsTo(Users, { as: "user", foreignKey: "userid"});
  Users.hasMany(Moods, { as: "moods", foreignKey: "userid"});
  UserSharing.belongsTo(Users, { as: "user", foreignKey: "userId"});
  Users.hasMany(UserSharing, { as: "userSharings", foreignKey: "userId"});

  return {
    Moods: Moods,
    UserSharing: UserSharing,
    Users: Users,
  };
}
