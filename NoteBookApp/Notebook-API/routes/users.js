const router = require("express").Router();
const User = require("../models/user");
const StudyGroup = require("../models/studyGroup");
const Note = require("../models/note");
const { Router } = require("express");
const Tag = require("../models/tag");

//POSTS
//POST A USER
router.post("/users", async (request, response, next) => {
  try {
    const user = await User.create(request.body);
    console.log(user);
    response.status(201).location(user.id).send();
  } catch (error) {
    next(error);
  }
});

//POST note to a user
router.post("/users/:userId/notes", async (request, response, next) => {
  try {
    const user = await User.findByPk(request.params.userId);
    if (user) {
      const note = await Note.create(request.body);
      user.addNote(note);
      await user.save();
      response.status(201).location(note.id).send();
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

//POST A USER TO A STUDYGROUP
router.post(
  "/studygroups/:studyGroupId/:userId",
  async (request, response, next) => {
    try {
      const studyGroup = await StudyGroup.findByPk(request.params.studyGroupId);
      if (studyGroup) {
        const user = await User.findByPk(request.params.userId);
        studyGroup.addUser(user);
        await studyGroup.save();
        response.status(201).location(user.id).send();
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

//POST A STUDYGROUP with it's creator as first member
router.post("/:userId/studygroups", async (request, response, next) => {
  try {
    const user = await User.findByPk(request.params.userId);
    if (user) {
      const studyGroup = await StudyGroup.create(request.body);
      studyGroup.addUser(user);
      await studyGroup.save();
      response.status(201).location(studyGroup.id).send();
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

//GETS
//GET all studygroups of a user
router.get("/:userId/studygroups", async (request, response, next) => {
  try {
    const user = await User.findByPk(request.params.userId);
    if (user) {
      const groups = await user.getStudygroups();
      if (groups.length > 0) {
        response.json(groups);
      } else {
        response.sendStatus(204);
      }
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});
//GET ALL USERS OF A STUDYGROUP
router.get(
  "/studygroups/:studyGroupId/users",
  async (request, response, next) => {
    try {
      const studyGroup = await StudyGroup.findByPk(request.params.studyGroupId);
      if (studyGroup) {
        const users = await studyGroup.getUsers();
        if (users.length > 0) {
          response.json(users);
        } else {
          response.sendStatus(204);
        }
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);
//GET ALL USERS
router.get("/users", async (request, response, next) => {
  try {
    const users = await User.findAll();
    if (users.length > 0) {
      response.json(users);
    } else {
      response.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
});

//GET A STUDYGROUP BY ID
router.get("/studygroups/:studyGroupId", async (request, response, next) => {
  try {
    const studyGroup = await StudyGroup.findByPk(request.params.studyGroupId);
    if (studyGroup) {
      response.json(studyGroup);
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
});

////////////////////////////////////////////////////////

// PUT a user
router.put("/users/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user) {
      await user.update(req.body);
      res.status(200).json({ message: "User updated" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

// PUT a user to a study group
router.put(
  "/studyGroups/:studyGroupId/users/:userId",
  async (req, res, next) => {
    try {
      const studyGroup = await StudyGroup.findByPk(req.params.studyGroupId);
      if (studyGroup) {
        const users = await studyGroup.getUsers({
          id: req.params.userId,
        });
        const user = users.shift();
        if (user) {
          await user.update(req.body);
          res.status(200).json({
            message: "User in study group updated",
          });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } else {
        res.status(404).json({ message: "Study group not found" });
      }
    } catch (error) {
      next(error);
    }
  }
);

// PUT a study group to a user
router.put(
  "/user/:userId/studyGroups/:studyGroupId",
  async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.userId);
      if (user) {
        const studyGroups = await user.getStudyGroups({
          id: req.params.studyGroupId,
        });
        const studyGroup = studyGroups.shift();
        if (studyGroup) {
          await studyGroup.update(req.body);
          res.status(200).json({
            message: "Study group of user updated",
          });
        } else {
          res.status(404).json({ message: "Study group not found" });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  }
);

// --------------------------------

// PUT a note to a user
router.put("/users/:userId/notes/:noteId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user) {
      const notes = await user.getNotes({ id: req.params.noteId });
      const note = notes.shift();
      if (note) {
        await note.update(req.body);
        res.status(200).json({ message: "Note for the user updated" });
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE a user
router.delete("/users/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user) {
      await user.destroy();
      res.status(200).json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE a user from a study group
router.delete(
  "/studyGroups/:studyGroupId/users/:userId",
  async (req, res, next) => {
    try {
      const studyGroup = await StudyGroup.findByPk(req.params.studyGroupId);
      if (studyGroup) {
        const users = await studyGroup.getUsers({
          id: req.params.userId,
        });
        const user = users.shift();
        if (user) {
          await user.destroy();
          res.status(200).json({
            message: "User in study group deleted",
          });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } else {
        res.status(404).json({ message: "Study group not found" });
      }
    } catch (error) {
      next(error);
    }
  }
);

// DELETE a study group from a user
router.delete(
  "/user/:userId/studyGroups/:studyGroupId",
  async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.userId);
      if (user) {
        const studyGroups = await user.getStudyGroups({
          id: req.params.studyGroupId,
        });
        const studyGroup = studyGroups.shift();
        if (studyGroup) {
          await studyGroup.destroy();
          res.status(200).json({
            message: "Study group of user deleted",
          });
        } else {
          res.status(404).json({ message: "Study group not found" });
        }
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      next(error);
    }
  }
);

// DELETE a note from a user
router.delete("/users/:userId/notes/:noteId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (res) {
      const notes = await user.getNotes({ id: req.params.noteId });
      const note = notes.shift();
      if (note) {
        await note.destroy();
        res.status(200).json({ message: "Note for the user deleted" });
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
