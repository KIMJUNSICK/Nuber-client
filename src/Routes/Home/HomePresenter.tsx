import React from "react";
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import styled from "../../typed-components";

interface IProps {
  isMenuOpened: boolean;
  toggleMenu: () => void;
}

const Container = styled.div``;

const HomePresenter: React.FunctionComponent<IProps> = ({
  isMenuOpened,
  toggleMenu
}) => (
  <Container>
    <Helmet>
      <title>Home | Number</title>
    </Helmet>
    <Sidebar
      sidebar={<b>Sidebar content</b>}
      open={isMenuOpened}
      onSetOpen={toggleMenu}
      styles={{
        sidebar: {
          backgroundColor: "white",
          width: "80%",
          zIndex: "10"
        }
      }}
    >
      <button onClick={toggleMenu}>Open sidebar</button>
    </Sidebar>
  </Container>
);

export default HomePresenter;
