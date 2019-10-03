import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from  "@angular/router";
import { CrudService } from '../firebaseFile';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
public profileImage //= "../assets/Disney.jpg";
  constructor(private angAuth : AngularFireAuth,
    private  router:  Router, private storage : Storage,private crud: CrudService, private camera : Camera) { }
    private options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
  ngOnInit() {
  }
  register(form){
    let myEmail = form.value['email'];
    let myPassword = form.value['password'];
    let myName = form.value['name'];
    let record = {};
    record['Name'] = myName;
    this.storage.set('userName', myName);
    if (myPassword == form.value['confirm']){
    this.angAuth.auth.createUserWithEmailAndPassword(myEmail , myPassword)
      .then((res: any)=>{
        console.log(res.user);
        //record['ID'] = res.user.uid;
        //this.crud.create_NewUser(record);
        this.crud.create_NewUser2(res.user.uid,record);

        this.router.navigateByUrl('home');
      })
      .catch((error: any)=>{
        console.log(error);
      })
  }
}
takePicture(){
  console.log("Smile...");
  this.camera.getPicture(this.options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    let base64Image = 'data:image/jpeg;base64,' + imageData;
    this.profileImage = base64Image;
    
   }, (err) => {
    // Handle error
   });
}
  // signUp(){
  //   this.angAuth.auth.createUserWithEmailAndPassword('nora2@hotmail.com', '123456')
  //   .then((res: any)=>{
  //   console.log(res.user);
  //   })
  //   .catch((error: any)=>{
  //   console.log(error);
  //   })
  //   }
}
