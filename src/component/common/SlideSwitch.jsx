// style
import styled from 'styled-components'

const SlideSwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;
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
    border-radius: var(--border-radius-full);
  }
  .slider:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    left: 0.3em;
    bottom: 0.3em;
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
    transform: translateX(calc(3.5em - 1.4em - 0.6em));
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