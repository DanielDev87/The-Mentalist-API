const express = require("express");
const router = express.Router();
const { getAllActors, createActor } = require("../infrastructure/web/controllers/ActorController");
const upload = require("../infrastructure/storage/multerCloudinary");

router.post("/actors", upload.single("image"), createActor);

router.get("/actors", getAllActors);




module.exports = router;