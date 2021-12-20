import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent {
  @Input() multiple: boolean;
  @Input() choices: any[];
  @Input() chosenAnswer: string | number;
  @Output() answerWasChosen: EventEmitter<any> = new EventEmitter<any>()

  onChoice(choice: any) {
    const toEmit = typeof choice === 'string' ? choice : choice.value;
    this.answerWasChosen.emit(toEmit);
  }
}
