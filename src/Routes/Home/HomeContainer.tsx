import React from "react";
import { RouteComponentProps } from "react-router";
import HomePresenter from "./HomePresenter";
import { Query } from "react-apollo";
import { userProfile } from "src/types/api";
import { USER_PROFILE } from "src/sharedQueries";

interface IState {
  isMenuOpened: boolean;
}
interface IProps extends RouteComponentProps<any> {}

class ProfileQuery extends Query<userProfile> {}

class HomeContainer extends React.Component<IProps, IState> {
  public state = {
    isMenuOpened: false
  };

  public render() {
    const { isMenuOpened } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE}>
        <HomePresenter
          isMenuOpened={isMenuOpened}
          toggleMenu={this.toggleMenu}
        />
      </ProfileQuery>
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
