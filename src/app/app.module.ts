import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AuthPageModule } from 'pages/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { EditPageModule } from 'pages/edit';
import { provideFirestore, initializeFirestore } from '@angular/fire/firestore';
import { NotesPageModule } from 'pages/notes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AuthPageModule,
    EditPageModule,
    NotesPageModule,

    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    provideAuth(() => {
      const auth = getAuth();
      return auth;
    }),
    provideFirestore(() =>
      initializeFirestore(getApp(), { ignoreUndefinedProperties: true })
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
