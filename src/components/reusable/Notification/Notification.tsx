import React, {ReactElement} from "react";
import {Alert, SnackbarCloseReason} from "@mui/material";
import NotificationWrapper from "./notification.style";

export type Notify = {
  show: boolean,
  message: ReactElement | string,
  type: "success" | "error" | "warning" | "info"
};

type Props = {
  notify: Notify;
  setNotify: (notify: Notify) => void;
};

const Notification: React.FC<Props> = ({notify, setNotify}) => {
  const handleOnClose = (event: any, reason?: SnackbarCloseReason) => {
    if(reason === 'clickaway'){
      return;
    }

    setNotify({...notify, show: false});
  };

  return <NotificationWrapper
      open={notify.show}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleOnClose}>
      <Alert className="alert" severity={notify.type} onClose={handleOnClose}>
        {notify.message}
      </Alert>
  </NotificationWrapper>
}

export default Notification;
