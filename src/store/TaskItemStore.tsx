import { create } from "zustand";
import { persist, createJSONStorage  } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { type TaskItemProps } from "../libs/Task";

export const useTaskStore = create<TaskItemProps>()(
  persist(
    (set) => ({
      tasks: [],

      setTasks: (tasks) => set({ tasks }),

      addTask: (title, description, dueDate, assignees) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: uuidv4(),
              title,
              description,
              dueDate,
              assignees,
              isDone: false,
              doneAt: null,
            },
          ],
        })),

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  isDone: !task.isDone,
                  doneAt: task.isDone
                    ? null
                    : new Date().toLocaleDateString(),
                }
              : task
          ),
        })),

      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
    }),
    {
      name: "my-task", 
      storage: createJSONStorage(() => localStorage), 
      partialize: (state) => ({ tasks: state.tasks }),
    }
  )
);
