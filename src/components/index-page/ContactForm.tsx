"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactForm() {
  const [sendAttempted, setSendAttempted] = useState(false);
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  function handleSubjectChange(event: React.ChangeEvent<HTMLInputElement>) {
    const content = event.target.value;
    if (content.length > 100) {
      event.preventDefault();
      event.target.value = content.substring(0, 100);
    }
    setSubject(event.target.value);
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const content = event.target.value;
    if (content.length > 50) {
      event.preventDefault();
      event.target.value = content.substring(0, 50);
    }
    setName(event.target.value);
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const content = event.target.value;
    if (content.length > 50) {
      event.preventDefault();
      event.target.value = content.substring(0, 50);
    }
    setEmail(event.target.value);
  }

  function handleMessageChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const content = event.target.value;
    if (content.length > 500) {
      event.preventDefault();
      event.target.value = content.substring(0, 500);
    }
    setMessage(event.target.value);
  }

  const router = useRouter();

  async function sendMessage() {
    setSendAttempted(true);

    const all_fields_filled = subject &&isValidEmail(email) && name && message && token;

    if (all_fields_filled) {
      const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
      };
      const body = JSON.stringify({
        name: name,
        subject: subject,
        email: email,
        message: message,
        token: token
      });
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: headers,
        body: body
      });

      const status = response.status;
      const responseBody = JSON.stringify(response.json());
      if (status != 200) {
        alert(
          "Error processing your contact request. Please use another contact option."
        );
        console.error(`Got status code ${status} with body ${responseBody}`);
        return;
      }
      router.push("/contact-success");
    }
  }

  function isValidEmail(email: string) {
    const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    return regex.test(String(email).toLowerCase());
  }

  return (
    <section className="padding-section" id="contact">
      <div className="container">
        <div className="row">
          <div className="column-min">
            <h1>Contact Me</h1>
          </div>
        </div>
        <div className="row row-reversed nowrap">
          <div className="column-min row-on-smaller-screens">
            <div className="contact-option">
              <i className="fas fa-envelope-open-text double-line-icon"></i>
              <div>
                <span className="bold">leon(at)heuer.ovh</span>
                <span className="light">Send me an email</span>
              </div>
            </div>
            <div className="contact-option">
              <i className="fab fa-discord double-line-icon"></i>
              <div>
                <span className="bold">@haku2</span>
                <span className="light">Add me on discord</span>
              </div>
            </div>
          </div>
          <div className="column-min">
            <div className="row row-slim">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Subject"
                  onChange={(event) => handleSubjectChange(event)}
                  className={
                    !subject && sendAttempted ? "empty-input" : ""
                  }
                />
                <span>{subject.length}/100</span>
              </div>

              <div className="input-wrapper half-input">
                <input
                  type="text"
                  placeholder="Your email address"
                  onChange={(event) => handleEmailChange(event)}
                  className={`${(!email && sendAttempted) ||
                    (!isValidEmail(email) && sendAttempted)
                    ? "empty-input"
                    : ""
                    }`}
                />
                <span>{email.length}/50</span>
              </div>

              <div className="input-wrapper half-input">
                <input
                  type="text"
                  placeholder="Your name"
                  onChange={(event) => handleNameChange(event)}
                  className={`${!name && sendAttempted ? "empty-input" : ""
                    }`}
                />
                <span>{name.length}/50</span>
              </div>

              <div className="input-wrapper">
                <textarea
                  placeholder="Enter message"
                  onChange={(event) => handleMessageChange(event)}
                  className={
                    !message && sendAttempted ? "empty-input" : ""
                  }
                ></textarea>
                <span>{message.length}/500</span>
              </div>

              <div className="captcha-wrapper">
                <HCaptcha
                  sitekey="dc87f7c2-9f10-4b84-9faf-45114d2e2285"
                  onVerify={setToken}
                />
                <span
                  className={`error-message ${token || !sendAttempted ? "hidden" : ""
                    }`}
                >
                  You have to complete the captcha.
                </span>
                <span
                  className={`error-message ${(email &&
                    name &&
                    subject &&
                    message) ||
                    !sendAttempted
                    ? "hidden"
                    : ""
                    }`}
                >
                  Please fill in all fields.
                </span>
                <span
                  className={`error-message ${isValidEmail(email) || !sendAttempted
                    ? "hidden"
                    : ""
                    }`}
                >
                  Please enter a valid E-Mail address.
                </span>
              </div>
            </div>
            <div className="row row-slim">
              <div className="button-container">
                <button
                  className="btn-primary"
                  onClick={() => sendMessage()}
                >
                  Send message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}