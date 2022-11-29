// core
import { useMemo } from 'react';
// style
import styled from 'styled-components'

const PaginationContainer = styled.div`
  .pagination{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    >div{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.5em;
      height: 1.5em;
      cursor: pointer;
      transition: var(--transition-fast);
      &:hover{
        background-color: var(--effect-color);
        color: var(--primary-color);
      }
      &.active{
        background-color: var(--primary-color);
        color: var(--primary-color-contrast);
      }
    }
  }
`

// mounted(){
//   this.getMaxViewPage();
//   window.addEventListener('resize', this.getMaxViewPage)
// },
// unmounted(){
//   window.removeEventListener('resize', this.getMaxViewPage)
// },
// methods : {
//   // 창크기에 따라 보일 페이지 수 조정
//   getMaxViewPage(){
//     if(window.innerWidth < 768){
//         this.viewPage = 5;
//     } else {
//         this.viewPage = this.maxShowPage;
//     }
//   },
// }
const maxShowPage = 10;

function Pagination({ page, setPage, totalPage }){
  // 페이지 변경
  function changePage(num){
    if(page===num) return;
    // 0보단 크고, 최대 페이지 이하일 때
    if(num > 0 && num <= totalPage){
      setPage(num);
    }
  }
  // pagination 범위
  const rage = useMemo(()=>{
    const min = maxShowPage*Math.floor((page<=1?page:page-1)/maxShowPage) + 1;
    const max = Math.min(min+9, totalPage)
    return {
      min: min,
      max: max
    }
  }, [page])

  const pageNumRendering = ()=>{
    const result = [];
    for(let i=rage.min; i<=rage.max; i++){
      result.push(
        <div key={i}
          className={`${page==(i) ? 'active' : ''}`}
          onClick={()=>changePage(i)}
        >
          {i}
        </div>
      )
    }
    return result
  } 

  return(
    <PaginationContainer>
      <div className="pagination">
        <div className={`prev ${page <= 1 ? 'disable' : ''}`}
          onClick={()=>changePage(rage.min - 1)}
        >&lt;</div>
        {
          pageNumRendering()
        }
        <div className={`next ${page >= totalPage ? 'disable' : ''}`}
          onClick={()=>changePage(rage.max + 1)}
        >&gt;</div>
      </div>
    </PaginationContainer>
  )
}

export default Pagination