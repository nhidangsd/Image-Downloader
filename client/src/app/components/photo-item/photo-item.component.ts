import { Component, Input, OnInit } from '@angular/core';
import {Photo} from '../../Photo';

@Component({
  selector: 'app-photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.css']
})
export class PhotoItemComponent implements OnInit {

  @Input() photo: Photo;
  
  constructor() { }

  ngOnInit(): void {
  }

}
