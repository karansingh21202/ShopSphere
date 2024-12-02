import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";
import { ordersData, contextMenuItems, ordersGrid } from "../data/dummy";
import { Header } from "../Components";
import { downloadCSV } from "../../utils/downloadCSV.jsx";

const Orders = () => {
  // Filter data to exclude any images
  const filteredOrdersData = ordersData.map(({ image, ...rest }) => rest);

  const handleDownload = () => {
    downloadCSV(filteredOrdersData, "orders.csv");
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      <button
  type="button"
  onClick={handleDownload}
  style={{
    color: "currentColor", // Text color will be the same as currentColor
    backgroundColor: "transparent", // Background is transparent to show the outline
    padding: "10px 20px",
    borderRadius: "10px",
    border: "2px solid currentColor", // Outline with currentColor
  }}
  className="text-md font-semibold transition-transform duration-300 ease-in-out transform hover:scale-105 hover:drop-shadow-lg hover:bg-currentColor hover:text-white"
>
  Download CSV
</button>


      <GridComponent
        id="gridcomp"
        dataSource={ordersData}
        allowPaging
        allowSorting
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            Edit,
            PdfExport,
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default Orders;
