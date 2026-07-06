
import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const navItems = [
  { path: '/', label: 'Overview', element: <Leaderboard /> },
  { path: '/users', label: 'Users', element: <Users /> },
  { path: '/activities', label: 'Activities', element: <Activities /> },
  { path: '/teams', label: 'Teams', element: <Teams /> },
  { path: '/workouts', label: 'Workouts', element: <Workouts /> },
];

function App() {
  return (
    <div className="container py-4">
      <header className="mb-4">
        <p className="text-uppercase text-primary fw-semibold mb-2">
          Octofit Tracker
        </p>

        <h1 className="h2 mb-2">
          Momentum for every training community
        </h1>

        <p className="text-muted mb-3">
          This presentation tier connects to the Node.js API and reads data from the shared MongoDB tier.
        </p>

        <div className="alert alert-info small" role="note">
          Define <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> to target the Codespaces API URL.
          If it is unset, the app falls back to <strong>http://localhost:8000/api</strong>.
        </div>

        <nav className="nav nav-pills flex-wrap gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <Routes>
        {navItems.map((item) => (
          <Route
            key={item.path}
            path={item.path}
            element={item.element}
          />
        ))}
      </Routes>
    </div>
  );
}

export default App;
``
