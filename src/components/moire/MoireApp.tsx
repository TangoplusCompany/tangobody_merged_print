import { useEffect } from "react";
import type { IAppProps } from "../basic/BasicApp";
import { usePostMoireData } from "../../hooks/moire/usePostMoireData";
import logoWhite from '../../assets/logo_white.png';
import MoireContainer from "./Container";

export function MoireApp({ t_r }: IAppProps) {
  
  const { mutate, data, isPending, isError } = usePostMoireData();
  
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
  if (!t_r || isError) {
    return (
      <div className="print:hidden flex flex-col h-screen items-center justify-center gap-4">
        <div className="text-xl font-bold text-red-500">올바르지 않은 데이터입니다.</div>
      </div>
    );
  }
  if (data === undefined) {
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
              <span>이름: {data.moire_result.user_info.user_name}</span>
              <span>성별: {data.moire_result.user_info.gender === "남성" ? "남성" : "여성"}</span>
              <span>현재 검사일: {data.moire_result.front.measure_date?.replace(/-/g, ".").slice(0, 11)} </span>
            </div>
          </div>
        )}
      </div>
      <MoireContainer data={data.moire_result}/>
    </div>
  );
};
