class CharacterRepository {
    constructor(dataSource) {
      this.dataSource = dataSource
      this.repository = this.dataSource.getRepository("Character");
    }

    async createCharacter(characterData){
      const character = this.repository.create(characterData);
      await this.repository.save(character);
      return character;
    }

    async updateCharacter(id, characterData) {
      const character = await this.repository.findOne({ where: { id } });  
      if (!character) {
          return null; // Si no existe el personaje
      }  
      // Actualizamos los campos
      character.name = characterData.name || character.name;
      character.description = characterData.description || character.description;
      character.imageUrl = characterData.imageUrl || character.imageUrl;
  
      await this.repository.save(character);
      return character;
    }
  

    async deleteCharacter(id) {
      const character = await this.repository.findOne({ where: { id } });  
      if (!character) {
          return null; // Si no se encuentra el personaje
      }  
      await this.repository.remove(character);
      return true;
    }
  
  
    async findAll() {
      return await this.repository.find();
    }

    async findById(id) {
      const character = await this.repository.findOne({ where: { id } });  
      return character; // Si no se encuentra, retorna null
  }
  
  }
  
  module.exports = CharacterRepository;
  