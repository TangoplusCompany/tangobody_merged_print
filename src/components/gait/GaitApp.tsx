import { useEffect } from "react";
import { usePostBiaData } from "../../hooks/bia/usePostBiaData";
import type { IAppProps } from "../basic/BasicApp";

export function GaitApp({ t_r }: IAppProps) {
  // TODO Gait 수정하기
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
    <div>

    </div>
  )
}