export class TaskDTO {
  private static lastId: number = 3;

  id: number = ++TaskDTO.lastId;
  task: string;
  priority: number;
  completed: boolean;

  constructor(id: number, task: string, priority: number, completed: boolean) {
    this.id = id;
    this.task = task;
    this.priority = priority;
    this.completed = completed;
  }
}
