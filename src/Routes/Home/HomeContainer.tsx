import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { USER_PROFILE } from "src/sharedQueries";
import { userProfile } from "src/types/api";
import HomePresenter from "./HomePresenter";

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
        {({ loading }) => (
          <HomePresenter
            isMenuOpened={isMenuOpened}
            toggleMenu={this.toggleMenu}
            loading={loading}
          />
        )}
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
