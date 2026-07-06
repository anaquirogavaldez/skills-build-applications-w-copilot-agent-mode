
import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('teams')
      .then((items) => {
        if (isMounted) {
          setTeams(items);
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

  return (
    <section className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Teams</h2>
            <p className="text-muted mb-0">
              Squad standings and captains.
            </p>
          </div>
        </div>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row g-3">
            {teams.map((team) => (
              <div
                className="col-md-6"
                key={team._id || team.id}
              >
                <div className="border rounded p-3 h-100">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h3 className="h6 mb-0">{team.name}</h3>
                    <span className="badge bg-success">
                      {team.points} pts
                    </span>
                  </div>

                  <p className="text-muted mb-2">
                    Captain: {team.captain}
                  </p>

                  <p className="small text-muted">
                    Members: {team.members?.length || 0}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Teams;
