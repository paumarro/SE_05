import { DataTypes } from 'sequelize'
import { sequalize } from '../../db'


 const Club_Member = sequalize.define('Club_Member', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  }
}); 

Club_Member.sync().then(() => {})
