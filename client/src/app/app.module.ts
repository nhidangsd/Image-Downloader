import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { PhotosComponent } from './components/photos/photos.component';
import { PhotoItemComponent } from './components/photo-item/photo-item.component';

@NgModule({
  declarations: [
    AppComponent,
    PhotosComponent,
    PhotoItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
