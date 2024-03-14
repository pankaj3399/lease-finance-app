import statesAndCities from '@/../public/json/us_states_and_cities.json';

export const states = Object.entries(statesAndCities);

export const employementStatus = [
  'Employed',
  'Unemployed',
  'Self-Employed',
  'Student',
  'Retired',
  'Active Military',
  'Retired Military',
  'Other',
];

export const incomeSources = [
  'Salary/Wages',
  'Incentive or Bonus Income',
  'Retirement',
  'Child Support**',
  'Family or Spousal Support (Alimony)**',
  'Disability',
  'Housing Allowance',
  'Military Allowance',
  'Municipal Bond Interest',
  'Public Assistance Programs',
  'Social Security Benefits',
  "Worker's Compenstation",
  'Other (taxable)',
  'Other (non-taxable)',
];

export const housingStatuses = [
  'Mortage',
  'Rent',
  'Own Outright',
  'Military',
  'Family',
  'Other',
];
