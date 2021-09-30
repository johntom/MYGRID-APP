# Data Grid
## Issues

- Filter a complex Column like location. My example has a state column with a filter. Testing fitler as text or dropdown fails

- the documentation says 
 const theGrid = document.querySelector('data-grid#theGrid');
 but I can only get the following to work
 const fixedGrid = $('#fixedGrid');

- fixedGrid.items = items; // not needed as its declared in grid

  <data-grid id="fixedGrid"
        items.bind="items"
        extra-data.bind="extraData"


## Wish list (could just be my lack of how to)
- persist grid settings 

- filter grid columns thru code, i.e set State filter in getResources()
there are many places in brm system that use this feature and its quite useful

- export filtered data to csv and xls
- ability to custom formatters like toPhone toFixed toProper. The following is how it can be used with slickgrid

const mystatusformatter = (row, cell, value, columnDef, dataContext, grid) => {
  let val
  switch (value) {
    case "1":
      val = 'open';
      break;
    case "2":
      val = 'closed';
      break;
    case "3":
      val = 're-opened';
      break;
  }
  return val
}

const myadjusterformatter = (row, cell, value, columnDef, dataContext, grid) => {
  const gridOptions = grid.getOptions();
  const extraData = gridOptions.params.extraData;
  let found = extraData.find(f => f.ID === value);
  let val
  if (found === -1) {
    val = 'Not available!';
  } else val = found.AdjusterName
  return val
}

 ---------- column definitions
 {
        id: 'Status',
        name: 'Status',
        field: 'Status',
        sortable: true,
        filterable: false,
        minWidth: 70,
        formatter: mystatusformatter.bind(this),
        exportWithFormatter: true,
      },

{
        id: 'AdjusterID',
        name: 'AdjusterID',
        field: 'AdjusterID',
        sortable: true,
        filterable: true,
        minWidth: 120,

        formatter: myadjusterformatter
      },
  


------grid props
 this.gridOptions = {
      presets: {
        columns: this.presets.columns,
        sorters: this.presets.sorters,
      
        formatter: Formatters.complexObject.bind(this)
      },
      enableSorting: true,
      enableCellNavigation: true,
      autoEdit: this.isAutoEdit,
      autoCommitEdit: this.autoCommitEdit,

      ////////*****************************/////////
      datasetIdPropertyName: "WCID",//"WCID",//"ID", //_id",//
      ////////*****************************/////////
      autoResize: {
        containerId: 'grid-container',
        sidePadding: 15
      },
      editable: true,
      enableCellNavigation: true,
      rowSelectionOptions: {
        selectActiveRow: true//false
      },
      enableCheckboxSelector: true,
      enableRowSelection: true,
      multiSelect: false,
      enableFiltering: true,
      editCommandHandler: (item, column, editCommand) => {
        this._commandQueue.push(editCommand);
        editCommand.execute();
      },

      exportService: true,
      enableExcelExport: true,
      enableExport: true,
      enableAutoTooltip: true,
      autoTooltipOptions: {
        /** are tooltip enabled for all cells? */
        enableForCells: true,
        /** are tooltip enabled for column headers */
        enableForHeaderCells: true,
        /** what is the maximum tooltip length in pixels (only type the number) */
        maxToolTipLength: 100
      },
      gridMenu: {
        hideExportCsvCommand: false,           // false by default, so it's optional
        hideExportTextDelimitedCommand: false
      },
      params: {
        extraData: this.appService.adjusters // provide the service to all at once (Editor, Filter, AsyncPostRender)
      }
    };

