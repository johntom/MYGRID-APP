// export class MyApp {
//   message = 'Hello World!';
// }
// import { Aurelia, IHttpClient, IRouter, RouterConfiguration, Route, Watch, CustomElement, ValueConverter, LifecycleHooks, bindable } from 'https://unpkg.com/aurelia/dist/native-modules/index.js';
// import { Aurelia, IHttpClient, IRouter, RouterConfiguration, Route, Watch, CustomElement, ValueConverter, LifecycleHooks, bindable } from 'aurelia';
import { ApplicationService } from './services/application-service';
import { inject } from 'aurelia';
import {$, getTemplateById, DataGrid} from './bundle.js';
// import { $ } from './bundle.js';
// let selected=''
// async function selectRecord(e) {
//   const { row, index } = e.detail;
//   console.log('function vm:selectRecord', e, e.detail);
//   // just local
//   this.selected += row.name.last+' , '
//   // selected += row.name.last+' , '
// }
// function onAdd() {
//   // const { row, index } = e.detail;
//   console.log('function:onAdd')//, e, e.detail);
// }

// function performFilter() {
  
//   console.log('function:performFilter')//, e, e.detail);
// }



// function onAdd(e) {
//   const { row, index } = e.detail;
//   console.log('function vm:onAdd', e, e.detail);
// }
// function onEdit(e) {
//   const { row, index } = e.detail;
//   console.log('function vm:onEdit', e, e.detail);
// }



  @inject(ApplicationService)

  export class MyApp {
    constructor(ApplicationService) {
      this.appService = ApplicationService;
      this.version=this.appService.version
      // this.selected =' '
      // this.appService.showtest = !this.appService.showtest
    }


  items = [];
  extraData = [];
  selected =''
  async attached() {
    await this.getResources();
  }
  async getResources() {
    const userRequest = await fetch('https://randomuser.me/api/?nat=us&results=50', {method: 'get'});
    const userResults = await userRequest.json();
    const genders = [
      {name: 'Female', value: 'female'},
      {name: 'Male', value: 'male'}
    ];
    const brightnessOptions = [
      { value: '1', label: 'Dark' },
      { value: '2', label: 'Low' },
      { value: '3', label: 'Medium' },
      { value: '4', label: 'High' },
      { value: '5', label: 'Extreme' },
      { value: '6', label: 'Full' },
    ];

    const stateList = [
      { name: 'null', value: '' },
     { name: 'Alabama', value: 'AL' },
     { name: 'Alaska', value: 'AK' },
     { name: 'America Samoa', value: 'america samoa' },
     { name: 'Arizona', value: 'AZ' },
     { name: 'Arkansas', value: 'AR' },
     { name: 'California', value: 'CA' },
     { name: 'Colorado', value: 'CO' },
     { name: 'Connecticut', value: 'CN' },
     { name: 'Delaware', value: 'DE' },
     { name: 'District of Columbia', value: 'DC' },
     // { name: 'Federated States of Micronesia', value: 'federated states of micronesia' },
     { name: 'Florida', value: 'FL' },
     { name: 'Georgia', value: 'GE' },
     // { name: 'Guam', value: 'guam' },
     { name: 'Hawaii', value: 'HA' },
     { name: 'Idaho', value: 'ID' },
     { name: 'Illinois', value: 'IL' },
     { name: 'Indiana', value: 'IN' },
     { name: 'Iowa', value: 'IO' },
     { name: 'Kansas', value: 'KA' },
     { name: 'Kentucky', value: 'KY' },
     { name: 'Louisiana', value: 'LA' },
     { name: 'Maine', value: 'ME' },
     // { name: 'Marshall Islands', value: 'marshall islands' },
     { name: 'Maryland', value: 'MD' },
     { name: 'Massachusetts', value: 'MA' },
     { name: 'Michigan', value: 'MI' },
     { name: 'Minnesota', value: 'MN' },
     { name: 'Mississippi', value: 'MS' },
     { name: 'Missouri', value: 'MO' },
     { name: 'Montana', value: 'MT' },
     { name: 'Nebraska', value: 'NE' },
     { name: 'Nevada', value: 'NV' },
     { name: 'New Hampshire', value: 'NH' },
     { name: 'New Jersey', value: 'NJ' },
     { name: 'New Mexico', value: 'NM' },
     { name: 'New York', value: 'NY' },
     { name: 'North Carolina', value: 'NC' },
     { name: 'North Dakota', value: 'MD' },
     { name: 'Ohio', value: 'OH' },
     { name: 'Oklahoma', value: 'OK' },
     { name: 'Oregon', value: 'OR' },
  
     { name: 'Pennsylvania', value: 'PA' },
     { name: 'Puerto Rico', value: 'PR' },
     { name: 'Rhode Island', value: 'RI' },
     { name: 'South Carolina', value: 'SC' },
     { name: 'South Dakota', value: 'SD' },
     { name: 'Tennesee', value: 'TN' },
     { name: 'Texas', value: 'TX' },
     { name: 'Utah', value: 'UT' },
     { name: 'Vermont', value: 'VT' },
     // { name: 'Virgin Islands', value: 'VI' },
     { name: 'Virginia', value: 'VA' },
     { name: 'Washington', value: 'WA' },
     { name: 'West Virginia', value: 'WV' },
     { name: 'Wisconsin', value: 'WI' },
     { name: 'Wyoming', value: 'WY' }
    ];

    this.extraData = [
      // , default :"female"
      {name: 'gender', items: genders, displayMember: 'name', valueMember: 'value', hasDefault: true },
      {name: 'brighness', items: brightnessOptions, displayMember: 'label', valueMember: 'value', hasDefault: false },
      {name: 'state', items: stateList, displayMember: 'name', valueMember: 'name', hasDefault: false }
      
    ];
    //  item.location.state
    // If you set extraData, be sure to set it before items...
    //
    this.items = userResults.results;
    // const fixedGrid = document.querySelector('data-grid#fixedGrid'); // bad ref
    // const fixedGrid = document.querySelector('#fixedGrid'); // bad ref
    const fixedGrid = $('#fixedGrid');
    
    fixedGrid.addEventListener('addRecord', async (e) => {
      console.log('addRecord - ', e);
      // e.detail.forEach(c => {
        this.items.forEach(c => {
        const {col, filter:value, filterBy, path} = c;
        $and.push({[`${path}`]:{'$regex': value,'$options':'i'}});
      });
    });
    fixedGrid.addEventListener('selectRecord', async (e) => {
      const { row, index } = e.detail;
       console.log('fixedGrid vm:selectRecord', e, e.detail);
      //   // just local
       this.selected += row.name.last+' , '
    })
    fixedGrid.addEventListener('onAdd', async (e) => {
      const { row, index } = e.detail;
       console.log('fixedGrid vm:onAdd', e, e.detail);
      //   // just local
       this.selected += row.name.last+' , '
    })
    fixedGrid.addEventListener('performFilter', async (e) => {
      const { row, index } = e.detail;
       console.log('fixedGrid vm:performFilter', e, e.detail);
      //   // just local
       this.selected += row.name.last+' , '
    })
    // fixedGrid.addEventListener('selectRecord', selectRecord); 
    // fixedGrid.addEventListener('performFilter', performFilter); 
    // fixedGrid.addEventListener('onAdd', onAdd);
    // fixedGrid.performFilter();// performFilter().click// performFilter() {"gender":"male"}
    // click:performFilter
  }

  // selectRecord(e) {
  //   const {row, index} = e.detail;
  //   console.log('--------vm:selectRecord::', row.name.last,e, e.detail);
  //   this.selected += row.name.last
  // }

  // selectedRecord(e) {
  //   // alert('selectRecord')
  //   const {row, index} = e.detail;
  //   // alert('selectRecord::'+row.id.value+ obj.val1)
  //   // console.log('======vm:selectedRecord::', e, e.detail);
  //   console.log('--------vm:selectRecord::', row.name.last,e, e.detail);
  //   this.selected += row.name.last +', ' 
  // }
  unlockRecord(e) {
    const {row, index} = e.detail;
    console.log('vm:unlockRecord::', e, e.detail);
  }
  deleteRecord(e) {
    const {row, index} = e.detail;
    console.log('===vm:deleteRecord::', e, e.detail);
  }

  addedRecord(e) {
    // const { row, index } = e.detail;
    console.log('===vm vm:addedRecord', e)//, e.detail);
  }
  // onEdit(e) {
  //   const { row, index } = e.detail;
  //   console.log('===vm vm:onEdit', e, e.detail);
  // }


// });
 }
// au.app({ 
//   component: AppRoot,
//   host: document.querySelector('app-root')
// });
// au.start();
