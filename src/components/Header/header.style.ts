import styled from "styled-components";

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .account,
  .contract {
    display: flex;
    justify-content: flex-end;
    width: 100%;

    a {
      margin-left: 0.5rem;
      text-decoration: none;
      color: rgb(109, 199, 190);

      &:hover {
        color: rgb(119, 219, 200);
      }
    }

    .remove-contract {
      margin-left: 0.5rem;
      color: gray;

      &:hover {
        color: #4d4d4d;
        cursor: pointer;
      }
    }
  }
`;

export default HeaderWrapper;
