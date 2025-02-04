class ChapterUseCase {
    constructor(repository) {
      this.repository = repository;
    }
  
    async createChapter(chapterData) {
      return this.repository.createChapter(chapterData);
    }
  
    async getAllChapters() {
      return this.repository.getAllChapters();
    }
  
    async getChapterById(id) {
      return this.repository.getChapterById(id);
    }
  
    async deleteChapter(id) {
      return this.repository.deleteChapter(id);
    }
  }
  
  module.exports = ChapterUseCase;
  