import styled from "styled-components";

export const CustomToggleWrapper = styled.label`
  .toggle-control{
    transition: .3s cubic-bezier(0.95, 0.05, 0.795, 0.035);;
    width: 2rem;
    height: 1rem;
    display: block;
    border-radius: 1rem;
    background-color: #6dc7be;
    position: relative;
    &:after{
      transition: .3s cubic-bezier(0.95, 0.05, 0.795, 0.035);;
      content: "";
      width: 0.85rem;
      height: 0.85rem;
      display: block;
      background-color: #fff;
      border-radius: 50%;
      box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.75);
      position: absolute;
      top: 0.1rem;
      left: 0.1rem;
    }
  }

  input{
    display: none;
    &:checked + .toggle-control{
      background-color: #fd7e14;
      &:after{
        left: 1.1rem;
      }
    }
  }

  .toggle_input{

  }
`;
