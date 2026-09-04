import {User} from "./user.model";
import {PeriodModel} from "./period.model";

export type ProjectStatus = 'open' | 'closed';

export interface TaskModel {
  name: string;
  status: ProjectStatus;
}

export interface WorkflowModel {
  employee: User;
  period: PeriodModel;
}

export interface ProjectModel {
  id: string;
  name: string;
  description: string;
  tasks: TaskModel[];
  status: ProjectStatus;
  workedTime: WorkflowModel[];
}

export class Projec implements ProjectModel {
  description: string;
  id: string;
  name: string;
  status: ProjectStatus;
  tasks: TaskModel[];
  workedTime: WorkflowModel[];

  constructor(project: ProjectModel) {
    this.description = project.description;
    this.id = project.id;
    this.name = project.name;
    this.status = project.status;
    this.tasks = project.tasks;
    this.workedTime = project.workedTime;
  }

  addTimeWorkflow(workflow: WorkflowModel) {
    if (this.status === 'closed') {
      throw new Error('Workflow already closed.');
    }
    this.workedTime.push(workflow);
  }
}
