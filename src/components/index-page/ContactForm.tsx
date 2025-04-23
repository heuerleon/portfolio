"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ContactForm() {
  const [sendAttempted, setSendAttempted] = useState(false);
  const [contactSubject, setContactSubject] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [token, setToken] = useState("");

  function handleSubjectChange(event: React.ChangeEvent<HTMLInputElement>) {
    const content = event.target.value;
    if (content.length > 100) {
      event.preventDefault();
      event.target.value = content.substring(0, 100);
    }
    setContactSubject(event.target.value);
  }

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const content = event.target.value;
    if (content.length > 50) {
      event.preventDefault();
      event.target.value = content.substring(0, 50);
    }
    setContactName(event.target.value);
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const content = event.target.value;
    if (content.length > 50) {
      event.preventDefault();
      event.target.value = content.substring(0, 50);
    }
    setContactEmail(event.target.value);
  }

  function handleMessageChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const content = event.target.value;
    if (content.length > 500) {
      event.preventDefault();
      event.target.value = content.substring(0, 500);
    }
    setContactMessage(event.target.value);
  }

  const router = useRouter();

  async function sendMessage() {
    setSendAttempted(true);

    const all_fields_filled =
      contactSubject &&
      contactEmail &&
      isValidEmail(contactEmail) &&
      contactName &&
      contactMessage &&
      token;

    if (all_fields_filled) {
      const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
      };
      const body = JSON.stringify({
        name: contactName,
        subject: contactSubject,
        email: contactEmail,
        message: contactMessage
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
                    !contactSubject && sendAttempted ? "empty-input" : ""
                  }
                />
                <span>{contactSubject.length}/100</span>
              </div>

              <div className="input-wrapper half-input">
                <input
                  type="text"
                  placeholder="Your email address"
                  onChange={(event) => handleEmailChange(event)}
                  className={`${(!contactEmail && sendAttempted) ||
                    (!isValidEmail(contactEmail) && sendAttempted)
                    ? "empty-input"
                    : ""
                    }`}
                />
                <span>{contactEmail.length}/50</span>
              </div>

              <div className="input-wrapper half-input">
                <input
                  type="text"
                  placeholder="Your name"
                  onChange={(event) => handleNameChange(event)}
                  className={`${!contactName && sendAttempted ? "empty-input" : ""
                    }`}
                />
                <span>{contactName.length}/50</span>
              </div>

              <div className="input-wrapper">
                <textarea
                  placeholder="Enter message"
                  onChange={(event) => handleMessageChange(event)}
                  className={
                    !contactMessage && sendAttempted ? "empty-input" : ""
                  }
                ></textarea>
                <span>{contactMessage.length}/500</span>
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
                  className={`error-message ${(contactEmail &&
                    contactName &&
                    contactSubject &&
                    contactMessage) ||
                    !sendAttempted
                    ? "hidden"
                    : ""
                    }`}
                >
                  Please fill in all fields.
                </span>
                <span
                  className={`error-message ${isValidEmail(contactEmail) || !sendAttempted
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