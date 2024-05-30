
export abstract class HttpClient {

  public async post(url: string, payload?: any, config?: any): Promise<any> {

    throw 'Implements post method';

  }


  public async get(url: string, config?: any): Promise<any> {

    throw 'Implements get method';

  }

  public async put(url: string, payload: object, config?: any): Promise<any> {

    throw 'Implements put method';

  }

  public async patch(url: string, payload: object, config?: any): Promise<any> {

    throw 'Implements patch method';

  }

  public async delete(url: string, config?: any): Promise<any> {

    throw 'Implements delete method';

  }

}
