import { Button } from '@/shared/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { useState } from 'react';

type User = {
  id: number;
  email: string;
  username: string;
};

export const HomePage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const handleClick = async () => {
    const response = await fetch('/api/users');
    const data: User[] = await response.json();
    setUsers(data);
  };

  return (
    <div>
      <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-gray-800">
        Home
      </h1>
      <Button onClick={handleClick}>/api/users</Button>
      <Table className="mt-2">
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>email</TableHead>
            <TableHead>username</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
