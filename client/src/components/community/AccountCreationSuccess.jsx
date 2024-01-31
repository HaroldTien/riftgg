import React from 'react';
import "../../css/community/AccountCreationSuccess.css"
function AccountCreationSuccess() {
  return (
    <div className="account-creation-success">
      <h1>Account Created Successfully!</h1>
      <p>Your account has been successfully created. You can now log in and start using our services.</p>
      {/* You can add navigation options here, like a link to the login page */}
      <a href="/community/signin">Go to Login</a>
    </div>
  );
}

export default AccountCreationSuccess;
