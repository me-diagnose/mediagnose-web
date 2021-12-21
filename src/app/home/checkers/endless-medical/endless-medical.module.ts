import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EndlessMedicalCheckerRoutingModule} from './endless-medical-routing.module';
import {EndlessMedicalCheckerComponent} from './endless-medical-checker/endless-medical-checker.component';
import {EndlessMedicalCheckerService} from './services/endless-medical-checker.service';
import {MainSymptomsComponent} from './endless-medical-checker/main-symptoms/main-symptoms.component';
import {ConversationTextComponent} from './endless-medical-checker/conversation-text/conversation-text.component';
import {QuestionComponent} from './endless-medical-checker/conversation-text/question/question.component';
import {EndlessMedicalMaterialModule} from './endless-medical-material.module';
import {SharedComponentsModule} from '../../../shared/components/shared-components.module';
import {AnswerComponent} from './endless-medical-checker/conversation-text/answer/answer.component';
import {ResultsComponent} from './endless-medical-checker/results/results.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    EndlessMedicalCheckerComponent,
    MainSymptomsComponent,
    ConversationTextComponent,
    QuestionComponent,
    AnswerComponent,
    ResultsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EndlessMedicalCheckerRoutingModule,
    EndlessMedicalMaterialModule,
    SharedComponentsModule,
  ],
  providers: [
    EndlessMedicalCheckerService,
  ]
})
export class EndlessMedicalModule {
}
