import styled, { css } from "styled-components";

const StyledButton = styled.button`
  padding: ${(props) => props.padding || "0.4em 1em"};
  border-radius: 0.5em;
  border: 1px solid var(--border-color-default);
  color: ${(props) => props.color || "inherit"};
  transition: var(--transition-default);

  /* primary button */
  ${(props) =>
    props.primary &&
    css`
      color: var(--primary-color);
      border-color: var(--primary-color);
      :hover{
        color: var(--primary-color-contrast);
        background-color: var(--primary-color);
      }
      :active{
        color: var(--primary-color-contrast);
        background-color: var(--primary-color-effect);
        border-color: var(--primary-color-effect);
      }
    `}

  /* secondary button */
  ${(props) =>
    props.secondary &&
    css`
      color: var(--secondary-color);
      border-color: var(--secondary-color);
      :hover{
        color: var(--secondary-color-contrast);
        background-color: var(--secondary-color);
      }
      :active{
        color: var(--secondary-color-contrast);
        background-color: var(--secondary-color-effect);
        border-color: var(--secondary-color-effect);
      }
    `}
`;

function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

export default Button