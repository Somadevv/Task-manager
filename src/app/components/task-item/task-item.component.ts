import { Component, Input } from '@angular/core';
import { Task } from 'src/app/interfaces/task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent {
  @Input() task!: Task;

  constructor() {}

  // Add any additional methods or logic specific to the TaskItem component
}
