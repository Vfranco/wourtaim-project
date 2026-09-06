import { BrandedId } from '../branded-id';

export type ProjectId = BrandedId<'ProjectId'>;

export interface Project {
  id: ProjectId;
  name: string;
  status: 'open' | 'closed';
}
