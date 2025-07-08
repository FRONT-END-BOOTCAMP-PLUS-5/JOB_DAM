import { useState, useMemo, useRef } from 'react';
import Data from "./interface"
/**
 * 작성자: 김동우
 * 작성일: 2025-07-06
 * 수정일: 2025-07-08
 * */

const usePagination = (data:Data[], itemsPerPage:number) => {
    const pageNum = useRef(1) // 1~5 6~10 11 ~ 20 일때 패턴
    const lastPage = useRef(5) // 버튼 5개만 보여줄꺼
    
    const [currentPage, setCurrentPage] = useState(1)

    // 총 페이지 수 계산
    const totalPages = useMemo(() => {
        if (!data || data.length === 0) return 1
        return Math.ceil(data.length / itemsPerPage)
    }, [data, itemsPerPage])

    // 현재 페이지에 해당하는 데이터 반환
    const currentItems = useMemo(() => {
        if (!data) return [];
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        return data.slice(startIndex, endIndex)
    }, [data, currentPage, itemsPerPage])

    // 페이지 변경 함수
    const goToPage = (page: number) => {
        const newPage = Math.max(1, Math.min(page, totalPages))
        setCurrentPage(newPage)
        bottomToTop()
    };

    // 다음 페이지로 이동
    const goToNextPage = () => {
        goToPage(Math.min(currentPage + 5, totalPages))
    };

    // 이전 페이지로 이동
    const goToPreviousPage = () => {
        goToPage(Math.max(currentPage - 5, 1))
    };

    // 최상단으로 이동
    const bottomToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // For a smooth scrolling effect
        })
    }

    return {
        pageNum,
        lastPage,
        currentPage,
        totalPages,
        currentItems,
        bottomToTop,
        goToPage,
        goToNextPage,
        goToPreviousPage,
        setCurrentPage, // 필요하다면 외부에서 currentPage를 설정할 수 있도록 노출
    };
};

export default usePagination;