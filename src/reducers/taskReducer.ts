import { Task, TaskStatus } from "../types";

export enum TaskActionTypes {
  ADD_TASK = "ADD_TASK",
  UPDATE_TASK = "UPDATE_TASK",
  DELETE_TASK = "DELETE_TASK",
  CHANGE_STATUS = "CHANGE_STATUS",
  FILTER_TASKS = "FILTER_TASKS",
}

export type TaskAction =
  | { type: TaskActionTypes.ADD_TASK; payload: Task }
  | {
      type: TaskActionTypes.UPDATE_TASK;
      payload: { id: string; updates: Partial<Task> };
    }
  | { type: TaskActionTypes.DELETE_TASK; payload: string }
  | {
      type: TaskActionTypes.CHANGE_STATUS;
      payload: { id: string; status: TaskStatus };
    }
  | {
      type: TaskActionTypes.FILTER_TASKS;
      payload: TaskStatus | "ALL";
    };

export interface TaskState {
  tasks: Task[];
  filteredTasks: Task[];
  filter: TaskStatus | "ALL";
}

export const initialTaskState = (initialTasks: Task[]): TaskState => ({
  tasks: initialTasks,
  filteredTasks: initialTasks,
  filter: "ALL",
});

export const taskReducer = (
  state: TaskState,
  action: TaskAction,
): TaskState => {
  switch (action.type) {
    case TaskActionTypes.ADD_TASK: {
      const updatedTasks = [action.payload, ...state.tasks];

      return {
        ...state,
        tasks: updatedTasks,
        filteredTasks: filterTasks(updatedTasks, state.filter),
      };
    }

    case TaskActionTypes.UPDATE_TASK: {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, ...action.payload.updates, updatedAt: new Date() }
          : task,
      );

      return {
        ...state,
        tasks: updatedTasks,
        filteredTasks: filterTasks(updatedTasks, state.filter),
      };
    }

    case TaskActionTypes.DELETE_TASK: {
      const updatedTasks = state.tasks.filter(
        (task) => task.id !== action.payload,
      );

      return {
        ...state,
        tasks: updatedTasks,
        filteredTasks: filterTasks(updatedTasks, state.filter),
      };
    }

    case TaskActionTypes.CHANGE_STATUS: {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, status: action.payload.status, updatedAt: new Date() }
          : task,
      );

      return {
        ...state,
        tasks: updatedTasks,
        filteredTasks: filterTasks(updatedTasks, state.filter),
      };
    }

    case TaskActionTypes.FILTER_TASKS: {
      return {
        ...state,
        filter: action.payload,
        filteredTasks: filterTasks(state.tasks, action.payload),
      };
    }

    default:
      return state;
  }
};

const filterTasks = (tasks: Task[], filter: TaskStatus | "ALL") => {
  if (filter === "ALL") return tasks;
  return tasks.filter((task) => task.status === filter);
};
