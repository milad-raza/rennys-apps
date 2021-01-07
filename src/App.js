import HomeComponent from './components/homeComponent';
import DataProvider from './context/dataProvider/dataProvider.provider';
import './App.css';

function App() {
  return (
      <DataProvider>
        <HomeComponent/>
      </DataProvider>
  );
}

export default App;
