import { CLEAR_SUBSCRIPTIONS } from "../../../app/actions/types";
import { getUserCredentials } from "../network/rocket-chat";

export default async reduxStore => {
  let user = await getUserCredentials();

  const { subscriptions } = reduxStore.getState();
  if (user && user.authToken && user.userId) {
    let channelWithUnread = subscriptions.find(channel => channel.unread > 0);
    const uri = `https://chat.opensocial.me/channel/${
      channelWithUnread ? channelWithUnread.name : "general"
    }`;
    const uri = LOGIN_URI;
    reduxStore.dispatch({ type: CLEAR_SUBSCRIPTIONS }); //remove badge count
    window.open(uri, "_blank");
  } else {
    window.open(LOGIN_URI, "_blank");
  }
};

const LOGIN_URI =
  "https://sso.opensocial.me/simplesaml/module.php/core/loginuserpass.php?AuthState=_907cc617a006407694e6d285662d21381252732467%3Ahttps%3A%2F%2Fsso.opensocial.me%2Fsimplesaml%2Fsaml2%2Fidp%2FSSOService.php%3Fspentityid%3Dhttps%253A%252F%252Fchat.opensocial.me%252F_saml%252Fmetadata%252Fchatopensocial%26cookieTime%3D1543598235%26RelayState%3Dchatopensocial";

// direct to open social modal:
// const LOGIN_URI =
//   "https://sso.opensocial.me/simplesaml/module.php/core/loginuserpass.php?AuthState=_d91691e7e96132e5204b6d01a44fe72770926cdde4%3Ahttps%3A%2F%2Fsso.opensocial.me%2Fsimplesaml%2Fsaml2%2Fidp%2FSSOService.php%3Fspentityid%3Dhttps%253A%252F%252Fchat.opensocial.me%252F_saml%252Fmetadata%252Fchatopensocial%26cookieTime%3D1543604474%26RelayState%3Dchatopensocial";
