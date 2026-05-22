export interface ProjectTag {
  label: string;
  type: 'design' | 'tech' | 'common';
}

export interface ProjectVariant {
  problem: string;
  desc: string;
  tags: ProjectTag[];
  type: 'both' | 'design' | 'dev';
}

export interface DrawerStep {
  n: string;
  title: string;
  desc: string;
}

export interface DrawerContent {
  problem: string;
  user?: string;
  steps: DrawerStep[];
  metrics: { value: string; label: string }[];
  note?: string;
  highlightTech: string[];
}

export interface Project {
  nome: string;
  descrizione: string;
  urlPreview: string;
  anno: number;
  images?: string[];
  type?: 'both' | 'design' | 'dev';
  variants?: { all: ProjectVariant; design: ProjectVariant; dev: ProjectVariant };
  drawerContent?: { design: DrawerContent; dev: DrawerContent };
}

export interface YearSection {
  year: number;
  projects: Project[];
}

