const AppDataSource = require("../../../infrastructure/db/data-source");
const Character = require("../../../domain/Character");
const upload = require("../../storage/multerCloudinary");
const CharacterRepository = require("../../../infrastructure/db/repositories/CharacterRepository");
const CharacterUseCase = require("../../../application/CharacterUseCase");

const createCharacter = async (req, res) => {
  try {
    const { name, description, teamId } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const repository = new CharacterRepository(AppDataSource);
    const useCase = new CharacterUseCase(repository);

    const newCharacter = await useCase.createCharacter({ name, description, imageUrl, team: teamId ? { id: teamId } : null });

    res.status(201).json(newCharacter);
  } catch (error) {
    console.error("Error al crear el personaje:", error);
    res.status(500).json({ error: "Error al crear el personaje" });
  }
};

const updateCharacter = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, teamId } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const repository = new CharacterRepository(AppDataSource);
    const useCase = new CharacterUseCase(repository);

    const updatedCharacter = await useCase.updateCharacter(id, { name, description, imageUrl, teamId });

    if (!updatedCharacter) {
      return res.status(404).json({ error: "Personaje no encontrado" });
    }

    res.status(200).json(updatedCharacter);
  } catch (error) {
    console.error("Error al actualizar el personaje:", error);
    res.status(500).json({ error: "Error al actualizar el personaje" });
  }
};

const deleteCharacter = async (req, res) => {
  try {
    const { id } = req.params;

    const repository = new CharacterRepository(AppDataSource);
    const useCase = new CharacterUseCase(repository);

    const result = await useCase.deleteCharacter(id);

    if (!result) {
      return res.status(404).json({ error: "Personaje no encontrado" });
    }

    res.status(200).json({ message: "Personaje eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el personaje:", error);
    res.status(500).json({ error: "Error al eliminar el personaje" });
  }
};

const getCharacterById = async (req, res) => {
  try {
    const { id } = req.params;

    const repository = new CharacterRepository(AppDataSource);
    const useCase = new CharacterUseCase(repository);

    const character = await useCase.getCharacterById(id);

    if (!character) {
      return res.status(404).json({ error: "Personaje no encontrado" });
    }

    res.status(200).json(character);
  } catch (error) {
    console.error("Error al obtener el personaje:", error);
    res.status(500).json({ error: "Error al obtener el personaje" });
  }
};

const getAllCharacters = async (req, res) => {
  try {
    const repository = AppDataSource.getRepository(Character);
    const characters = await repository.find({
      relations: ["team", "actors", "chapters"], // Relaciones con equipo y actores
    });
    res.json(characters);
  } catch (error) {
    res.status(500).json({ "Error al obtener los personajes": error.message });
  }
};

module.exports = {
  getAllCharacters,
  createCharacter,
  updateCharacter,
  deleteCharacter,
  getCharacterById,
};
