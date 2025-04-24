type EmailTemplate = {
  name: string;
  email: string;
  message: string;
}

export default function EmailTemplate({ name, email, message }: EmailTemplate) {
    return (
        <div>
          <h1>Message from {name} ({email})</h1>
          <p>{message}</p>
        </div>
    )
}