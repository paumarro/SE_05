import { DataTypes } from 'sequelize'
import { sequalize } from '../db'
import Member from './members';

export const User = sequalize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }, 
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }, 
    createdAt: {
      type: DataTypes.DATE, 
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW 
    }
  });

  
  Member.hasOne(User, { foreignKey: 'memberId' });
  User.belongsTo(Member, { foreignKey: 'memberId' });

User.sync().then(() => {}) 
 