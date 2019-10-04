import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import {
  startPhoneVerification,
  startPhoneVerificationVariables
} from "src/types/api";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { PHONE_SIGN_IN } from "./PhoneQueries.queries";

// React.Componenet<Props, State>
interface IState {
  countryCode: string;
  phoneNumber: string;
}

// Mutation<data that mutation return, variables>
class PhoneSignInMutation extends Mutation<
  startPhoneVerification,
  startPhoneVerificationVariables
> {}

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
    const { history } = this.props;
    const { countryCode, phoneNumber } = this.state;
    return (
      <PhoneSignInMutation
        mutation={PHONE_SIGN_IN}
        variables={{
          phoneNumber: `${countryCode}${phoneNumber}`
        }}
        // for using mutation's reponse
        // error occured on Network => already handle error on network
        // not reach the client
        onCompleted={data => {
          const {
            StartPhoneVerification: { ok, error }
          } = data;
          if (ok) {
            return;
          } else {
            toast.error(error);
          }
        }}
      >
        {(mutation, { loading }) => {
          const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
            event.preventDefault();
            const phone = `${countryCode}${phoneNumber}`;
            const isValid = /^\+[1-9]{1}[0-9]{7,12}$/.test(phone);
            if (isValid) {
              // mutation(); // run API in backend? mutationFtn = startPhoneVerification()?
              // send data to other page, not use url because of security.
              history.push({
                pathname: "/verify-phone",
                state: {
                  phone
                }
              });
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
