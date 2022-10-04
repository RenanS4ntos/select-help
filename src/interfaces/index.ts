export interface OrderProps {
  id: string;
  title: string;
  when: string;
  status: "open" | "closed";
}

export interface ProjectsProps {
  id: string;
  title: string;
  orders: OrderProps[];
}

export interface EnterpriseProps {
  id: string;
  name: string;
  projects: ProjectsProps[];
}
