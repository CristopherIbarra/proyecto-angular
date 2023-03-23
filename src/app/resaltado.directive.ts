import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appResaltado]'
})
export class ResaltadoDirective {

  constructor(public el: ElementRef) { 
    
  }

  ngOnInit(){
    var elemento = this.el.nativeElement;
    elemento.style.background= "blue";
    elemento.style.padding = "30px";
    elemento.style.marginTop= "12px";
    elemento.style.color= "white";

    elemento.innerText = elemento.innerText.toUpperCase().replace("CONTACTO", "contactASAO") ; 
  }

}
