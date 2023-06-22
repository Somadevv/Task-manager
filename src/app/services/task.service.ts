import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

class TaskDto {
  constructor(
    public id: number,
    public task: string,
    public priority: number,
    public completed: boolean
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject: BehaviorSubject<TaskDto[]> = new BehaviorSubject<
    TaskDto[]
  >([]);

  public tasks$ = this.tasksSubject.asObservable();
  private currentId: number = 4;

  constructor() {
    // Initialize with default tasks
    const initialTasks: TaskDto[] = [
      new TaskDto(1, 'Task 1', 1, false),
      new TaskDto(2, 'Task 2', 2, true),
      new TaskDto(3, 'Task 3', 3, false),
    ];
    this.updateTasks(initialTasks);
  }

  updateTasks(tasks: TaskDto[]): void {
    const sortedTasks = tasks.sort((a, b) => b.priority - a.priority);
    this.tasksSubject.next(sortedTasks);
  }

  fetchTasks(): BehaviorSubject<TaskDto[]> {
    return this.tasksSubject;
  }

  addTask(task: TaskDto): void {
    task.id = this.currentId++;
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = [...currentTasks, task];
    this.updateTasks(updatedTasks);
  }

  updateTask(updatedTask: TaskDto): void {
    this.tasks$.pipe(take(1)).subscribe((tasks) => {
      const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);
      if (taskIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = updatedTask;
        this.updateTasks(updatedTasks);
      } else {
        console.log('Task not found');
      }
    });
  }

  deleteTask(taskId: number): void {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.filter((task) => task.id !== taskId);
    this.updateTasks(updatedTasks);
  }
}
