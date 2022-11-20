// core
import { useState, useEffect } from 'react';
// style
import styled from 'styled-components'
// recoil
import { useRecoilState, useSetRecoilState } from 'recoil';
import { token, messageBundle } from 'store/index'
// router
import { useNavigate } from 'react-router-dom';
// api
import getTasteApi from 'api/getTasteApi'
import postTasteApi from 'api/postTasteApi'
// img
import NoPhoto from 'assets/image/common/no_photo.png'

const PageContainer = styled.section`
  .choose{
    .options{
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 2.5rem;
      max-height: 55rem;
      padding-bottom: var(--space-small);
      overflow-y: scroll;
      @media screen and (max-width: 1000px) {
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
      }
      @media screen and (max-width: 600px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
      }
      .option_box{
        position: relative;
        width: 100%;
        aspect-ratio: 1;
        border-radius: var(--border-radius-mid);
        box-shadow: var(--box-shadow02);
        overflow: hidden;
        cursor: pointer;
        &.on{
          h3{
            background-color: rgba(198, 128, 255, 0.7);
          }
        }
        &:hover{
          img{
            transform: scale(1.05);
          }
        }
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: var(--transition-default);
        }
        h3{
          position: absolute;
          top: 0;
          width: 100%;
          padding: 1em;
          color: #fff;
          font-size: var(--font-size-large);
          font-weight: var(--font-w-bold);
          background-color: rgba(0,0,0,0.5);
          transition: var(--transition-default);
          @media screen and (max-width: 600px) {
            font-size: var(--font-size-mid);
            padding: 0.6em 1em;
          }
        }
      }
    }
    .submit{
      display: block;
      height: 3.2em;
      width: 100%;
      max-width: 25rem;
      margin: var(--space-small) auto 0;
    }
  }
`

function ChooseTheme() {
  const [ accessToken, setAccessToken ] = useRecoilState(token.accessToken)
  const [ setAlert ] = useSetRecoilState(messageBundle.alert)
  const [ themes, setThemes ] = useState([])
  const [ chosenTheme, setChosenTheme ] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    getTasteApi(accessToken, (data)=>{
      setThemes(data)
    })
  }, [])

  function submitTaste(){
    postTasteApi(accessToken, chosenTheme, ()=>{
      setAlert('테마 선택을 완료했습니다');
      navigate('/');
    });
  }

  function onThemeClick(e, theme){
    e.currentTarget.classList.toggle('on');
    const tempTheme = chosenTheme.slice();
    const idx = chosenTheme.findIndex((chosen)=>chosen==theme.id)
    if(idx >= 0){
      tempTheme.splice(idx, 1);
    } else{
      tempTheme.push(theme.id)
    }
    setChosenTheme(tempTheme);
  }

  return (
    <PageContainer className='c_main_section'>
      <section className='c_section'>
        <h2 className='c_title'>원하는 테마 선택</h2>
      </section>
      <section className="c_section choose">
        <div className="c_inner">
          <div className='options'>
            {
              themes.map((theme)=>{
                return(
                  <div className={'option_box'}
                    key={theme.id}
                    onClick={(e)=>{onThemeClick(e, theme)}}
                  >
                    <img src={theme.photoUrl ?? NoPhoto} alt={`${theme.name} 사진`} />
                    <h3>{theme.name}</h3>
                  </div>
                )
              })
            }
          </div>
          <button className='c_btn-primary submit'
            onClick={()=> {submitTaste()}}
          >선택 완료</button>
        </div>
      </section>
    </PageContainer>
  );
}

export default ChooseTheme