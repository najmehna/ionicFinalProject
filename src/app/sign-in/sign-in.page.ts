import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from  "@angular/router";
import { Storage } from '@ionic/storage';
import { CrudService, Item } from '../firebaseFile';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
//import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  public toast: any;
  constructor(private angAuth : AngularFireAuth,
    public  router:  Router,
    private crud: CrudService, 
    private storage : Storage,
    //private firestore : AngularFirestore,
    private toastController: ToastController) { }
    public currentUser;
         
  ngOnInit() {
  }

  register(form){
    let myEmail = form.value['email'];
    let myPassword = form.value['password'];
    this.angAuth.auth.signInWithEmailAndPassword(myEmail, myPassword)
      .then((res: any)=>{
        
        this.storage.set("userID", res.user.uid);
        this.router.navigateByUrl('/home');
      })
      .catch((error: any)=>{
        console.dir(error);
      })
}
showToast(message) {
  this.toast = this.toastController.create({
    message: message,
    duration: 2000
  }).then((toastData)=>{
    console.log(toastData);
    toastData.present();
  });
}
HideToast(){
  this.toast = this.toastController.dismiss();
}
}
