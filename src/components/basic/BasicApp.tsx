import { useEffect } from 'react';
import { usePostBasicData } from '../../hooks/basic/usePostBasicData';
import logoWhite from '../../assets/logo_white.png';
import { BodyUpperLower } from './BodyUpperLower';
import { PartRawDataContainer } from './PartRawDataContainer';
import { Graph } from './Graph';
import { useTranslation } from 'react-i18next';


export interface IAppProps {
  t_r: string;
}

export function BasicApp({ t_r }: IAppProps) {
  const { t } = useTranslation();
  const { mutate, data, isPending, isError } = usePostBasicData();
  const encryptData = async () => {
  };
  useEffect(() => {
    encryptData()
    if (t_r) {
      mutate(t_r);
    }
  }, [mutate, t_r]);
  if (isPending) return <div className="flex h-screen items-center justify-center">{t('loading')}</div>;
  if (!t_r || isError || (data === undefined)) {
    return (
      <div className="print:hidden flex flex-col h-screen items-center justify-center gap-4">
        <div className="text-xl font-bold text-red-500">{t('invalid_data')}</div>
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
              <span>{t('name')}: {data.result_summary_data.user_name}</span>
              <span>{t('gender')}: {data.result_summary_data.gender === "남성" ? t('male') : t('female')}</span>
              <span>{t('current_test_date')}: {data.result_summary_data.measure_date?.replace(/-/g, ".").slice(0, 11)} </span>
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
              {t('basic_risk_warning_desc')}
            </div>


            <div className='flex flex-col'>
              <div className='rounded-xl grid grid-cols-[1fr_1fr_1fr] items-center mx-2 font-bold'>
                <div className='bg-sub-100 border border-white text-center text-[10px] text-sub-600 rounded-l-[8px] py-1'>{t('basic_normal')}</div>
                <div className='bg-orangee-500/30 text-center text-[10px] text-orangee-800 py-1'>{t('basic_caution')}</div>
                <div className='bg-redd-500/30 text-center text-[10px] text-redd-800 rounded-r-[8px] py-1'>{t('basic_danger')}</div>
              </div>
              <div className='rounded-xl grid grid-cols-[1fr_1fr_1fr] items-center mx-2 leading-tight'>
                <span className='text-center text-[9px] text-sub-600'>{t('basic_rec_maintain')}</span>
                <span className='text-center text-[9px] text-orangee-800'>{t('basic_rec_exercise')}</span>
                <span className='text-center text-[9px] text-redd-800 '>{t('basic_rec_consult')}</span>
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
            {t('basic_compensation_desc')}
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