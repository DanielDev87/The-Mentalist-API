class ChapterRepository {
    constructor(dataSource) {
      this.repository = dataSource.getRepository('Chapter');
    }
  
    async createChapter(chapterData) {
      const chapter = this.repository.create(chapterData);
      return this.repository.save(chapter);
    }
  
    async getAllChapters() {
      return this.repository.find({ relations: ["characters"] });
    }
  
    async getChapterById(id) {
      return this.repository.findOne({
        where: { id },
        relations: ["characters"],
      });
    }
  
    async deleteChapter(id) {
      const chapter = await this.getChapterById(id);
      if (chapter) {
        await this.repository.remove(chapter);
        return true;
      }
      return false;
    }
  }
  
  module.exports = ChapterRepository;
  