import Colors from '../../../assets/themes/mainTheme/palette';

export type Diagnosis = {
  id: number;
  name: string;
  color: string;
};

export const diagnoses: Diagnosis[] = [
  { id: 1, name: 'Diagnose Name', color: Colors.palette.surface.highRisk },
  { id: 2, name: 'Diagnose Name', color: Colors.palette.surface.mediumRisk },
  { id: 3, name: 'Diagnose Name', color: Colors.palette.surface.mediumRisk },
  {
    id: 4,
    name: 'Diagnose Name',
    color: Colors.palette.surface.lowRisk,
  },
  { id: 5, name: 'Diagnose Name', color: Colors.palette.surface.highRisk },
  { id: 6, name: 'Diagnose Name', color: Colors.palette.surface.highRisk },
  { id: 7, name: 'Diagnose Name', color: Colors.palette.surface.highRisk },
  { id: 8, name: 'Diagnose Name', color: Colors.palette.surface.highRisk },
  { id: 9, name: 'Diagnose Name', color: Colors.palette.surface.highRisk },
  { id: 10, name: 'Diagnose Name', color: Colors.palette.surface.highRisk },
  { id: 11, name: 'Diagnose Name', color: Colors.palette.surface.highRisk },
];
