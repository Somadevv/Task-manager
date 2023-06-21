import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  @Input() isEditing: boolean = false;
  selectedTask: Task | undefined;
  tasks: Task[] = [];

  ngOnInit(): void {
    this.fetchTasks();
  }

  onTaskSelected(task: Task) {
    if (this.selectedTask === task) {
      this.selectedTask = undefined;
    } else {
      this.selectedTask = task;
    }
  }

  fetchTasks(): void {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
