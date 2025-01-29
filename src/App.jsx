import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormBuilder from './components/FormBuilder'; 
import DragAndDropExample from './components/DragAndDropExample';
import FormDePerguntas from './components/FormDePerguntas';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/questionario" element={<FormBuilder />} />
      <Route path="/questionario2" element={<FormDePerguntas />} />
      <Route path="/draganddrop" element={<DragAndDropExample />} />
      {/* Outras rotas */}
    </Routes>
  </BrowserRouter>
);

export default App;