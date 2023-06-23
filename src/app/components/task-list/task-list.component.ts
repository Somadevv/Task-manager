import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TaskDTO } from 'src/app/interfaces/task-dto';
import { TaskService } from 'src/app/services/task.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  selectedTask: TaskDTO | undefined;
  tasks: TaskDTO[] = [];

  constructor(
    private taskService: TaskService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  onTaskSelected(task: TaskDTO) {
    this.selectedTask = this.selectedTask === task ? undefined : task;
  }

  openTaskCreateModal(): void {
    this.modalService.open(TaskDialogComponent);
  }

  fetchTasks(): void {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
