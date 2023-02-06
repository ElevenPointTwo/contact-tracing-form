function dataFiller() {
  /**
   * Autocompletes a student's contact tracing data by using their name and pulling the rest of the data from a database.
   */


  // Opening the database and organizing the data into a list
  var database = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1uXqoQmfJB3F4XWk8UXCdgP-pMFFZMDUPcUMOvJuPtSU/edit?resourcekey#gid=1318692408");
  var data = database.getDataRange().getValues();


  // Opening the spreadsheet where the data needs to be filled
  var currentSheet = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1etom3qTAUCcQOpQgQS4ELhgCM71kwvXZbxrRrVzQE-c/edit?resourcekey#gid=524137457").getActiveSheet();
  var currentData = currentSheet.getDataRange().getValues();


  // Getting today's date 
  var today = new Date();
  var date = today.getFullYear() + " " + (today.getMonth()+1) + " " + today.getDate();
  
  // Setting the colour based on the previous colour used. My original idea was absolutely not working.
  var lightGreen = "#d9ead3"; 
  var lightCyan = "#d0e0e3";
  var colour;


  if(currentSheet.getRange(2, 8).getValue() == "Green") {
    currentSheet.getRange(2, 8).setValue("Blue");
    colour = lightCyan;
  }
  else {
    currentSheet.getRange(2, 8).setValue("Green");
    colour = lightGreen;
  }


  // Autofilling
  for(i=1; i < currentData.length; i++) { // Going through every name on the current spreadsheet
    if (currentSheet.getRange(i+1, 3).getValue() == "") { // Will only autocomplete new entries so it doesn't overwrite any older ones
      for (j = 1; j < data.length; j++) { // For each name it's going through every name on the database and comparing them
        if(currentData[i][1].toUpperCase().trim() == data[j][1].toUpperCase().trim()) { // If the two are the same, then it'll autofill using the database
          currentSheet.getRange(i+1, 3).setValue(date); // Filling in the date
          currentSheet.getRange(i+1, 4).setValue(data[j][3].toString().substr(4, 11)); // Filling in their birthday, the substring is to only grab the date and not other irrelevant info
          currentSheet.getRange(i+1, 5).setValue(data[j][4]); // Filling in their student #
          currentSheet.getRange(i+1, 6).setValue(data[j][5]); // Filling in their phone #
          currentSheet.getRange(i+1, 7).setValue(data[j][6]); // Filling in their address


          currentSheet.getRange('A'+(i+1)+':'+'G'+(i+1)).setBackground(colour); // Highlights the row in a colour depending on the date to distinguish the groups of data
        }
      }
    }
  }
}
