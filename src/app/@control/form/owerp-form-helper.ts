import {OwerpAutoCompleteDataModel, OwerpLabelValueModel} from './owerp-form.model';

export class OwerpFormHelper {

  public static updateAutoCompleteDataModel(
    name: string,
    data: OwerpLabelValueModel[],
    modelRef: OwerpAutoCompleteDataModel): OwerpAutoCompleteDataModel {

    const model: OwerpAutoCompleteDataModel = modelRef;
    model[name] = data;
    modelRef = Object.assign({}, modelRef);
    return modelRef;
  }

}
