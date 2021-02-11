import React from "react";
import { ToDo } from "./ToDo";

export const ToDoList = ({ tasks, match, onToggleCompleted }) => {
  let filteredTasks;
  switch (match.params.filter) {
    case "completed":
      filteredTasks = tasks.filter((it) => it.completed);
      break;
    default:
      filteredTasks = tasks;
  }

  if (filteredTasks.length === 0) {
    return (
      <>
        <h1 className="m-3">Liste de tâches</h1>
        <ul className="list-group m-3">
          <li className="list-group-item">No tasks to display</li>
        </ul>
      </>
    );
  }

  return (
    <>
      <h1 className="m-3">Liste de tâches</h1>
      <ul className="list-group m-3">
        {filteredTasks.map((it) => (
          <ToDo task={it} key={it.id} onToggleCompleted={onToggleCompleted} />
        ))}
      </ul>
    </>
  );
};
