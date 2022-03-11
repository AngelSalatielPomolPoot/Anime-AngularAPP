import { Component, OnInit, Injectable } from '@angular/core';
import { TopAnime } from '@app/interfaces/top-anime';

import { AnimeSerService } from '@app/services/anime-ser.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { left } from '@popperjs/core';

declare const require: any;
const jsPDF = require('jspdf');
require('jspdf-autotable');

import { Workbook} from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-top-anime',
  templateUrl: './top-anime.component.html',
  styleUrls: ['./top-anime.component.css']
})

export class TopAnimeComponent implements OnInit {
  top:TopAnime;
  private query: string;
  tituloFiltro:string;

  datosPDF:any[]=[{}];
  data:any[] = [{}];

  constructor(
    private animeServicio:AnimeSerService,
    config: NgbDropdownConfig
  ) {
    config.placement = 'button-left';

  }
  ngOnInit(): void {
    this.query="upcoming";
    this.tituloFiltro="Próximos Estrenos";
    this.getDataFromService(50);
  }
  getBusqueda(tipo:number){
    switch(tipo){
      case 1:
        this.query="upcoming";
        this.tituloFiltro="Próximos Estrenos";
        this.top=null;
        this.getDataFromService(50);
        break;
      case 2:
        this.query="airing";
        this.tituloFiltro="Emisión";
        this.top=null;
        this.getDataFromService(50);
        break;
      case 3:
        this.query="tv";
        this.tituloFiltro="Series TV";
        this.top=null;
        this.getDataFromService(50);
        break;
      case 4:
        this.query="movie";
        this.tituloFiltro="Peliculas";
        this.top=null;
        this.getDataFromService(50);
        break;
      case 5:
        this.query="ova";
        this.tituloFiltro="Ovas";
        this.top=null;
        this.getDataFromService(50);
        break;
      case 6:
        this.query="special";
        this.tituloFiltro="Especiales";
        this.top=null;
        this.getDataFromService(50);
        break;
      case 7:
        this.query="bypopularity";
        this.tituloFiltro="Más Populares";
        this.top=null;
        this.getDataFromService(50);
        break;
      case 8:
        this.query="favorite";
        this.tituloFiltro="Favoritos";
        this.top=null;
        this.getDataFromService(50);
        break;
    }
  }
  setCantidad(cantidad:number){
    this.top=null;
    this.getDataFromService(cantidad);
  }
  private getDataFromService (cantidad:number):void{
    this.animeServicio.getTopAnime(this.query).then((Response)=>{
      if(Response?.top?.length){
        this.top =Response;
        this.top.top=this.top.top.splice(0,cantidad);
      } else{
        this.top;
        this.top.top=this.top.top.splice(0,cantidad);
      }
    },(error) =>{
      console.log("Error: " + error.statusText)
    })
  }

  //jspdf fuuncion generador
	jsPDFGenerator():void{
	  var doc = new jsPDF();

		doc.setFontSize(20)
		doc.text('Mejores Ánimes', 76, 22)
		doc.setFontSize(11)
		doc.setTextColor(100)

		// jsPDF 1.4+ uses getWidth, <1.4 uses .width
		var pageSize = doc.internal.pageSize
		var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth()
		var paragraph="Se presenta una lista de los mejores ánimes hasta el momento.";
		var text = doc.splitTextToSize(paragraph, pageWidth - 35, {})
		doc.text(text, 14, 30)

		doc.setTextColor(0)
		doc.setFontSize(16)
		doc.text('Listado por: ' + this.tituloFiltro, 14, 45)

    this.bodyTable();

		doc.autoTable({
			head: this.headRows(),
			body: this.datosPDF,
			startY: 50,
			showHead: 'firstPage',
		})

    doc.text("Información obtenida desde AnimeAngularAPP",14,doc.lastAutoTable.finalY + 10);
		doc.setFontSize(12)
		var d = new Date();
		var fechaImpresion="Fechas de impresión: "+d.getFullYear()+'/'+(d.getMonth()+1)+'/'+d.getDate();
		doc.text(fechaImpresion, 14,doc.lastAutoTable.finalY + 25)
    doc.save('Top Animes.pdf')


	}
	headRows=()=>{
		return [
		  { id: 'Top',nombreAnime: 'Nombre del Ánime', genero: 'Género'}
		]
	}
  bodyTable():void{
    this.datosPDF=null;
    this.datosPDF=[];

    for(let i=0;i<this.top.top.length;i++){
      console.log();
      this.datosPDF.push({id: i+1, nombreAnime: this.top.top[i].title, genero: this.top.top[i].type})
    }
    console.log("datosPDF:",this.datosPDF)
  }

  //EXCEL
  async generateExcel(){
    //Excel Title, Header, Data
    const title = 'Mejores Animes';
    const header = ['Top', 'Nombre del Ánime', 'Género', 'Fecha Estreno'];

    //Crear el WorkBook y WorkSheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Top Anime');


    //Agregar Row y Formato
    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    worksheet.addRow([]);
    //const subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')]);

    // Blank Row
    worksheet.addRow([]);

    // Add Header Row
    const headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFE333' },
        bgColor: { argb: 'FF0000FF' }
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
    });
    // worksheet.addRows(data);
    this.bodyexl();
    // Add Data and Conditional Formatting
    this.data.forEach(d => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(4);
      let color = 'FF99FF99';
      if (+qty.value < 500) {
        color = 'FF9999';
      }

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color }
      };
    }

    );

    worksheet.getColumn(3).width = 30;
    worksheet.getColumn(4).width = 30;
    worksheet.addRow([]);

    //Footer Row
    const footerRow = worksheet.addRow(['Este Archivo a sido generado con lo mejor del anime (animeAngularAPP).']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };

    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

    // Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'TopAnime.xlsx');
    });
  }

  headexl=()=>{
		return [
		  { id: 'Top',nombreAnime: 'Nombre del Anime', genero: 'Genero', fecha:'Fecha Estreno'},
		]
	}

  bodyexl():void{
    this.data=null;
    this.data=[{}];
    for(let i=0;i<this.top.top.length;i++){
      console.log();
      this.data.push([i+1, this.top.top[i].title, this.top.top[i].type, this.top.top[i].start_date])
    }
  }

}
