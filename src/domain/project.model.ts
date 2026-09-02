import type { ProjectId } from './shared/ids';

type ProjectStatus = 'open' | 'closed';

interface Project {
  id: ProjectId;
  name: string;
  status: ProjectStatus;
}
