export class Task {
  private static lastId: number = 0;

  id?: number;
  task: string;
  priority: number;
  completed: boolean;

  constructor(task: string, priority: number, completed: boolean) {
    this.id = ++Task.lastId;
    this.task = task;
    this.priority = priority;
    this.completed = completed;
  }
}
