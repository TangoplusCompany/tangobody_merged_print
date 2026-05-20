import './App.css'
import { BasicApp } from './components/basic/BasicApp';
import { RomApp } from './components/rom/RomApp';
import { BiaApp } from './components/bia/BiaApp';

function App() {
  const handlePrint = () => {
    window.print();
  };

  const searchParams = new URLSearchParams(window.location.search);
  const trValue = searchParams.get("t_r");
  return (
    <div className="w-[210mm] mx-auto h-full p-0 m-0">
      {trValue && (
        <>
          <div className="flex justify-end w-full p-0 m-0">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 my-4 text-white rounded-lg hover:bg-blue-700 print:hidden"
            >
              인쇄하기
            </button>
          </div>
          <BasicApp t_r={trValue} />
          <RomApp t_r={trValue} />
          <BiaApp t_r={trValue} />
        </>
      )}

    </div>
  );
}

export default App
