// utils/downloadCSV.jsx
export const downloadCSV = (data, filename = "transactions.csv") => {
  // Extract the headers from the first transaction object
  const csvHeaders = ['title', 'amount', 'desc']; // Explicitly define the headers based on the data you need
  
  // Map each transaction to a row of CSV data
  const csvRows = data.map(row => [
    row.title,       // title
    row.amount,      // amount
    row.desc         // description
  ]);
  
  // Combine headers and rows into the final CSV content
  const csvContent = [csvHeaders.join(","), ...csvRows.map(row => row.join(","))].join("\n");

  // Create a Blob and trigger the download
  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
