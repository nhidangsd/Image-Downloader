import { Component, OnInit } from '@angular/core';
import {Photo} from '../../Photo';
import {PhotoService} from '../../services/photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  photos: Photo[] = [];
  constructor(private photoService: PhotoService) {

  }

  ngOnInit(): void {
    this.photoService.getPhotos().subscribe( (photos) => (
      this.photos = photos
    ));
  }

}
