import { Component, Inject, LOCALE_ID, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css'],
})
export class LanguagesComponent implements OnInit {
  selectedLang: string = '';
  languages = ['az', 'en'];
  lang:number=0;
  
  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('az');
    translateService.addLangs(this.languages);
  }
  ngOnInit(): void {
   this.languages.forEach(lang=>{
    if(lang===localStorage.getItem('language')){
      this.lang=this.languages.indexOf(lang, 0);
    }
   })
  }
  changeLanguage(lang: any) {
    this.selectedLang = lang.target.value;

    localStorage.setItem('language', this.selectedLang);
    this.translateService.use(this.selectedLang);
    window.location.reload;
  }
}
