export function formatTimeAgo(createdAt: string) {
    const pastDate = new Date(createdAt);
    const now = new Date();

    const diffMs = now.getTime() - pastDate.getTime();

    // 시간 단위별 밀리초 값
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;

    if (diffMs < second * 10) {
        return '방금 전';
    } else if (diffMs < minute) {
        const seconds = Math.floor(diffMs / second);
        return `${seconds}초 전`;
    } else if (diffMs < hour) {
        const minutes = Math.floor(diffMs / minute);
        return `${minutes}분 전`;
    } else if (diffMs < day) {
        const hours = Math.floor(diffMs / hour);
        return `${hours}시간 전`;
    } else if (diffMs < week) {
        const days = Math.floor(diffMs / day);
        return `${days}일 전`;
    } else if (diffMs < month) {
        const weeks = Math.floor(diffMs / week);
        return `${weeks}주 전`;
    } else if (diffMs < year) {
        const months = Math.floor(diffMs / month);
        return `${months}개월 전`;
    } else { // 1년 이상
        const years = Math.floor(diffMs / year);
        return `${years}년 전`;
    }
}

export function formatDate(createdAt: string){
    const customDate = new Date(createdAt)

    const year = customDate.getFullYear()
    const month = customDate.getMonth()+1

    const date = customDate.getDate()

    return `${year}-${month > 9 ?  month : '0'+month }-${date > 9 ?  date : '0'+date }`
}