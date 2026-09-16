import './App.css';
import { BasicApp } from './components/basic/BasicApp';
import { RomApp } from './components/rom/RomApp';
import { BiaApp } from './components/bia/BiaApp';
import { MoireApp } from './components/moire/MoireApp';
import { GaitApp } from './components/gait/GaitApp';
import { useTranslation } from 'react-i18next';

function App() {
  const { t,  } = useTranslation(); //i18n

  const handlePrint = () => {
    window.print();
  };

  // const isKo = i18n.language.startsWith("ko");

  // const toggleLanguage = () => {
  //   i18n.changeLanguage(isKo ? "en" : "ko");
  // };

  const searchParams = new URLSearchParams(window.location.search);
  const trValue = searchParams.get("t_r");
  const typeValue = searchParams.get("type") ?? "";
  const isBasic = typeValue[0] === "1";
  const isRom = typeValue[1] === "1";
  const isBia = typeValue[2] === "1";
  const isGait = typeValue[3] === "1";
  const isMoire = typeValue[4] === "1";

  return (
    <div className="w-[210mm] mx-auto h-full p-0 m-0">
      {trValue ? (
        <>
          <div className="flex justify-end items-center gap-2 w-full p-0 m-0">
            {/* 언어 변경 버튼 */}
            {/* <button
              onClick={toggleLanguage}
              className="px-3 text-sm font-semibold border border-gray-300 rounded-[6px] hover:bg-sub-150 print:hidden text-center"
            >
              <span className="text-[10px] text-sub-400">Current Language</span>
              <br />
              {isKo ? "한국어" : "English"}
            </button> */}

            {/* 인쇄 버튼 */}
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-accent my-4 text-white text-base rounded-[6px] hover:bg-accent/90 print:hidden"
            >
              {t("print_btn")}
            </button>
          </div>

          <div className="flex flex-col">
            {isBasic && <BasicApp t_r={trValue} />}
            {isRom && <RomApp t_r={trValue} />}
            {isBia && <BiaApp t_r={trValue} />}
            {isGait && <GaitApp t_r={trValue} />}
            {isMoire && <MoireApp t_r={trValue} />}
          </div>
        </>
      ) : (
        <p className="font-bold justify-center text-red-500">
          {t("invalid_data")}
        </p>
      )}
    </div>
  );
}

export default App;