export function formatTimeAgo(createdAt: string) {
    const now = new Date(); // 현재 시간
    const createdDate = new Date(createdAt); // 생성된 시간 (createdAt은 유효한 날짜 문자열이어야 합니다)

    const diffMilliseconds = now.getTime() - createdDate.getTime(); // 밀리초 단위 차이

    const seconds = Math.floor(diffMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); // 대략적인 월
    const years = Math.floor(days / 365); // 대략적인 연

    if (seconds < 60) {
        return "방금 전";
    } else if (minutes < 60) {
        return `${minutes}분 전`;
    } else if (hours < 24) {
        return `${hours}시간 전`;
    } else if (days < 7) { // 7일 미만일 경우 요일 표시 등 고려 가능
        return `${days}일 전`;
    } else if (months < 12) {
        return `${months}달 전`;
    } else {
        return `${years}년 전`;
    }
}