import type { Sequelize } from "sequelize";
import { Moods as _Moods } from "./moods";
import type { MoodsAttributes, MoodsCreationAttributes } from "./moods";
import { Users as _Users } from "./users";
import type { UsersAttributes, UsersCreationAttributes } from "./users";

export {
  _Moods as Moods,
  _Users as Users,
};

export type {
  MoodsAttributes,
  MoodsCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Moods = _Moods.initModel(sequelize);
  const Users = _Users.initModel(sequelize);

  Moods.belongsTo(Users, { as: "user", foreignKey: "userid"});
  Users.hasMany(Moods, { as: "moods", foreignKey: "userid"});

  return {
    Moods: Moods,
    Users: Users,
  };
}
