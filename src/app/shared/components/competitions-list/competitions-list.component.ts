import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { CompetitionCardComponent } from '../competition-card/competition-card.component';
import { ButtonComponent } from '../button/button.component';
import { SharedService } from '../../services/shared.service';
import { CostumerComment, Event, LiveEvent } from '../../interfaces/interfaces';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';
import { TranslateModule } from '@ngx-translate/core';
import { CostumerCardComponent } from '../costumer-card/costumer-card.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { Router, RouterModule } from '@angular/router';
import { CompetitionService } from '../../../features/competitions/services/competition.service';

@Component({
  selector: 'app-competitions-list',
  standalone: true,
  imports: [CommonModule,CompetitionCardComponent,RouterModule, ButtonComponent ,ButtonComponent, LoaderSpinnerComponent, TranslateModule,CostumerCardComponent,CarouselModule],
  templateUrl: './competitions-list.component.html',
  styleUrl: './competitions-list.component.scss'
})
export class CompetitionsListComponent {
  @ViewChild('customOwl', { static: false }) customOwl!: any;
  @Input() BackgroundImg: boolean = true;
  @Input() backgroundColor: boolean = true;
  public competitions:Event[] = [];
  public displayedCompetitions = 3; 
  constructor(private sharedService:SharedService,private _compService:CompetitionService, public _router:Router){
    _compService.getAllCompetitions().subscribe(item => {
      this.competitions = item;
    })
  }

  public costumerComments:CostumerComment[] = [
    {
      name:'Minjulina Irina',
      comment:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae debitis vitae tenetur voluptatibus, tempora excepturi.',
      img:'assets/imgs/costumer1.svg'
    },
    {
      name:'Abzianidze Giorgi',
      comment:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae debitis vitae tenetur voluptatibus, tempora excepturi.',
      img:'assets/imgs/costumer1.svg'
    },
    {
      name:'Gelashvili Davit',
      comment:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae debitis vitae tenetur voluptatibus, tempora excepturi.',
      img:'assets/imgs/costumer1.svg'
    },
    {
      name:'Abzianidze Giorgi',
      comment:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae debitis vitae tenetur voluptatibus, tempora excepturi.',
      img:'assets/imgs/costumer1.svg'
    },
    {
      name:'Abzianidze Giorgi',
      comment:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae debitis vitae tenetur voluptatibus, tempora excepturi.',
      img:'assets/imgs/costumer1.svg'
    },
    {
      name:'Gelashvili Davit',
      comment:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae debitis vitae tenetur voluptatibus, tempora excepturi.',
      img:'assets/imgs/costumer1.svg'
    },
    {
      name:'Gelashvili Davit',
      comment:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae debitis vitae tenetur voluptatibus, tempora excepturi.',
      img:'assets/imgs/costumer1.svg'
    },
  ]

  carouselOptions: any = {
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    dotsData: true, 
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  };
  goNext() {
    this.customOwl.next([300]);
  }
  
  goPrev() {
    this.customOwl.prev([300]);
  }

  loadMore() {
    this.competitions.length > this.displayedCompetitions ? this.displayedCompetitions += 3 : '';
    console.log(this.displayedCompetitions,this.competitions.length )
  }

  loadLess() {
    this.displayedCompetitions > 3 ? this.displayedCompetitions -= 3 : '';
    this.displayedCompetitions < 3 ? this.displayedCompetitions = 3 : '';
  }

  navigationToCompetitions(){
    this._router.navigate(['/competitions'])
  }
}
