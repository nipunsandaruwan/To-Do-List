import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'to_do_list';
  list:any[]=[];

  addTask (item:string){
    console.warn(item);
    this.list.push({id:this.list.length,name:item})
  }

  removeTask(id:number){
    console.log(id);
    this.list=this.list.filter(item=>item.id |= id);
    
  }

  name:any[]=[];
  getName(){
    this.name.push('hi','aedfaf');
    
    console.log(this.name);
  }
  
}
