class ActorUseCase {
    constructor(repository) {
      this.repository = repository;
    }
  
    async createActor({ name, bio, birthdate, imageUrl, character_id }) {
      const actor = this.repository.create({
        name,
        bio,
        birthdate,
        imageUrl,
        characters: character_id ? { id: character_id } : null,
      });
      return await this.repository.save(actor);
    }
  
    async getAllActors() {
      return this.repository.getAllActors();
    }
  
    async getActorById(id) {
      return this.repository.getActorById(id);
    }
  
    async deleteActor(id) {
      return this.repository.deleteActor(id);
    }
  }
  
  module.exports = ActorUseCase;
  