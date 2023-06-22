import { Injectable, Input } from '@angular/core';
import { Task } from '../interfaces/task';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(
    []
  );

  public tasks$ = this.tasksSubject.asObservable();
  // public tasks$ = new BehaviorSubject<Task[]>([]);
  private currentId: number = 1;
  private tasks: Task[] = [];

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
    this.tasks$.pipe(take(1)).subscribe((tasks) => {
      const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = updatedTask;
        this.tasksSubject.next(updatedTasks);
        console.log(this.tasksSubject.subscribe((s) => console.log('asd', s)));
      } else {
        console.log('Task not found');
      }
    });
  }

  createTask(task: Task): void {
    const currentTasks = this.tasksSubject.getValue();
    const newTask: Task = {
      ...task,
      id: this.currentId++,
      completed: task.completed,
    };
    const updatedTasks = [...currentTasks, newTask];
    this.tasksSubject.next(updatedTasks);
  }

  deleteTask(taskId: number): void {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.filter((task) => task.id !== taskId);
    this.tasksSubject.next(updatedTasks);
  }
}
