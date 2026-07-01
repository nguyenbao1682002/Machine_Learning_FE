import { FieldValues } from 'react-hook-form'
import { KCForm, KCLikeDislike, KCMultipleSelect, KCRangeNumber, KCSingleSelect, KCSlider, KCTextAreaAutosize, KCTextField } from './components'
import KCDatePicker from './components/DatePicker'
import KCSwitch from './components/Switch'
import KCTimePicker from './components/TimePicker'

export class KCFormManager<IFormInputs extends FieldValues> {
  constructor() {}

  public get Form() {
    return KCForm<IFormInputs>
  }

  public get TextField() {
    return KCTextField<IFormInputs>
  }

  public get TextAreaAutosize() {
    return KCTextAreaAutosize<IFormInputs>
  }

  public get RangeNumber() {
    return KCRangeNumber<IFormInputs>
  }

  public get Switch() {
    return KCSwitch<IFormInputs>
  }

  public get Slider() {
    return KCSlider<IFormInputs>
  }

  public get DatePicker() {
    return KCDatePicker<IFormInputs>
  }

  public get TimePicker() {
    return KCTimePicker<IFormInputs>
  }

  public get SingleSelect() {
    return KCSingleSelect<IFormInputs>
  }

  public get MultipleSelect() {
    return KCMultipleSelect<IFormInputs>
  }

  public get LikeDislike() {
    return KCLikeDislike<IFormInputs>
  }
}
