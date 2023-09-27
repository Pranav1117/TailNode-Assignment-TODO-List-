import React, { useEffect, useState } from "react";
import deleteIcon from "../media/delete.png";
import "./todo.css";

const Todo = () => {
  //state for each task
  const [activity, setActivity] = useState("");

  //state for complete list in form of array
  const [list, setList] = useState([]);

  //state for marked task in form of array
  const [markedDoneList, setMarkedDoneList] = useState([]);

  const [markDone, setMarkDone] = useState(false);

  //function that handle mark done button
  const handleMarkDone = (id) => {
    //getting marked task by filter using its index
    let markedItem = list.filter((item, index) => {
      return index == id;
    });

    //getting updated list where marked task is removed from array
    let updated = list.filter((item, index) => {
      return index !== id;
    });

    //updating states with updated values after mark done
    setList(updated);
    setMarkedDoneList([...markedDoneList, markedItem]);

    //setting updated list in localstorage
    localStorage.setItem("todoList", updated);

    localStorage.setItem("markedTodoList", [...markedDoneList, markedItem]);
  };

  //handling On chnage of input
  const handleOnChange = (e) => {
    //setting value of task state on onchange
    setActivity(e.target.value);
  };

  //handling add task
  const handleAddTask = (e) => {
    //preventing refresh behaviour of browser on click
    e.preventDefault();

    //adding task's in array only if input is not empty
    if (activity) {
      //setting array state with previous as well as new task
      setList([...list, activity]);

      //erasing everything in input after adding
      setActivity("");

      //updating both marked list array and todo list array values in localstorage
      localStorage.setItem("todoList", [...list, activity]);
      localStorage.setItem("markedTodoList", markedDoneList);
    } else {
    }
  };

  // handling delete task
  const handleDelete = (id) => {
    // getting task other than deleted task by index using filter method
    const updatedList = list.filter((ele, index) => {
      return index != id;
    });

    // updating array state and localstate value after deleting task
    setList(updatedList);
    localStorage.setItem("todoList", updatedList);
  };

  // handling deleting all task's
  const handleResetAll = () => {
    // erasing everything in every state and updating localstorage with empty array
    setList([]);
    setMarkedDoneList([]);
    localStorage.setItem("todoList", []);
    localStorage.setItem("markedTodoList", []);
  };

  // component did mount
  useEffect(() => {
    // getting data from localstorage
    let a = localStorage.getItem("todoList");

    // updating list state only if localstorage is not empty
    if (a) {
      let storedList = a.split(",");

      setList(storedList);
    }

    // getting data from localstorage
    let b = localStorage.getItem("markedTodoList");

    // updating task state only if localstorage is not empty
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
              {/* mapping over list state only if list state is not empty */}
              {list.length > 0 ? (
                list.map((item, index) => {
                  return (
                    // giving each indiviual div key value as index to identify specific div and target it with index
                    <div className="todo-list-wrapper" key={index}>
                      <div className={`todo-list ${markDone ? "marked" : ""}`}>
                        {/* rendering every task we've stored in list state */}
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
                // showing below p tag of todo list is empty 
                <p className="empty-txt">Your ToDo list is empty</p>
              )}
            </div>

            <div className="marked-todos-wrapper">
              <p className="done-txt">Completed Task's</p>
              {/* mapping over marked done state only if its not empty */}
              {markedDoneList.length > 0
                ? markedDoneList.map((item, index) => {
                    return (
                      // giving each indiviual div key value as index to identify specific div and target it with index
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
