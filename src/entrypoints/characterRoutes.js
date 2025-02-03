const express = require("express");
const router = express.Router();
const { getAllCharacters, createCharacter, updateCharacter, deleteCharacter, getCharacterById} = require("../infrastructure/web/controllers/CharacterController");
const upload = require("../infrastructure/storage/multerCloudinary");

router.post("/characters", upload.single("image"), createCharacter);
router.get("/characters/:id",getCharacterById );
router.put("/characters/:id", upload.single("image"), updateCharacter);
router.get("/characters", getAllCharacters);
router.delete("/characters/:id", deleteCharacter)



module.exports = router;