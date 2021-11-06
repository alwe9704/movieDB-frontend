import { Route, Routes } from 'react-router';
import PopularList from './components/PopularList/PopularList';
import MovieDetailsPage from './components/MovieDetailsPage/MovieDetailsPage';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path='/' element={
              <PopularList />
          }/>
          <Route path="/movies/:id" element={
            <MovieDetailsPage/>
          }/>
      </Routes>
    </div>
  );
}

export default App;
