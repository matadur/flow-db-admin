
Template.AdminDashboardView.events ({
	'click .download-csv' (event) {
    event.preventDefault()
    
		let tableId = ".table.dataTable"
		let obj = $(event.currentTarget)
		let col = obj&&obj.data("name") || ""

    let filename = `export-${col}-${moment().toISOString()}.csv`

		exportTableToCSV(tableId,filename)
	}
})


function exportTableToCSV( htmlTableId, filename ) {
  let csvLines = []
  let rows = document.querySelectorAll( htmlTableId + " tr" )
  
  for (let i = 0; i < rows.length; i++) {
    let row = [], cols = rows[i].querySelectorAll("td, th")
    
    for (let j = 0; j < cols.length; j++) 
      row.push(cols[j].innerText)
    
    csvLines.push(row.join(","))
  }

  let csv = csvLines.join("\n")

  downloadCSV(csv, filename)
}

function downloadCSV (csv, filename) {
  var csvFile, downloadLink;

  csvFile = new Blob([csv], {type: "text/csv"});

  downloadLink = document.createElement("a");
  downloadLink.download = filename;
  downloadLink.href = window.URL.createObjectURL(csvFile);
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();  
}

async function getJsonFromCSV( csvStr ) {

  const csv = require('csvtojson')
  const jsonArr = await csv().fromString(csvStr)

  return jsonArr
}

    