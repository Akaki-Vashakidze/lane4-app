import { Component, OnInit, signal } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SelectComponent } from '../select/select.component';
import { TimeComponent } from '../time/time.component';
import { TranslateModule } from '@ngx-translate/core';
import { Paging } from '../../classes/classes';
import { CustomAutocompleteComponent } from '../custom-autocomplete/custom-autocomplete.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderSpinnerComponent } from '../loader-spinner/loader-spinner.component';
import { catchError, debounce, debounceTime, of } from 'rxjs';

@Component({
  selector: 'app-athlete-results',
  standalone: true,
  imports: [CommonModule, MatIconModule, SelectComponent,LoaderSpinnerComponent, TranslateModule, TimeComponent, CustomAutocompleteComponent],
  templateUrl: './athlete-results.component.html',
  styleUrl: './athlete-results.component.scss'
})
export class AthleteResultsComponent implements OnInit{
  currentYear: number;
  athleteNotFount:boolean = false;
  yearsForSelect: any[] = []
  resultsForTable: any = [];
  courseSelect: string = 'All';
  filteredArr!: any[];
  selectedAthlete!:any;
  isLoading!:boolean;
  athleteId!:string;
  resInfoIndex !: string;
  allAthletes = signal<any>([])
  map1 = {
    '50BUTTERFLY': {},
    '100BUTTERFLY': {},
    '200BUTTERFLY': {},
    '50BACKSTROKE': {},
    '100BACKSTROKE': {},
    '200BACKSTROKE': {},
    '50BREASTSTROKE': {},
    '100BREASTSTROKE': {},
    '200BREASTSTROKE': {},
    '50FREESTYLE': {},
    '100FREESTYLE': {},
    '200FREESTYLE': {},
    '400FREESTYLE': {},
    '800FREESTYLE': {},
    '1500FREESTYLE': {},
    '100MEDLEY': {},
    '200MEDLEY': {},
    '400MEDLEY': {},
  };
  constructor(public activatedRoute:ActivatedRoute,public _sharedService: SharedService, public _router:Router) {
    this.currentYear = new Date().getFullYear();
    this.populateYearsForSelect();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if(params['athlete']) {
        this.athleteId = params['athlete'];
        this.getAthleteResults(params['athlete'])
      } else {
        this.isLoading = false;
      }
    });
  }

  getAthletes(searchQuery:string){
    this._sharedService.getAthletes({data:{userType:'',searchQuery}}).subscribe(item => {
      this.allAthletes.set(item)
    })
  }

  onAthleteType(query:any){
    this.getAthletes(query)
  }

  getAthleteResults(athlete: any) {
    this.isLoading = true;
    this._sharedService.getAthleteResults(athlete).pipe(
      catchError(error => {
        this.isLoading = false;
        this.selectedAthlete = null;
        this.athleteNotFount = true;
        this.filteredArr = [];
        return of(null); 
      })
    ).subscribe(item => {
      if (!item) {
        return;
      }
  
      this.athleteNotFount = false;
      this.isLoading = false;
      this.selectedAthlete = item.data.athlete;
      let data: any = [];
      Object.keys(this.map1).forEach(event => {
        if (item?.data?.results[event]) {
          data.push(item.data.results[event]);
        }
      });
      this.resultsForTable = data;
      this.filteredArr = data;
    });
  }

  changeQueryParams(newParams: { [key: string]: any }) {
    this._router.navigate([], {
      queryParams: newParams,
      queryParamsHandling: 'merge',
    });
  }

  onSelect1(event: any) {
    this.filteredArr = this.resultsForTable
    .map((item: any) => {
      let filteredItem = { ...item };
      Object.keys(filteredItem).forEach(poolLength => {
        filteredItem[poolLength] = filteredItem[poolLength].filter((res: any) => {
          let eventYear = new Date(res.event.startDate).getFullYear();
          return eventYear === event; 
        });
      });
      return filteredItem;
    })
    .filter((item: any) => {
      return Object.keys(item).some(poolLength => item[poolLength].length > 0);
    });
  
  console.log(this.filteredArr);
  }

  onSelect3(course: string) {
    console.log(course)
    this.courseSelect = course;
  }

  populateYearsForSelect() {
    for (let year = 2022; year <= this.currentYear; year++) {
      this.yearsForSelect.push(year);
    }
  }

  showMoreResults(distance:string, style:string, poolLength:any){
    console.log(distance,style,this.selectedAthlete._id,poolLength)
    this._router.navigate([`athlete/${style}/${distance}/${this.selectedAthlete._id}/${poolLength}`])
  }

  onSelect(event:any){
    // this.selectedAthlete = event;
    this.athleteId = event._id
    this.changeQueryParams({'athlete':[event._id]})
  }

  openResInfo(index:number, course:string){
    if(course + index != this.resInfoIndex) {
      this.resInfoIndex = course + index;
    } else {
      this.resInfoIndex = ''
    }
  }
}
