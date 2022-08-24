import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[inputColor]',
})
export class InputColorDirective implements OnInit {
  constructor(private el: ElementRef) {}
  @Input('inputColor') defaultColor = '';

  // defaultColor = ''
  // @Input() set inputColor(color: string) {
  //     this.defaultColor = color
  // }

  ngOnInit(): void {
    console.log('this.el', this.el);
  }

  @HostBinding('style.backgroundColor')
  bgColor = '';

  @HostListener('keydown')
  onKeyDown() {
    // this.el.nativeElement.style.backgroundColor = this._getRandomColor()
    this.bgColor = this.defaultColor || this._getRandomColor();
  }

  private _getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
