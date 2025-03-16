import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Ban, CheckCircle2, Loader2, Search, UserX } from 'lucide-react';
import { fetchUsers, updateUserStatus } from '../../redux/features/adminSlice';

const Users = () => {
  const dispatch = useDispatch();
  const { users, isLoading, totalUsers, totalUserPages } = useSelector(
    (state) => state.admin
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    dispatch(
      fetchUsers({
        page,
        limit: usersPerPage,
        search: searchQuery,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      })
    );
  }, [dispatch, page, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleBlockUser = async (userId, currentStatus) => {
    try {
      await dispatch(updateUserStatus({ userId, isBlocked: !currentStatus })).unwrap();
      dispatch(
        fetchUsers({
          page,
          limit: usersPerPage,
          search: searchQuery,
          sortBy: 'createdAt',
          sortOrder: 'desc',
        })
      );
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalUserPages) {
      setPage(newPage);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Users Management</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10 w-[250px]"
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
              <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={user.isBlocked ? 'destructive' : 'outline'}
                      className="flex w-fit items-center gap-1"
                    >
                      {user.isBlocked ? (
                        <>
                          <UserX className="h-3 w-3" />
                          Blocked
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-3 w-3" />
                          Active
                        </>
                      )}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={user.isBlocked ? 'outline' : 'destructive'}
                      size="sm"
                      onClick={() => handleBlockUser(user.id, user.isBlocked)}
                      disabled={user.role === 'admin'}
                    >
                      {user.isBlocked ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          Unblock
                        </>
                      ) : (
                        <>
                          <Ban className="h-4 w-4 mr-2" />
                          Block
                        </>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {users.length} of {totalUsers} users
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalUserPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;