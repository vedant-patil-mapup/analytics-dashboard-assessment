import Navbar from "./components/Navbar";
import { DataProvider } from "./data/DataContext";
 
function App() {
  return (
    <>
     
      <DataProvider>
        <div className="  ">
           <Navbar />
        </div>
      </DataProvider>
    
    </>
  );
}

export default App;
