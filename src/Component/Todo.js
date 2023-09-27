import React, { useEffect, useState } from "react";
import deleteIcon from "../media/delete.png";
import "./todo.css";

const Todo = () => {
  const [activity, setActivity] = useState("");

  const [list, setList] = useState([]);

  const [markedDoneList, setMarkedDoneList] = useState([]);

  const [markDone, setMarkDone] = useState(false);

  const handleMarkDone = (id) => {
    let markedItem = list.filter((item, index) => {
      return index == id;
    });

    let updated = list.filter((item, index) => {
      return index !== id;
    });
    setList(updated);
    setMarkedDoneList([...markedDoneList, markedItem]);
    localStorage.setItem("todoList", updated);

    localStorage.setItem("markedTodoList", [...markedDoneList, markedItem]);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === "Enter") {
      // Trigger the button click event when Enter key is pressed
      handleAddTask();
    }
  };
  const handleOnChange = (e) => {
    setActivity(e.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (activity) {
      setList([...list, activity]);

      console.log(list);
      setActivity("");
      localStorage.setItem("todoList", [...list, activity]);
      localStorage.setItem("markedTodoList", markedDoneList);
    } else {
    }
  };

  const handleDelete = (id) => {
    const updatedList = list.filter((ele, index) => {
      return index != id;
    });

    setList(updatedList);
    localStorage.setItem("todoList", updatedList);
  };

  const handleResetAll = () => {
    setList([]);
    setMarkedDoneList([]);
    localStorage.setItem("todoList", []);
    localStorage.setItem("markedTodoList", []);
  };

  useEffect(() => {
    let a = localStorage.getItem("todoList");

    if (a) {
      let storedList = a.split(",");

      setList(storedList);
    }

    let b = localStorage.getItem("markedTodoList");

    if (b) {
      let storedMarkList = b.split(",");

      setMarkedDoneList(storedMarkList);
    }
  }, []);

  return (
    <>
      <div className="main-container">
        <header>
          <div className="title">
            <h1> Todo's </h1>
          </div>

          <div className="reset-btn">
            <button onClick={handleResetAll}>
              <img src={deleteIcon} alt="delete" className="delete-icon" />
            </button>
          </div>
        </header>

        <section>
          <div className="title-input-wrapper">
            <div className="title-wrapper">
              <h3>Add ToDo's </h3>
            </div>

            <div className="input-wrapper">
              <form>
                <input
                  className="input"
                  placeholder="Add task here. . . . . ."
                  name="task"
                  onChange={handleOnChange}
                  value={activity}
                />
                <button
                  className="add-btn"
                  type="submit"
                  onSubmit={handleAddTask}
                  onClick={handleAddTask}
                >
                  Add
                </button>
              </form>
            </div>
          </div>

          <div className="todo-list-container">
            <div className="unmarked-todo-wrapper">
              {list.length > 0 ? (
                list.map((item, index) => {
                  return (
                    <div className="todo-list-wrapper" key={index}>
                      <div className={`todo-list ${markDone ? "marked" : ""}`}>
                        {item}
                      </div>
                      <div className="delete-mark-btns">
                        <button
                          className="mark-btn"
                          onClick={() => handleMarkDone(index)}
                        >
                          Mark Done
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(index)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="empty-txt">Your ToDo list is empty</p>
              )}
            </div>

            <div className="marked-todos-wrapper">
              <p className="done-txt">Completed Task's</p>
              {markedDoneList.length > 0
                ? markedDoneList.map((item, index) => {
                    return (
                      <div className="marked" key={index}>
                        {item}
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Todo;
