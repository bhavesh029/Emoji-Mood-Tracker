import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Users, UsersId } from './users';

export interface MoodsAttributes {
  id: string;
  userid?: string;
  emoji: string;
  note?: string;
  createdTimestamp: Date;
  updatedTimestamp: Date;
}

export type MoodsPk = "id";
export type MoodsId = Moods[MoodsPk];
export type MoodsOptionalAttributes = "userid" | "note" | "createdTimestamp" | "updatedTimestamp";
export type MoodsCreationAttributes = Optional<MoodsAttributes, MoodsOptionalAttributes>;

export class Moods extends Model<MoodsAttributes, MoodsCreationAttributes> implements MoodsAttributes {
  id!: string;
  userid?: string;
  emoji!: string;
  note?: string;
  createdTimestamp!: Date;
  updatedTimestamp!: Date;

  // Moods belongsTo Users via userid
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Moods {
    return Moods.init({
    id: {
      type: DataTypes.STRING(25),
      allowNull: false,
      primaryKey: true
    },
    userid: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    emoji: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdTimestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE'),
      field: 'created_timestamp'
    },
    updatedTimestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_DATE'),
      field: 'updated_timestamp'
    }
  }, {
    sequelize,
    tableName: 'moods',
    timestamps: false,
    indexes: [
      {
        name: "moods_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
