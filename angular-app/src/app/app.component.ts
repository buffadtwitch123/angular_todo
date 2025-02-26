import { Component, OnInit  } from '@angular/core';
import { db } from './app.module'
import { collection, addDoc, getDocs, deleteDoc, doc, runTransaction, updateDoc } from "firebase/firestore"; //manage data in the database
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';



export interface Task { //interface for tasks
  finished: boolean;
  task: string;
  id: string;  // for deleting purposes
  position: number; // new field for position
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'angular-app';

  


  Tasks:Task[] = []
  async LoadTasks() // gets data from the database to display it on the list
  {
    this.Tasks = []
    const querySnapshot = await getDocs(collection(db, "Tasks"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
      this.Tasks.push(
        {
          finished:doc.data()["finished"], 
          task:doc.data()["task"],
          id: doc.id,
          position: doc.data()["position"] // load position
        })
    });
    // Sort tasks by position
    this.Tasks.sort((a, b) => a.position - b.position);
  }

  ngOnInit(): void 
  {  
    this.LoadTasks();  // calls updatetasks function on initialization
  }


  async deleteTask(taskToDelete: any) 
  {
    try {
      const taskDocRef = doc(db, "Tasks", taskToDelete.id);  //finds document by the id
      await deleteDoc(taskDocRef);  //delete found document
      console.log(`Task ${taskToDelete.id} deleted from Firestore`);

      // deleting from user-side array
      this.Tasks = this.Tasks.filter(task => task.id !== taskToDelete.id); 
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  }

  async toggleTaskStatus(TaskToToggle: any)//changes task status in the firestore database
  {
    const taskDocRef = doc(db, "Tasks", TaskToToggle);//reference to the task

    try {
      const NewStatus = await runTransaction(db, async (transaction) => {
        const Doc = await transaction.get(taskDocRef);
        if (!Doc.exists()) {
          throw "Document does not exist!";
        }
        transaction.update(taskDocRef, { finished: true });
        console.log("Status changed to: true");
        return true;
      });
    } catch (e) {
      console.error(e);
    }
  }

  Task_text:string = ""

  async addTask(text:string)//adds tasks to the firestore database
  {
    if(text!='')
    {
      try {
        const docRef = await addDoc(collection(db, "Tasks"), { 
          finished:false,
          task:text,
          position: this.Tasks.length // set initial position
        });
        console.log("Document written with ID: ", docRef.id);
        
        //after adding task to the firestore database, it adds it to the user-side array
        this.Tasks.push(
          {
            finished:false, 
            task: text,
            id: docRef.id,
            position: this.Tasks.length // set initial position
          })
          this.Task_text = ""
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    else{
      console.error("Task must contain text")
    }
    
    

  }
  
  
  async drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.Tasks, event.previousIndex, event.currentIndex);

    // Update positions in Firestore
    for (let i = 0; i < this.Tasks.length; i++) {
      const task = this.Tasks[i];
      const taskDocRef = doc(db, "Tasks", task.id);
      await updateDoc(taskDocRef, { position: i });
    }
  }
  
}
