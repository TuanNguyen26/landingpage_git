import styled from 'styled-components';

export const NavBarWrapper = styled.div`
  position: relative;
`;

export const NavBarDefault = styled.nav`
  /* position: absolute; */
  height: 58px !important;
`;
export const NavBarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #000;
  width: 100%;
  line-height: 58px;
  position: fixed;
  z-index: 90;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  padding: 0 10px;
`;

export const NavBarRight = styled.div`
  display: flex !important;
  align-items: center;
  justify-content: center;
`;

export const UlHeader = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style-type: none;
  line-height: 58px;
  margin: 0 !important;
  height: 58px !important;

  a {
    color: #000;
    margin: 0 20px;
  }
`;

export const LiHeader = styled.li`
  display: flex;
  margin: 0 10px;
`;
