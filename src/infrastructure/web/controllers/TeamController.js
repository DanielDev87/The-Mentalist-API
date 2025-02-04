const AppDataSource = require("../../../infrastructure/db/data-source");
const upload = require("../../storage/multerCloudinary");
const Team = require("../../../domain/Team")
const TeamRepository = require("../../../infrastructure/db/repositories/TeamRepository");
const TeamUseCase = require("../../../application/TeamUseCase");

const createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;

    const repository = new TeamRepository(AppDataSource);
    const imageUrl = req.file ? req.file.path : null;

    const useCase = new TeamUseCase(repository);
    const newTeam = await useCase.createTeam({ name, description, imageUrl });

    res.status(201).json(newTeam);
  } catch (error) {
    console.error("Error al crear el equipo:", error);
    res.status(500).json({ error: "Error al crear el equipo" });
  }
};

const getAllTeams = async (req, res) => {
    try {
        const repository = AppDataSource.getRepository(Team);
        const teams = await repository.find();
        res.json(teams);
      } catch (error) {
        res.status(500).json({ "Error al obtener los equipos": error.message });
      }
};

const getTeamById = async (req, res) => {
    try {
        const { id } = req.params;
    
        const repository = new TeamRepository(AppDataSource);
        const useCase = new TeamUseCase(repository);
    
        const team = await useCase.getTeamById(id);
    
        if (!team) {
          return res.status(404).json({ error: "Equipo no encontrado" });
        }
    
        res.status(200).json(team);
      } catch (error) {
        console.error("Error al obtener el equipo:", error);
        res.status(500).json({ error: "Error al obtener el equipo" });
      }
};

const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const imageUrl = req.file ? req.file.path : null;
    const repository = new TeamRepository(AppDataSource);
    const useCase = new TeamUseCase(repository);

    const updatedTeam = await useCase.updateTeam(id, { name, description, imageUrl });

    if (!updatedTeam) {
      return res.status(404).json({ error: "Equipo no encontrado" });
    }

    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error("Error al actualizar el equipo:", error);
    res.status(500).json({ error: "Error al actualizar el equipo" });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const repository = new TeamRepository(AppDataSource);
    const useCase = new TeamUseCase(repository);

    const result = await useCase.deleteTeam(id);

    if (!result) {
      return res.status(404).json({ error: "Equipo no encontrado" });
    }

    res.status(200).json({ message: "Equipo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el equipo:", error);
    res.status(500).json({ error: "Error al eliminar el equipo" });
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
