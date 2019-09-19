import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.scss']
})
export class ContadorComponent implements OnInit {
  @Input() segundos: number = 5;

  constructor() { }

  ngOnInit() {
    this.Contador();
  }

  Contador() {
    setTimeout(() => {
      if (this.segundos > 0)
        this.segundos--;
      this.Contador();
    }, 1000);
  }
}
