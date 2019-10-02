import { Component } from '@angular/core';
import { auth } from 'firebase';
import { Storage } from '@ionic/storage';
import { CrudService } from '../firebase';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
public postList : Array<Post> =[];
public userEmail: string
//public postList = ["Hello", "My name is Nora", "Welcome to this app"];
  constructor(private storage: Storage) {
    this.populatePosts();
    storage.get("userEmail")
    .then((val)=>
    {this.userEmail = val;
    console.log(val);});
  }

  populatePosts(){
    let myDate = new Date()
    console.log(myDate);

    let myPost = new Post("Nora", myDate, "This is the first post");
    console.log(myPost);
    this.postList.push(myPost);
    console.log(this.postList);
  }
}

export class Post{
  author:string;
  date: Date;
  content: string;
  constructor(author:string,
   date: Date,
   content: string){
   this.author = author;
   this.date = date;
   this.content = content;
  }
}