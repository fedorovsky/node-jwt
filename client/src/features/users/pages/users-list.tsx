import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { useFetchUsersQuery } from '../api/user-api';

export const UsersList = () => {
  const { data, isLoading, error } = useFetchUsersQuery();

  return (
    <div>
      <h2 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-gray-800">
        List
      </h2>
      {isLoading && <h2>Loading...</h2>}
      {error && <h2>Error</h2>}
      {data?.length !== 0 && (
        <Table className="mt-2">
          <TableHeader>
            <TableRow>
              <TableHead>id</TableHead>
              <TableHead>email</TableHead>
              <TableHead>username</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.username}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
