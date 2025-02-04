const AppDataSource = require("../../../infrastructure/db/data-source");
const Chapter = require("../../../domain/Chapter");
const Character = require("../../../domain/Character");

const createChapter = async (req, res) => {
    try {
      const { title, description, date, characterIds } = req.body;
  
      const repository = new ChapterRepository(AppDataSource);
      const useCase = new ChapterUseCase(repository);
  
      const chapterData = {
        title,
        description,
        date,
        characters: characterIds || [],
      };
  
      const newChapter = await useCase.createChapter(chapterData);
      res.status(201).json(newChapter);
    } catch (error) {
      console.error("Error al crear el capítulo:", error);
      res.status(500).json({ error: "Error al crear el capítulo" });
    }
  };

const getAllChapters = async (req, res) => {
  try {
    const repository = AppDataSource.getRepository(Chapter);
    const chapters = await repository.find({ relations: ["characters"] });
    res.json(chapters);
  } catch (error) {
    res.status(500).json({ "Error al obtener los capítulos": error.message });
  }
};

module.exports = { createChapter, getAllChapters };
