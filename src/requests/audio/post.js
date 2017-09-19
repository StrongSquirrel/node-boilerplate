import asyncBusboy from 'async-busboy';
import BaseRequest from '../';

export default class AudioPostRequest extends BaseRequest {
  async validate() {
    if (!this.req.data) {
      this.req.data = {};
    }
    const { files, fields } = await asyncBusboy(this.req);
    const file = files.filter(f => f.fieldname === 'file').shift();
    this.req.data.file = file ? {
      file,
      mimetype: file.mimeType,
      fieldname: 'file',
      filename: file.filename,
    } : undefined;
    this.req.body.duration = fields.duration;
    this.req.checkBody('duration', 'Duration cannot be empty').notEmpty();
    this.req.checkBody('duration', 'Should be a numberic').isInt();
    if (this.req.data.file === undefined) {
      this.req.checkBody('file', 'Please attach audio file').notEmpty();
    } else {
      this.req.checkBody('file', 'Accept only audio file').isAudio(this.req.data.file.mimetype);
    }
    this.req.sanitizeBody('duration').toInt();
    const result = await this.req.getValidationResult();
    if (result.isEmpty() === false) {
      this.errors = result.useFirstErrorOnly().array();
    }
    return Promise.resolve();
  }
}
