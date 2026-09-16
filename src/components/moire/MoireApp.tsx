import { useEffect } from "react";
import type { IAppProps } from "../basic/BasicApp";
import { usePostMoireData } from "../../hooks/moire/usePostMoireData";
import logoWhite from '../../assets/logo_white.png';
import MoireContainer from "./Container";
import { useTranslation } from "react-i18next";

export function MoireApp({ t_r }: IAppProps) {
  const {t} = useTranslation()
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
  if (isPending) return <div className="flex h-screen items-center justify-center">{t('loading')}</div>;
  if (!t_r || isError) {
    return (
      <div className="print:hidden flex flex-col h-screen items-center justify-center gap-4">
        <div className="text-xl font-bold text-red-500">{t('invalid_data')}</div>
      </div>
    );
  }
  if (data === undefined) {
    return (
      <div className="print:hidden flex flex-col h-screen items-center justify-center gap-4">
        <div className="text-xl font-bold text-red-500">{t('invalid_data')}</div>
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
              <span>{t('name')}: {data.moire_result.user_info.user_name}</span>
              <span>{t('gender')}: {data.moire_result.user_info.gender === "남성" ? t('male') : t('female')}</span>
              <span>{t('current_test_date')}: {data.moire_result.front!.measure_date?.replace(/-/g, ".").slice(0, 11)} </span>
            </div>
          </div>
        )}
      </div>
      <MoireContainer data={data.moire_result}/>
    </div>
  );
};
