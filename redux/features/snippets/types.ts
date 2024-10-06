export interface Snippet {
  id: number;
  name: string;
  phone: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  image: string;
  employmentStatus: {
    en: string;
    de: string;
  };
  snippetJob: {
    en: string;
    de: string;
  };
  snippet_job_id: number;
  employment_status_id: number;
  date_of_birth: string;
  gender: string;
  address: string;
  joining_date: string;
  salary: number;
  payment_information: string;
}

export interface SnippetJob {
  id: number;
  title: {
    en: string;
    de: string;
  };
}

export interface EmploymentStatus {
  id: number;
  title: {
    en: string;
    de: string;
  };
}

export interface SnippetState {
  snippets: {
    snippets: Snippet[];
    pagination: any;
  };
  selectedSnippet: Snippet | null;
  snippetJobs: SnippetJob[];
  employmentStatuses: EmploymentStatus[];
  loading: boolean;
  totalPages: number;
  currentPage: number;
}

export const initialState: SnippetState = {
  snippets: {
    snippets: [],
    pagination: {},
  },
  selectedSnippet: null,
  snippetJobs: [],
  employmentStatuses: [],
  loading: false,
  totalPages: 1,
  currentPage: 1,
};
