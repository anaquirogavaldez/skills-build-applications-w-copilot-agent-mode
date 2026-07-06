import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('users')
      .then((items) => {
        if (isMounted) {
          setUsers(items);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const rankedUsers = [...users].sort((left, right) => right.points - left.points);

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Leaderboard</h2>
            <p className="text-muted mb-0">Point leaders across the Octofit community.</p>
          </div>
        </div>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <ol className="list-group list-group-numbered">
            {rankedUsers.map((user, index) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={user._id || user.id}>
                <div>
                  <div className="fw-semibold">{index + 1}. {user.name}</div>
                  <div className="text-muted small">{user.team}</div>
                </div>
                <span className="badge bg-primary rounded-pill">{user.points} pts</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

export default Leaderboard;
