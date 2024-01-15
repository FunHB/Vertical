interface EmailTemplateProps {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    area: string;
    message: string;
    files: File;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
}) => (
    <div>
        <h1>Welcome, {firstName}!</h1>
    </div>
)