import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { TaskDTO } from '../interfaces/task-dto';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject: BehaviorSubject<TaskDTO[]> = new BehaviorSubject<
    TaskDTO[]
  >([]);

  public tasks$ = this.tasksSubject.asObservable();
  private currentId: number;

  constructor() {
    this.currentId = this.initialTasks.length + 1;
    this.updateTasks(this.initialTasks);
  }

  private initialTasks: TaskDTO[] = [
    new TaskDTO(1, 'Task 1', 1, false),
    new TaskDTO(2, 'Task 2', 2, true),
    new TaskDTO(3, 'Task 3', 3, false),
  ];

  updateTasks(tasks: TaskDTO[]): void {
    const sortedTasks = tasks.sort((a, b) => b.priority - a.priority);
    this.tasksSubject.next(sortedTasks);
  }

  fetchTasks(): BehaviorSubject<TaskDTO[]> {
    return this.tasksSubject;
  }

  createTask(task: TaskDTO): void {
    task.id = this.currentId++;
    const newTask = new TaskDTO(
      task.id,
      task.task,
      task.priority,
      task.completed
    );
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = [...currentTasks, newTask];
    this.updateTasks(updatedTasks);
  }

  updateTask(updatedTask: TaskDTO): void {
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
