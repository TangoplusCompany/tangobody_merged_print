import { useEffect } from 'react';
import { usePostBasicData } from '../../hooks/basic/usePostBasicData';
import logoWhite from '../../assets/logo_white.png';
import { BodyUpperLower } from './BodyUpperLower';
import { PartRawDataContainer } from './PartRawDataContainer';
import { Graph } from './Graph';


export interface IBasicAppProps {
  t_r: string;
}

export function BasicApp({ t_r }: IBasicAppProps) {
  const { mutate, data, isPending, isError } = usePostBasicData();
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
      <div className="flex flex-col h-screen items-center justify-center gap-4">
        <div className="text-xl font-bold text-red-500">올바르지 않은 데이터입니다.</div>
      </div>
    );
  }

  return (
    <div className="a4-page flex flex-col bg-white h-full">
      <div className='flex justify-between w-full h-fit bg-sub-300 p-2 gap-4 '>
        <div className='flex gap-4'>
          <img src={logoWhite} alt="로고" className="flex w-6 h-fit my-auto" />
          <div className='flex text-center my-auto text-white text-xl font-bold'>Tango Body Report</div>
        </div>
        {data && (
          <div className='justify-center px-3 bg-white flex flex-col rounded-[2px] text-[12px] text-center'>
            
            <div className='flex gap-8'>
              <span>이름: {data.result_summary_data.user_name}</span>
              <span>성별: {data.result_summary_data.gender === "남자" ? "남성" : "여성"}</span>
              <span>현재 검사일: {data.result_summary_data.measure_date?.replace(/-/g, ".").slice(0, 11)} </span>
            </div>
          </div>
        )}
      </div>
      <div className='grid grid-cols-[60%_40%] h-fit bg-sub-100 p-2'>
        <div className='flex flex-col pr-2'>
          <div className='flex'>
            <span className='text-sub-600 font-bold text-[12px] text-start shrink-0 whitespace-nowrap'>Tango Body Tip 01</span>
            <div className='flex-1 flex items-center mx-2'>
              <div className='bg-sub-300 w-1.5 h-1.5 rounded-full shrink-0' />
              <div className='bg-sub-300 flex-1 h-[2px]' />
            </div>
          </div>
          <div className='grid grid-cols-[60%_40%]'>
            <div className='text-sub-400 text-[10px] text-start leading-[1.5]'>
              위험과 주의 신호는 골격의 변형으로만 판단되므로 통증의 유무와 상관없이 근골격계 질환으로 발전될 가능성이 높습니다. 1단계는 약, 2단계는 중, 3단계는 강을 표현합니다. 
            </div>


            <div className='flex flex-col'>
              <div className='rounded-xl grid grid-cols-[1fr_1fr_1fr] items-center mx-2 font-bold'>
                <div className='bg-sub-100 border border-white text-center text-[10px] text-sub-600 rounded-l-[8px] py-1'>정상</div>
                <div className='bg-orangee-500/30 text-center text-[10px] text-orangee-800 py-1'>주의</div>
                <div className='bg-redd-500/30 text-center text-[10px] text-redd-800 rounded-r-[8px] py-1'>위험</div>
              </div>
              <div className='rounded-xl grid grid-cols-[1fr_1fr_1fr] items-center mx-2 leading-tight'>
                <span className='text-center text-[9px] text-sub-600'>상태 유지<br/>강화 권장</span>
                <span className='text-center text-[9px] text-orangee-800'>제공되는<br/>맞춤 운동 권장</span>
                <span className='text-center text-[9px] text-redd-800 '>전문가 상담<br/>권장</span>
              </div>
            </div>
          </div>
          

        </div>

        <div className='flex flex-col'>
          <div className='flex'>
            <span className='text-sub-600 font-bold text-[12px] text-start shrink-0 whitespace-nowrap'>Tango Body Tip 02</span>
            <div className='flex-1 flex items-center mx-2'>
              <div className='bg-sub-300 w-1.5 h-1.5 rounded-full shrink-0' />
              <div className='bg-sub-300 flex-1 h-[2px]' />
            </div>
          </div>
          <div className='text-sub-400 text-[10px] text-start leading-[1.5]'>
            통증부위 반대편 골격에 나타나는 위험이나 주의신호는 통증 회피를 윟나 보상작용으로 반대편 골격이 변형되었을 가능성이 높습니다.
          </div>
        </div>
      </div>

      <div className='mt-2 grid grid-rows-[50%_30%_20%] h-full '>
        <BodyUpperLower data={data} />
        <PartRawDataContainer data={data} />
        <Graph data={data} />
      </div>
    </div>
  );
}