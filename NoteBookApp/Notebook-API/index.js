// Express Initialisation
const express = require("express");
const app = express();
// Sequelize Initialisation
const sequelize = require("./sequelize");

//Routes Paths
const userRoute = require("./routes/users");
const noteRoute = require("./routes/notes");

// Import created models
const Note = require("./models/note");
const User = require("./models/user");
const Tag = require("./models/tag");
const Resource = require("./models/resource");
const StudyGroup = require("./models/studyGroup");

// Define entities relationship
User.belongsToMany(Note, { through: "sharedFile" });
Note.belongsToMany(User, { through: "sharedFile" });
User.belongsToMany(StudyGroup, { through: "groupEntry" });
StudyGroup.belongsToMany(User, { through: "groupEntry" });
Note.belongsToMany(Tag, { through: "tagEntry" });
Tag.belongsToMany(Note, { through: "tagEntry" });
Note.hasMany(Resource);

// Middlewares
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use((error, request, response, next) => {
  console.error(`[ERROR]: ${error}`);
  response.status(500).json(error);
});
app.use("/api", userRoute);
app.use("/api", noteRoute);

// Kickstart the Express aplication
app.listen(7777, async () => {
  console.log("The server has started successfully");
  try {
    await sequelize.authenticate();
    console.log("Connected successfully to the database");
  } catch {
    console.log("Unable to connect to the database");
  }
});

app.put("/", async (request, response, next) => {
  try {
    await sequelize.sync({ force: true });
    response.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
