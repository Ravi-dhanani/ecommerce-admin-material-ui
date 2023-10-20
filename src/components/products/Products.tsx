import React from "react";
import Swal from "sweetalert2";
import AddUpdateProducts from "./AddUpdateProducts";
import { useProductList } from "../services/query/ApiHandlerQuery";
import ApiServices from "../services/Apiservices";
import DataTable from "../common/DataTable";

export default function Products() {
  const list = useProductList();
  const [open, setOpen] = React.useState(false);
  const [objProduct, setObjProduct] = React.useState();
  const [isEdit, setIsEdit] = React.useState(false);

  async function deleteCarouselData(_id: string) {
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
        const res = await ApiServices.deleteProduct(_id);
        if (result.isConfirmed) {
          Swal.fire("Deleted!", `${"Carousel Deleted"}`, "success");
          list.refetch();
        }
      });
    } catch (err: any) {
      console.log(err);
    }
  }

  // if (list.isLoading) return <Loading />;

  return (
    <div>
      <div style={{ marginLeft: "50px", marginRight: "50px" }}>
        <div>
          <DataTable
            title={"Products"}
            columns={[
              {
                title: "Product Image",
                field: "MainImage",
                render: (item: any) => (
                  <img src={item.MainImage} height={90} width={100} />
                ),
              },
              { title: "Product Name", field: "Title" },
              { title: "Category", field: "Category" },
              { title: "Arrivals", field: "Title" },
            ]}
            data={list.data}
            setDeleteId={deleteCarouselData}
            setOpen={setOpen}
            setObject={setObjProduct}
            setIsEdit={setIsEdit}
            isLoading={list.isLoading}
            addButtonTitle={"Add Product"}
          />
        </div>
      </div>
      {open ? (
        <AddUpdateProducts
          open={open}
          setOpen={() => {
            setOpen(false);
            list.refetch();
          }}
          isEdit={isEdit}
          objProduct={objProduct}
        />
      ) : null}
    </div>
  );
}
