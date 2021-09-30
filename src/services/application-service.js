// import { DialogService } from 'aurelia-dialog';
// import { Prompt } from '../prompt/prompt';
// import { Router } from 'aurelia-router';
import { inject } from 'aurelia';

// @inject(Router, DialogService)
@inject()
export class ApplicationService {
  
 
  currentSearch;
  version=1.01
  originalrec = 0;
  testrec = 0;
  currentItem = 0;
  currentContactItem = 0;
  showtest=true
}

