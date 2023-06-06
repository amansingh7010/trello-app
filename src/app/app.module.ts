import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import {
  heroPlusCircle,
  heroArrowLeftOnRectangle,
  heroXMark,
} from '@ng-icons/heroicons/outline';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardsComponent } from './cards/cards.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CardsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgIconsModule.withIcons({
      heroPlusCircle,
      heroXMark,
      heroArrowLeftOnRectangle,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
