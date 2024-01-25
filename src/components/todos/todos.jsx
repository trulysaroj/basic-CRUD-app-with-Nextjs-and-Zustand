"use client";
import React, { useState } from "react";
import { useTodosStore } from "@/zustand store/todos";
import { SiTarget } from "react-icons/si";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Todos = () => {
  const { todos, addTodo, editTodo, deleteTodo, deleteAllTodo } =
    useTodosStore();
  const [task, setTask] = useState("");
  const [taskId, setTaskId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // FOR ADDING NEW TODO:
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (!task) return;

    const newTodo = {
      id: Date.now(),
      task,
    };

    addTodo(newTodo);
    setTask("");
  };

  // FOR EDITING TODO:
  const EditTodo = (id) => {
    const todo = todos.filter((todo) => todo.id === id)[0];
    setTask(todo.task);
    setTaskId(id);
    setIsEdit(true);
  };

  const handleEditTodo = (e) => {
    e.preventDefault();
    if (!task) return;

    const updatedTodo = {
      id: taskId,
      task,
    };

    editTodo(updatedTodo.id, updatedTodo);
    setTask("");
    setIsEdit(false);
  };

  // FOR DELETING SINGLE TODO:
  const handleDeleteTodo = (taskId) => {
    deleteTodo(taskId);
  };

  // FOR DELETING ALL TODO
  const hanndleDeleteallTodo = () => {
    deleteAllTodo();
  };

  return (
    <div>
      <div className="flex items-center gap-4  w-[500px] ">
        <SiTarget className="text-3xl" />
        <h1 className="text-3xl font-bold text"> My To-do list</h1>
      </div>

      <form className="mt-5">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="eg. Fix minor bug ..."
          className="w-[400px] py-3 px-2"
        />

        <button
          onClick={isEdit ? handleEditTodo : handleAddTodo}
          className="py-3 px-2 bg-slate-900 text-white font-bold"
        >
          {isEdit ? "Edit Todo" : "Add Todo"}
        </button>
      </form>

      <hr className="bg-gray-800 hr[2px] mt-3" />

      {todos ? (
        todos.map((todo) => (
          <div
            className="w-[700px] flex  justify-between items-center px-4  py-4 mt-3 rounded-md shadow-md"
            key={todo.id}
          >
            <p className="font-semibold"> {todo.task} </p>

            <div className="flex w-24 justify-between mr-10  gap-2">
              <button
                onClick={() => EditTodo(todo.id)}
                className="bg-blue-500 w-32 px-2 flex items-center rounded-sm text-white"
              >
                <FaEdit />
                Edit
              </button>

              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="bg-red-500   w-36 px-2 mr-  flex items-center rounded-sm  text-white"
              >
                <MdDeleteForever />
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>You haven't any task yet !! </p>
      )}

      {todos.length > 1 && (
        <button
          onClick={hanndleDeleteallTodo}
          className="bg-slate-900 text-white font-bold py-2 px-4 mt-10 ml-[590px]"
        >
          Delete all
        </button>
      )}
    </div>
  );
};

export default Todos;
