import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { HttpClientModule } from '@angular/common/http';
import {
  heroPlusCircle,
  heroArrowLeftOnRectangle,
  heroXMark,
} from '@ng-icons/heroicons/outline';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardsComponent } from './cards/cards.component';
import { AppRoutingModule } from './app-routing.module';
import { RedirectComponent } from './redirect/redirect.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CardsComponent,
    RedirectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgIconsModule.withIcons({
      heroPlusCircle,
      heroXMark,
      heroArrowLeftOnRectangle,
    }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
