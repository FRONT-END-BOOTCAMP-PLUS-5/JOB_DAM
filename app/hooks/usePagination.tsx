import { useState, useMemo } from 'react';
import Data from "./interface"
/**
 * 작성자: 김동우
 * 작성일: 2025-07-06
 * */



const usePagination = (data:Data[], itemsPerPage:number) => {
    const [currentPage, setCurrentPage] = useState(1);

    // 총 페이지 수 계산
    const totalPages = useMemo(() => {
        if (!data || data.length === 0) return 1;
        return Math.ceil(data.length / itemsPerPage);
    }, [data, itemsPerPage]);

    // 현재 페이지에 해당하는 데이터 반환
    const currentItems = useMemo(() => {
        if (!data) return [];
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }, [data, currentPage, itemsPerPage]);

    // 페이지 변경 함수
    const goToPage = (pageNumber:number) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // 다음 페이지로 이동
    const goToNextPage = () => {
        goToPage(currentPage + 1);
    };

    // 이전 페이지로 이동
    const goToPreviousPage = () => {
        goToPage(currentPage - 1);
    };

    return {
        currentPage,
        totalPages,
        currentItems,
        goToPage,
        goToNextPage,
        goToPreviousPage,
        setCurrentPage, // 필요하다면 외부에서 currentPage를 설정할 수 있도록 노출
    };
};

export default usePagination;