import React, { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";

import ViewColumn from "@material-ui/icons/ViewColumn";
import { ThemeProvider, createTheme } from "@mui/material";
import MaterialTable from "material-table";

const tableIcons: any = {
  Add: forwardRef((props: any) => <AddBox fontSize="large" color="primary" />),
  Check: forwardRef((props: any, ref: any) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props: any, ref: any) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props: any, ref: any) => (
    <DeleteIcon {...props} ref={ref} color="error" />
  )),
  DetailPanel: forwardRef((props: any, ref: any) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props: any, ref: any) => (
    <Edit {...props} ref={ref} color="primary" />
  )),

  Export: forwardRef((props: any, ref: any) => (
    <SaveAlt {...props} ref={ref} />
  )),
  Filter: forwardRef((props: any, ref: any) => (
    <FilterList {...props} ref={ref} />
  )),
  FirstPage: forwardRef((props: any, ref: any) => (
    <FirstPage {...props} ref={ref} />
  )),
  LastPage: forwardRef((props: any, ref: any) => (
    <LastPage {...props} ref={ref} />
  )),
  NextPage: forwardRef((props: any, ref: any) => (
    <ChevronRight {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props: any, ref: any) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props: any, ref: any) => (
    <Clear {...props} ref={ref} />
  )),
  Search: forwardRef((props: any, ref: any) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props: any, ref: any) => (
    <ArrowDownward {...props} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props: any, ref: any) => (
    <Remove {...props} ref={ref} />
  )),
  ViewColumn: forwardRef((props: any, ref: any) => (
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
              icon: tableIcons.Add,
              isFreeAction: true,
              tooltip: "Add ",
              onClick: () => {
                setOpen(true);
                setObject(null);
                setIsEdit(false);
              },
            },
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
