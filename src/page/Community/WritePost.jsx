// core
import { useState, useCallback, useRef } from 'react';
// style
import styled from 'styled-components'
// recoil
import { messageBundle } from 'store/index';
import { useSetRecoilState } from 'recoil';
// router
import { useNavigate, useParams } from 'react-router-dom'
// api
import useAuthPost from 'api/useAuthPost'
import useAuthFetch from 'api/useAuthFetch'
import useAuthPatch from 'api/useAuthPatch'
// 카카오 주소 검색
import { useDaumPostcodePopup } from 'react-daum-postcode';
// component
import { InputBasic } from 'component/common/InputBundle'
import Filter from 'component/common/Filter';
// img
import { ReactComponent as CloseSvg }  from "assets/image/common/icon/close.svg";
import { ReactComponent as AddSvg }  from "assets/image/Community/icon_image_add.svg";
import { useEffect } from 'react';

const PageContainer = styled.section`
  .writeContent .c_inner{
    max-width: 60rem;
    >div{
      margin: 1rem 0;
      &:first-child{
        margin-top: 0;
      }
      >h4{
        margin-bottom: 0.5rem;
        font-size: var(--font-size-large);
        font-weight: var(--font-w-mid);
      }
      &.content{
        .textarea_wrapper{
          width: 100%;
          height: 25rem;
          border-radius: var(--border-radius-mid);
          border: 1px solid var(--border-color-default);
          padding: 1em;
          &.focus{
            border-color: var(--primary-color);
          }
          textarea{
            padding: 0;
            width: 100%;
            height: 100%;
            border: none;
          }
        }
      }
      &.address{
        max-width: 50rem;
        input{
          &:focus{
            border-color: unset;
          }
        }
      }
      &.images{
        .change_info{
          color: var(--font-color-sub);
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .file_list{
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
          max-width: 70rem;
          li{
            position: relative;
            display: flex;
            align-items: center;
            aspect-ratio: 1;
            border-radius: var(--border-radius-mid);
            border: 1px solid var(--border-color-default);
            overflow: hidden;
            cursor: pointer;
            &:hover{
              p{
                opacity: 1;
              }
            }
            p{
              position: absolute;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 100%;
              height: 100%;
              background-color: rgba(0,0,0,0.3);
              color: #fff;
              opacity: 0;
              transition: var(--transition-default);
              svg{
                width: 30%;
              }
            }
            >img,
            >svg{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
    .btn_wapper{
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      button{
        display: block;
        height: 4.5rem;
        width: 100%;
        max-width: 10rem;
      }
    }
  }
`

function WritePost() {
  const { postId } = useParams();
  const setAlert = useSetRecoilState(messageBundle.alert);
  const setConfirm = useSetRecoilState(messageBundle.confirm);
  const navigate = useNavigate();
  const [ title, setTitle ] = useState('');
  const [ titleError, setTitleError ] = useState('');
  const [ content, setContent ] = useState('');
  const [ contentError, setContentError ] = useState('');
  const [ address, setAddress ] = useState('');
  const [ addressError, setAddressError ] = useState('');
  const [ themeIds, setThemeIds ] = useState([]);
  const [ themesError, setThemesError ] = useState([]);
  const [ images, setImages ] = useState([]);
  const [ imageThumbs, setImageThumbs ] = useState([]);

  const inputFileEl = useRef(); // input file element

  const { mutate: postingApi } = useAuthPost({ url: 'posts' });
  const { mutate: modifyPostingApi } = useAuthPatch({ url: `/posts/${postId}` });

  // 수정인 경우 새로 받아옴
  const { data: postDetail, isLoading: isPostDetailLoading } = useAuthFetch({
    url: `posts/${postId}`,
    key: ['postDetail', postId],
    enabled: !!postId // 수정인 경우에만 받아옴
  })

  useEffect(()=>{ // 수정인경우 상세데이터 자동 입력
    if(!postId) return; // 수정이 아닌경우 중단
    if(!postDetail.isWriter) {  // 수정 권한 없는 경우
      setAlert('수정 권한이 없습니다');
      navigate('/community');
      return;
    }
    setTitle(postDetail.title);
    setContent(postDetail.content);
    setAddress(postDetail.address);
    setThemeIds(postDetail.themes.map(el=>el.id))
  }, [])

  const open = useDaumPostcodePopup();
  const addrSearchComplete  = useCallback((data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    if(data.addressType === 'R') {
      if(data.bname !== '') {
        extraAddress += data.bname;
      }
      if(data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    // setAddressCode(data.zonecode);
    setAddress(fullAddress);
  });
  const addrSearchClick = useCallback(() => {
    open({ onComplete: addrSearchComplete });
  })
  function imagesSelected(e){
    const file = e.currentTarget.files[0];
    console.log(file)
    if(!file) return; // 선택된것 없으면 중단
    if (images.length + 1 > 5) { // 합쳐서 5개 이상이면 중단
      setAlert("최대 5개를 선택해주세요");
      return;
    }
    // 2.5MB보다 크면 안받도록
    if (file.size > 1048576 * 2.5) {
      setAlert("2.5MB 이하 이미지를 선택해 주세요");
    } else if ( // 이미지일 때만 넣음
        !file.type.includes("image") || file.type.includes("gif")
      ) {
      setAlert("이미지만 선택해주세요. (.gif 제외)");
    } else {
      setImages([ ...images, file ]);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageThumbs([ ...imageThumbs, event.target.result ]);
      };
      reader.readAsDataURL(file);
    }
  }
  function imageDelete(i){
    const tempImages = images.slice();
    tempImages.splice(i,1);
    const tempImageThumb = imageThumbs.slice()
    tempImageThumb.splice(i,1);
    setImages(tempImages);
    setImageThumbs(tempImageThumb);
  }
  function resetErrors(){
    setTitleError('')
    setContentError('')
    setAddressError('')
    setThemesError('')
  }

  function posting(){
    resetErrors()
    if(!title) {
      setTitleError('제목을 작성해주세요');
      return;
    }
    if(!content) {
      setContentError('내용을 작성해주세요');
      return;
    }
    if(!address) {
      setAddressError('위치를 입력해주세요');
      return;
    }
    if(themeIds.length==0) {
      setThemesError('테마를 선택해주세요');
      return;
    }
    setConfirm({
      message: `${postId ? '포스트 내용을 수정하시겠습니까?' : '작성한 내용을 포스팅하시겠습니까?'}`,
      callback: ()=>{
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("address", address);
        formData.append("themes", themeIds.toString());
        for(let i=0,len=images.length; i<len; i++){
          formData.append('files', images[i])
        }
        if(postId){
          modifyPostingApi(formData, {
            onSuccess: ()=>{
              setAlert('포스팅 수정이 완료되었습니다');
              navigate('/community');
            },
            onError: ()=>{
              setAlert('포스팅을 올리는데 실패하였습니다');
            }
          })
        } else {
          postingApi(formData, {
            onSuccess: ()=>{
              setAlert('포스팅이 완료되었습니다');
              navigate('/community');
            },
            onError: ()=>{
              setAlert('포스팅을 올리는데 실패하였습니다');
            }
          })
        }
      }
    })
  }

  return (
    <PageContainer className='c_main_section'>
      <section className="c_section c_top_banner">
        <picture>
          <source media="(min-width: 600px)" srcSet={require('assets/image/Community/banner.jpg')} />
          <img src={require("assets/image/Community/banner_min.jpg")} alt="커뮤니티 페이지 배너" 
            style={{
              objectPosition: "50% 40%",
              filter: "brightness(0.7)"
            }}
          />
        </picture>
        <h2>나만의 장소</h2>
      </section>
      <div className="c_section writeContent">
        <h2 className='c_title'>포스팅{postId ? ' 수정' : ''}</h2>
        <div className="c_inner">
          <div className="title">
            <h4>제목<i className="c_star"></i></h4>
            <InputBasic
              value={title}
              onChange={(e)=> setTitle(e.currentTarget.value) }
            />
            { titleError && <p className='c_error_message'>{titleError}</p> }
          </div>
          <div className="content">
            <h4>내용<i className="c_star"></i></h4>
            <div className="textarea_wrapper">
              <textarea
                value={content}
                onFocus={(e)=>{ e.currentTarget.parentElement.classList.add('focus') }}
                onBlur={(e)=>{ e.currentTarget.parentElement.classList.remove('focus') }}
                onChange={(e)=> setContent(e.currentTarget.value) }
              ></textarea>
            </div>
            { contentError && <p className='c_error_message'>{contentError}</p> }
          </div>
          
          <div className="images">
            <h4>이미지 <strong>(각각 2.5MB)</strong></h4>
            {
              postId &&
              <p className='change_info'>수정시 이미지를 추가하면 원래 이미지는 삭제됩니다</p>
            }
            <input type="file" ref={inputFileEl}
              accept="image/*"
              capture="camera"
              style={{ display: "none" }}
              onChange={imagesSelected}
            />
            <ul className='file_list'>
              { images?.length>0 &&// 파일 선택됐을 때 선택된 파일 보이게
                images.map((el, i)=> {
                  return(
                    <li key={i}>
                      <img src={imageThumbs[i]} alt={el.name} />
                      <p onClick={()=> imageDelete(i)}>
                        <CloseSvg />
                      </p>
                    </li>
                  )
                })
              }
              {
                images.length !=5 &&
                <li onClick={()=>inputFileEl.current.click()}>
                  <AddSvg />
                </li>
              }
            </ul>
          </div>
          <div className='address'>
            <h4>위치<i className="c_star"></i></h4>
            <InputBasic
              value={address}
              onChange={(e)=> setAddress(e.currentTarget.value) }
              onClick={()=> {
                setAddress('');
                addrSearchClick();
              }}
              readOnly
            />
            { addressError && <p className='c_error_message'>{addressError}</p> }
          </div>
          <div className='themes'>
            <Filter setThemeIds={(data)=>{
                setThemeIds(data);
                if(data.length!=0){
                  setThemesError('');
                }
              }}
              initThemes={themeIds}
              filterLocation={false}
              buttonStyle={{
                alignSelf: 'flex-start'
              }}
            />
            { themesError && <p className='c_error_message'>{themesError}</p> }
          </div>
          <div className='btn_wapper'>
            {
              postId &&
              <button className="c_btn-primary-reverse cancel"
                onClick={()=>{ navigate(-1) }}
              >
                수정취소
              </button>
            }
            <button className="c_btn-primary submit"
              onClick={()=>{ posting() }}
            >
              {postId? '수정하기' : '포스팅'}
            </button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default WritePost