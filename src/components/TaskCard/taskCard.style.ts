import styled from 'styled-components';

const TaskCardWrapper = styled.div`
  width: 100%;
  background: #fff 0 0 no-repeat padding-box;
  box-shadow: 0 0 6px rgb(0 0 0 / 10%);
  border-radius: 5px;
  position: relative;
`;

export const TaskTopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem 1.5rem 0 1.5rem;
`;

export const SkillsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 1rem 1.5rem;
  margin: 0.5rem 0 1rem 0;
`;

export const SkillPill = styled.div`
  padding: 0.6rem 1.2rem;
  margin-right: 1rem;
  background: #f8f8f8;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  opacity: 1;
  text-align: left;
  font-size: 13px;
  letter-spacing: 0;
  color: #2c2c2c;
  cursor: pointer;

  &:hover {
    background: #66aaa2;
    color: #ffffe8;
  }
`;

export const TaskBottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #eaeaea;
  padding: 1rem 1.5rem;

  .left-section {
    display: flex;

    .duration {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-right: 2px solid #eaeaea;
      padding-right: 1rem;

      span {
        color: #707070;
        font-size: 14px;
      }

      h4 {
        margin: 0;
      }
    }
  }

  .right-section {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    .bid-closes {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-right: 1rem;

      .inline {
        align-items: center;

        .timer-icon {
          font-size: 16px;
          color: #a3a3a3;
          margin: 0 0.4rem;
        }
      }

      span {
        color: #707070;
        font-size: 14px;
      }

      h4 {
        margin: 0;
      }
    }
  }
`;

export default TaskCardWrapper;
