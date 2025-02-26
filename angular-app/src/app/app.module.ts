import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms"
import { CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop'


const app = initializeApp(environment.firebaseConfig);
export const db = getFirestore(app);//exporting to use it in app.component.ts file


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    DragDropModule,
    CdkDropList,
    CdkDrag,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}