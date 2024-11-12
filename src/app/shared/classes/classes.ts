export class Paging {
    page!:number;
    size!:number;
    constructor(page:number,size:number){
        this.page = page || 0;
        this.size = size || 10000;
    }
  }
  