// import axios from "axios";
import { MethodDelete, MethodPost, MethodPut } from "./Slice/Slice2";
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

export const FunctionsCrudMethods = () => {
  const [create, setCreate] = useState("");
  const [edit, setEdit] = useState(null);
  const despachar = useDispatch();

  const CreateMethod = () => {
    if (create) {
      const newPost = { id: Date.now().toString(), name: create };
      despachar(MethodPost(newPost));
      axios
        .post("http://localhost:3002/names/", newPost)
        .then(() => setCreate(""))
        .catch((err) => console.error(err));
    }
  };

  const DeleteMethod = (id) => {
    despachar(MethodDelete(id));
    axios
      .delete(`http://localhost:3002/names/${id}`)
      .catch((err) => console.error(err));
  };

  const UpdateMethod = () => {
    edit ? despachar(MethodPut({ id: edit.id, name: edit.name })) : false;
    axios
      .put(`http://localhost:3002/names/${edit.id}`, { name: edit.name })
      .then(() => setEdit(null))
      .catch((err) => console.error(err));
  };
  return {
    CreateMethod,
    DeleteMethod,
    UpdateMethod,
    create,
    edit,
    setCreate,
    setEdit
  }
}