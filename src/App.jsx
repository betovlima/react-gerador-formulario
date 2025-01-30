import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FormBuilder from './components/FormBuilder'; 
import DragAndDropExample from './components/DragAndDropExample';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/questionario"/>} />
      <Route path="/questionario" element={<FormBuilder />} />
      <Route path="/draganddrop" element={<DragAndDropExample />} />
    </Routes>
  </BrowserRouter>
);

export default App;