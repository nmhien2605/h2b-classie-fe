import { Fragment } from "react";
import { Check } from "react-feather";
import Avatar from '@components/avatar'

export const SuccessToast = () => (
  <Fragment>
    <div className="toastify-header">
      <div className="title-wrapper">
        <Avatar size="sm" color="success" icon={<Check size={12} />} />
        <h6 className="toast-title">Success!</h6>
      </div>
      <small className="text-muted">11 Min Ago</small>
    </div>
    <div className="toastify-body">
      <span role="img" aria-label="toast-text">
        👋 Jelly-o macaroon brownie tart ice cream croissant jelly-o apple pie.
      </span>
    </div>
  </Fragment>
);
