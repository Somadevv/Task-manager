import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  @Injectable({
    providedIn: 'root',
  })
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    []
  );
  public tasks$ = this.tasksSubject.asObservable();
  private currentId: number = 1;

  constructor() {
    // Initialize with default tasks
    const initialTasks: Task[] = [
      { id: 1, task: 'Task 1', priority: 1, completed: false },
      { id: 2, task: 'Task 2', priority: 2, completed: true },
      { id: 3, task: 'Task 3', priority: 3, completed: false },
    ];
    this.tasksSubject.next(initialTasks);
  }

  fetchTasks(): BehaviorSubject<Task[]> {
    return this.tasksSubject;
  }

  addTask(task: Task): void {
    task.id = this.currentId++;
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = [...currentTasks, task];
    this.tasksSubject.next(updatedTasks);
  }

  updateTask(updatedTask: Task): void {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.map((task) =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    );
    this.tasksSubject.next(updatedTasks);
  }

  deleteTask(taskId: number): void {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.filter((task) => task.id !== taskId);
    this.tasksSubject.next(updatedTasks);
  }
}
