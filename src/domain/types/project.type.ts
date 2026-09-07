import {GeneralStatusOptions} from "../enums/general-status.enum";

/**
 * @info Aislamiento de Períodos y Proyectos
 *
 * Los Períodos y los Proyectos son independientes a nivel de dominio:
 * 1. Un Período es una regla global de control de tiempo para toda la organización.
 * 2. Un Proyecto es un centro de trabajo continuo con su propio ciclo de vida.
 *
 * La relación se evalúa de forma cruzada e implícita en la entrada de horas (TimeEntry):
 * al registrar horas en un proyecto, se valida de forma independiente que la fecha
 * pertenezca a un período que continúe ABIERTO.
 */
export interface Project {
  id: number;
  name: string;
  status: GeneralStatusOptions;
  description: string;
}
