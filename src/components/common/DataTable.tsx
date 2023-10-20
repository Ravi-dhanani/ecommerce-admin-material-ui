import React, { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import { Button, ThemeProvider, createTheme } from "@mui/material";
import MaterialTable from "material-table";

const tableIcons: any = {
  Add: forwardRef((props: any, ref) => <AddBox {...props} ref={ref} />),
  Clear: forwardRef((props: any, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props: any, ref) => (
    <DeleteOutline {...props} ref={ref} />
  )),

  Edit: forwardRef((props: any, ref) => <Edit {...props} ref={ref} />),
  Filter: forwardRef((props: any, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props: any, ref) => (
    <FirstPage {...props} ref={ref} />
  )),
  LastPage: forwardRef((props: any, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props: any, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props: any, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  Search: forwardRef((props: any, ref) => <Search {...props} ref={ref} />),
  ViewColumn: forwardRef((props: any, ref) => (
    <ViewColumn {...props} ref={ref} />
  )),
};

interface IDataTableProps {
  data: any;
  title: string;
  columns: any;
  isLoading: boolean;
  addButtonTitle: string;
  setDeleteId: (_id: string) => Promise<void>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setObject: (data: any) => void;
  setIsEdit: (data: any) => void;
}
export default function DataTable(props: IDataTableProps) {
  const {
    columns,
    data,
    title,
    isLoading,
    addButtonTitle,
    setDeleteId,
    setOpen,
    setObject,
    setIsEdit,
  } = props;
  const theme = createTheme();
  const tableRef = React.createRef<any>();

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          paddingBottom: "10px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: "#095192" }}
          onClick={() => {
            setOpen(true);
            setObject(null);
            setIsEdit(false);
          }}
        >
          {addButtonTitle}
        </Button>
      </div>
      <ThemeProvider theme={theme}>
        <MaterialTable
          tableRef={tableRef}
          columns={columns}
          data={data}
          title={title}
          icons={tableIcons}
          isLoading={isLoading}
          actions={[
            {
              icon: tableIcons.Edit,
              tooltip: "Edit",
              onClick: (event, rowData: any) => {
                setOpen(true);
                setIsEdit(true);
                setObject(rowData);
              },
            },
            {
              icon: tableIcons.Delete,
              tooltip: "Delete",
              onClick: (event, rowData: any) => {
                setDeleteId(rowData._id);
              },
            },
          ]}
          options={{
            actionsColumnIndex: -1,
            addRowPosition: "first",
            headerStyle: {
              backgroundColor: "#01579b",
              color: "#FFF",
            },
          }}
        />
      </ThemeProvider>
    </div>
  );
}
