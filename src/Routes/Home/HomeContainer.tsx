import React from "react";
import { RouteComponentProps } from "react-router";
import HomePresenter from "./HomePresenter";

// type
// state
// Ftn

interface IState {
  isMenuOpened: boolean;
}
interface IProps extends RouteComponentProps<any> {}

class HomeContainer extends React.Component<IProps, IState> {
  public state = {
    isMenuOpened: false
  };

  public render() {
    const { isMenuOpened } = this.state;
    return (
      <HomePresenter isMenuOpened={isMenuOpened} toggleMenu={this.toggleMenu} />
    );
  }

  public toggleMenu = () => {
    this.setState(state => {
      return {
        isMenuOpened: !state.isMenuOpened
      };
    });
  };
}
export default HomeContainer;
