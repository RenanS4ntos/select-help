export interface OrderProps {
  id: string;
  name: string;
  description: string;
  solution: string;
  solution_date: string;
  status: boolean;
}

export interface ProjectsProps {
  id: string;
  name: string;
  solicitations: OrderProps[];
}
