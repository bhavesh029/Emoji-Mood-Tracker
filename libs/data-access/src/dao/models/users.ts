import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Moods, MoodsId } from './moods';
import type { UserSharing, UserSharingId } from './user-sharing';

export interface UsersAttributes {
  id: string;
  username: string;
  email: string;
  sharingEnabled?: boolean;
}

export type UsersPk = "id";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "sharingEnabled";
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  id!: string;
  username!: string;
  email!: string;
  sharingEnabled?: boolean;

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
  // Users hasMany UserSharing via userId
  userSharings!: UserSharing[];
  getUserSharings!: Sequelize.HasManyGetAssociationsMixin<UserSharing>;
  setUserSharings!: Sequelize.HasManySetAssociationsMixin<UserSharing, UserSharingId>;
  addUserSharing!: Sequelize.HasManyAddAssociationMixin<UserSharing, UserSharingId>;
  addUserSharings!: Sequelize.HasManyAddAssociationsMixin<UserSharing, UserSharingId>;
  createUserSharing!: Sequelize.HasManyCreateAssociationMixin<UserSharing>;
  removeUserSharing!: Sequelize.HasManyRemoveAssociationMixin<UserSharing, UserSharingId>;
  removeUserSharings!: Sequelize.HasManyRemoveAssociationsMixin<UserSharing, UserSharingId>;
  hasUserSharing!: Sequelize.HasManyHasAssociationMixin<UserSharing, UserSharingId>;
  hasUserSharings!: Sequelize.HasManyHasAssociationsMixin<UserSharing, UserSharingId>;
  countUserSharings!: Sequelize.HasManyCountAssociationsMixin;

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
    },
    sharingEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
      field: 'sharing_enabled'
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
