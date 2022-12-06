// style
import styled from 'styled-components'
// router
import { useNavigate } from 'react-router-dom';
// img
import NoPhoto from 'assets/image/common/no_photo.png'

const ListContainer = styled.ul`
  width: 100%;
  li{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-color-light);
    text-align: center;
    height: 10rem;
    padding: 0.5rem 0;
    overflow: hidden;
    cursor: pointer;
    transition: var(--transition-fast);
    &:hover{
      background-color: var(--effect-color);
      img{
        filter: brightness(1.05) saturate(1.1);
      }
    }
    &:first-child{
      border-top: 1px solid var(--border-color-default);
    }
    &>div{
      padding: 0.5rem 0.6rem;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .ranking{
      width: 6rem;
      font-weight: var(--font-w-bold);
      font-size: var(--font-size-large);
      white-space: nowrap;
      flex-shrink: 0;
    }
    .spot{
      display: flex;
      align-items: center;
      gap: 2rem;
      width: 100%;
      flex-grow: 1;
      img{
        flex-shrink: 0;
        width: 10rem;
        height: 8rem;
        object-fit: cover;
        border-radius: var(--border-radius-mid);
        background-color: var(--loading-color);
        transition: var(--transition-default);
      }
      .textbox{
        text-align: start;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        h3{
          font-size: var(--font-size-large);
          font-weight: var(--font-w-mid);
        }
        p{
          color: var(--font-color-sub);
        }
      }
    }
    .volume{
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      align-items: center;
      gap: 0 1rem;
      width: 9rem;
      white-space: nowrap;
      p{
        font-weight: var(--font-w-bold);
      }
    }
    .nickname,
    .volume{
      width: 12rem;
    }
    @media screen and (max-width: 768px) {
      &{
        flex-wrap: wrap;
        height: auto;
      }
      .ranking{
        display: none;
      }
      .nickname,
      .volume{
        flex-direction: row;
        width: auto;
      }
    }
  }
`

function CommunityList(props){
  const listData = props.listData ?? [];
  const navigate = useNavigate();

  return (
    <ListContainer>
      {
        listData.map((el, i) => {
          return(
            <li key={el.id}
              onClick={()=>navigate(`/community/${el.id}`)}
            >
              <div className='ranking'>{el.num}</div>
              <div className='spot'>
                <img src={el.image ?? NoPhoto} alt={el.name} />
                <div className="textbox">
                  <h3>{el.name}</h3>
                </div>
              </div>
              {
                el.nickname && 
                <div className='nickname'>
                  <h4>닉네임</h4>
                  <p>{el.nickname}</p>
                </div>
              }
              {
                el.volume && 
                <div className='volume'>
                  <h4>조회수</h4>
                  <p>{el.volume}</p>
                </div>
              }
            </li>
          )
        })
      }
      {
        listData.length==0 && (
          <p style={{ textAlign: 'center' }}>데이터가 없습니다</p>
        )
      }
    </ListContainer>
  )
}

export default CommunityList;