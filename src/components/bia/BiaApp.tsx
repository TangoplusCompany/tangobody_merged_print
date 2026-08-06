import { useEffect } from "react";
import { usePostBiaData } from "../../hooks/bia/usePostBiaData";
import logoWhite from '../../assets/logo_white.png';
import Composition from "./left/Composition";
import MainAnalysis from "./left/MainAnalysis";
import BodyModel from "./left/BodyModel";
import BodyBenchMark from "./right/BodyBenchMark";
import Recommend from "./right/Recommend";
import BodyTypeChart from "./right/BodyTypeChart";
import TrendGraph from "./left/TrendGraph";
import type { IAppProps } from "../basic/BasicApp";


export function BiaApp({ t_r }: IAppProps) {
  const { mutate, data, isPending, isError } = usePostBiaData();
  const encryptData = async () => {
    
    // const cryptoData = {
    //   sn: 2329,
    //   user_uuid: "QAAYA6RDBKSJQRA2",
    //   receiver: "01025248218",
    // };
    // const encryptData = await actionPrintEncrypt(cryptoData);
    // console.log(encryptData)
  };
  useEffect(() => {
    encryptData()
    if (t_r) {
      mutate(t_r);
    }
  }, [mutate, t_r]);
  if (isPending) return <div className="flex h-screen items-center justify-center">로딩 중...</div>;
  if (!t_r || isError || (data === undefined)) {
    return (
      <div className="print:hidden flex flex-col h-screen items-center justify-center gap-4">
        <div className="text-xl font-bold text-red-500">올바르지 않은 데이터입니다.</div>
      </div>
    );
  }

  return (
    <div className="a4-page flex flex-col bg-white">
      <div className='flex justify-between w-full h-fit bg-sub-300 p-2 gap-4 '>
        <div className='flex gap-4'>
          <img src={logoWhite} alt="로고" className="flex w-6 h-fit my-auto" />
          <div className='flex text-center my-auto text-white text-xl font-bold'>Tango Body Report</div>
        </div>
        {data && (
          <div className='justify-center px-3 bg-white flex flex-col rounded-[2px] text-[12px] text-center'>
            
            <div className='flex gap-8'>
              <span>이름: {data.user_name}</span>
              <span>성별: {data.br_input_gender === 0 ? "여성" : "남성"}</span>
              <span>신장: {data.br_input_height}cm</span>
              <span>나이: 만 {data.br_input_age}세</span>
            </div>
            <div className='h-[1px] w-full bg-sub-400'></div>
            <div className='flex gap-4 justify-center '>
              <span>현재 검사일: {data.measure_date?.replace(/-/g, ".").slice(0, 11)} </span>
              <span>
                이전 검사일: {data.most_previous_data?.measure_date ? `${data.most_previous_data.measure_date.replace(/-/g, ".").slice(0, 11)}` : '미실시'}
              </span>
            </div>
            
          </div>
        )}
      </div>

      {/* 🥘🥘🥘🥘🥘🥘🍲🍲🍲🍲body🍲🍲🍲🍲🍝🍝🍝🍝🍝🍝 */}
      <div className='flex flex-1 w-full px-2 py-4 gap-2'>
        {/* 🥘🥘🥘🥘 left 🥘🥘🥘🥘 */}
        <div className='grid grid-rows-[27.5%_27.5%_25%_20%] w-2/3 mr-2'>
          <Composition data={data} />
          <MainAnalysis data={data} prevMuscleMassIndex={data?.most_previous_data.skeletal_muscle_mass_index}/>
          <BodyModel data={data}  />
          <TrendGraph data={data} />
        </div>

        {/* 🍲🍲🍲🍲 right 🍲🍲🍲🍲 */}
        <div className='grid grid-rows-[55%_25%_20%] w-1/3 h-full rounded-xl shadow'>
          <BodyBenchMark data={data} />
          <Recommend data={data} />
          <BodyTypeChart data={data} />
        </div>
      </div>
    </div>
  );
}