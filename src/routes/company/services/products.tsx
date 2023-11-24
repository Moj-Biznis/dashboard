import { Eye, Plus, Trash } from "react-feather"
import DataTable, { Action, ActionTypes, Field, TableAction } from "../../../components/datatable"
import { ItemDTO } from "../../../shared/interfaces/item.interface"
import CreateItemModal from "../../../modals/items/create_item_modal"
import axios_instance from "../../../config/api_defaults"
import { useState } from "react"
import { useQueryClient } from "react-query"
import SweetAlert2 from "react-sweetalert2"
import toast, { Toaster } from "react-hot-toast"
import EditItemModal from "../../../modals/items/edit_item_modal"
import { useTranslation } from "react-i18next"

const Products = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [isCreateItemModalOpen, setIsCreateItemModalOpen] = useState(false);
  const [isShowItemModalOpen, setIsShowItemModalOpen] = useState(false);
  const [activeShowItem, setActiveShowItem] = useState("");
  const [swalProps, setSwalProps] = useState({});
  const actions: Action<ItemDTO>[] = [
    {
      type: ActionTypes.Show,
      icon: <Eye />,
      fn: (item: ItemDTO) => { openShowModal(item.id) }
    },
    {
      type: ActionTypes.Delete,
      icon: <Trash />,
      fn: (item: ItemDTO) => { raiseDeleteAlert(parseInt(item.id)) }
    },
  ]
  const openShowModal = (id: string) => {
    setActiveShowItem(id);
    setIsShowItemModalOpen(true);
  }
  const raiseDeleteAlert = (id: number) => {
    setSwalProps({
      show: true,
      icon: 'error',
      title: 'Molimo potvrdite',
      text: 'This action is unreversible and it will delete client with  all records associated with him',
      cancelButtonColor: "green",
      reverseButtons: true,
      showCancelButton: true,
      showConfirmButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonText: "Go for it",
      confirmButtonColor: "red",
      onConfirm: () => { deleteItem(id) },
      onResolve: setSwalOff
    });
  }

  function setSwalOff() {
    const dataCopied = JSON.parse(JSON.stringify(swalProps));
    dataCopied.show = false;
    setSwalProps(dataCopied);
  }

  const deleteItem = (id: number) => {
    axios_instance().delete(`/items/${id}`).then(() => {
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })
      toast.success(t('common.delete_success'))
    })
  }

  const fields: Field[] = [
    {
      name: "Ime",
      editable_from_table: true,
      show: true,
      original_name: "name",
      has_sort: true
    },
    {
      name: "Cena",
      editable_from_table: true,
      show: true,
      original_name: "price",
      has_sort: true
    },
    {
      name: "Cena sa popustom",
      editable_from_table: true,
      show: true,
      original_name: "selling_price",
      has_sort: true
    },
    {
      name: "Trajanje",
      editable_from_table: true,
      show: true,
      original_name: "duration",
      has_sort: true
    }
  ]
  const table_actions: TableAction[] = [{
    icon: <Plus />,
    fn: () => { setIsCreateItemModalOpen(true) }
  }]

  const cancelFunction = () => {
    setIsCreateItemModalOpen(false)
  }
  const cancelShowFunction = () => {
    setIsShowItemModalOpen(false)
  }
  const saveShowFunction = (form: ItemDTO) => {
    axios_instance().put(`/items/${form.id}`, form).then(() => {
      toast.success(t('common.update_success'))
      queryClient.invalidateQueries({ queryKey: ['products'] })
      setIsShowItemModalOpen(false);
    })
  }
  const saveFunction = (form: ItemDTO) => {
    axios_instance().post('/items', form).then(() => {
      setIsCreateItemModalOpen(false)
      queryClient.invalidateQueries({
        queryKey: ['products'],
      })
    })


  }
  return (
    <>
      <Toaster />
      <SweetAlert2 {...swalProps} />
      <EditItemModal
        modalType="product"
        saveFunction={saveShowFunction}
        isOpen={isShowItemModalOpen}
        cancelFunction={cancelShowFunction}
        item_id={activeShowItem}
      />
      <CreateItemModal
        cancelFunction={cancelFunction}
        saveFunction={saveFunction}
        isOpen={isCreateItemModalOpen}
        modalType="product"
      />
      <DataTable
        queryKey="products"
        table_actions={table_actions}
        has_actions={true}
        table_name="Proizvodi"
        url="items?type=product&per_page=10"
        actions={actions}
        fields={fields}
      ></DataTable>
    </>
  )
}

export default Products