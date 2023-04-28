import { DataTypes } from 'sequelize';
import { sequalize } from '../db';

export const Role = sequalize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

const initialRoles = [
  {
    name: 'Regular',
    description: 'Basic access.',
  },
  {
    name: 'Treasurer',
    description: 'Access to upcoming financial features.',
  },
  {
    name: 'Manager',
    description: 'Full access. Privilege to CRUD Members and Events.',
  },
];

async function initializeRoles() {
  await Role.sync();

  for (const role of initialRoles) {
    const [instance, created] = await Role.findOrCreate({
      where: { name: role.name },
      defaults: role,
    });

    if (created) {
      console.log(`Role "${role.name}" created.`);
    }
  }
}

initializeRoles();