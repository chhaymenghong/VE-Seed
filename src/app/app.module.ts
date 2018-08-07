import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/root/app.component';
import { HttpClientModule } from '@angular/common/http';
import { ColorDirective } from './directives/color/color.directive';

@NgModule({
  declarations: [
    AppComponent,
    ColorDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
