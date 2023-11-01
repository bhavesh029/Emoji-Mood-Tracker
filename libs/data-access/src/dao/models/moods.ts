import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Users, UsersId } from './users';

export interface MoodsAttributes {
  id: number;
  userid?: string;
  emoji: string;
  note?: string;
  timestamp: Date;
  updatedTimestamp: Date;
}

export type MoodsPk = "id";
export type MoodsId = Moods[MoodsPk];
export type MoodsOptionalAttributes = "id" | "userid" | "note";
export type MoodsCreationAttributes = Optional<MoodsAttributes, MoodsOptionalAttributes>;

export class Moods extends Model<MoodsAttributes, MoodsCreationAttributes> implements MoodsAttributes {
  id!: number;
  userid?: string;
  emoji!: string;
  note?: string;
  timestamp!: Date;
  updatedTimestamp!: Date;

  // Moods belongsTo Users via userid
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Moods {
    return Moods.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
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
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedTimestamp: {
      type: DataTypes.DATE,
      allowNull: false,
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
