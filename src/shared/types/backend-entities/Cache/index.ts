import { CACHE_SORT_KEY } from './types'

export interface Cache {
  UpdatedAt: Date
  FactoryId: string
  Data: string
  CacheKey: CACHE_SORT_KEY
}
