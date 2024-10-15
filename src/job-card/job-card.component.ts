import { Component, inject, OnInit } from '@angular/core';
import { JobCardService } from './service/job-card.service';
import { IJobCard, ItemSummery } from './model/JobCard';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
@Component({
  selector: 'app-job-card',
  standalone: true,
  imports: [JobCardComponent,CommonModule,FormsModule,MatButtonModule,MatIconModule],
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.scss'
})
export class JobCardComponent implements OnInit{
  private service:JobCardService = inject(JobCardService)
   jobCardsData:IJobCard[] = [];
   private _filterByItem:string = "";
   jobCardsDataFiltered:ItemSummery[] = [];

   get filterByItem(){
      return this._filterByItem;
   }
   set filterByItem(value:string){
      this._filterByItem = value
      this.jobCardsDataFiltered = (value) ? this.filterByPieceItemName(value) : this.jobCardsData[0].itemSummeries;
   }
  ngOnInit(): void {
    this.service.getAllJobCard()
                .subscribe({
                  next:(result:IJobCard[])=>{
                    this.jobCardsData = result
                    this.jobCardsDataFiltered = result[0].itemSummeries;
                    console.log(this.jobCardsData);
                  },
                  error:err=>console.log(err)
                })
 
                
  }
  shortByQty(val:HTMLButtonElement){
    if(Number(val.value) === 1){
      this.jobCardsDataFiltered= this.jobCardsData.map(i=>i.itemSummeries).flat().sort((qty1:ItemSummery,qty2:ItemSummery)=>qty1.qty - qty2.qty);
    }
    else{
      this.jobCardsDataFiltered= this.jobCardsData.map(i=>i.itemSummeries).flat().sort((qty1:ItemSummery,qty2:ItemSummery)=>qty2.qty - qty1.qty);
    }

    console.log("fg",this.jobCardsDataFiltered);
    console.log("dg",val.value);
    
  }
  //downloadpdf
  downloadPdf(){
    const doc = new jsPDF();
    doc.text('PieceItemTable', 15,10); 
    autoTable(doc,{html:'#pieceTable'})
    doc.save('pieceTable.pdf');
}
  filterByPieceItemName(filterBy:string):ItemSummery[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.jobCardsData[0].itemSummeries.filter(x=>x.pieceRateItemName.toLocaleLowerCase().includes(filterBy));
  }
  
}
