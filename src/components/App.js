import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToDoList } from "./ToDoList";
import { NavBar } from "./NavBar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AddTask } from "./AddTask";
import { initialData } from "../initialData";
import { Fetching } from "./Fetching";
import uniqid from "uniqid";

export class App extends React.Component {
  state = {
    tasks: [],
    fetching: true,
  };

  componentDidMount = () => {
    const delay = Math.floor(Math.random() * 5000);

    setTimeout(() =>{
      this.setState({
        fetching: false,
        tasks: initialData,
      })
    }, delay)
  }

  onToggleCompleted = (taskId) => {
    this.state.tasks.find(
      (it) => it.id === taskId
    ).completed = !this.state.tasks.find((it) => it.id === taskId).completed;
  };

  onAddTask = (newTaskName) => {
    const newId = uniqid();
    console.log(newId);
    const newTask = {
      id: newId,
      name: newTaskName,
      completed: false,
    };
    this.setState((prevState) => ({
      tasks: [...prevState.tasks, newTask],
    }));
  };

  onDeleteCompleted = () => {
    this.setState((prevState) => {
      const newState = prevState.tasks.filter((task) => !task.completed);
      return {
        tasks: newState,
      };
    });
  };

  render() {
    return (
      <section id="todo">
        {this.state.fetching ? <Fetching /> : null}
        <BrowserRouter>
          <Switch>
            <Route
              path="/add-task"
              render={(props) => (
                <AddTask {...props} onAddTask={this.onAddTask} />
              )}
            />
            <Route
              path="/:filter?"
              render={(props) => (
                <ToDoList
                  {...props}
                  tasks={this.state.tasks}
                  onToggleCompleted={this.onToggleCompleted}
                />
              )}
            />
          </Switch>
          <NavBar onDeleteCompleted={this.onDeleteCompleted} />
        </BrowserRouter>
      </section>
    );
  }
}
