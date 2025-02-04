const Team = require("../../../domain/Team");

class TeamRepository {
  constructor(dataSource) {
    this.repository = dataSource.getRepository(Team);
  }

  async createTeam(teamData) {
    const team = this.repository.create(teamData);
    return await this.repository.save(team);
  }

  async getAllTeams() {
    return await this.repository.find({ relations: ["characters"] });
  }

  async getTeamById(id) {
    return await this.repository.findOne({
      where: { id },
      relations: ["characters"],
    });
  }

  async updateTeam(id, teamData) {
    const team = await this.repository.findOneBy({ id });
    if (!team) return null;

    Object.assign(team, teamData);
    return await this.repository.save(team);
  }

  async deleteTeam(id) {
    const team = await this.repository.findOneBy({ id });
    if (!team) return null;

    await this.repository.remove(team);
    return true;
  }
}

module.exports = TeamRepository;
