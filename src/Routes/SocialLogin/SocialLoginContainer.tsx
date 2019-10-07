import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { facebookConnect, facebookConnectVariables } from "src/types/api";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries";

class LoginMutation extends Mutation<
  facebookConnect,
  facebookConnectVariables
> {}

interface IState {
  firstName: string;
  lastName: string;
  email?: string;
  fbId: string;
}

interface IProps extends RouteComponentProps<any> {}

class SocialLoginCotainer extends React.Component<IProps, IState> {
  public mutation: MutationFn;
  public render() {
    const { firstName, lastName, email, fbId } = this.state;
    return (
      <LoginMutation
        mutation={FACEBOOK_CONNECT}
        variables={{ firstName, lastName, email, fbId }}
      >
        {(facebookConnect, { loading }) => {
          this.mutation = facebookConnect;
          return <SocialLoginPresenter loginCallback={this.callback} />;
        }}
      </LoginMutation>
    );
  }
  public callback = fbData => {
    this.setState({
      email: fbData.email
    });
    this.mutation();
  };
}

export default SocialLoginCotainer;
