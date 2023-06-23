import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskDTO } from 'src/app/interfaces/task-dto';
import { TaskService } from 'src/app/services/task.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task!: TaskDTO;
  @Input() tasks: TaskDTO[] = [];
  @Input() selectedTask!: TaskDTO | undefined;
  @Output() taskSelected = new EventEmitter<TaskDTO>();
  @Input() isEditing = false;

  constructor(
    private taskService: TaskService,
    private modalService: NgbModal
  ) {}

  editTask(task: TaskDTO): void {
    this.isEditing = true;
    const modalRef = this.modalService.open(TaskDialogComponent);
    modalRef.componentInstance.isEditing = this.isEditing;
    modalRef.componentInstance.task = task;
  }

  onTaskComplete(checked: boolean): void {
    this.task.completed = checked;
    this.taskService.updateTask(this.task);
  }

  onSelect(): void {
    this.taskSelected.emit(this.task);
  }

  deleteTask(task: TaskDTO): void {
    this.taskService.deleteTask(task.id);
  }

  @HostListener('document:click', ['$event.target'])
  onClick(target: any): void {
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
