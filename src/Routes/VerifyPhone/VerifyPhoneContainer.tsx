import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { verifyPhone, verifyPhoneVariables } from "src/types/api";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { VERIFY_PHONE } from "./VerifyPhoneQueries";

interface IState {
  key: string;
  phoneNumber: string;
}

interface IProps extends RouteComponentProps<any> {}

class VerifyPhoneMutation extends Mutation<verifyPhone, verifyPhoneVariables> {}

class VerifyPhoneContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    console.log(props);
    if (!props.location.state) {
      props.history.push("/");
    }
    this.state = {
      key: "",
      phoneNumber: props.location.state.phone
    };
  }

  public render() {
    const { key, phoneNumber } = this.state;

    return (
      <VerifyPhoneMutation
        mutation={VERIFY_PHONE}
        variables={{ key, phoneNumber }}
      >
        {(mutation, { loading }) => {
          return (
            <VerifyPhonePresenter onChange={this.onInputChange} key={key} />
          );
        }}
      </VerifyPhoneMutation>
    );
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default VerifyPhoneContainer;

// class + types
// because of class => constructor
// public or private
