'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

if (fs.existsSync('.env')) {
    require('dotenv').config({path: '.env'});
}

const db = {};
const Op = Sequelize.Op;

// LB
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;
const db_Dialect = process.env.DB_DIALECT;

let sequelize = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    dialect: db_Dialect,
    operatorsAliases: Op,
    pool: {
        max: 10,
        min: 1,
        idle: 1,
        acquire: 20000
    },
    logging: false
});

//Test code for DB connection
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// console.log(sequelize)
// if model change, uncomment the follow code
sequelize.sync({alter: true,
    logging:true}).then( status => {
    if (status) console.log(status.models);


}).catch(error => console.log(error));


// --- READING and IMPORTING all MODELS  ---- //

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        var model = sequelize['import'](path.join('../models', file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;