import {api} from "@/config/api";
import {useQuery} from "@tanstack/react-query";

const fetchGameLists = async () => {
    const {data} = await api.get(`games`);

    return data;
};

const useGameLists = () => {
    const {status, data, error, isFetching} = useQuery({
        queryKey: ['gameListsKey'],
        queryFn: fetchGameLists,
        staleTime: 1000 * 60 * 5,
    });

    return {status, data, error, isFetching};
};

export default useGameLists;