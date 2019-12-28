import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper'
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule, MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDividerModule} from '@angular/material/divider';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShippingDataComponent } from './shipping-data/shipping-data.component';

import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AttachBoxComponent } from './attach-box/attach-box.component';
import { ApplicantInformationComponent } from './applicant-information/applicant-information.component';
import { MaterialInformationComponent } from './material-information/material-information.component';
import { ComponentRowComponent } from './component-row/component-row.component';
import { ComponentsTableComponent } from './components-table/components-table.component';

import { DataFetchService } from './services/data-fetch.service';
import { ValidatorsPatternsService } from './services/validators-patterns.service';
import { ComponentOptionComponent } from './component-option/component-option.component';
import { FinalStepComponent } from './final-step/final-step.component';
import { ApplicantDetailsComponent } from './applicant-details/applicant-details.component';
import { MaterialDetailsComponent } from './material-details/material-details.component';
import { DeliveryDetailsComponent } from './delivery-details/delivery-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ShippingDataComponent,
    AttachBoxComponent,
    ApplicantInformationComponent,
    MaterialInformationComponent,
    ComponentRowComponent,
    ComponentsTableComponent,
    ComponentOptionComponent,
    FinalStepComponent,
    ApplicantDetailsComponent,
    MaterialDetailsComponent,
    DeliveryDetailsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    MatDividerModule,
    FontAwesomeModule,
  ],
  providers: [
    DataFetchService,
    ValidatorsPatternsService,
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    },
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
