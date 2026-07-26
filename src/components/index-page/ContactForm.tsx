"use client";

import { limits, type ContactFormRequestData } from "@/lib/contact";
import { useRouter } from "@/i18n/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Turnstile from "react-turnstile";
import Button from "../Button";

type AlertBoxStyle = "error" | "info" | "success";
type AlertBoxIconClass = "fa-circle-xmark" | "fa-circle-info" | "fa-circle-check";

export default function ContactForm() {
  const siteKey = process.env.NEXT_PUBLIC_CAPTCHA_KEY;
  const router = useRouter();
  const t = useTranslations("Contact");

  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const [sendAttempted, setSendAttempted] = useState(false);
  const [sending, setSending] = useState(false);

  const [showAlertbox, setShowAlertbox] = useState(false);
  const [alertBoxText, setAlertBoxText] = useState("");
  const [alertBoxStyle, setAlertBoxStyle] = useState<AlertBoxStyle>("info");
  const [alertBoxIconClass, setAlertBoxIconClass] = useState<AlertBoxIconClass>("fa-circle-info");
  const alertTimer = useRef(0);
  const alertBoxDuration = 5 * 1000;

  useEffect(() => () => clearTimeout(alertTimer.current), []);

  async function sendMessage() {
    setSendAttempted(true);

    if (sending || !validateFields()) {
      return;
    }

    setSending(true);
    const body: ContactFormRequestData = { name, subject, email, message, token };
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const status = response.status;
    if (status === 200) {
      router.push("/contact-success");
    } else {
      if (status === 400) {
        errorBox(t("alerts.badRequest"));
      } else if (status === 500) {
        errorBox(t("alerts.serverError"));
      } else if (status === 429) {
        errorBox(t("alerts.tooMany"));
      } else {
        errorBox(t("alerts.generic"));
      }
      const responseBody: unknown = await response.json().catch(() => null);
      console.error(`Got status code ${status} with body:`, responseBody);
    }
    setSending(false);
  }

  function validateFields() {
    return Boolean(subject && isValidEmail(email) && name && message && token);
  }

  function isValidEmail(email: string) {
    const regex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    return regex.test(String(email).toLowerCase());
  }

  function errorBox(text: string) {
    setAlertBoxStyle("error");
    setAlertBoxIconClass("fa-circle-xmark");
    showAlertBox(text);
  }

  function showAlertBox(text: string) {
    setAlertBoxText(text);
    setShowAlertbox(true);
    clearTimeout(alertTimer.current);
    alertTimer.current = window.setTimeout(() => setShowAlertbox(false), alertBoxDuration);
  }

  return (
    <section className="padding-section alt-section" id="contact">
      <div className="container">
        <div className="row">
          <div className="column-min">
            <h2 className="section-heading">{t("heading")}</h2>
          </div>
        </div>
        <div className="row row-reversed nowrap">
          <div className="column-min row-on-smaller-screens">
            <div className="contact-option">
              <i className="fas fa-envelope-open-text double-line-icon"></i>
              <div>
                <span className="bold">leon(at)heuer.ovh</span>
                <span className="light">{t("emailLabel")}</span>
              </div>
            </div>
            <div className="contact-option">
              <i className="fab fa-discord double-line-icon"></i>
              <div>
                <span className="bold">@haku2</span>
                <span className="light">{t("discordLabel")}</span>
              </div>
            </div>
          </div>
          <form
            className="column-min contact-form"
            onSubmit={(event) => {
              event.preventDefault();
              void sendMessage();
            }}
            noValidate
          >
            <div className="row row-slim">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="subject"
                  placeholder={t("placeholders.subject")}
                  maxLength={limits.subject}
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  className={
                    !subject && sendAttempted ? "empty-input" : ""
                  }
                />
                <span>{subject.length}/{limits.subject}</span>
              </div>

              <div className="input-wrapper half-input">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={t("placeholders.email")}
                  maxLength={limits.email}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={
                    !isValidEmail(email) && sendAttempted ? "empty-input" : ""
                  }
                />
                <span>{email.length}/{limits.email}</span>
              </div>

              <div className="input-wrapper half-input">
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder={t("placeholders.name")}
                  maxLength={limits.name}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={!name && sendAttempted ? "empty-input" : ""}
                />
                <span>{name.length}/{limits.name}</span>
              </div>

              <div className="input-wrapper">
                <textarea
                  name="message"
                  placeholder={t("placeholders.message")}
                  maxLength={limits.message}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className={
                    !message && sendAttempted ? "empty-input" : ""
                  }
                ></textarea>
                <span>{message.length}/{limits.message}</span>
              </div>

              <div className="captcha-wrapper">
                {siteKey && <Turnstile sitekey={siteKey} onSuccess={setToken} theme="light"/>}
                <span
                  className={`error-message ${token || !sendAttempted ? "hidden" : ""
                    }`}
                >
                  {t("errors.captcha")}
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
                  {t("errors.fillAll")}
                </span>
                <span
                  className={`error-message ${isValidEmail(email) || !sendAttempted
                    ? "hidden"
                    : ""
                    }`}
                >
                  {t("errors.invalidEmail")}
                </span>
              </div>
            </div>
            <div className="row row-slim">
              <div className="button-container">
                <Button primary>
                  <i className={`fas ${sending ? "fa-spinner fa-spin" : "fa-paper-plane"}`}></i> {t("submit")}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={`alert-box ${showAlertbox ? "shown" : ""} ${alertBoxStyle}`}>
        <i className={`fas ${alertBoxIconClass}`}></i>
        <span>{alertBoxText}</span>
      </div>
    </section>
  )
}
