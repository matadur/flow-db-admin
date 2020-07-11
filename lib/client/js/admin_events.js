
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


const colsExcludedFromExport = ['Edit','Delete','Order Form','Photo']

const hasCheck = (col) => {
  let h = col && $(col.innerHTML)
  return h && h.hasClass('fa-check')
}

const isExcluded = (col) => {
  let text = col && col.innerText || ""
  if (colsExcludedFromExport.find((c)=>c===text)) return true
  return false
}

const cleanString = (str) => {
  if (!str) return ""
  str = str.toString()
  str = str.replace(/\,/g,'')
  return str
}

function exportTableToCSV( htmlTableId, filename ) {
  
  let csvLines = []
  let rows = document.querySelectorAll( htmlTableId + " tr" )
  let rowCount = rows.length
  let colCount = 0

  if (rowCount > 0) {
    let headers = rows[0].querySelectorAll("th")
    headers && headers.forEach((col)=>{
      if (!isExcluded(col)) colCount++
    })
  }
  
  for (let i = 0; i < rowCount; i++) {
    let row = [], cols = rows[i].querySelectorAll("td, th")
    
    for (let j = 0; j < Math.min(colCount,cols.length); j++) {
      let col = cols[j]

      let text = col.innerText || (hasCheck(col) && true) || ""

      row.push(cleanString(text))
    }
    
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

    