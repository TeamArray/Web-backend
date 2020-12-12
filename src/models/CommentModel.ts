/**
 * 댓글 정보 데이터 구조입니다
 * @property {number} postid : 글 ID
 * @property {string} author : 사용자 PW
 * @property {string} content : 패스워드 솔트
 * @property {number} postsid : 댓글 ID
 * @property {string} createdAt : 멤버 여부
 */
export default interface CommentModel{
    postid:number
    author:string
    content:string
    postsid:number
    createdAt:string
}