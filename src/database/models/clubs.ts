import { DataTypes } from 'sequelize'
import { sequalize } from '../db'
import Image from './images';

export const Club = sequalize.define('Club', { 
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {  
    type: DataTypes.STRING,
    allowNull: false,
  }, 
  description: { 
    type: DataTypes.TEXT, 
    allowNull: false,
  },
  imageId: {
    type:DataTypes.INTEGER,
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

Club.belongsTo(Image, {
  targetKey: "id",
  foreignKey: "imageId",
  as: "image"
});

Image.hasOne(Club, {
  sourceKey: "id", 
  foreignKey: "imageId",
  as: "club"  
});


Club.sync().then(() => {})

export default Club