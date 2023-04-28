import { DataTypes } from 'sequelize'
import { sequalize } from '../db'

import Club from '../models/clubs'
import Event from '../models/events'
import Image from '../models/images'
import { MemberEvent } from './bridge_models/members_event';
import Address from './addresses'
import { Role } from './roles'



export const Member = sequalize.define('Member', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_of_entry: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true 
  },
  gender: {
    type: DataTypes.CHAR(1),
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  addressId: {                    
    type: DataTypes.INTEGER,
    allowNull: true
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  clubId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  imageId: {
    type: DataTypes.INTEGER,
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


//Drawing many to many relationships
//This already added the fk ids to the bridge table (Club_Member)
Member.belongsToMany(Club, {
  through: "ClubMember"
});

Club.belongsToMany(Member, {
  through: "ClubMember"
});

Member.belongsToMany(Event, {
  through: MemberEvent,
  as: "events", 
  foreignKey: "memberId"
});

Event.belongsToMany(Member, {
  through: MemberEvent, 
  as: "members",
  foreignKey: "eventId"
});

Member.belongsTo(Image, {
  targetKey: "id",
  foreignKey: "imageId",
  as: "image"
});
 
Image.hasMany(Member, {
  sourceKey: "id",
  foreignKey: "imageId",
  as: "member"  
});  

Address.hasMany(Member, {
  sourceKey: "id",
  foreignKey: "addressId",
  as: "members"
})

Member.belongsTo(Address, {
  targetKey: "id",
  foreignKey: "addressId",
  as: "address"
})

Role.hasMany(Member, {
  sourceKey: "id",
  foreignKey: "roleId",
  as: "members"
})

Member.belongsTo(Role, {
  targetKey: "id",
  foreignKey: "roleId",
  as: "role"
})


Member.sync().then(() => {})

export default Member




// Add test Comedy Club and Comedian
async function createTestData() {
  const testComedyClub = {
  name: 'Test Comedy Club',
  description: 'A test comedy club for stand-up comedians.',
  };
  
  const testMember = {
  first_name: 'Test',
  last_name: 'Testman',
  email: 'testman@example.com',
  addressId: 1, 
  roleId: 3,
  clubId: 1,
  };
  
  const [clubInstance, clubCreated]: any = await Club.findOrCreate({
  where: { name: testComedyClub.name },
  defaults: testComedyClub,
  });
  
  if (clubCreated) {
  console.log("Club ${testComedyClub.name} created.");
  }
  
  const [memberInstance, memberCreated] = await Member.findOrCreate({
  where: { email: testMember.email },
  defaults: {
  ...testMember,
  clubId: clubInstance.id,
  },
  });
  
  if (memberCreated) {
  console.log("Member ${testMember.first_name} ${testMember.last_name} created.");
  }
  }
  
  createTestData();