class ActorRepository {
    constructor(dataSource) {
      this.repository = dataSource.getRepository('Actor');
    }
  
    async createActor(actorData) {
      const actor = this.repository.create(actorData);
      return this.repository.save(actor);
    }
  
    async getAllActors() {
      return this.repository.find({ relations: ["characters"] });
    }
  
    async getActorById(id) {
      return this.repository.findOne({
        where: { id },
        relations: ["characters"],
      });
    }
  
    async deleteActor(id) {
      const actor = await this.getActorById(id);
      if (actor) {
        await this.repository.remove(actor);
        return true;
      }
      return false;
    }
  }
  
  module.exports = ActorRepository;
  