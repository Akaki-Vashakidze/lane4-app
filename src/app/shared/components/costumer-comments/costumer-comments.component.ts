import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CostumerCardComponent } from '../costumer-card/costumer-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { CostumerComment } from '../../interfaces/interfaces';
import { CarouselModule } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-costumer-comments',
  standalone: true,
  imports: [CommonModule, CostumerCardComponent, TranslateModule,CarouselModule],
  templateUrl: './costumer-comments.component.html',
  styleUrl: './costumer-comments.component.scss'
})
export class CostumerCommentsComponent {
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

slides = [
  'jasfas',
  'aasfag,',
  'gamdflas',
  'kaks',
  'jasfas',
  'aasfag,',
  'gamdflas',
  'kaks',
'jasfas',
'aasfag,',
'gamdflas',
'kaks',

'jasfas',
'aasfag,',
'gamdflas',
'kaks',
'jasfas',
'aasfag,',
'gamdflas',
'kaks',
'jasfas',
'aasfag,',
'gamdflas',
'kaks',
];

// currentPage = 3; // Track current page, starting from 1
// itemsPerPage = 3; // Number of items per page

// get totalPages(): number {
//   return Math.ceil(this.slides.length / this.itemsPerPage);
// }

// get pageNumbers(): number[] {
//   const pages = [];
//   const total = this.totalPages;
//   const current = this.currentPage;

//   // Show first pages, current, and last pages with ellipsis
//   if (total <= 5) {
//     for (let i = 1; i <= total; i++) {
//       pages.push(i);
//     }
//   } else {
//     if (current > 2) pages.push(1); // Add first page
//     if (current > 3) pages.push(0); // Add ellipsis

//     for (let i = Math.max(1, current - 1); i <= Math.min(total, current + 1); i++) {
//       pages.push(i);
//     }

//     if (current < total - 2) pages.push(0); // Add ellipsis
//     if (current < total - 1) pages.push(total); // Add last page
//   }

//   return pages;
// }

// carouselOptions = {
//   loop: false,
//   autoplay: false,
//   nav: false,
//   dots: false,
//   items: this.itemsPerPage
// };

// nextPage(carousel: any) {
//   if (this.currentPage < this.totalPages) {
//     this.currentPage++;
//     carousel.to(this.currentPage - 1); // Navigate to the next page (0-indexed)
//   }
// }

// prevPage(carousel: any) {
//   if (this.currentPage > 1) {
//     this.currentPage--;
//     carousel.to(this.currentPage - 1); // Navigate to the previous page (0-indexed)
//   }
// }

// goToPage(carousel: any, page: number) {
//   if (page > 0 && page <= this.totalPages) {
//     this.currentPage = page;
//     carousel.to(this.currentPage - 1); // Navigate to the selected page (0-indexed)
//   }
// }


carouselOptions: any = {
  loop: true,
  margin: 10,
  nav: true,
  dots: true,
  dotsData: true, // Enables custom dots
  responsive: {
    0: { items: 1 },
    600: { items: 2 },
    1000: { items: 3 }
  }
};

contents = [
  { title: 'Slide 1', description: 'Description for Slide 1' },

  { title: 'Slide 1', description: 'Description for Slide 1' },
  { title: 'Slide 2', description: 'Description for Slide 2' },
  { title: 'Slide 3', description: 'Description for Slide 3' },
  { title: 'Slide 2', description: 'Description for Slide 2' },

  { title: 'Slide 1', description: 'Description for Slide 1' },
  { title: 'Slide 2', description: 'Description for Slide 2' },
  { title: 'Slide 3', description: 'Description for Slide 3' },
  { title: 'Slide 3', description: 'Description for Slide 3' }
];

pages = this.contents.map((_, index) => index + 1);


}
