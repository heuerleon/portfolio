"use client";

import { ContactFormRequestData } from "@/app/api/contact/route";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Turnstile from "react-turnstile";
import Button from "../Button";

type AlertBoxStyle = "error" | "info" | "success";
type AlertBoxIconClass = "fa-circle-xmark" | "fa-circle-info" | "fa-circle-check";

export default function ContactForm() {
  const siteKey = process.env.NEXT_PUBLIC_CAPTCHA_KEY;
  const [subject, setSubject] = useState("");
  
  function handleSubjectChange(event: React.ChangeEvent<HTMLInputElement>) {
    const content = event.target.value;
    if (content.length > 100) {
      event.preventDefault();
      event.target.value = content.substring(0, 100);
    }
    setSubject(event.target.value);
  }

  const [name, setName] = useState("");

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    const content = event.target.value;
    if (content.length > 50) {
      event.preventDefault();
      event.target.value = content.substring(0, 50);
    }
    setName(event.target.value);
  }

  const [email, setEmail] = useState("");

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    const content = event.target.value;
    if (content.length > 50) {
      event.preventDefault();
      event.target.value = content.substring(0, 50);
    }
    setEmail(event.target.value);
  }

  const [message, setMessage] = useState("");

  function handleMessageChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const content = event.target.value;
    if (content.length > 500) {
      event.preventDefault();
      event.target.value = content.substring(0, 500);
    }
    setMessage(event.target.value);
  }

  const router = useRouter();
  const [sendAttempted, setSendAttempted] = useState(false);
  const [sending, setSending] = useState(false);
  const [token, setToken] = useState("");
  
  async function sendMessage() {
    setSendAttempted(true);

    if (validateFields()) {
      setSending(true);
      const headers = {
        "Accept": "application/json",
        "Content-Type": "application/json"
      };
      const body: ContactFormRequestData = {
        name: name,
        subject: subject,
        email: email,
        message: message,
        token: token
      };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
      });

      const status = response.status;
      const responseBody: string = await response.json();
      if (status != 200) {
        if (status == 400) {
          errorBox(
            "Error processing your contact request. Please check your input."
          );
        } else if (status == 500) {
          errorBox(
            "Error processing your contact request. There was an internal server error while sending your message. Please use another contact option."
          );
        } else if (status == 429) {
          errorBox(
            "You are sending too many messages. Please try again one hour later."
          );
        } else {
          errorBox(
            "Error processing your contact request. Please use another contact option."
          );
        }
        console.error(`Got status code ${status} with body:`, responseBody);
      } else {
        router.push("/contact-success");
      }
      setSending(false);
      return;
    }
  }

  function validateFields() {
    return subject && isValidEmail(email) && name && message && token;
  }

  function isValidEmail(email: string) {
    const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    return regex.test(String(email).toLowerCase());
  }

  const [showAlertbox, setShowAlertbox] = useState(false);
  const [alertBoxText, setAlertBoxText] = useState("");
  const [alertBoxStyle, setAlertBoxStyle] = useState<AlertBoxStyle>("info");
  const [alertBoxIconClass, setAlertBoxIconClass] = useState<AlertBoxIconClass>("fa-circle-info");
  const alertBoxDuration = 5 * 1000;

  function errorBox(text: string) {
    setAlertBoxStyle("error");
    setAlertBoxIconClass("fa-circle-xmark");
    showAlertBox(text);
  }

  function showAlertBox(text: string) {
    setAlertBoxText(text);
    setShowAlertbox(true);
    setTimeout(() => setShowAlertbox(false), alertBoxDuration);
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
          <div className="column-min contact-form">
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
                {siteKey && <Turnstile sitekey={siteKey} onSuccess={setToken} theme="light"/>}
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
                <Button onClick={() => sendMessage()} primary>
                  <i className={`fas ${sending ? "fa-spinner fa-spin" : "fa-paper-plane"}`}></i> Send message
                </Button>    
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`alert-box ${showAlertbox ? "shown" : ""} ${alertBoxStyle}`}>
        <i className={`fas ${alertBoxIconClass}`}></i>
        <span>{alertBoxText}</span>
      </div>
    </section>
  )
}