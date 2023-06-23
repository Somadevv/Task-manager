import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskDTO } from 'src/app/interfaces/task-dto';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss'],
})
export class TaskDialogComponent implements OnInit {
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) {
    this.createForm = this.formBuilder.group({
      id: 1,
      task: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      priority: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      complete: [false],
    });
  }

  @Input() isEditing: boolean = false;
  @Input() task!: TaskDTO;

  createForm!: FormGroup;

  ngOnInit(): void {}

  closeDialog(): void {
    this.modalService.dismissAll();
  }

  onSubmit(): void {
    if (this.createForm.valid) {
      const formData = this.createForm.value;
      const updatedTask: TaskDTO = {
        id: formData.id, // Set the ID property
        task: formData.task,
        priority: formData.priority,
        completed: formData.complete,
      };

      if (this.isEditing) {
        console.log('Task Edited', updatedTask);
        this.taskService.updateTask(updatedTask);
        this.modalService.dismissAll();
      } else {
        this.taskService.createTask(updatedTask);
        this.modalService.dismissAll();
      }
    } else {
      // Handle form validation errors
      this.createForm.markAllAsTouched();
    }
  }
  onTaskComplete(checked: boolean): void {
    if (this.createForm.controls['complete']) {
      this.createForm.controls['complete'].setValue(checked);
    }
  }

  get taskFormControl() {
    return this.createForm.get('task');
  }

  get taskErrors() {
    return this.taskFormControl?.errors;
  }

  get priorityFormControl() {
    return this.createForm.get('priority');
  }

  get priorityErrors() {
    return this.priorityFormControl?.errors;
  }
}
