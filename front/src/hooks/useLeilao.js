import { useQuery } from "@tanstack/react-query";
import api from "../configs/axiosConfig";

export function useLeilao(id) {
  return useQuery({
    queryKey: ["leilao", id],
    queryFn: async () => {
      const response = await api.get(`/leilao/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
}
