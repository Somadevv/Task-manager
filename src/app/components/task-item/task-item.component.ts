import { Component, Input } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  constructor(private taskService: TaskService) {}

  @Input() task!: Task;
  selectedTask: Task | undefined;

  onClick() {}

  // On task select
  onSelect(task: Task) {
    this.selectedTask = task;
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id);
  }

  editTask(task: Task): void {
    this.taskService.updateTask(task);
  }
}
