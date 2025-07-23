const UserTable = ({ users, showHeader, pageNumber }) => {
    
  return (
    <table className="user-table">
      {showHeader && (
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
      )}
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.status}</td>
          </tr>
        ))}
        {/* Fill remaining space to maintain table borders */}
        {[...Array(Math.max(0, 15 - users.length))].map((_, i) => (
          <tr key={`empty-${i}`} className="empty-row">
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
