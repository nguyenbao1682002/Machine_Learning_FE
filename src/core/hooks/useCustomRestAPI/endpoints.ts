interface IGenericRequest {
  url: string
}

interface IGetRequest extends IGenericRequest {
  method: 'GET'
}

interface IPostRequest extends IGenericRequest {
  method: 'POST'
  body: Record<any, any>
}

export type TCustomRestAPIRequest = IGetRequest | IPostRequest
