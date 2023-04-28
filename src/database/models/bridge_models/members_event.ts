import { DataTypes } from 'sequelize'
import { sequalize } from '../../db'


export const MemberEvent: any = sequalize.define('MemberEvent', {
  memberId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  eventId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
});

MemberEvent.sync().then(() => {})
