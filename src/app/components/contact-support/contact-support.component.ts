import { Component, Input, OnInit } from '@angular/core';

const defaultMessageConfig: any = {
  'fromSearchResult': { 
    primary: 'Sorry, no results found!',
    secondary: 'Please check the spelling or try searching for something else'
  },
  'other': {
    primary: 'Sorry, something went wrong!, please check after sometime',
    secondary: 'For more help, please contact support'
  }
};

@Component({
  selector: 'app-contact-support',
  templateUrl: './contact-support.component.html',
  standalone: true
})
export class ContactSupportComponent implements OnInit {
  @Input('defaultMessageType') defaultMessageType!: string;
  defaultMessageConfig: any;
  constructor() { }

  ngOnInit(): void {
    this.defaultMessageConfig = this.getDefaultMessages();
  }


  getDefaultMessages(): any {
      return defaultMessageConfig[this.defaultMessageType];
  }

}
