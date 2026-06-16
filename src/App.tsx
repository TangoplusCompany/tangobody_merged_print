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
  const typeValue = searchParams.get("type") ?? "";
  const isBasic = typeValue[0] === '1';
  const isRom   = typeValue[1] === '1';
  const isBia   = typeValue[2] === '1';

  return (
    <div className="w-[210mm] mx-auto h-full p-0 m-0">
      {trValue ? (
        <>
          <div className="flex justify-end w-full p-0 m-0">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-accent my-4 text-white rounded-[6px] hover:bg-accent/90 print:hidden"
            >
              인쇄하기
            </button>
          </div>
          <div className='flex flex-col'>
            {isBasic && <BasicApp t_r={trValue} />}
            {isRom && <RomApp t_r={trValue} />}
            {isBia && <BiaApp t_r={trValue} />}
          </div>
        </>
      ): (<p className='font-bold justify-center text-red-500'>데이터가 올바르지 않습니다. 다시 확인해주세요 (it's not trValue)</p>)}
    </div>
  );
}

export default App
