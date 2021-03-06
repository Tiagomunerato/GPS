import { Component } from '@angular/core';
//importar as extensões
import { ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ILocal } from '../interfaces/ILocal';

//importante declarar uma variavel para o google
declare var google:any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //criar variaveis
  map:any;
  posicaoAtual:any;

  public listaLocais: ILocal[]= [
    {
      lat: -22.4988767, 
      lng: -48.5687609,
      titulo: "Tuida Lanches"
     
    },
    {
      lat: -22.496349,
      lng: -48.565993,
      titulo: "Cemitério Municipal"
    },
    {
      lat: -22.4961013,
      lng: -48.564126,
      titulo: "Big Lanche"
    },
    {
      lat: 30.5684073,
      lng: 114.0201867,
      titulo: "Torre do Grou Amarelo"
    },
    {
      lat: -21.7566463,
      lng: -48.8306542,
      titulo: "HG Store  Loja de Calçados em Ibitinga"
    }
  ];

  @ViewChild('map', {read: ElementRef, static: false}) mapRef: ElementRef;

  constructor(private geolocation : Geolocation) {}

  //pegar uma posição no mapa
  public async showMap(){
    //const location = new google.maps.LatLng(-22.5192128,-48.5687852); posição Fixa
    //pegar a posição atual do mapa que está na metodo buscarPosicao
    await this.buscarPosicao();
    const options = {
      center: this.posicaoAtual,
      zoom: 15,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

   const marcador = new google.maps.Marker({
     position: this.posicaoAtual,
     map: this.map,
     title: "minha Posição Atual!",
     icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
     animation: google.maps.Animation.BOUNCE
   });

   for (let local of this.listaLocais){
     this.adicionarMArcador(local);
   }

  }

  //adicionar outras cinco posições no mapa
  private adicionarMArcador(Local: ILocal){

    //desestruturar o objeto
    const { lat, lng, titulo } = Local;

    const marcador = new google.maps.Marker({
      position: {lat, lng},
      map: this.map,
      title: titulo
    });
  }

  //mostrar a localização no mapa assim que o projeto abrir
  //ciclo de vida do Ionic
  ionViewDidEnter(){
    this.showMap();
  }
  
  public async buscarPosicao(){
    await this.geolocation.getCurrentPosition().then((posicaoGPS) => {
      //Pegar a posição no mapa através do GPS do dispositivo.
      this.posicaoAtual = {
        lat : posicaoGPS.coords.latitude,
        lng : posicaoGPS.coords.longitude 
      }
     }).catch((error) => {
       console.log('Erro ao tentar encontrar a localização', error);
     });
  }

}
