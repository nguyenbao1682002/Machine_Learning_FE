import { ILabel } from '../Label'

export interface IData {
  id: number
  datetime: Date
  pyrometer: number
  nOx_GA01: number
  oxi_GA01: number
  kiln_inlet_temp: number
  labelId: number

  // Expand fields
  Label: ILabel
}
