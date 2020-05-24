const USER = 'user';
const ADMIN = 'admin';

interface UserType {
  username: string;
  password: string;
  group: typeof USER;
  id: string;
  email: string;
  phone: string;
  token: string;
}

interface AdminType {
  username: string;
  password: string;
  group: typeof ADMIN;
  id: string;
  email: string;
  phone: string;
  token: string;
}

const userList: (UserType | AdminType)[] = [
  {
    username: 'andy',
    password: 'andy123',
    group: USER,
    id: 's12345',
    email: 'andy@email.com',
    phone: '+852 94546912',
    token: 'ad68ae08-2a57-427f-9e78-6ae658b28064',
  },
  {
    username: 'admin',
    password: 'admin123',
    group: ADMIN,
    id: 'a139',
    email: 'admin@adminemail.com',
    phone: '+852 9412546912',
    token: '96b88971-ec24-4493-88a2-d0e98b6cb3d0',
  },
];

export default userList;
