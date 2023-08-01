import { Component, OnInit } from '@angular/core';
import * as cnst from '../../common/constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  cnst = cnst;
  currentYear: number = new Date().getFullYear();

  ngOnInit() :void{
      // This is intentional
  }
}
