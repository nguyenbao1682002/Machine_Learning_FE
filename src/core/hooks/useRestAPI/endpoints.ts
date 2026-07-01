export type TEndPoint = '/auth' | '/event' | '/event-participant' | '/meeting' | '/delegate-priority'

interface IGenericEndpoint {
  endpoint: string
  action: string
  payload: Record<any, any>
}

interface IAuthEndpoint extends IGenericEndpoint {
  method: 'POST'
  endpoint: '/auth'
  action: 'login'
}

type TRawDB_Action = 'raw_db__insert_data' | 'raw_db__get_data'
type TAppDB_Action = 'app_db__get_data' | 'app_db__query_data' | 'app_db__add_feedback' | 'app_db__get_data_for_dashboard' | 'app_db__update_data'
type TThreshold = 'threshold__get_data' | 'threshold__update_data' | 'threshold__toggle_enable_alert'
type TStats = 'feedback__get_feedback_ticket' | 'feedback__save_feedback' | 'feedback_get_list' | 'feedback_get_item' | 'issue__update_acknowledge' | 'issue_get_list'
type Cache_Action = 'cache__get_data'
type TTesting_Action = 'anomaly_detect__get_data' | 'recommend_control__get_data'

interface IDataEndpoint extends IGenericEndpoint {
  method: 'POST'
  endpoint: '/data'
  action: TRawDB_Action | TAppDB_Action | TThreshold | TStats | Cache_Action
}

interface IEndpoint extends IGenericEndpoint {
  method: 'POST'
  endpoint: ''
  action: TTesting_Action
}

export type TRestAPIEndPoints = IAuthEndpoint | IDataEndpoint | IEndpoint
