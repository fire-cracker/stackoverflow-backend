const subscribersMailTemplate = ( subscriberName, subscriberId, questionTitle, questionId ) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Coinbase</title>
</head>

<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" style="margin: 0pt auto; padding: 0px; background:#F4F7FA;">
  <table id="main" width="100%" height="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F4F7FA">
    <tbody>
      <tr>
        <td valign="top">
          <table class="innermain" cellpadding="0" width="580" cellspacing="0" border="0" bgcolor="#F4F7FA" align="center"
            style="margin:0 auto; table-layout: fixed;">
            <tbody>
              <!-- START of MAIL Content -->
              <tr>
                <td colspan="4">
                  <!-- Logo start here -->
                  <table class="logo" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                      <tr>
                        <td colspan="2" height="30"></td>
                      </tr>
                      <tr>
                        <td valign="top" align="center">
                          <p style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif;color:#4E5C6E;line-height:20px;font-size:1.75rem;">StackOverflow
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- Logo end here -->
                  <!-- Main CONTENT -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                    <tbody>
                      <tr>
                        <td height="40"></td>
                      </tr>
                      <tr style="font-family: -apple-system,BlinkMacSystemFont,&#39;Segoe UI&#39;,&#39;Roboto&#39;,&#39;Oxygen&#39;,&#39;Ubuntu&#39;,&#39;Cantarell&#39;,&#39;Fira Sans&#39;,&#39;Droid Sans&#39;,&#39;Helvetica Neue&#39;,sans-serif; color:#4E5C6E; font-size:14px; line-height:20px; margin-top:20px;">
                        <td class="content" colspan="2" valign="top" align="center" style="padding-left:90px; padding-right:90px;">
                          <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff">
                            <tbody>
                              <tr>
                                <td align="center" valign="bottom" colspan="2" cellpadding="3">
                                  <img alt="Coinbase" width="80" src="https://www.coinbase.com/assets/app/icon_email-e8c6b940e8f3ec61dcd56b60c27daed1a6f8b169d73d9e79b8999ff54092a111.png" />
                                </td>
                              </tr>
                              <tr>
                                <td height="30" &nbsp;=""></td>
                              </tr>
                              <tr>
                                <td align="center"> <span style="color:#48545d;font-size:22px;line-height: 24px;">
                                    Question Notification
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td height="24" &nbsp;=""></td>
                              </tr>
                              <tr>
                                <td height="1" bgcolor="#DAE1E9"></td>
                              </tr>
                              <tr>
                                <td height="24" &nbsp;=""></td>
                              </tr>
                              <tr>
                                <td align="center"> <span style="color:#48545d;font-size:14px;line-height:24px;">
                                    Hi ${subscriberName}, There is a new answer for this question: "<a href=${process.env.DOMAIN}/questions/${questionId}>${questionTitle}</a>". <br>
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td height="20" &nbsp;=""></td>
                              </tr>
                              <tr>
                                <td valign="top" width="48%" align="center"> <span>
                                    
                                  </span>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td height="60"></td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- Main CONTENT end here -->
                  <!-- FOOTER start here -->
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tbody>
                      <tr>
                        <td height="10">&nbsp;</td>
                      </tr>
                      <tr>
                        <td valign="top" align="center"> <span style="font-family: -apple-system,BlinkMacSystemFont,&#39;Segoe UI&#39;,&#39;Roboto&#39;,&#39;Oxygen&#39;,&#39;Ubuntu&#39;,&#39;Cantarell&#39;,&#39;Fira Sans&#39;,&#39;Droid Sans&#39;,&#39;Helvetica Neue&#39;,sans-serif; color:#9EB0C9; font-size:12px;">&copy;
                            <a href="#" target="_blank" style="color:#9EB0C9 !important; text-decoration:none;">StackOverflow
                              </a>
                            &nbsp;&nbsp;|&nbsp;&nbsp;
                            <a href=${process.env.DOMAIN}/users/${subscriberId}/unsubscribe style="color:#9EB0C9 !important;">Unsubscribe
                          </a>from all future emails.
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td height="50">&nbsp;</td>
                      </tr>
                    </tbody>
                  </table>
                  <!-- FOOTER end here -->
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</body>

</html>
`;
export default subscribersMailTemplate;