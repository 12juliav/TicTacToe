import TicTacToe from './pages/TicTacToe';

function App() {
  global.__basedir = __dirname;
  return (
    <TicTacToe />
  );
}

export default App;
