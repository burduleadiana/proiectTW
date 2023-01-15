const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./sqlite/data.db",
});

//sequelize.sync({alter:true}).then(()=>{
//  console.log("All models have been syncronized successfully!");
//})

module.exports = sequelize;
