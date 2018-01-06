import { Component, AfterViewChecked, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewChecked {
  constructor(private elementRef: ElementRef) {

  }
  title = 'app';
  ngAfterViewChecked() {

    // var s = document.createElement("script");
    // s.type = "text/javascript";
    // s.src = "../assets/js/theme.js";
    // this.elementRef.nativeElement.appendChild(s);
    // let owl = $('#owl-main-slider');
    // owl.owlCarousel({
    //   items: 1,
    //   loop: true,
    //   margin: 10,
    //   autoplay: true,
    //   autoplayTimeout: 3000,
    //   autoplayHoverPause: true,
    // });
    // var owl2 = $('#partners');
    // owl2.owlCarousel({
    //   items: 4,
    //   loop: true,
    //   margin: 10,
    //   autoplay: true,
      
    //   animateIn: 'flipInX',
    //   stagePadding: 30,
    //   smartSpeed: 450,
    //   autoplayTimeout: 3000,
    //   autoplayHoverPause: true,
    // });

    // $(function () {
    //   owl.trigger('play.owl.autoplay', [1000])
    //   owl2.trigger('play.owl.autoplay', [1000])
    // })
  }
}

