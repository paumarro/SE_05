import { DataTypes } from 'sequelize';
import { sequalize } from '../db';


export const Address = sequalize.define('Address', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  post_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  street_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  street_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  floor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  apartment: {
    type: DataTypes.STRING,
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

Address.sync().then(() => {});

export default Address;


//Test
async function createTestAddress() {
  const testAddress = {
    post_code: '12345',
    country: 'Testland',
    street_name: 'Test Street',
    street_number: 42,
    floor: '1',
    apartment: 'A',
  };

  const [addressInstance, addressCreated] = await Address.findOrCreate({
    where: { post_code: testAddress.post_code, street_number: testAddress.street_number },
    defaults: testAddress,
  });

  if (addressCreated) {
    console.log(`Address "${testAddress.street_name} ${testAddress.street_number}" created.`);
  }
}

createTestAddress();