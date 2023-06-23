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
  constructor(
    private taskService: TaskService,
    private modalService: NgbModal
  ) {}
  selectedTask: TaskDTO | undefined;
  tasks: TaskDTO[] = [];

  ngOnInit(): void {
    this.fetchTasks();
  }

  onTaskSelected(task: TaskDTO) {
    console.log(task);
    if (this.selectedTask === task) {
      this.selectedTask = undefined;
    } else {
      this.selectedTask = task;
    }
  }

  openTaskCreateModal(): void {
    const modalRef: NgbModalRef = this.modalService.open(TaskDialogComponent);
  }

  fetchTasks(): void {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
