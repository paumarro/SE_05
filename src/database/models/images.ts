import { DataTypes } from 'sequelize'
import { sequalize } from '../db'


export const Image = sequalize.define('Image', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  url: { 
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  description: {
    type: DataTypes.TEXT, 
    allowNull: true,
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


Image.sync().then(() => {})

export default Image
