import { DataTypes, Model } from "sequelize";
import * as Sequelize from 'sequelize';

export interface UserAtributes{
    id: number, 
    username: string
    email: string,
}

interface UserAtributesCreator extends Omit<UserAtributes, 'id'>{};

export interface DbModelType{
  initModel(sequelize: Sequelize.Sequelize): any
}

export class UserModel extends Model<UserAtributes, UserAtributesCreator> implements UserAtributes{
    public id!: number; 
    public username!: string;
    public email!: string;
  
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initModel(sequelize: Sequelize.Sequelize): typeof UserModel{
        return UserModel.init(
            {
              id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
              },
              username: {
                type: new DataTypes.STRING(128),
                allowNull: false,
              },
              email: {
                type: new DataTypes.STRING(128),
                allowNull: false,
              },
            },
            {
              sequelize,
              tableName: 'users',
            }
          );
    }
}