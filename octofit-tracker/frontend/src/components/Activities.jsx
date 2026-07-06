
import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('activities')
      .then((items) => {
        if (isMounted) {
          setActivities(items);
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
            <h2 className="h4 mb-1">Activities</h2>
            <p className="text-muted mb-0">
              Recent workouts and movement logs.
            </p>
          </div>
        </div>

        {error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="row g-3">
            {activities.map((activity) => (
              <div
                className="col-lg-6"
                key={activity._id || activity.id}
              >
                <div className="border rounded p-3 h-100">
                  <div className="d-flex justify-content-between align-items-start gap-3">
                    <div>
                      <h3 className="h6 mb-1">{activity.type}</h3>
                      <p className="text-muted mb-2">
                        {activity.userId?.name ||
                          activity.userId ||
                          'Unknown athlete'}
                      </p>
                    </div>

                    <span className="badge bg-primary">
                      {activity.durationMinutes} min
                    </span>
                  </div>

                  <p className="mb-2">{activity.notes}</p>

                  <small className="text-muted">
                    {activity.caloriesBurned} calories burned
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Activities;
