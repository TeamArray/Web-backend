/**
 * 포스트 정보 데이터 구조입니다
 * @property {number} postid : 글 ID
 * @property {string} title : 제목
 * @property {string} author : 작성자
 * @property {string} content : 내용
 * @property {number} boardid : 게시판 ID
 * @property {string} isnotify : 공지 여부
 * @property {string} createdAt : 만들어진 날짜
 */
export default interface PostModel{
    postid:number
    title:string
    author:string
    content:string
    boardid:number
    isnotify:boolean
    createdAt:string
}