import Sequelize from 'sequelize';
import es_client from './es'

const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost:5432/postgres'
);

// console.log(sequelize);

const models = {
  col_stg: sequelize.import('./col_stg'),
  ES_Client: es_client,
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;