export interface BasicAccountData {
  username?: string;
  email: string;
  password: string;
  given_name?: string;
  family_name?: string;
  ['custom:university']?: string;
  ['custom:tenantId']?: string;
}
