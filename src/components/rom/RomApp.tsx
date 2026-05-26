import { useEffect } from "react";
import { usePostRomData } from "../../hooks/rom/usePostRomData";
import logoWhite from '../../assets/logo_white.png';
import UnitCardContainer from "./UnitCardContainer";

export interface IRomAppProps {
  t_r: string;
}


export function RomApp({ t_r }: IRomAppProps) {
  
  const { mutate, pairedData, isPending, isError } = usePostRomData();

  useEffect(() => {
    if (t_r) {
      mutate(t_r);
    }
  }, [mutate, t_r]);

  const chunkedPages = pairedData ? Array.from({ length: Math.ceil(pairedData.length / 3) }, (_, i) =>
    pairedData.slice(i * 3, i * 3 + 3)
  ) : [];

  if (isPending) return <div className="flex h-screen items-center justify-center">로딩 중...</div>;
  if (!t_r || isError || (pairedData && pairedData.length === 0)) {
    return (
      <div className="flex flex-col h-screen items-center justify-center gap-4">
        <div className="text-xl font-bold text-red-500">올바르지 않은 데이터입니다.</div>
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
                        <span>이름: {pairedData[0].left.user_name}</span>
                        <span>성별: {pairedData[0].left.gender}</span>
                        <span>검사일: {pairedData[0].left.reg_date.slice(0, 11).replaceAll("-", ".")}</span>
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