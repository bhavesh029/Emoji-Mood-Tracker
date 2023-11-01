import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Users, UsersId } from './users';

export interface UserSharingAttributes {
  id: number;
  userId?: string;
  sharedHash?: string;
  createdTimestamp: Date;
}

export type UserSharingPk = "id";
export type UserSharingId = UserSharing[UserSharingPk];
export type UserSharingOptionalAttributes = "id" | "userId" | "sharedHash" | "createdTimestamp";
export type UserSharingCreationAttributes = Optional<UserSharingAttributes, UserSharingOptionalAttributes>;

export class UserSharing extends Model<UserSharingAttributes, UserSharingCreationAttributes> implements UserSharingAttributes {
  id!: number;
  userId?: string;
  sharedHash?: string;
  createdTimestamp!: Date;

  // UserSharing belongsTo Users via userId
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof UserSharing {
    return UserSharing.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      field: 'user_id'
    },
    sharedHash: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'shared_hash'
    },
    createdTimestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE'),
      field: 'created_timestamp'
    }
  }, {
    sequelize,
    tableName: 'user_sharing',
    timestamps: false,
    indexes: [
      {
        name: "user_sharing_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
