const fetch = require('wx-fetch');

class Request {
  static request(
    url: string,
    method: string = 'GET',
    headers: {} | undefined = undefined,
  ): Promise<any> {
    return fetch(url, { method, headers });
  }
}

export default Request;
