import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-component-option',
  templateUrl: './component-option.component.html',
  styleUrls: ['./component-option.component.less']
})
export class ComponentOptionComponent implements OnInit {
  @Input() component: Ingredient

  constructor() { }

  ngOnInit() {
  }

}
