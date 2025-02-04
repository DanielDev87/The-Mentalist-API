const AppDataSource = require("../../../infrastructure/db/data-source");
const Actor = require("../../../domain/Actor");
const upload = require("../../storage/multerCloudinary");
const ActorRepository = require("../../../infrastructure/db/repositories/ActorRepository");
const ActorUseCase = require("../../../application/ActorUseCase");


const createActor = async (req, res) => {
    try {
      const { name, bio, birthdate, character_id } = req.body;
      const imageUrl = req.file ? req.file.path : null;
  
      const repository = new ActorRepository(AppDataSource);
      const useCase = new ActorUseCase(repository);
  
      const newActor = await useCase.createActor({ name, bio, birthdate, imageUrl, character_id });
      res.status(201).json(newActor);
    } catch (error) {
      console.error("Error al crear el actor:", error);
      res.status(500).json({ error: "Error al crear el actor" });
    }
  };

const getAllActors = async (req, res) => {
  try {
    const repository = AppDataSource.getRepository(Actor);
    const actors = await repository.find({ relations: ["characters"] });
    res.json(actors);
  } catch (error) {
    res.status(500).json({ "Error al obtener los actores": error.message });
  }
};

module.exports = { createActor, getAllActors };
