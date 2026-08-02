export class Document {
  constructor(pageContent, metadata = {}) {
    this.pageContent = pageContent;
    this.metadata = metadata;
  }
}