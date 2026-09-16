import { useEffect } from "react";
import { usePostRomData } from "../../hooks/rom/usePostRomData";
import logoWhite from '../../assets/logo_white.png';
import UnitCardContainer from "./UnitCardContainer";
import { useTranslation } from "react-i18next";

export interface IRomAppProps {
  t_r: string;
}


export function RomApp({ t_r }: IRomAppProps) {
  const {t} = useTranslation();
  const { mutate, pairedData, isPending, isError } = usePostRomData();

  useEffect(() => {
    if (t_r) {
      mutate(t_r);
    }
  }, [mutate, t_r]);

  const chunkedPages = pairedData ? Array.from({ length: Math.ceil(pairedData.length / 3) }, (_, i) =>
    pairedData.slice(i * 3, i * 3 + 3)
  ) : [];

  if (isPending) return <div className="flex h-screen items-center justify-center">{t('loading')}</div>;
  if (!t_r || isError || (pairedData && pairedData.length === 0)) {
    return (
      <div className="print:hidden flex flex-col h-screen items-center justify-center gap-4">
        <div className="text-xl font-bold text-red-500">{t('invalid_data')}</div>
      </div>
    );
  }

  return (
    <div className="pt-6 pb-20 min-h-screen print:p-0 print:bg-white">
        {chunkedPages.map((pageItems, pageIndex) => (
        <div key={pageIndex} className="a4-page relative flex flex-col bg-white mb-8 print:mb-0 w-[210mm] mx-auto">
          <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <td className="p-0 m-0 pb-4 pt-0">
                  <div className='flex justify-between h-full w-full bg-sub-300 p-2 gap-4 '>
                    <div className='flex gap-4'>
                      <img src={logoWhite} alt="로고" className="flex w-6 h-fit my-auto" />
                      <div className='flex text-center my-auto text-white text-xl font-bold'>Tango Body Report</div>
                    </div>
                    <div className='justify-center px-3 bg-white flex flex-col rounded-[2px] text-[12px] text-center '>
                      <div className='flex justify-between gap-8 text-sub-800'>
                        <span>{t('name')}: {pairedData[0].left.user_name}</span>
                        <span>{t('gender')}: {pairedData[0].left.gender}</span>
                        <span>{t('current_test_date')}: {pairedData[0].left.reg_date.slice(0, 11).replaceAll("-", ".")}</span>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </thead>

            <tbody>
              {pageItems.map((pair, index) => (
                <tr key={index}>
                  <td className="p-0 m-0 p-2 align-top">
                    <div className="w-full h-[86mm]"> 
                      <UnitCardContainer left={pair.left} right={pair.right} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}