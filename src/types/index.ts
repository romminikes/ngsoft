type DefaultType = { id: number | string, title: string }

type Ingredient = {
  id: string,
  inventoryNumber: string,
  inventoryName: string,
  casNumber: string,
  molecularFormula: string,
}

interface IFirstStep {
  deliveryTarget: {
    location: string
    recieverName: string
    address: string
    requiredPassage: {
      id: string | number,
      title: string
    },
    driverName: string
    recieverPhoneNumber: string
    capacity: string
    moneyValue: {
      value: string,
      moneyType: string
    }
    driverId: string
  }
  moreData: {
    comments: string
    attaches: Array<any>
  }
}

interface ISecondStep {
  supply: {
    name: string,
    numhp: number | string,
    origin: number | string,
    originCountry: string
  }
  companyContact: {
    fullname: string,
    email: string,
    phoneNumber: number | string
    id: string,
    cellPhoneNumber: number | string
    faxNumber: number | string
  }
}

interface IThirdStep {
  material: {
    name: string,
    designation: string,
    category: number | string,
    requestedNum: {
      amount: number | string,
      measureType: number | string,
    }
    components: Array<componentForm>
  }
}

interface componentForm{
  id: string;
  percentages?:number | string;
}

type Data = {
  firstFormGroup: IFirstStep,
  secondFormGroup: ISecondStep,
  thirdFormGroup: IThirdStep
}

type DbData = {
  ingredients: Array<Ingredient>,
  unitMeasures: Array<DefaultType>,
  passeges: Array<DefaultType>,
  origins: Array<DefaultType>,
  categories: Array<DefaultType>,
}
