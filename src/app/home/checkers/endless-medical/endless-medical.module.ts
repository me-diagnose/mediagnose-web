import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EndlessMedicalCheckerRoutingModule} from './endless-medical-routing.module';
import {EndlessMedicalCheckerComponent} from './endless-medical-checker/endless-medical-checker.component';
import {EndlessMedicalCheckerService} from './services/endless-medical-checker.service';
import { MainSymptomsComponent } from './endless-medical-checker/main-symptoms/main-symptoms.component';
import { ConversationTextComponent } from './endless-medical-checker/conversation-text/conversation-text.component';
import { QuestionComponent } from './endless-medical-checker/question/question.component';
import {EndlessMedicalMaterialModule} from './endless-medical-material.module';
import {SharedComponentsModule} from '../../../shared/components/shared-components.module';

@NgModule({
  declarations: [EndlessMedicalCheckerComponent, MainSymptomsComponent, ConversationTextComponent, QuestionComponent],
  imports: [
    CommonModule,
    EndlessMedicalCheckerRoutingModule,
    EndlessMedicalMaterialModule,
    SharedComponentsModule
  ],
  providers: [
    EndlessMedicalCheckerService,
    ]
})
export class EndlessMedicalModule {
}
