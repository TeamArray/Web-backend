/**
 * 사용자 정보 데이터 구조입니다
 * @property {string} userid : 사용자 ID
 * @property {string} passwd : 사용자 PW
 * @property {string} pwsalt : 패스워드 솔트
 * @property {string} nicknm : 닉네임
 * @property {string} ismebr : 멤버 여부
 * @property {string} avatar : 아바타 Relative URL
 * @property {string} cretAt : 만들어진 날짜
 */
export default interface UserModel{
    userid:string //사용자 ID
    passwd:string
    pwsalt:string
    nicknm:string
    ismebr:string
    avatar:string
    cretAt:string
}