import { useTranslation } from "react-i18next";
import type { IReportDetail } from "../../types/basic";
import { PartRawData } from "./PartRawData";

export function PartRawDataContainer({data}: {data: IReportDetail}) {
  const {t} = useTranslation();
  return (
    <div className="grid grid-cols-[1fr_1fr] rounded-xl border border-sub-200 overflow-hidden bg-white text-[13px] text-sub-800 mt-2">
      <div className="flex flex-col">

        <div className="grid grid-cols-[1fr_3fr] items-center text-center border-b border-sub-200 text-sm h-fit">
          {/* 왼쪽: 상체분석 */}
          <div className="flex h-8 print:h-6 bg-sub-200 font-bold items-center justify-center text-sub-800 text-[12px] print:text-[10px] leading-tight ">
            {t('basic_upper_body_analysis')}
          </div>

          <div className="grid grid-cols-[30%_70%] items-center">
            <span className="text-sub-800 text-[11px] print:text-[9px] font-medium">{t('basic_criteria')}</span>
            
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center w-full text-sub-300">
                <span className="text-[12px] print:text-[10px] mx-auto font-bold">{t('basic_normal')}</span>
                <span className="text-[10px] print:text-[8px] text-gray-400 pl-1">▶</span>
              </div>
              
              <div className="flex items-center  w-full text-orangee-600">
                <span className="text-[12px] print:text-[10px] font-bold mx-auto">{t('basic_caution')}</span>
                <span className="text-[10px] print:text-[8px] text-gray-400 translate-x-1">▶</span>
              </div>
              
              <div className="flex items-center justify-start w-full text-redd-600">
                <span className="text-[12px] print:text-[10px] font-bold mx-auto">{t('basic_danger')}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-rows-3 h-full">
          <PartRawData data={"neck"} rawData={data.detail_data} summaryData={data} />
          <PartRawData data={"shoulder"} rawData={data.detail_data} summaryData={data} />
          <PartRawData data={"elbow"} rawData={data.detail_data} summaryData={data} />
        </div>

      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-[1fr_3fr] items-center text-center border-b border-sub-200 text-sm h-fit">
          {/* 오른쪽: 하체분석 */}
          <div className="flex h-8 print:h-6 bg-sub-200 font-bold items-center justify-center text-sub-800 text-[12px] print:text-[10px] leading-tight ">
            {t('basic_lower_body_analysis')}
          </div>

          <div className="grid grid-cols-[30%_70%] items-center">
            <span className="text-sub-800 text-[11px] print:text-[9px] font-medium">{t('basic_criteria')}</span>
            
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center w-full text-sub-300 relative justify-center">
                <span className="text-[12px] print:text-[10px] font-bold">{t('basic_normal')}</span>
                <span className="text-[10px] print:text-[8px] text-gray-400 absolute right-0">▶</span>
              </div>
              
              <div className="flex items-center w-full text-orangee-600 relative justify-center">
                <span className="text-[12px] print:text-[10px] font-bold mx-auto">{t('basic_caution')}</span>
                <span className="text-[10px] print:text-[8px] text-gray-400 absolute right-0">▶</span>
              </div>
              
              <div className="flex items-center w-full text-redd-600 relative justify-center">
                <span className="text-[12px] print:text-[10px] font-bold">{t('basic_danger')}</span>
              </div>

            </div>
          </div>
        </div>

        <div className=" grid grid-rows-3 h-full">
          <PartRawData data={"hip"} rawData={data.detail_data} summaryData={data} />
          <PartRawData data={"knee"} rawData={data.detail_data} summaryData={data} />
          <PartRawData data={"ankle"} rawData={data.detail_data} summaryData={data} />
        </div>


      </div>
    </div>
  );
};