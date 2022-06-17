import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { iTask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  
  // input task form declaration
  todoForm !: FormGroup

  // lists declaration
  todo:iTask[]=[];
  onGoingTask:iTask[]=[];
  done:iTask[]=[];

  updatedIndex !:any;
  saveEnable:boolean=false;

  constructor( private task : FormBuilder) { }

  ngOnInit(): void {
    this.todoForm=this.task.group({
      item:['',Validators.required]
    })
  }

  //adding Tasks
  addTask(){
    this.todo.push({
      description:this.todoForm.value.item,
      done:false
    });
    this.todoForm.reset();
  }

  //delete Button
  deleteTask(i:number){
    this.todo.splice(i,1);
  }

  deleteInProcessTask(i:number){
    this.onGoingTask.splice(i,1);
  }

  deleteDoneTask(i:number){
    this.done.splice(i,1);
  }

  onEdit(item:iTask,i:number)
  {
    this.todoForm.controls['item'].setValue(item.description);
    this.updatedIndex=i;
    this.saveEnable=true;
  }  

  updateTask(){
    this.todo[this.updatedIndex].description=this.todoForm.value.item;

    this.todoForm.reset();
    this.saveEnable=false;
    this.updatedIndex=undefined;

  }


// drag and drop part
  // drop(event: CdkDragDrop<iTask[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  //   }
  // }

  drop(event: CdkDragDrop<iTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
