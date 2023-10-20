import React from "react";
import Swal from "sweetalert2";
import AddUpdateCarousel from "./AddUpdateCarousel";
import { useCarouselList } from "../services/query/ApiHandlerQuery";
import ApiServices from "../services/Apiservices";
import Message from "../common/massage/Message";
import DataTable from "../common/DataTable";
import { setIsEdit, setSuccess, store } from "../services/pulState/store";

export default function Carousel() {
  const list = useCarouselList();
  const [open, setOpen] = React.useState(false);
  const [objCarousel, setObjCarousel] = React.useState<any>();
  const isEdit = store.useState((s) => s.isEdit);
  const isSuccess = store.useState((s) => s.isSuccess);
  const showSuccessMessage = store.useState((s) => s.successMessage);
  async function deleteCarouselData(_id: string) {
    try {
      Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Delete",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await ApiServices.deleteCarousel(_id);
          console.log(res);
          Swal.fire(
            "Deleted!",
            `${res.message ? res.message : "Carousel Deleted"}`,
            "success"
          );
          list.refetch();
        }
      });
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${err.message}`,
      });
    }
  }

  return (
    <div>
      <div style={{ marginLeft: "50px", marginRight: "50px" }}>
        <Message
          open={isSuccess}
          setOpen={setSuccess}
          message={showSuccessMessage}
        />
        <div>
          <DataTable
            title={"Carousel"}
            columns={[
              {
                title: "ImageUrl",
                field: "ImageUrl",
                render: (item: any) => (
                  <img src={item.ImageUrl} height={90} width={100} />
                ),
              },
              { title: "Title", field: "Title" },
              { title: "Date", field: "Date" },
            ]}
            data={list.data}
            setDeleteId={deleteCarouselData}
            setOpen={setOpen}
            setObject={setObjCarousel}
            setIsEdit={setIsEdit}
            isLoading={list.isLoading}
            addButtonTitle={"Add Carousel"}
          />
        </div>
      </div>
      {open && (
        <AddUpdateCarousel
          open={open}
          setOpen={() => {
            setOpen(false);
            list.refetch();
          }}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          objCarousel={objCarousel}
          setObjCarousel={setObjCarousel}
        />
      )}
    </div>
  );
}
