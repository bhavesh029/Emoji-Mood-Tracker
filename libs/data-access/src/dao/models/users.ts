import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Moods, MoodsId } from './moods';

export interface UsersAttributes {
  id: string;
  username: string;
  email: string;
}

export type UsersPk = "id";
export type UsersId = Users[UsersPk];
export type UsersCreationAttributes = UsersAttributes;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  id!: string;
  username!: string;
  email!: string;

  // Users hasMany Moods via userid
  moods!: Moods[];
  getMoods!: Sequelize.HasManyGetAssociationsMixin<Moods>;
  setMoods!: Sequelize.HasManySetAssociationsMixin<Moods, MoodsId>;
  addMood!: Sequelize.HasManyAddAssociationMixin<Moods, MoodsId>;
  addMoods!: Sequelize.HasManyAddAssociationsMixin<Moods, MoodsId>;
  createMood!: Sequelize.HasManyCreateAssociationMixin<Moods>;
  removeMood!: Sequelize.HasManyRemoveAssociationMixin<Moods, MoodsId>;
  removeMoods!: Sequelize.HasManyRemoveAssociationsMixin<Moods, MoodsId>;
  hasMood!: Sequelize.HasManyHasAssociationMixin<Moods, MoodsId>;
  hasMoods!: Sequelize.HasManyHasAssociationsMixin<Moods, MoodsId>;
  countMoods!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    return Users.init({
    id: {
      type: DataTypes.STRING(25),
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
