import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-conversation-text',
  templateUrl: './conversation-text.component.html',
  styleUrls: ['./conversation-text.component.scss']
})
export class ConversationTextComponent {
  @Input() question: string;
  @Input() answer: string | number;
}
