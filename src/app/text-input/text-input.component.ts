import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.less']
})
export class TextInputComponent implements OnInit {
  @Input() id: string;
  @Input() help: boolean;
  @Input() label: string;
  @Input() formControlName: string;


  constructor() { }

  ngOnInit() {
  }

}
