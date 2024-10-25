import _globals from "../config/_globals";
import { deleteUnverifiedAccounts } from "./auth";

const enableCrons = async () => {
  const TEN_MIN = async () => {
    await deleteUnverifiedAccounts();

    setTimeout(TEN_MIN, _globals().TEN_MIN);
  };

  TEN_MIN();
};

export default enableCrons;
