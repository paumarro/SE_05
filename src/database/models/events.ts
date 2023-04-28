import { DataTypes } from 'sequelize'
import { sequalize } from '../db'
import Address from './addresses';
import Club from './clubs';
import Image from './images';

export const Event = sequalize.define('Event', {
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
    allowNull: true,
  },
  is_public: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  start_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  entry_fee: {
    type: DataTypes.DECIMAL,
    allowNull: true,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  clubId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  addressId:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  imageId:{
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


//Drawing a one-to-many relationship from Club to Event 
Event.belongsTo(Club, {
  targetKey: "id",
  foreignKey: "clubId",
  as: "club"
}); 

Club.hasMany(Event, {
  sourceKey: "id",
  foreignKey: "clubId",
  as: "events",
});

//Drawing a one-to-many relationship from Address to Event 
Address.hasMany(Event, {
  sourceKey: "id",
  foreignKey: "addressId",
  as: "events"   
});

Event.belongsTo(Address, {
  targetKey: "id",
  foreignKey: "addressId",
  as: "address" 
});

Image.hasMany(Event, {
  sourceKey: "id",
  foreignKey: "imageId",
  as: "events"
});
  
Event.belongsTo(Image, {
  targetKey: "id",
  foreignKey: "imageId",
  as: "image"
});  

 
Event.sync().then(() => {})

export default Event 