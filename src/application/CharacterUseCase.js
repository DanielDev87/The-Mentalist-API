class CharacterUseCase {
    constructor(characterRepository) {
      this.characterRepository = characterRepository;
    }

    async createCharacter(characterData) {
      if (!characterData.name || !characterData.description || ! characterData.team) {
        const team = await this.characterRepository.FindTeamById(characterData.team.id);
        if (!team) throw new Error("Equipo no encontrado");
        characterData.team = team;
        throw new Error("El nombre y la descripción del personaje son obligatorias");
      }
      const newCharacter = await this.characterRepository.createCharacter(characterData);
      return newCharacter
    }

    async updateCharacter(id, characterData) {
      if (!characterData.name || !characterData.description) {
          throw new Error("El nombre y la descripción del personaje son obligatorios");
      }
  
      const updatedCharacter = await this.characterRepository.updateCharacter(id, characterData);
      return updatedCharacter;
    }  

    async deleteCharacter(id) {
      const result = await this.characterRepository.deleteCharacter(id);
      return result;
    }  

    async getCharacterById(id) {
      if (!id) {
          throw new Error("El id es obligatorio");
      }  
      const character = await this.characterRepository.findById(id);
      return character;
    }
  
  
    async getAllCharacters() {
      return await this.characterRepository.findAll();
    }
  }
  
module.exports = CharacterUseCase;
  