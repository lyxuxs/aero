import { HttpClient } from '@angular/common/http';
import { compileNgModule } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrl: './construction.component.css'
})
export class ConstructionComponent implements OnInit{

  constructionlist:any;

constructor(private httpClient:HttpClient){
  this.constructionlist=[];
}
ngOnInit(): void {
  this.getConstructionlist()  
}

getConstructionlist(){
    this.httpClient.get('https://verkehr.autobahn.de/o/autobahn/A1/services/roadworks').subscribe((result:any)=>{
      this.constructionlist=result;
      console.log('Construction List:', this.constructionlist);
      },
    (error) => {
      console.error('Error fetching construction list:', error);
    }
    );
  }

}
