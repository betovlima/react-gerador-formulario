import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import DragAndDropExample from './DragAndDropExample';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/draganddrop" element={<DragAndDropExample />} />
      {/* Outras rotas, se houver */}
    </Routes>
  </BrowserRouter>
);