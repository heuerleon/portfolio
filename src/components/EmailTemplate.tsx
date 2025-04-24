type EmailTemplate = {
  name: string;
  email: string;
  message: string;
}

export default function EmailTemplate({ name, email, message }: EmailTemplate) {
  return (
    <div>
      <h3>You received a message from {name} ({email}):</h3>
      <p>{message}</p>
    </div>
  )
}