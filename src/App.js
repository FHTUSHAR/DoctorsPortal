import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './Pages/Routes/Router/Router';

function App() {
  return (
    <div className="max-w-[1440px]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
