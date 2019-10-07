import React from "react";
import { Mutation, MutationFn } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
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
  public facebookMutation: MutationFn;
  public state = {
    email: "",
    fbId: "",
    firstName: "",
    lastName: ""
  };
  public render() {
    return (
      <LoginMutation mutation={FACEBOOK_CONNECT}>
        {(facebookConnectMutation, { loading }) => {
          this.facebookMutation = facebookConnectMutation;
          return <SocialLoginPresenter loginCallback={this.loginCallback} />;
        }}
      </LoginMutation>
    );
  }
  public loginCallback = response => {
    const { name, first_name, last_name, email, id, accessToken } = response;
    if (accessToken) {
      toast.success(`Welcome ${name}!`);
      this.facebookMutation({
        variables: {
          email,
          fbId: id,
          firstName: first_name,
          lastName: last_name
        }
      });
    } else {
      toast.error("Could not log you in 😢");
    }
  };
}

export default SocialLoginCotainer;
