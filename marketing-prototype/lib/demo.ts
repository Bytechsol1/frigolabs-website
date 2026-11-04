// Shared demo-request schema, used by the form (client) and the API route (server).

export const organizationTypes = [
  'Independent clinic',
  'Multi-location clinic group',
  'Hospital or health system',
  'Diagnostic partner',
  'Other',
] as const;

export const clinicCounts = ['1', '2–5', '6–20', '21+'] as const;

export type DemoRequest = {
  fullName: string;
  email: string;
  organization: string;
  organizationType: string;
  role: string;
  clinicCount: string;
  message: string;
};

export type DemoErrors = Partial<Record<keyof DemoRequest, string>>;

const limits: Record<keyof DemoRequest, number> = {
  fullName: 100,
  email: 254,
  organization: 160,
  organizationType: 60,
  role: 100,
  clinicCount: 10,
  message: 2000,
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeDemo(input: Record<string, unknown>): DemoRequest {
  const read = (key: keyof DemoRequest) => (typeof input[key] === 'string' ? (input[key] as string).trim() : '');
  return {
    fullName: read('fullName'),
    email: read('email'),
    organization: read('organization'),
    organizationType: read('organizationType'),
    role: read('role'),
    clinicCount: read('clinicCount'),
    message: read('message'),
  };
}

export function validateDemo(data: DemoRequest): DemoErrors {
  const errors: DemoErrors = {};
  if (!data.fullName) errors.fullName = 'Please enter your full name.';
  if (!data.email) errors.email = 'Please enter your work email.';
  else if (!emailPattern.test(data.email)) errors.email = 'Please enter a valid email address.';
  if (!data.organization) errors.organization = 'Please enter your organization name.';
  if (!data.organizationType) errors.organizationType = 'Please select an organization type.';
  else if (!(organizationTypes as readonly string[]).includes(data.organizationType)) errors.organizationType = 'Please select a valid option.';
  if (data.clinicCount && !(clinicCounts as readonly string[]).includes(data.clinicCount)) errors.clinicCount = 'Please select a valid option.';
  (Object.keys(limits) as (keyof DemoRequest)[]).forEach(key => {
    if (!errors[key] && data[key].length > limits[key]) errors[key] = 'This entry is too long.';
  });
  return errors;
}
