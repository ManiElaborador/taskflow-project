import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";

function Dashboard() {
const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");

  useEffect(() => {

    fetchTasks();

  }, []);

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(response.data);

    } catch (error) {

  console.log(error);

  localStorage.removeItem("token");

  navigate("/");

}

  };

  const addTask = async () => {

    try {

      await axios.post(
        "http://localhost:8080/tasks",
        {
          title: title,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  const deleteTask = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8080/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div>

      <Navbar title="Task Dashboard" />

      <div className="login-container">

        <div className="login-box">

          <h2>Add Task</h2>

          <input
            type="text"
            placeholder="Enter Task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button onClick={addTask}>
            Add Task
          </button>

          <hr />

          <h2>My Tasks</h2>

          {

            tasks.map((task) => (

              <div key={task.id}>

                <p>{task.title}</p>

                <button
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>

                <hr />

              </div>

            ))

          }

        </div>

      </div>

    </div>

  );

}

export default Dashboard;