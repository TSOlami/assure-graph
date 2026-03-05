export interface StepAction {
  id: number;
  label: string;
  description: string;
  completed?: boolean;
}

export interface Step {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'not-started';
  completionText?: string;
  actions?: StepAction[];
  link?: {
    text: string;
    url: string;
  };
}

export const mockSteps: Step[] = [
  {
    id: 1,
    title: 'Onboarding',
    description: 'Fill up basic information about your company to complete your onboarding.',
    progress: 4,
    status: 'completed',
    completionText: '100% COMPLETED',
  },
  {
    id: 2,
    title: 'Integrate apps',
    description: 'Setup permissions to continuously monitor and collect evidence from your daily applications with AssureGraph.',
    progress: 0,
    status: 'not-started',
    link: {
      text: 'Start Here',
      url: '/integrations',
    },
  },
  {
    id: 3,
    title: 'Add Policy document & Personnel',
    description: 'Setup personnel procedures, review requirements and onboard employees.',
    progress: 0,
    status: 'in-progress',
    actions: [
      {
        id: 1,
        label: 'Upload Policy',
        description: 'Upload acknowledgement documents, background checks requirements.',
        completed: false,
      },
      {
        id: 2,
        label: 'Add policy',
        description: '',
        completed: false,
      },
      {
        id: 3,
        label: 'Add employees',
        description: 'Onboard new employees by sending them an invitation to join or their upload records.',
        completed: false,
      },
      {
        id: 4,
        label: 'Add personnel',
        description: '',
        completed: false,
      },
    ],
  },
  {
    id: 4,
    title: 'Assign controls',
    description: 'Setup personnel procedures, review requirements and onboard employees.',
    progress: 0,
    status: 'not-started',
    link: {
      text: 'Start Here',
      url: '#',
    },
  },
  {
    id: 5,
    title: 'Personnel Onboarding',
    description: 'Setup personnel procedures, review requirements and onboard employees.',
    progress: 0,
    status: 'not-started',
    link: {
      text: 'Start Here',
      url: '#',
    },
  },
];