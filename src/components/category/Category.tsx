import React from "react";
import Swal from "sweetalert2";
import AddUpdateCategory from "./AddUpdateCategory";
import { useCategoryList } from "../services/query/ApiHandlerQuery";
import DataTable from "../common/DataTable";
import ApiServices from "../services/Apiservices";

export default function Category() {
  const list = useCategoryList();
  const [open, setOpen] = React.useState(false);
  const [objCategory, setObjCategory] = React.useState<any>();
  const [isEdit, setIsEdit] = React.useState(false);

  async function deleteCategoryData(_id: string) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        const res = await ApiServices.deleteCategory(_id);
        if (result.isConfirmed) {
          Swal.fire("Deleted!", `${"Category Deleted"}`, "success");
          list.refetch();
        }
      });
    } catch (err: any) {
      console.log(err);
    }
  }

  return (
    <div>
      <div style={{ marginLeft: "50px", marginRight: "50px" }}>
        <div>
          <DataTable
            title={"Category"}
            columns={[
              {
                title: "Category Image",
                field: "CategoryImage",
                render: (item: any) => (
                  <img src={item.CategoryImage} height={90} width={100} />
                ),
              },
              { title: "Category Title", field: "CategoryTitle" },
              { title: "Date", field: "Date" },
            ]}
            data={list.data}
            setDeleteId={deleteCategoryData}
            setOpen={setOpen}
            setObject={setObjCategory}
            setIsEdit={setIsEdit}
            isLoading={list.isLoading}
            addButtonTitle="Add Category"
          />
        </div>
      </div>
      {open ? (
        <AddUpdateCategory
          open={open}
          setOpen={() => {
            setOpen(false);
            list.refetch();
          }}
          isEdit={isEdit}
          objCategory={objCategory}
        />
      ) : null}
    </div>
  );
}
