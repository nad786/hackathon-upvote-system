import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { LoaderComponent } from './loader/loader.component';
import { EffectsModule } from '@ngrx/effects';
import { IdeasComponent } from './ideas/ideas.component';
import { IdeaComponent } from './idea/idea.component';
import { IdeasEffect } from './store/effects/ideas.effects';
import { AddIdeaComponent } from './add-idea/add-idea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { GetObjectKeyLengthPipe } from './pipes/get-object-key-length.pipe';
import { FilterArrayPipe } from './pipes/filter-array.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    IdeasComponent,
    IdeaComponent,
    AddIdeaComponent,
    LoginComponent,
    GetObjectKeyLengthPipe,
    FilterArrayPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    EffectsModule.forRoot([IdeasEffect]),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
