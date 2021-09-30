# Data Grid
The `data-grid` is meant for displaying data utilizing the HTML Table with some added features for making it easy to use.

This data-grid supports filtering, sorting on single and multiple columns. Filtering is supported for both server-side and client-side scenarios. As a developer, you are able to provide your own template definition for both the header as well as the row column.

The following is a breakdown of the features in this `data-grid` that you can use.

## Properties on the Data Grid
The following are the properties on the `data-grid`:

- items - `<array>` This is the data the `data-grid` renders. It is possible to use a framework, like Aurelia, to bind the `items` property in markup but you can also use a query selector and set the property as follows: 

```javascript
// load the data into items array...
const theGrid = document.querySelector('data-grid#theGrid');
theGrid.items = items;
```

- extraData - `<array>` This is the object that is used for binding to select elements in the header and columns. It is possible to use a framework, like Aurelia, to bind the `extraData` property in markup but you can also use a query selector and set the property as follows: 

```javascript
// load the data into extraData array...
const genders = [...];
// load the data into items array...
const theGrid = document.querySelector('data-grid#theGrid');
fixedGrid.extraData = [
    {name: 'gender', items: genders, displayMember: 'name', valueMember: 'value', hasDefault: false}
];
theGrid.items = items;
```

Be sure to load the `extraData` property first as the `items` property will trigger a re-rendering of the grid whenever the property changes.

The `extraData` property expects each row for the underlying array to have the following properties:

- name - `<string>` This is the name of the collection you wish to bind to for your select or other element.
- items - `<array>` This is the actually array of data.
- displayMember - `<string>` This is what is displayed to the select element when binding.
- valueMember - `<string>` This is what is actually bound to the select element when binding.
- hasDefault - `<bool>` This is where or not the data object has a null default value; otherwise, the DataGrid will provide one.

Here is an example of binding both the `extraData` and `items` property using Aurelia:

```html
<data-grid id="fixedGrid"
  items.bind="items"
  extra-data.bind="extraData"
  is-full-width
  is-hoverable
  row-key="(item) => item.id.value"
  allow-sort="true"
  allow-multi-sort="true"
  filter-type="client"
  >
  ...
</data-grid>
```

Here is an example of creating a column with a select element in the header as filter:

```html
<data-grid-col header="Gender" 
  col="(item) => item.gender" 
  type="string" 
  filter-by="starts-with" 
  width="125px">
  <template id="header-template">
    <div class="header-group">
      <select class="header-control"
        data-path="gender"
        data-trigger="
          keydown:onFilter
        "
      >
      </select>
    </div>
  </template>
  <template id="column-template">
    <a class="link">
      ${toProper(item.gender)}
    </a>
  </template>
</data-grid-col>
```

**NOTE**: In the `header-template`, we see a select element. It has a `data-path` attribute. This is important as the value provided there must match one of the `name` entries provided in the `extraData` property we saw earlier.


## Attributes on the Data Grid
The following are the attributes on the `data-grid`:

- **caption** - `<string>` Allows you to define the text caption of the `data-grid`
- **is-full-width** - `<bool>` Ensures that the grid is fixed in width so the columns don't shrink beyound the column sizes. The columns will continue to stretch to fill the view if larger
- **is-striped** - `<bool>` Provides a simple stripping visualization on the rows
- **is-hoverable** - `<bool>` Provides a simple hover visualization when the mouse is over a certain row
- **row-key** - `<string>` Allows you to define a lambda expression representing the unique key for a given row
- **allow-sort** - `<bool>` Allows you to enable sorting
- **allow-multiple-sort** - `<bool>` Allows you to sort across multiple columns
- **filter-type** - `<string>` This can either be `client` or `server`
- **page-size** - `<number>` This defines the page size and turns on pagination on the `data-grid`
- **rounded** - `<string>` Allows you to define border radius of the `data-grid` to give the rounded effect

## Data Grid Column
The `data-grid` supports a single type of element as its children, the `data-grid-col`.

The `data-grid-col` can have the following attributes:

- **header** - `<string>` This represents the column header
- **col** - `<string>` Allows you to define a lambda expression for how to render the column
- **type** - `<string>` Allows you to define the data type of the column. `type` can be one of the following:
  - **string** - The column will be evaluated as a string
  - **number** - The column will be evaulated as a number
  - **bool** - The is simply ignored for both filtering and sorting
  - **photo** - This is simply ignored for both filtering and sorting
  - **action** - This is simply ignored for both filtering ans sorting
- **filter-by** - `<string>` Allows you to define the method for filtering the column. `filter-by` can be one of the following values:
  - **none** - Filtering is ignored for this value
  - **equal** - Filters by performing an exact match
  - **not-equal** - Filters by performing an exact non match
  - **starts-with** - Filters by matching from the start
  - **ends-with** - Filters by matching from the end
  - **contains** - Filters by any match found
  - **greater-than** - Filters by numeric `>` expression
  - **greater-than-or-equal** - Filters by numeric `>=` expression
  - **less-than** - Filters by numeric `<` expression
  - **less-than-or-equal** - Filters by numeric `<=` expression
- **width** - `<string>` Allow you to define the width of the column

## Data Grid Column Templates
There are times when you will want to have a little more control over the way the headers and columns are rendered. The `data-grid-col` allows you to insert `template` elements as children. There are currently two specific templates that are supported:

- **header-template** - Template definition for overriding the column headers
- **column-template** - Template definition for overriding the columns

### Header Templates
The following is an example of markup for overriding the header template:

```html
<template id="header-template">
  <div class="header-group grid columns-2 column-gap-15">
    <input class="header-control" type="search"
      placeholder="Last"
      data-path="name.last"
      data-trigger="keydown:onFilter">
    <input class="header-control" type="search"
      placeholder="First"
      data-path="name.first"
      data-trigger="keydown:onFilter">
  </div>
</template>
```

The example above demonstrates how you can actually have two `inputs` in a single column filter. This column renders data in the following manner:

`lastname, firstname`

Since we have two fields, we would want the user of the `data-grid` to have the ability to filter on each individual field.

Also notice the `data-path` attribute. This is used to override the top level `data-grid-col` definition for the `col` attribute. This is important as you may want to provide a specific expression for filtering.

The following is an example of adding a button:

```html
<template id="header-template">
  <div class="header-group">
    <button
      class="form-button p-5 font-small"
      data-trigger="click:clearFilter">
      <i class="fas fa-fw fa-ban"></i>
      Clear
    </button>
  </div>
</template>
```

The following is an example of adding a button to filter as well as another to add a new record:

```html
<template id="header-template">
  <div class="header-group grid columns-2 column-gap-10">
    <button
      class="form-button p-5 font-small"
      data-trigger="click:performFilter">
      <i class="fas fa-fw fa-search"></i>
      Search
    </button>
    <button
      class="form-button shake p-5 font-small hidden"
      data-trigger="click:broadcastEvent" data-function="addRecord"
      data-visible-after-filter>
      <i class="fas fa-fw fa-plus"></i>
      Add New
    </button>
  </div>
</template>
```

The first button utilizes a helper method, `performFilter`. If the `filter-type` is defined as `server`, then an event will be broadcasted with the name, `filter`.

The following is an example of wiring up the `filter` event.

```javascript
const theGrid = document.querySelector('data-grid#theGrid');
theGrid.addEventListener('filter', async (e) => {
  console.log('vm:theGrid filter - ', e);
  const request = await fetch('https://randomuser.me/api/?nat=us&gender=female&results=150', {method: 'get'});
  const results = await request.json();
  const data = results.results;
  theGrid.items = data;
});
```

The second button uses the `broadcastEvent` helper method. It also expects a `data-function` attribute which allows you to define a specific event name to handle.

```javascript
const theGrid = document.querySelector('data-grid#theGrid');
theGrid.addEventListener('addRecord', async (e) => {
  console.log('addRecord - ', e);
  e.detail.forEach(c => {
    const {col, filter:value, filterBy, path} = c;
    $and.push({[`${path}`]:{'$regex': value,'$options':'i'}});
  });
});
```

When you handle an event that is broadcasted from the header template, the `detail` object will be an array of filter criteria if available. The following is what each row of the detail would look like:

- **col** - `<string>` The lambda expression for how to render the column
- **filter** - `<string>` The value of the input
- **filterBy** - `<string>` The method for filtering the column. `filter-by` can be one of the following values:
  - **none** - Filtering is ignored for this value
  - **equal** - Filters by performing an exact match
  - **not-equal** - Filters by performing an exact non match
  - **starts-with** - Filters by matching from the start
  - **ends-with** - Filters by matching from the end
  - **contains** - Filters by any match found
  - **greater-than** - Filters by numeric `>` expression
  - **greater-than-or-equal** - Filters by numeric `>=` expression
  - **less-than** - Filters by numeric `<` expression
  - **less-than-or-equal** - Filters by numeric `<=` expression
- **path** - `<string>` This comes from the `data-path` attribute on the input


### Column Templates
The following is an example of markup for overriding the column template:

```html
<template id="column-template">
  <div>
    ${item.location.street.number} ${item.location.street.name}
  </div>
  <div>
    ${item.location.city}, ${item.location.state} ${item.location.postcode}
  </div>
</template>
```

In the example above, the template allows the developer to have a multi-line row.

The following is another example of adding actions:

```html
<template id="column-template">
  <button class="is-locked form-button transparent"
    data-trigger="click:broadcastEvent" data-function="unlockRecord">
    <i class="fa fa-lock"></i>
  </button>
  <button class="is-unlocked form-button transparent hidden">
    <i class="fa fa-lock-open"></i>
  </button>
  <button class="form-button transparent" 
    data-trigger="click:broadcastEvent" data-function="deleteRecord">
    <i class="fa fa-trash"></i>
  </button>
</template>
```

The example above utilizes a helper method, `broadcastEvent`. It expects a `data-function` attribute which names allows you to specify a custom event to be emmitted from the `data-grid` to your corresponding code.

```javascript
const theGrid = document.querySelector('data-grid#theGrid');
theGrid.addEventListener('unlockRecord', unlockRecord);
theGrid.addEventListener('deleteRecord', deleteRecord);

// later in your code...
function unlockRecord(e) {
  const {row, index} = e.detail;
  console.log('vm:unlockRecord', e, e.detail);
}
function deleteRecord(e) {
  const {row, index} = e.detail;
  console.log('vm:deleteRecord', e, e.detail);
}
```

If you use the convention of `broadcastEvent` in your column template, it will provide two pieces of data from the `detail` object:

- row `<object>` - This is the row data
- index `<number>` - This is the index for the given row


## Filtering
The `data-grid` supports filtering underlying data. Currently, it provides two modes of filtering:

- **client** - Filtering is done in memory in the `data-grid`
- **server** - A filtering event is broadcasted for the developer to handle

### Client Filtering
Client filtering simply means that the underlying data is filtered in memory. The `data-grid` handles all of the logic regarding the filtering.

### Server Filtering
Server filtering means that a `filter` event is raised which the developer can handle to perform the data filter and update the `items` property on the `data-grid`


### Filtering Methods
The following are the supported methods that the `data-grid` supports:

- **onFilter** - this is meant for header templates for wiring the `keydown` event to filter the data when the `enter` is pressed
- **performFilter** - this allows you to execute the filter operation on the `data-grid`
- **clearFilter** - this allows you to clear out all data entered in the filter inputs

## Sorting
The `data-grid` supports tri-state column sorting. This means that a column can be in a default state as well as in sort ascending and sort descending state.

In order to turn on sorting, you need to add the `allow-sort` attribute to the `data-grid` as shown below:

```html
<data-grid id="theGrid" allow-sort="true">
  ...
</data-grid>
```

If you want to enable multiple column sorting, you simply need to add the, `allow-multi-sort` attribute as shown below:

```html
<data-grid id="theGrid"
  allow-sort="true" allow-multi-sort="true"
  >
  ...
</data-grid>
```

### Enabling sorting at the column level
The `data-grid` supports sorting on column types defined as the following:

- **string** - The column will treat the column as a `<string>`
- **number** - The column will treat the column as a `<number>`

If you provide any other type, sorting will be ignored by the `data-grid`.


## Styles
The `data-grid` manages all of its styles using embedded and `CSSStyleSheets`. Depending on how you are consuming the style sheets you can either use `<link>` tags or `<style>` tags to attach the styles to the `data-grid`. This provides the ability to use the same style sheets globally for other parts of the application like themes.

The following is an example of using `<link>` tags:

```html
<link id="font-awesome" rel="stylesheet" href="/dist/assets/font-awesome/css/all.min.css">
<link id="ss-web-components" rel="stylesheet" href="/dist/bundle.css">
```

The following is an example of using `<style>` tags:

```html
<style type="text/css" id="...font-awesome...">...</style>
<style type="text/css" id="...ss-web-components...">...</style>
```

**Note**: If you are using a framework like, `Aurelia`, you can use shared styles in the `main.js` file as follows to automatically add the `<style>` tags:

```javascript
import Aurelia, { RouterConfiguration, StyleConfiguration } from 'aurelia';
import { MyApp } from './my-app';
import fa from '/assets/font-awesome/css/all.min.css';
import ssWebComponents from 'ss-web-components-distro/bundle.css';

Aurelia
  .register(StyleConfiguration.shadowDOM({
    // optionally add the shared styles for all components
    sharedStyles: [
      fa,
      ssWebComponents
    ]
  }))
  .register(RouterConfiguration)
  // To use HTML5 pushState routes, replace previous line with the following
  // customized router config.
  // .register(RouterConfiguration.customize({ useUrlFragmentHash: false }))
  .app(MyApp)
  .start();
```

By registering the `sharedStyles`, the `<style>` tags will be added automatically.
