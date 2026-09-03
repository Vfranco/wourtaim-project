import type { ProjectId } from '../shared/ids';

export type ProjectStatus = 'open' | 'closed';

export interface Project {
  id: ProjectId;
  name: string;
  status: ProjectStatus;
}
