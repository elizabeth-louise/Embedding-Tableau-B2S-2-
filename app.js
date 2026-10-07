// see this in the inspect > console tab on the webpage)
//console.log is similar to an f string in python
console.log("Hello Back to School!");

// fixed variable
const viz = document.getElementById("tableauViz");

// a variable but subject to change
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;

// creating the function
function logWorkbookInfo() {
  // grab the workbook name
  workbook = viz.workbook;
  console.log(`the workbook name is ${workbook.name}`);
  //   get the array of dashboards
  let sheets = workbook.publishedSheetsInfo;
  //   dog is a temporary variable in the loop, can be called anything
  // on the array of 'sheets' for each thing, give me the index of the contents and the names
  console.log(sheets);
  sheets.forEach((dog) => {
    index = dog.index;
    console.log(`the sheet with index ${index} is ${dog.name}`);
  });
  //   find the active sheet
  vizActiveSheet = workbook.activeSheet;
  console.log(`the active sheet is ${vizActiveSheet.name}`);
  //   list all the sheets in the active sheet
  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((cat) => {
    index = cat.index;
    console.log(`the worksheet with index ${index} is ${cat.name}`);
  });
}

// running the function
// when the event "firstinteractive" happens, then run the function - do this as otherwise this code runs instantly but the Tableau takes a while to render, so can't retrieve information - this allows us to retrieve the information after it has loaded
viz.addEventListener("firstinteractive", logWorkbookInfo);

// creating the functions for the filters

// defining our buttons
const onwButton = document.getElementById("onw");
const clearButton = document.getElementById("clear");
const undoButton = document.getElementById("undo");

// logic for button functions
function onwFunc() {
  listSheets.forEach((pig) => {
    pig.applyFilterAsync("State", ["Washington", "Oregon"], "replace"); //applyFilterAsync exists within the embedding API
    //have to specify how want the filter to work
  });
}

function clearFunc() {
  listSheets.forEach((cow) => {
    cow.clearFilterAsync("State");
  });
}

function undoFunc() {
  viz.undoAsync();
}

// event listeners to run logic
onwButton.addEventListener("click", onwFunc); //upon click run the onwFunc
clearButton.addEventListener("click", clearFunc);
undoButton.addEventListener("click", undoFunc);
//undo does one chart at a time as although we see it happening all at once it actualy happens individually
