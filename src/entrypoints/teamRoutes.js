const express = require("express");
const router = express.Router();
const { createTeam, getAllTeams, getTeamById, updateTeam, deleteTeam } = require("../infrastructure/web/controllers/TeamController");
const upload = require("../infrastructure/storage/multerCloudinary");

router.post("/teams", upload.single("image"), createTeam);
router.get("/teams/:id", getTeamById );
router.put("/teams/:id", upload.single("image"), updateTeam);
router.get("/teams", getAllTeams);
router.delete("/teams/:id", deleteTeam);

module.exports = router;