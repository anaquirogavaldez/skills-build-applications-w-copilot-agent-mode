import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('workouts')
      .then((items) => {
        if (isMounted) {
          setWorkouts(items);
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
            <h2 className="h4 mb-1">Workouts</h2>
            <p className="text-muted mb-0">Planned sessions for the next training block.</p>
          </div>
        </div>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div className="col-md-6" key={workout._id || workout.id}>
                <div className="border rounded p-3 h-100">
                  <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                    <h3 className="h6 mb-0">{workout.title}</h3>
                    <span className="badge bg-info text-dark">{workout.difficulty}</span>
                  </div>
                  <p className="text-muted mb-2">{workout.description}</p>
                  <div className="small text-muted">
                    <span className="me-3">{workout.duration} min</span>
                    <span>{workout.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Workouts;
