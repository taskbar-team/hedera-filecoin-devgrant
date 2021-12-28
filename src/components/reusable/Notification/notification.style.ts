import styled from "styled-components";
import {Snackbar} from "@mui/material";

const NotificationWrapper = styled(Snackbar)`
  right: 30px !important;

  .alert {
    display: flex;
    align-items: center;

    .MuiIconButton-root {
      min-width: 2.5rem;
    }
  }
`;

export default NotificationWrapper;
