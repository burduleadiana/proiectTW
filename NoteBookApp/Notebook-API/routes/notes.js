const router = require("express").Router();
const Note = require("../models/note");
const Resource = require("../models/resource");
const Tag = require("../models/tag");
const User = require("../models/user");

//GETS
//GET all notes from a user
router.get("/notes/:userId/notes", async (request, response, next) => {
    try {
        const user = await User.findByPk(request.params.userId);
        if (user) {
            const notes = await user.getNotes();
            if (notes.length > 0) {
                response.json(notes);
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

//GET all tags of a note
router.get("/notes/:noteId/tags", async (request, response, next) => {
    try {
        const note = await Note.findByPk(request.params.noteId);
        if (note) {
            const tags = await note.getTags();
            if (tags.length > 0) {
                response.json(tags);
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

//GETS
//GET ALL RESOURCES of a note
router.get("/notes/:noteId/resources", async (request, response, next) => {
    try {
        const note = await Note.findByPk(request.params.noteId);
        if (note) {
            const resources = await note.getResources();
            if (resources.length > 0) {
                response.json(resources);
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

//POSTS
//POST a tag to a note
router.post("/notes/:noteId/tags", async (request, response, next) => {
    try {
        const note = await Note.findByPk(request.params.noteId);
        if (note) {
            const tag = await Tag.create(request.body);
            note.addTag(tag);
            await note.save();
            response.status(201).location(tag.id).send();
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});

//POST a resource to a note
router.post("/notes/:noteId/resources", async (request, response, next) => {
    try {
        const note = await Note.findByPk(request.params.noteId);
        if (note) {
            const resource = await Resource.create(request.body);
            note.addResource(resource);
            await note.save();
            response.status(201).location(resource.id).send();
        } else {
            response.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});

////////////////////////////////////////

// PUT a tag to a note
router.put(
    "/users/:userId/notes/:noteId/tags/:tagId",
    async (req, res, next) => {
        try {
            const user = await User.findByPk(req.params.userId);
            if (user) {
                const notes = await User.getNotes({ id: req.params.noteId });
                const note = notes.shift();
                if (note) {
                    const tags = await note.getTags({ id: req.params.tagId });
                    const tag = tags.shift();
                    if (tag) {
                        await tag.update(req.body);
                        res.status(200).json({
                            message: "Tag for the note updated",
                        });
                    } else {
                        res.status(404).json({ message: "Tag not found" });
                    }
                } else {
                    res.status(404).json({ message: "Note not found" });
                }
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            next(error);
        }
    }
);

// PUT a resource to a note
router.put(
    "/users/:userId/notes/:noteId/resources/:resourceId",
    async (req, res, next) => {
        try {
            const user = await User.findByPk(req.params.userId);
            if (user) {
                const notes = await User.getNotes({ id: req.params.noteId });
                const note = notes.shift();
                if (note) {
                    const resources = await note.getResources({
                        id: req.params.resourceId,
                    });
                    const resource = resources.shift();
                    if (resource) {
                        await resource.update(req.body);
                        res.status(200).json({
                            message: "Resource for the note updated",
                        });
                    } else {
                        res.status(404).json({ message: "Resource not found" });
                    }
                } else {
                    res.status(404).json({ message: "Note not found" });
                }
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            next(error);
        }
    }
);

// DELETE a tag from a note
router.delete(
    "/users/:userId/notes/:noteId/tags/:tagId",
    async (req, res, next) => {
        try {
            const user = await User.findByPk(req.params.userId);
            if (user) {
                const notes = await User.getNotes({ id: req.params.noteId });
                const note = notes.shift();
                if (note) {
                    const tags = await note.getTags({ id: req.params.tagId });
                    const tag = tags.shift();
                    if (tag) {
                        await tag.destroy();
                        res.status(200).json({
                            message: "Tag for the note deleted",
                        });
                    } else {
                        res.status(404).json({ message: "Tag not found" });
                    }
                } else {
                    res.status(404).json({ message: "Note not found" });
                }
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            next(error);
        }
    }
);

// DELETE a resource from a note
router.delete(
    "/users/:userId/notes/:noteId/resources/:resourceId",
    async (req, res, next) => {
        try {
            const user = await User.findByPk(req.params.userId);
            if (user) {
                const notes = await User.getNotes({ id: req.params.noteId });
                const note = notes.shift();
                if (note) {
                    const resources = await note.getResources({
                        id: req.params.resourceId,
                    });
                    const resource = resources.shift();
                    if (resource) {
                        await resource.destroy();
                        res.status(200).json({
                            message: "Resource for the note deleted",
                        });
                    } else {
                        res.status(404).json({ message: "Resource not found" });
                    }
                } else {
                    res.status(404).json({ message: "Note not found" });
                }
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
