import useSWR from "swr";
import { getPointHistoryAll } from "../_api/api";

const usePointHistory = () => {
  const { data: pointHistory, mutate } = useSWR<IPointHistory[]>(
    "/api/points/all",
    () => getPointHistoryAll()
  );

  return {
    pointHistory,
    refresh: mutate,
  };
};

export default usePointHistory;
