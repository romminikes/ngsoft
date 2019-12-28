import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { DataFetchService } from '../services/data-fetch.service';
import { Observable, Subscription } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import * as _ from "lodash";

@Component({
  selector: 'app-material-information',
  templateUrl: './material-information.component.html',
  styleUrls: ['../step.share.less']
})
export class MaterialInformationComponent implements OnInit, OnDestroy {
  @Input() thirdFormGroup: FormGroup;
  readonly title = "פרטי החומרים המבוקשים"
  readonly subTitle = "לתשומת ליבך, החומרים המבוקשים והרכבם צריכים להיות מאושרים על ידי בעל/ת העסק או מנהל/ת";

  readonly labels = {
    material: {
      title: "פריט 1",
      name: "שם הפריט",
      designation: `ייעוד הפריט`,
      category: "קטגוריה",
      requestedNum: `כמות מבוקשת (ספרות בלבד)`,
    },
    components: {
      title: "רשימת מרכיבים",
      searchText: "הוספת מרכיב לפי שם, פורמולה או מספר CAS"
    }
  }

  private _subscribtions: Array<Subscription> = []

  public data: {
    categories: Promise<DefaultType[]>,
    unitMeasures: Promise<DefaultType[]>,
    ingredients: Observable<Ingredient[]>
  }

  private _allIngredients: Ingredient[] = [];
  availableIngredients: Ingredient[] = [];

  searchControl: FormControl;
  filteredIngredients: Observable<Ingredient[]>


  constructor(private dataFetchService: DataFetchService, private _formBuilder: FormBuilder) {
    this.searchControl = new FormControl('');
  }

  get nameControl() {
    return this.thirdFormGroup.get('material').get('name') as FormControl
  }
  get designationControl() {
    return this.thirdFormGroup.get('material').get('designation') as FormControl
  }
  get categoryControlId() {
    return this.thirdFormGroup.get('material').get('category').get('id') as FormControl
  }
  get categoryControlTitle() {
    return this.thirdFormGroup.get('material').get('category').get('title') as FormControl
  }
  get amountControl() {
    return this.thirdFormGroup.get('material').get('requestedNum').get('amount') as FormControl
  }
  get measureTypeControlId() {
    return this.thirdFormGroup.get('material').get('requestedNum').get('measureType').get('id') as FormControl
  }
  get measureTypeControlTitle() {
    return this.thirdFormGroup.get('material').get('requestedNum').get('measureType').get('title') as FormControl
  }
  get componentsControl() {
    return this.thirdFormGroup.get('material').get('components') as FormArray
  }

  ngOnInit() {
    this.data = this.dataFetchService.getThirdStepData()
    this._subscribtions.push(this.data.ingredients.subscribe(ingredients => {
      this.availableIngredients = _.cloneDeep(ingredients)
      this._allIngredients = _.cloneDeep(ingredients)
    }))

    this._subscribtions.push(this.categoryControlId.valueChanges.subscribe(async id => {
      const title = (await this.data.categories).find(c => c.id == id).title
      this.categoryControlTitle.setValue(title)
    }))

    this._subscribtions.push(this.measureTypeControlId.valueChanges.subscribe(async id => {
      const title = (await this.data.unitMeasures).find(c => c.id == id).title
      this.measureTypeControlTitle.setValue(title)
    }))

    this.filteredIngredients = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(search => {
        return this._filter(search)
      })
    )

  }

  ngOnDestroy() {
    this._subscribtions.forEach(sub => sub.unsubscribe())
  }

  private _filter(search: string) {
    if (!search)
      return this.availableIngredients.map(item => item)
    const filterValue = this._normalizeSearch(search);
    return this.availableIngredients.filter(ingredient => {
      const { inventoryName, inventoryNumber, molecularFormula } = ingredient
      return Object.values({ inventoryName, inventoryNumber, molecularFormula }).some(val => this._normalizeSearch(val).includes(filterValue))
    }
    )
  }

  private _normalizeSearch(value: string): string {
    if (value)
      return value.toLowerCase();
    else
      return ""
  }

  deleteComponent(id: string) {
    const component = this._allIngredients.find(item => item.id === id)
    this.availableIngredients.push(component)
    this.componentsControl.removeAt(this.componentsControl.getRawValue().findIndex(c => c.id === id))
  }

  addComponent(ingredient: Ingredient) {
    const newGroup = this._buildFormGroup(ingredient)
    this.componentsControl.push(newGroup)
    _.remove(this.availableIngredients, (item) => item.id === ingredient.id)
    this.searchControl.reset()
  }

  private _buildFormGroup(ingredient: Ingredient){
    return this._formBuilder.group({
      id: [ingredient.id, [Validators.required]],
      inventoryNumber:[ingredient.inventoryNumber],
      inventoryName: [ingredient.inventoryName],
      casNumber:[ingredient.casNumber],
      molecularFormula: [ingredient.molecularFormula],
      percentages: [null]
    })
  }

  nextStep() {
    this.thirdFormGroup.markAllAsTouched();
    this.thirdFormGroup.markAsDirty();
  }

}
