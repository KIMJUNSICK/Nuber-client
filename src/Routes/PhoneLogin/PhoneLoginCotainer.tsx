import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { PHONE_SIGN_IN } from "./PhoneQueries";

// React.Componenet<Props, State>
interface IState {
  countryCode: string;
  phoneNumber: string;
}

interface IMutationInterface {
  phoneNumber: string;
}

// Mutation<data that mutation return, variables>
class PhoneSignInMutation extends Mutation<any, IMutationInterface> {}

class PhoneLoginContainer extends React.Component<
  RouteComponentProps<any>,
  IState
> {
  // state have prerequisite that data of state is changed at any time
  public state = {
    countryCode: "+82",
    phoneNumber: ""
  };

  public render() {
    const { countryCode, phoneNumber } = this.state;
    return (
      <PhoneSignInMutation
        mutation={PHONE_SIGN_IN}
        variables={{
          phoneNumber: `${countryCode}${phoneNumber}`
        }}
      >
        {(mutationFtn, { loading }) => {
          const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
            event.preventDefault();
            const isValid = /^\+[1-9]{1}[0-9]{7,12}$/.test(
              `${countryCode}${phoneNumber}`
            );
            console.log(isValid);
            if (isValid) {
              mutationFtn(); // run API in backend? mutationFtn = startPhoneVerification()?
            } else {
              toast.error("Please write a valid phoneNumber");
            }
          };

          return (
            <PhoneLoginPresenter
              countryCode={countryCode}
              phoneNumber={phoneNumber}
              onInputChange={this.onInputChange}
              onSubmit={onSubmit}
              loading={loading}
            />
          );
        }}
      </PhoneSignInMutation>
    );
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default PhoneLoginContainer;
