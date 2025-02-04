class TeamUseCase {
    constructor(teamRepository) {
      this.teamRepository = teamRepository;
    }
  
    async createTeam(teamData) {
        if (!teamData.name || !teamData.description) {
            throw new Error("El nombre y la descripción del equipo son obligatorias");
          }
          const newTeam = await this.teamRepository.createTeam(teamData);
          return newTeam      
    }
  
    async getAllTeams() {
      return await this.teamRepository.getAllTeams();
    }
  
    async getTeamById(id) {
      return await this.teamRepository.getTeamById(id);
    }
  
    async updateTeam(id, teamData) {
      return await this.teamRepository.updateTeam(id, teamData);
    }
  
    async deleteTeam(id) {
      return await this.teamRepository.deleteTeam(id);
    }
  }
  
  module.exports = TeamUseCase;
  