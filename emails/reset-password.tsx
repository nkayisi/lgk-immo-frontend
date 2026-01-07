import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordProps {
    resetUrl: string;
    userName?: string;
}

export const ResetPassword = ({ resetUrl, userName }: ResetPasswordProps) => {
    return (
        <Html>
            <Head />
            <Preview>Réinitialisez votre mot de passe LGK Immo</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={logoContainer}>
                        <Heading style={h1}>LGK Immo</Heading>
                    </Section>

                    <Heading style={h2}>Réinitialisation de mot de passe</Heading>

                    <Text style={text}>
                        Bonjour{userName ? ` ${userName}` : ""} !
                    </Text>

                    <Text style={text}>
                        Nous avons reçu une demande de réinitialisation de mot de passe
                        pour votre compte LGK Immo. Si vous êtes à l&apos;origine de cette
                        demande, cliquez sur le bouton ci-dessous pour créer un nouveau mot
                        de passe.
                    </Text>

                    <Section style={buttonContainer}>
                        <Button style={button} href={resetUrl}>
                            Réinitialiser mon mot de passe
                        </Button>
                    </Section>

                    <Text style={text}>
                        Ou copiez et collez ce lien dans votre navigateur :
                    </Text>

                    <Link href={resetUrl} style={link}>
                        {resetUrl}
                    </Link>

                    <Section style={warningBox}>
                        <Text style={warningText}>
                            ⚠️ Ce lien expirera dans 1 heure pour des raisons de sécurité.
                        </Text>
                    </Section>

                    <Text style={footer}>
                        Si vous n&apos;avez pas demandé de réinitialisation de mot de
                        passe, vous pouvez ignorer cet email en toute sécurité. Votre mot
                        de passe ne sera pas modifié.
                    </Text>

                    <Text style={footer}>
                        © {new Date().getFullYear()} LGK Immo. Tous droits réservés.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

export default ResetPassword;

const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
    maxWidth: "600px",
};

const logoContainer = {
    margin: "0 auto",
    padding: "20px 0 20px",
    textAlign: "center" as const,
};

const h1 = {
    color: "#10b981",
    fontSize: "32px",
    fontWeight: "bold",
    margin: "0",
    padding: "0",
};

const h2 = {
    color: "#1f2937",
    fontSize: "24px",
    fontWeight: "bold",
    margin: "30px 0",
    padding: "0",
    textAlign: "center" as const,
};

const text = {
    color: "#4b5563",
    fontSize: "16px",
    lineHeight: "26px",
    textAlign: "center" as const,
    padding: "0 40px",
};

const buttonContainer = {
    padding: "27px 0 27px",
    textAlign: "center" as const,
};

const button = {
    backgroundColor: "#10b981",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px 40px",
};

const link = {
    color: "#10b981",
    fontSize: "14px",
    textDecoration: "underline",
    wordBreak: "break-all" as const,
    padding: "0 40px",
    display: "block",
    textAlign: "center" as const,
    marginBottom: "20px",
};

const warningBox = {
    backgroundColor: "#fef3c7",
    borderRadius: "8px",
    padding: "16px",
    margin: "20px 40px",
};

const warningText = {
    color: "#92400e",
    fontSize: "14px",
    lineHeight: "20px",
    margin: "0",
    textAlign: "center" as const,
};

const footer = {
    color: "#9ca3af",
    fontSize: "12px",
    lineHeight: "20px",
    textAlign: "center" as const,
    padding: "0 40px",
    marginTop: "32px",
};
