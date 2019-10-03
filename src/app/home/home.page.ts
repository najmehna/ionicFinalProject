import { Component } from '@angular/core';
import { auth } from 'firebase';
import { Storage } from '@ionic/storage';
import { CrudService } from '../firebaseFile';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
public postList : Array<Post> =[];
public userID: string
public userName
public postContent: string;
//public postList = ["Hello", "My name is Nora", "Welcome to this app"];
  constructor(private storage: Storage, private crud : CrudService) {
    this.populatePosts();
    storage.get("userID")
    .then((val)=>
    {this.userID = val;
    console.log(val);});
    this.userName = crud.get_User2(this.userID).pipe(
      map(a => {
          const data = a.payload.data();
          const id = a.payload.id;
          return data;})
        )
    //this.crud.get_User2(this.userID).subscribe(result => this.userName = result);
    console.dir(this.userName);
  }
  
  randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  populatePosts(){
    let myDate = this.randomDate(new Date(2019, 0, 1), new Date())
    var nextDate= this.randomDate(new Date(2019, 0, 1), new Date())

     //nextDate.setDate(myDate.getDate()+1);
    console.log(myDate);

    let myPost = new Post("Nora", myDate, "This is the first post");
    let myPost2 = new Post("Najmeh", nextDate, "This is the second post");
    console.log(myPost);
    this.postList.push(myPost);
    this.postList.push(myPost2);
    console.log(this.postList);
  }
  submitPost(){
    console.dir(this.userName);
    console.log(this.postContent);
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