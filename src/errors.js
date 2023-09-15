/**
 * @class HttpError
 */
class HttpError extends Error {
  /**
     *
     * @param {number} code
     * @param {string} message
     */
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

module.exports = {HttpError};
