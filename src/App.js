import './App.css';
import AppRoutes from './routes/routes';
// Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min';

const App = () => {
  return (
    <div>
      <AppRoutes />
    </div>
  );
};

export default App;
