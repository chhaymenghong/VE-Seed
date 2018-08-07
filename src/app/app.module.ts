import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/root/app.component';
import { HttpClientModule } from '@angular/common/http';
import { ColorDirective } from './directives/color/color.directive';

// example of loading other modules
import { ServiceLibModule } from 'service-lib-hong';
import { VeCommonModule } from 've-common-hong';

@NgModule({
  declarations: [
    AppComponent,
    ColorDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ServiceLibModule,
    VeCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
