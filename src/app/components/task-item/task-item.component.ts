import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'src/app/interfaces/task';
import { TaskService } from 'src/app/services/task.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  constructor(
    private taskService: TaskService,
    private modalService: NgbModal
  ) {}

  @Input() task!: Task;
  @Input() selectedTask!: Task | undefined;
  @Output() taskSelected = new EventEmitter<Task>();
  @Input() isEditing: boolean = false;

  // Edit task via model
  editTask(task: Task) {
    this.isEditing = true;
    const modalRef: NgbModalRef = this.modalService.open(TaskDialogComponent);
    modalRef.componentInstance.isEditing = this.isEditing;
    modalRef.componentInstance.task = task;
  }

  // editTask(updatedTask: Task): void {
  //   this.taskService.updateTask(updatedTask);
  // }

  onTaskComplete(checked: boolean): void {
    this.task.completed = checked;
    this.taskService.updateTask(this.task);
  }

  // Emit active event on task select
  onSelect() {
    this.taskSelected.emit(this.task);
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task.id);
  }

  // Remove active states on tasks when focus is lost
  @HostListener('document:click', ['$event.target'])
  onClick(target: any) {
    const isOutsideClick = !this.isDescendant(target, 'list-group');
    if (isOutsideClick) {
      this.selectedTask = undefined;
    }
  }

  private isDescendant(target: any, className: string): boolean {
    let element = target;
    while (element) {
      if (element.classList && element.classList.contains(className)) {
        return true;
      }
      element = element.parentElement;
    }
    return false;
  }
}
