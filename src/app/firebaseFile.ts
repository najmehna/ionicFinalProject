
import { Injectable } from '@angular/core';
 
import { AngularFirestore, AngularFirestoreDocument  } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';


export interface Item { name: string; }

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  items: AngularFireList<any>;
  profile: AngularFirestoreDocument<Item>;
  item : Observable<Item>;
  constructor(
    private firestore: AngularFirestore,
    private afDataBase: AngularFireDatabase
  ) {}
  create_NewUser2(uid, record) {
  return this.firestore.doc(`Users/${uid}`).set(record);
  }
  create_NewUser(record) {
    return this.firestore.collection(`Users`).add(record);
    
  }
 
  get_Users() {
    return this.firestore.collection(`Users`).snapshotChanges();
  }
   get_User(uid) {
    this.profile = this.firestore.doc<Item>(`Users/${uid}`);
    return this.profile.valueChanges();
    // let myName = this.afDataBase.list(`Users`, ref => ref.orderByChild("ID").equalTo(uid))
  
    // this.afDataBase.list(`/Users/`).valueChanges();
    // console.log("this is testng " +this.items);
  
    // return myName
  }
  get_User2(uid) {
    //let myName = this.afDataBase.list(`/Users/${uid}`).snapshotChanges();
     return this.firestore.doc(`/Users/${uid}`).snapshotChanges();
     //return this.afDataBase.list(`/Users/${uid}`).snapshotChanges();

    //let ans = myName.Name;
    // this.firestore.collection(`Users`).valueChanges().pipe(
    //   take(1),
    //   map(idea => {
    //     idea = uid;
    //     return idea
    //   })
    // );
    // console.log("this is testng " +myName);
  
     //return myName
  }
  get_User3(uid) {
    let myName = this.firestore.doc(`/Users/${uid}`).valueChanges();
    //let ans = myName.Name;
    // this.firestore.collection(`Users`).valueChanges().pipe(
    //   take(1),
    //   map(idea => {
    //     idea = uid;
    //     return idea
    //   })
    // );
    // console.log("this is testng " +myName);
  
     return myName
  }
  get_User4(uid){
    return this.firestore.doc<any>(`Users/${uid}`);
  }
 
  // async get_User(uid) {
  //   return await this.firestore.collection('Users', ref => ref.where('ID', '==', uid));
  //   //return await this.afDataBase.list('random', ref => ref.child('Users').orderByChild('ID').equalTo(uid));
  // }
  
  update_User(recordID,record){
    this.firestore.doc('Users/' + recordID).update(record);
  }
 
  delete_User(record_id) {
    this.firestore.doc('Users/' + record_id).delete();
  }
}