import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/styled-system/components/ui/table';
import type { User } from '@/shared/types/user';

interface UsersTableProps {
  users: User[];
  className?: string;
}

export const UsersTable = ({ users, className }: UsersTableProps) => {
  if (users.length === 0) {
    return <p className="text-sm text-muted-foreground">No users yet.</p>;
  }

  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Username</TableHead>
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
  );
};
