// style
import styled from 'styled-components'

const SlideSwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  input {
    display: none;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: var(--transition-default);
    border-radius: 34px;
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: var(--transition-default);
    border-radius: 50%;
  }
  input:checked + .slider {
    background-color: var(--primary-color);
  }
  input:focus + .slider {
    box-shadow: 0 0 1px var(--primary-color);
  }
  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`

function SlideSwitch({ ...props }){
  return (
    <SlideSwitchContainer>
      <input type="checkbox" checked={props.checked}
        onChange={props.onChange}
      />
      <span className="slider"></span>
    </SlideSwitchContainer>
  )
}

export default SlideSwitch;