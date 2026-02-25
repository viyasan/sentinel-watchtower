import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.js';

export function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("v.ariyarathnam@wealthsimple.com");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const doLogin = () => {
    setLoading(true);
    setTimeout(() => login(), 1200);
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div className="login-logo">
          <div className="logo-mark" style={{ width: 40, height: 40 }}>
            <span style={{ fontSize: 20 }}>W</span>
          </div>
          <div>
            <span className="logo-text" style={{ fontSize: 22 }}>WatchTowr</span>
            <span className="logo-sub" style={{ fontSize: 13, display: "block", marginLeft: 0 }}>by Wealthsimple Compliance</span>
          </div>
        </div>
        <div className="login-fields">
          <label className="login-label">
            Email
            <input className="login-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="analyst@wealthsimple.com" />
          </label>
          <label className="login-label">
            Password
            <input className="login-input" type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="Enter password" onKeyDown={e => e.key === "Enter" && doLogin()} />
          </label>
          <div className="login-row">
            <label className="login-check"><input type="checkbox" defaultChecked /> Remember me</label>
            <span className="login-forgot">Forgot password?</span>
          </div>
          <button className={`login-btn ${loading ? "login-loading" : ""}`} onClick={doLogin} disabled={loading}>
            {loading ? "Authenticating..." : "Sign in"}
          </button>
        </div>
        <div className="login-footer">
          <div className="login-sso">
            <span className="login-divider-text">or continue with</span>
          </div>
          <div className="login-sso-btns">
            <button className="login-sso-btn" onClick={doLogin}>Okta SSO</button>
            <button className="login-sso-btn" onClick={doLogin}>Microsoft AD</button>
          </div>
          <p className="login-legal">Protected by Wealthsimple Information Security. All sessions are monitored and logged under FINTRAC compliance requirements.</p>
        </div>
      </div>
      <div className="login-env">COMPLIANCE ENVIRONMENT {"\u00B7"} FINTRAC REGULATED {"\u00B7"} AML/ATF</div>
    </div>
  );
}
